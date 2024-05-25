package net.javasubasta.mppbackend.controller;

import net.javasubasta.mppbackend.dto.OfertaDTO;
import net.javasubasta.mppbackend.entity.Oferta;
import net.javasubasta.mppbackend.service.OfertaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ofertas")
public class OfertaController {

    @Autowired
    private OfertaService ofertaService;

    @PostMapping
    public ResponseEntity<Oferta> realizarOferta(@RequestBody OfertaDTO ofertaDTO) {
        Oferta oferta = ofertaService.realizarOferta(ofertaDTO);

        Oferta ofertaS = new Oferta() ;
        return ResponseEntity.ok(ofertaS);
    }
}
