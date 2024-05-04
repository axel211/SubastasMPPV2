package net.javasubasta.mppbackend.service;

import net.javasubasta.mppbackend.dto.LoteDTO;
import net.javasubasta.mppbackend.entity.Lote;

public interface LoteService {
    Lote guardarLoteConFotos(LoteDTO loteDTO, int subastaId) throws Exception;
}
