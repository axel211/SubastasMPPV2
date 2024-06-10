package net.javasubasta.mppbackend.controller;

import lombok.AllArgsConstructor;
import net.javasubasta.mppbackend.dto.LoteDTO;
import net.javasubasta.mppbackend.dto.SubastaDTO;
import net.javasubasta.mppbackend.dto.SubastaParticipanteDTO;
import net.javasubasta.mppbackend.dto.SubastaSoloDTO;
import net.javasubasta.mppbackend.repository.SubastaRepository;
import net.javasubasta.mppbackend.service.SubastaService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;


@AllArgsConstructor
@RestController
@RequestMapping("/api/subasta")
public class SubastaController {
    private final SubastaRepository subastaRepository;
    private SubastaService subastaService;

    // Build add Subasta API REST
    @CrossOrigin(origins = "http://localhost:3000") // Permitir solicitudes desde http://localhost:3000
    @PostMapping()
    public ResponseEntity<SubastaDTO> createSubasta(@RequestBody SubastaDTO subastaDto) {
        SubastaDTO savedSubasta = subastaService.createSubasta(subastaDto);
        return new ResponseEntity<>(savedSubasta, HttpStatus.CREATED);
    }

    //Build Get subasta by ID REST API
    @CrossOrigin(origins = "http://localhost:3000") // Permitir solicitudes desde http://localhost:3000
    @GetMapping("{id}")
    public ResponseEntity <SubastaDTO>  getSubastaById(@PathVariable ("id") int id) {
        SubastaDTO subastaDto = subastaService.getSubastaById(id);
        return ResponseEntity.ok(subastaDto);
    }

    // Build Get all Subastas REST API
    @CrossOrigin(origins = "http://localhost:3000") // Permitir solicitudes desde http://localhost:3000
    @GetMapping()
    public ResponseEntity<List<SubastaSoloDTO>> getAllSubastas() {
        List<SubastaSoloDTO> subastas = subastaService.getAllSubastas();
        return ResponseEntity.ok(subastas);
    }

    @CrossOrigin(origins = "http://localhost:3000") // Permitir solicitudes desde http://localhost:3000
    @GetMapping("/subastaSolo/{id}")
    public ResponseEntity <SubastaSoloDTO>  getSubastaSoloById(@PathVariable ("id") int id) {
        SubastaSoloDTO subastaSoloDTO = subastaService.getSubastaSoloById(id);
        return ResponseEntity.ok(subastaSoloDTO);
    }

    @GetMapping("/{id}/lotes")
    public ResponseEntity<Page<LoteDTO>> getLotesBySubastaId(
            @PathVariable int id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<LoteDTO> lotes = subastaService.getLotesBySubastaId(id, page, size);
        return new ResponseEntity<>(lotes, HttpStatus.OK);
    }



    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<List<SubastaParticipanteDTO>> getSubastasByUsuarioId(@PathVariable Long idUsuario) {
        List<SubastaParticipanteDTO> subastas = subastaService.getSubastasByUsuarioId(idUsuario);
        return ResponseEntity.ok(subastas);
    }

}
