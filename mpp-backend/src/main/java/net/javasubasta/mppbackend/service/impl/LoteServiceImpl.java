package net.javasubasta.mppbackend.service.impl;

import net.javasubasta.mppbackend.dto.LoteDto;
import net.javasubasta.mppbackend.entity.Lote;
import net.javasubasta.mppbackend.entity.Subasta;
import net.javasubasta.mppbackend.exception.ResourceNotFoundException;
import net.javasubasta.mppbackend.mapper.LoteMapper;
import net.javasubasta.mppbackend.repository.LoteRepository;
import net.javasubasta.mppbackend.repository.SubastaRepository;
import net.javasubasta.mppbackend.service.LoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.modelmapper.ModelMapper;

import java.util.Optional;

@Service
public class LoteServiceImpl implements LoteService {


    private final LoteRepository loteRepository;
    private final SubastaRepository subastaRepository;
    private final LoteMapper loteMapper;

    public LoteServiceImpl(LoteRepository loteRepository, SubastaRepository subastaRepository, LoteMapper loteMapper) {
        this.loteRepository = loteRepository;
        this.subastaRepository = subastaRepository;
        this.loteMapper = loteMapper;
    }

    @Override
    public LoteDto addLoteToSubasta(int subastaId, LoteDto loteDto) {
        Optional<Subasta> subastaOptional = subastaRepository.findById(subastaId);
        if (subastaOptional.isPresent()) {
            Subasta subasta = subastaOptional.get();
            Lote lote = loteMapper.mapToEntity(loteDto);
            lote.setSubasta(subasta);
            lote = loteRepository.save(lote);
            return loteMapper.mapToDto(lote);
        } else {
            throw new ResourceNotFoundException("Subasta no encontrada con ID: " + subastaId);
        }
    }
}
