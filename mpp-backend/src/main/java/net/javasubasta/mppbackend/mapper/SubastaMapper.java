package net.javasubasta.mppbackend.mapper;

import net.javasubasta.mppbackend.dto.SubastaDto;
import net.javasubasta.mppbackend.entity.Subasta;

public class SubastaMapper {

    public static SubastaDto mapToSubastaDto(Subasta subasta) {
        return new SubastaDto(
                subasta.getId(),
                subasta.getNombre(),
                subasta.getDescripcion(),
                subasta.getFechaCreacion(),
                subasta.getFechaCierre(),
                subasta.getEstado(),
                subasta.getLotes()
        );
    }

    public static Subasta mapToSubasta(SubastaDto subastaDto) {
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
