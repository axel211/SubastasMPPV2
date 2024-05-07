package net.javasubasta.mppbackend.service;

import org.springframework.stereotype.Service;

@Service
public interface FotoService {
    byte[] obtenerImagenPorId(int id);
}
