package net.javasubasta.mppbackend.service;

import net.javasubasta.mppbackend.dto.OfertaDTO;
import net.javasubasta.mppbackend.dto.OfertaResponseDTO;
import net.javasubasta.mppbackend.entity.Oferta;

import java.util.List;

public interface OfertaService {
    Oferta realizarOferta (OfertaDTO ofertaDTO); ;
    List<OfertaResponseDTO> obtenerOfertasPorLote(int loteId) ;
}
