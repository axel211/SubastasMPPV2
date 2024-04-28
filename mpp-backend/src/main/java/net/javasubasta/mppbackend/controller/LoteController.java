package net.javasubasta.mppbackend.controller;

import net.javasubasta.mppbackend.dto.LoteDto;
import net.javasubasta.mppbackend.service.LoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/lotes")
public class LoteController {
    private final LoteService loteService;

    public LoteController(LoteService loteService) {
        this.loteService = loteService;
    }

    @PostMapping("/subasta/{subastaId}")
    public ResponseEntity<LoteDto> addLoteToSubasta(@PathVariable int subastaId, @RequestBody LoteDto loteDto) {
        LoteDto savedLote = loteService.addLoteToSubasta(subastaId, loteDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedLote);
    }

}
