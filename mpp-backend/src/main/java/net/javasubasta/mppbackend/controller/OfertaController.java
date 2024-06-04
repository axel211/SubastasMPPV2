package net.javasubasta.mppbackend.controller;

import net.javasubasta.mppbackend.dto.OfertaDTO;
import net.javasubasta.mppbackend.dto.OfertaResponseDTO;
import net.javasubasta.mppbackend.entity.Oferta;
import net.javasubasta.mppbackend.service.OfertaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ofertas")
public class OfertaController {

    @Autowired
    private OfertaService ofertaService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @PostMapping
    public ResponseEntity<Oferta> realizarOferta(@RequestBody OfertaDTO ofertaDTO) {
        Oferta oferta = ofertaService.realizarOferta(ofertaDTO);
        Oferta ofertaS = new Oferta() ;
        ofertaS.setId(oferta.getId());
        ofertaS.setFechaOferta(oferta.getFechaOferta());
        ofertaS.setTipoOferta(oferta.getTipoOferta());
        ofertaS.setUsuario(oferta.getUsuario());
        messagingTemplate.convertAndSend("/topic/ofertas", ofertaS);
        return ResponseEntity.ok(ofertaS);
    }

    @GetMapping("/lote/{loteId}")
    public ResponseEntity<List<OfertaResponseDTO>> obtenerOfertasPorLote(@PathVariable int loteId) {
        List<OfertaResponseDTO> ofertas = ofertaService.obtenerOfertasPorLote(loteId);
        return ResponseEntity.ok(ofertas);
    }
}
