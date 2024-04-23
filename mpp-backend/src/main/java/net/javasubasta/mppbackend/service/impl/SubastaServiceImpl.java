package net.javasubasta.mppbackend.service.impl;

import lombok.AllArgsConstructor;
import net.javasubasta.mppbackend.dto.SubastaDto;
import net.javasubasta.mppbackend.entity.Subasta;
import net.javasubasta.mppbackend.exception.ResourceNotFoundException;
import net.javasubasta.mppbackend.mapper.SubastaMapper;
import net.javasubasta.mppbackend.repository.SubastaRepository;
import net.javasubasta.mppbackend.service.SubastaService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class SubastaServiceImpl implements SubastaService {

    private SubastaRepository subastaRepository;
    @Override
    public SubastaDto createSubasta(SubastaDto subastaDto) {
        System.out.println("1");
        System.out.println(subastaDto.getDescripcion());
        Subasta subasta = SubastaMapper.mapToSubasta(subastaDto) ;
        Subasta savedSubasta = subastaRepository.save(subasta);
        return SubastaMapper.mapToSubastaDto(savedSubasta);
    }

    @Override
    public SubastaDto getSubastaById(int id) {
        Subasta subasta = subastaRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Subasta no encontrada con el id " + id)
        ) ;
        return SubastaMapper.mapToSubastaDto(subasta);
    }

    @Override
    public List<SubastaDto> getAllSubastas() {
        List<Subasta> subastas = subastaRepository.findAll();
        return subastas.stream().map(SubastaMapper::mapToSubastaDto).collect(Collectors.toList());
    }
}
