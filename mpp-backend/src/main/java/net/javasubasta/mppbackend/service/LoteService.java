package net.javasubasta.mppbackend.service;

import net.javasubasta.mppbackend.dto.LoteDto;
import net.javasubasta.mppbackend.entity.Lote;

public interface LoteService {
    LoteDto addLoteToSubasta(int subastaID , LoteDto loteDto);
}
