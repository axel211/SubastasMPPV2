package net.javasubasta.mppbackend.service.impl;

import lombok.AllArgsConstructor;
import net.javasubasta.mppbackend.dto.SubastaDTO;
import net.javasubasta.mppbackend.dto.SubastaSoloDTO;
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
                subasta.getFechaCierre(),
                subasta.getFechaCreacion(),
                subasta.getEstado()
        )).collect(Collectors.toList());
    }
}
