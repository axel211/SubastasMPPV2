package net.javasubasta.mppbackend.service.impl;

import net.javasubasta.mppbackend.entity.Foto;
import net.javasubasta.mppbackend.repository.FotoRepository;
import net.javasubasta.mppbackend.service.FotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FotoServiceImpl implements FotoService {
    @Autowired
    private FotoRepository fotoRepository;

    public byte[] obtenerImagenPorId(int id) {
        return fotoRepository.findById(id)
                .map(Foto::getContenido)
                .orElseThrow(() -> new RuntimeException("No se encontró la foto con ID: " + id));
    }
}
