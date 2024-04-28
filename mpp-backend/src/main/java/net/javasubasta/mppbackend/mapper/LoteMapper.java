package net.javasubasta.mppbackend.mapper;

import net.javasubasta.mppbackend.dto.LoteDto;
import net.javasubasta.mppbackend.entity.Lote;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class LoteMapper {

    private final ModelMapper modelMapper;

    public LoteMapper() {
        this.modelMapper = new ModelMapper();
    }
    public Lote mapToEntity(LoteDto loteDto) {
        return modelMapper.map(loteDto, Lote.class);
    }

    public LoteDto mapToDto(Lote lote) {
        return modelMapper.map(lote, LoteDto.class);
    }
}
