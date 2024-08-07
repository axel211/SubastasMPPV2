package net.javasubasta.mppbackend.service;

import net.javasubasta.mppbackend.dto.LoteDTO;
import net.javasubasta.mppbackend.dto.LoteListaDTO;
import net.javasubasta.mppbackend.dto.LoteRecuperarDTO;
import net.javasubasta.mppbackend.entity.Lote;

import java.util.List;

public interface LoteService {
    Lote guardarLoteConFotos(LoteDTO loteDTO, int subastaId) throws Exception;
    List<LoteRecuperarDTO> obtenerLotesPorSubastaId(int subastaId) throws Exception;
    LoteRecuperarDTO obtenerLotePorID(int id, int page, int size) throws Exception;
    Lote adjudicarLote(int loteId ) throws Exception;
    List<LoteListaDTO> obtenerAllLotesPorSubastaId(int subastaId) throws Exception;
}
