package net.javasubasta.mppbackend.service;

import net.javasubasta.mppbackend.dto.LoteDTO;
import net.javasubasta.mppbackend.dto.SubastaDTO;
import net.javasubasta.mppbackend.dto.SubastaSoloDTO;
import org.springframework.data.domain.Page;

import java.util.List;

public interface SubastaService {
    SubastaDTO createSubasta(SubastaDTO subastaDto);
    SubastaDTO getSubastaById(int id);
    List<SubastaSoloDTO> getAllSubastas();
    SubastaSoloDTO getSubastaSoloById(int id);
    Page<LoteDTO> getLotesBySubastaId(int subastaId, int page, int size);
}
