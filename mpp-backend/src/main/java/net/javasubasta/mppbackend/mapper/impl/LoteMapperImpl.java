package net.javasubasta.mppbackend.mapper.impl;

import net.javasubasta.mppbackend.dto.LoteDto;
import net.javasubasta.mppbackend.entity.Foto;
import net.javasubasta.mppbackend.entity.Lote;
import net.javasubasta.mppbackend.mapper.LoteMapper;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class LoteMapperImpl implements LoteMapper {
    public byte[] base64ToByte(String base64) {
        return Base64.getDecoder().decode(base64);
    }

    @Override
    public Lote toEntity(LoteDto loteDto) {
        if (loteDto == null) {
            return null;
        }

        Lote lote = new Lote();
        lote.setTipo_lote(loteDto.getTipoLote());
        lote.setPlaca(loteDto.getPlaca());
        lote.setNombre(loteDto.getNombre());
        lote.setDescripcion(loteDto.getDescripcion());
        lote.setKm(loteDto.getKm());
        lote.setAnio(loteDto.getAnio());
        lote.setModelo(loteDto.getModelo());
        lote.setPrecioBase(loteDto.getPrecioBase());
        lote.setMoneda(loteDto.getMoneda());

        // Manejo de las fotos
        if (loteDto.getFotos() != null && !loteDto.getFotos().isEmpty()) {
            List<Foto> fotos = loteDto.getFotos().stream()
                    .map(this::base64ToByte)
                    .map(bytes -> {
                        Foto foto = new Foto();
                        foto.setContenido(bytes);
                        return foto;
                    })
                    .collect(Collectors.toList());
            lote.setFotos(fotos);
        }

        return lote;
    }

    @Override
    public LoteDto toDto(Lote lote) {
        if (lote == null) {
            return null;
        }

        LoteDto loteDto = new LoteDto();
        loteDto.setTipoLote(lote.getTipo_lote());
        loteDto.setPlaca(lote.getPlaca());
        loteDto.setNombre(lote.getNombre());
        loteDto.setDescripcion(lote.getDescripcion());
        loteDto.setKm(lote.getKm());
        loteDto.setAnio(lote.getAnio());
        loteDto.setModelo(lote.getModelo());
        loteDto.setPrecioBase(lote.getPrecioBase());
        loteDto.setMoneda(lote.getMoneda());

        return loteDto;
    }
}
