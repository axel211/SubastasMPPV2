package net.javasubasta.mppbackend.service;

import net.javasubasta.mppbackend.dto.LoteDTO;
import net.javasubasta.mppbackend.dto.SubastaDTO;
import net.javasubasta.mppbackend.dto.SubastaParticipanteDTO;
import net.javasubasta.mppbackend.dto.SubastaSoloDTO;
import net.javasubasta.mppbackend.entity.Subasta;
import org.springframework.data.domain.Page;

import java.util.List;

public interface SubastaService {
    SubastaDTO createSubasta(SubastaDTO subastaDto);
    SubastaDTO getSubastaById(int id);
    List<SubastaSoloDTO> getAllSubastas();
    SubastaSoloDTO getSubastaSoloById(int id);
    Page<LoteDTO> getLotesBySubastaId(int subastaId, int page, int size);
    List<SubastaParticipanteDTO> getSubastasByUsuarioId(Long idUsuario);
    Subasta updateSubasta(int id, Subasta subastaDetails) ;
    void deleteSubasta(int id);
    Subasta finalizarSubasta(int id);
}
