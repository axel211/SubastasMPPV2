package net.javasubasta.mppbackend.controller;

import net.javasubasta.mppbackend.dto.AdjudicadoDTO;
import net.javasubasta.mppbackend.service.AdjudicadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/adjudicados")
public class AdjudicadoController {
    @Autowired
    private AdjudicadoService adjudicadoService;

    @PostMapping("/{id}/uploadPdf")
    public ResponseEntity<String> uploadPdf(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            adjudicadoService.savePdf(id, file);
            return new ResponseEntity<>("PDF uploaded successfully", HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>("Failed to upload PDF", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}/pdf")
    public ResponseEntity<byte[]> getPdf(@PathVariable Long id) {
        byte[] pdfData = adjudicadoService.getPdf(id);
        if (pdfData != null) {
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_PDF).body(pdfData);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/adjudicadas")
    public List<AdjudicadoDTO> getAdjudicadas() {
        return adjudicadoService.getAllAdjudicados();
    }

    @GetMapping("/participante")
    public ResponseEntity<List<AdjudicadoDTO>> getAdjudicacionesParticipante(@RequestParam Long usuarioId) {
        List<AdjudicadoDTO> adjudicaciones = adjudicadoService.getAdjudicacionesByUsuario(usuarioId);
        return new ResponseEntity<>(adjudicaciones, HttpStatus.OK);
    }

    @GetMapping("/{id}/pdf/exists")
    public ResponseEntity<Boolean> pdfExists(@PathVariable Long id) {
        boolean exists = adjudicadoService.pdfExists(id);
        return new ResponseEntity<>(exists, HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<String> updateEstado(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String estado = body.get("estado");
        adjudicadoService.updateEstado(id, estado);
        return new ResponseEntity<>("Estado actualizado exitosamente", HttpStatus.OK);
    }
}
