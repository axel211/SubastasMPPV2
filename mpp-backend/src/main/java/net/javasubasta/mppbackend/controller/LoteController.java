package net.javasubasta.mppbackend.controller;

import net.javasubasta.mppbackend.dto.LoteDto;
import net.javasubasta.mppbackend.entity.Lote;
import net.javasubasta.mppbackend.mapper.LoteMapper;
import net.javasubasta.mppbackend.service.LoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.PrivateKey;

@RestController
@RequestMapping("/api/lotes")
public class LoteController {

    @Autowired
    private LoteService loteService;

    @Autowired
    private LoteMapper loteMapper;

    @PostMapping(value = "/subasta/{subastaId}", consumes = "multipart/form-data")
    public ResponseEntity<LoteDto> addLoteToSubasta(
            @PathVariable int subastaId,
            @RequestPart("lote") LoteDto loteDto,
            @RequestPart("fotos") MultipartFile[] fotos) {
        // Aquí manejarías la lógica para guardar las fotos junto con el lote
        Lote lote = loteService.addLoteToSubasta(loteDto, subastaId);
        LoteDto responseDto = loteMapper.toDto(lote);
        return ResponseEntity.ok(responseDto);
    }



}
