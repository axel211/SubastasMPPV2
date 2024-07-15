package net.javasubasta.mppbackend.service.impl;

import lombok.AllArgsConstructor;
import net.javasubasta.mppbackend.dto.LoteDTO;
import net.javasubasta.mppbackend.dto.SubastaDTO;
import net.javasubasta.mppbackend.dto.SubastaParticipanteDTO;
import net.javasubasta.mppbackend.dto.SubastaSoloDTO;
import net.javasubasta.mppbackend.entity.Foto;
import net.javasubasta.mppbackend.entity.Lote;
import net.javasubasta.mppbackend.entity.Subasta;
import net.javasubasta.mppbackend.exception.ResourceNotFoundException;
import net.javasubasta.mppbackend.mapper.SubastaMapper;
import net.javasubasta.mppbackend.repository.SubastaRepository;
import net.javasubasta.mppbackend.service.SubastaService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class SubastaServiceImpl implements SubastaService {

    private SubastaRepository subastaRepository;
    @Override
    public SubastaDTO createSubasta(SubastaDTO subastaDto) {
        System.out.println("1");
        System.out.println(subastaDto.getDescripcion());
        Subasta subasta = SubastaMapper.mapToSubasta(subastaDto) ;
        Subasta savedSubasta = subastaRepository.save(subasta);
        return SubastaMapper.mapToSubastaDto(savedSubasta);
    }

    @Override
    public SubastaDTO getSubastaById(int id) {
        Subasta subasta = subastaRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Subasta no encontrada con el id " + id)
        ) ;
        return SubastaMapper.mapToSubastaDto(subasta);
    }

    @Override
    public List<SubastaSoloDTO> getAllSubastas() {
        return subastaRepository.findAll().stream().map(subasta -> new SubastaSoloDTO(
                subasta.getId(),
                subasta.getNombre(),
                subasta.getDescripcion(),
                subasta.getFechaCreacion(),
                subasta.getFechaCierre(),
                subasta.getEstado()
        )).collect(Collectors.toList());
    }

    @Override
    public SubastaSoloDTO getSubastaSoloById(int id) {
        Subasta subasta = subastaRepository.findById(id).orElseThrow(  () -> new ResourceNotFoundException("Subasta no encontrada con el id " + id)) ;
        SubastaSoloDTO subastaSoloDTO = new SubastaSoloDTO() ;
        subastaSoloDTO.setId(subasta.getId());
        subastaSoloDTO.setNombre(subasta.getNombre());
        subastaSoloDTO.setDescripcion(subasta.getDescripcion());
        subastaSoloDTO.setFechaCierre(subasta.getFechaCierre());
        subastaSoloDTO.setEstado(subasta.getEstado());
        return subastaSoloDTO ;
    }

    public Page<LoteDTO> getLotesBySubastaId(int subastaId, int page, int size) {
        Subasta subasta = subastaRepository.findById(subastaId)
                .orElseThrow(() -> new ResourceNotFoundException("Subasta not found"));

        Pageable pageable = PageRequest.of(page, size, Sort.by("id").ascending());
        Page<Lote> lotePage = subastaRepository.findLotesBySubastaId(subastaId, pageable);

        Page<LoteDTO> loteDTOPage = lotePage.map(lote -> {
            LoteDTO loteDTO = new LoteDTO();
            loteDTO.setId(lote.getId());
            loteDTO.setTipoLote(lote.getTipo_lote());
            loteDTO.setPlaca(lote.getPlaca());
            loteDTO.setNombre(lote.getNombre());
            loteDTO.setDescripcion(lote.getDescripcion());
            loteDTO.setKm(lote.getKm());
            loteDTO.setAnio(lote.getAnio());
            loteDTO.setModelo(lote.getModelo());
            loteDTO.setMoneda(lote.getMoneda());
            loteDTO.setPrecioBase(lote.getPrecioBase());

            List<byte[]> fotos = new ArrayList<>();
            for (Foto foto : lote.getFotos()) {
                fotos.add(foto.getContenido());
            }
            loteDTO.setFotos(fotos);

            return loteDTO;
        });

        return loteDTOPage;
    }

    public List<SubastaParticipanteDTO> getSubastasByUsuarioId(Long idUsuario) {
        return subastaRepository.findSubastasByUsuarioId(idUsuario);
    }

    public Subasta updateSubasta(int id, Subasta subastaDetails) {
        Subasta subasta = subastaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Subasta not found"));
        subasta.setEstado(subastaDetails.getEstado());
        return subastaRepository.save(subasta);
    }

    public void deleteSubasta(int id) {
        Subasta subasta = subastaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Subasta not found"));
        subastaRepository.delete(subasta);
    }

    public Subasta finalizarSubasta(int id) {
        Subasta subasta = subastaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Subasta not found"));
        subasta.setEstado("Finalizado");
        return subastaRepository.save(subasta);
    }

}
