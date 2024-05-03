package net.javasubasta.mppbackend.service;

import net.javasubasta.mppbackend.dto.SubastaDTO;
import net.javasubasta.mppbackend.dto.SubastaSoloDTO;

import java.util.List;

public interface SubastaService {
    SubastaDTO createSubasta(SubastaDTO subastaDto);
    SubastaDTO getSubastaById(int id);
    List<SubastaSoloDTO> getAllSubastas();
}
