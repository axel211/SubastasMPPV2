package net.javasubasta.mppbackend.controller;

import net.javasubasta.mppbackend.service.FotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/fotos")
public class FotoController {
    @Autowired
    private FotoService fotoService; // Asumiendo que tienes un servicio que maneja la lógica de negocio para fotos

    @GetMapping(value = "/{id}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> obtenerImagenPorId(@PathVariable int id) {
        byte[] imagen = fotoService.obtenerImagenPorId(id);
        return ResponseEntity
                .ok()
                .contentType(MediaType.IMAGE_JPEG) // Asegúrate de ajustar el tipo de contenido según el formato de tus imágenes
                .body(imagen);
    }
}
