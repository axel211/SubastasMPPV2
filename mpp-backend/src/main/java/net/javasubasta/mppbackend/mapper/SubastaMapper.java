package net.javasubasta.mppbackend.mapper;

import net.javasubasta.mppbackend.dto.SubastaDTO;
import net.javasubasta.mppbackend.entity.Subasta;

public class SubastaMapper {

    public static SubastaDTO mapToSubastaDto(Subasta subasta) {
        return new SubastaDTO(
                subasta.getId(),
                subasta.getNombre(),
                subasta.getDescripcion(),
                subasta.getFechaCreacion(),
                subasta.getFechaCierre(),
                subasta.getEstado(),
                subasta.getLotes()
        );
    }

    public static Subasta mapToSubasta(SubastaDTO subastaDto) {
        return new Subasta(
                subastaDto.getId(),
                subastaDto.getNombre(),
                subastaDto.getDescripcion() ,
                subastaDto.getFechaCreacion(),
                subastaDto.getFechaCierre(),
                subastaDto.getEstado(),
                subastaDto.getLotes()
        ) ;
    }
}
