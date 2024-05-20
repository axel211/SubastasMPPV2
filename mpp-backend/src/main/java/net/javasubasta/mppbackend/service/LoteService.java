package net.javasubasta.mppbackend.service;

import net.javasubasta.mppbackend.dto.LoteDTO;
import net.javasubasta.mppbackend.dto.LoteRecuperarDTO;
import net.javasubasta.mppbackend.entity.Lote;

import java.util.List;

public interface LoteService {
    Lote guardarLoteConFotos(LoteDTO loteDTO, int subastaId) throws Exception;
    List<LoteRecuperarDTO> obtenerLotesPorSubastaId(int subastaId) throws Exception;
    LoteRecuperarDTO obtenerLotePorID(int id) throws Exception;
}
