package net.javasubasta.mppbackend.service;

import net.javasubasta.mppbackend.dto.SubastaDto;

import java.util.List;

public interface SubastaService {
    SubastaDto createSubasta(SubastaDto subastaDto);
    SubastaDto getSubastaById(int id);
    List<SubastaDto> getAllSubastas();
}
