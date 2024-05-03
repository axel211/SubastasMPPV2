package net.javasubasta.mppbackend.mapper;

import net.javasubasta.mppbackend.dto.LoteDto;
import net.javasubasta.mppbackend.entity.Lote;

public interface LoteMapper {
    Lote toEntity(LoteDto loteDto);

    LoteDto toDto(Lote lote);
}
