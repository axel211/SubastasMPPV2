package net.javasubasta.mppbackend.service;

import net.javasubasta.mppbackend.dto.OfertaDTO;
import net.javasubasta.mppbackend.entity.Oferta;

public interface OfertaService {
    Oferta realizarOferta (OfertaDTO ofertaDTO); ;
}
