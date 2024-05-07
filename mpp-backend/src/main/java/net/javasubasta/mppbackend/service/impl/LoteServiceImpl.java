package net.javasubasta.mppbackend.service.impl;

import jakarta.transaction.Transactional;
import net.javasubasta.mppbackend.dto.FotoDTO;
import net.javasubasta.mppbackend.dto.LoteDTO;
import net.javasubasta.mppbackend.dto.LoteRecuperarDTO;
import net.javasubasta.mppbackend.entity.Foto;
import net.javasubasta.mppbackend.entity.Lote;
import net.javasubasta.mppbackend.entity.Subasta;
import net.javasubasta.mppbackend.repository.FotoRepository;
import net.javasubasta.mppbackend.repository.LoteRepository;
import net.javasubasta.mppbackend.repository.SubastaRepository;
import net.javasubasta.mppbackend.service.LoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LoteServiceImpl implements LoteService {
    @Autowired
    private LoteRepository loteRepository;

    @Autowired
    private FotoRepository fotoRepository;

    @Autowired
    private SubastaRepository subastaRepository;

    @Override
    @Transactional
    public Lote guardarLoteConFotos(LoteDTO loteDTO, int subastaId) throws Exception {
        Subasta subasta = subastaRepository.findById(subastaId)
                .orElseThrow(() -> new Exception("Subasta no encontrada"));

        Lote lote = new Lote();
        // Copiando manualmente cada propiedad del DTO al objeto de entidad
        lote.setTipo_lote(loteDTO.getTipoLote());
        lote.setPlaca(loteDTO.getPlaca());
        lote.setNombre(loteDTO.getNombre());
        lote.setDescripcion(loteDTO.getDescripcion());
        lote.setKm(loteDTO.getKm());
        lote.setAnio(loteDTO.getAnio());
        lote.setModelo(loteDTO.getModelo());
        lote.setMoneda(loteDTO.getMoneda());
        lote.setPrecioBase(loteDTO.getPrecioBase());
        lote.setSubasta(subasta); // Asignando la subasta

        lote = loteRepository.save(lote); // Guardar el lote en la base de datos

        // Guardar cada imagen asociada con el lote
        for (MultipartFile file : loteDTO.getImagenes()) {
            Foto foto = new Foto();
            foto.setContenido(file.getBytes());
            foto.setLote(lote); // Asociar lote con foto
            fotoRepository.save(foto); // Guardar la foto en la base de datos
        }

        return lote;
    }

    @Override
    public List<LoteRecuperarDTO> obtenerLotesPorSubastaId(int subastaId) throws Exception {
        List<Lote> lotes = loteRepository.findBySubastaIdWithFotos(subastaId);
        return lotes.stream().map(this::convertirALoteDTO).collect(Collectors.toList());
    }

    private LoteRecuperarDTO convertirALoteDTO(Lote lote) {
        LoteRecuperarDTO dto = new LoteRecuperarDTO();
        // Asumiendo que has modificado LoteDTO para incluir una lista de byte[] para las imágenes
        dto.setImagenes(lote.getFotos().stream().map(Foto::getContenido).collect(Collectors.toList()));
        dto.setDescripcion(lote.getDescripcion());
        dto.setKm(lote.getKm());
        dto.setPlaca(lote.getPlaca());
        // Copia otros campos necesarios
        return dto;
    }

}
