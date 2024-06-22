package net.javasubasta.mppbackend.service.impl;

import jakarta.transaction.Transactional;
import net.javasubasta.mppbackend.dto.FotoDTO;
import net.javasubasta.mppbackend.dto.FotoPageDTO;
import net.javasubasta.mppbackend.dto.LoteDTO;
import net.javasubasta.mppbackend.dto.LoteRecuperarDTO;
import net.javasubasta.mppbackend.entity.*;
import net.javasubasta.mppbackend.exception.ResourceNotFoundException;
import net.javasubasta.mppbackend.repository.*;
import net.javasubasta.mppbackend.service.LoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
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

    @Autowired
    private OfertaRepository ofertaRepository;

    @Autowired
    private AdjudicadoRepository adjudicadoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

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
        lote.setEstado(loteDTO.getEstado());
        lote.setFechaHoraCierre(loteDTO.getFechaHoraCierre());
        lote.setPrecioActual(loteDTO.getPrecioBase());
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


    public LoteRecuperarDTO obtenerLotePorID(int id, int page, int size) throws Exception {
        Lote lote = loteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lote not found"));

        Pageable pageable = PageRequest.of(page, size);
        Page<Foto> fotoPage = fotoRepository.findByLoteId(id, pageable);

        List<byte[]> fotos = fotoPage.getContent().stream()
                .map(Foto::getContenido)
                .collect(Collectors.toList());

        FotoPageDTO fotoPageDTO = new FotoPageDTO();
        fotoPageDTO.setFotos(fotos);
        fotoPageDTO.setTotalPages(fotoPage.getTotalPages());
        fotoPageDTO.setTotalElements(fotoPage.getTotalElements());

        LoteRecuperarDTO loteRecuperarDTO = new LoteRecuperarDTO();
        loteRecuperarDTO = convertirALoteDTO(lote);
        // Set other properties of loteRecuperarDTO from lote
        loteRecuperarDTO.setFotoPage(fotoPageDTO);

        return loteRecuperarDTO;
    }

    @Override
    public Lote adjudicarLote(int loteId) throws Exception {

        Lote lote = loteRepository.findById(loteId)
                .orElseThrow(() -> new ResourceNotFoundException("Lote not found with id " + loteId));

        List<Oferta> ofertas = ofertaRepository.findByLoteIdOrderByMontoOfertaDesc(loteId);

        if (!ofertas.isEmpty()) {
            Oferta ofertaGanadora = ofertas.get(0);
            Usuario ganador = usuarioRepository.findById(ofertaGanadora.getIdUsuario())
                    .orElseThrow(() -> new ResourceNotFoundException("Participante not found with id " + ofertaGanadora.getIdUsuario()));
            lote.setEstado("ADJUDICADO");
            loteRepository.save(lote);

            Adjudicado adjudicado = new Adjudicado();
            adjudicado.setLote(lote);
            adjudicado.setGanador(ganador);
            adjudicado.setFechaAdjudicacion(LocalDateTime.now());
            adjudicadoRepository.save(adjudicado);
        }
        else{
            lote.setEstado("DESIERTO");
            loteRepository.save(lote);
        }

        return lote;
    }

    private LoteRecuperarDTO convertirALoteDTO(Lote lote) {
        LoteRecuperarDTO dto = new LoteRecuperarDTO();
        // Asumiendo que has modificado LoteDTO para incluir una lista de byte[] para las imágenes
        dto.setDescripcion(lote.getDescripcion());
        dto.setKm(lote.getKm());
        dto.setPlaca(lote.getPlaca());
        dto.setId(lote.getId());
        dto.setTipoLote(lote.getTipo_lote());
        dto.setNombre(lote.getNombre());
        dto.setAnio(lote.getAnio());
        dto.setModelo(lote.getModelo());
        dto.setFechaHoraCierre(lote.getFechaHoraCierre());
        dto.setSubastaId(lote.getSubasta().getId());
        // Copia otros campos necesarios
        return dto;
    }


}
