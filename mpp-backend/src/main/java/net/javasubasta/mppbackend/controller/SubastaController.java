package net.javasubasta.mppbackend.controller;

import lombok.AllArgsConstructor;
import net.javasubasta.mppbackend.dto.SubastaDto;
import net.javasubasta.mppbackend.service.SubastaService;
import org.springframework.data.domain.AfterDomainEventPublication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@AllArgsConstructor
@RestController
@RequestMapping("/api/subasta")
public class SubastaController {
    private SubastaService subastaService;

    // Build add Subasta API REST
    @CrossOrigin(origins = "http://localhost:3000") // Permitir solicitudes desde http://localhost:3000
    @PostMapping()
    public ResponseEntity<SubastaDto> createSubasta(@RequestBody SubastaDto subastaDto) {
        System.out.println(subastaDto.getDescripcion() + subastaDto.getNombre());
        SubastaDto savedSubasta = subastaService.createSubasta(subastaDto);
        return new ResponseEntity<>(savedSubasta, HttpStatus.CREATED);
    }

    //Build Get subasta by ID REST API
    @CrossOrigin(origins = "http://localhost:3000") // Permitir solicitudes desde http://localhost:3000
    @GetMapping("{id}")
    public ResponseEntity <SubastaDto>  getSubastaById(@PathVariable ("id") int id) {
        SubastaDto subastaDto = subastaService.getSubastaById(id);
        return ResponseEntity.ok(subastaDto);
    }

    // Build Get all Subastas REST API
    @CrossOrigin(origins = "http://localhost:3000") // Permitir solicitudes desde http://localhost:3000
    @GetMapping()
    public ResponseEntity<List<SubastaDto>> getAllSubastas() {
        List<SubastaDto> subastas = subastaService.getAllSubastas();
        return  ResponseEntity.ok(subastas);
    }
}
