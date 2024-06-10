package net.javasubasta.mppbackend.controller;

import net.javasubasta.mppbackend.dto.OfertaResponseDTO;
import net.javasubasta.mppbackend.dto.ParticipanteDTO;
import net.javasubasta.mppbackend.entity.Participante;

import net.javasubasta.mppbackend.repository.ParticipanteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/participantes")
public class ParticipanteController {

    @Autowired
    private ParticipanteRepository participanteRepository;

    @PostMapping("/registrar")
    public ResponseEntity<?> registrarParticipante(@RequestBody ParticipanteDTO participanteDTO) {
        try {
            // Verificar si ya existe una solicitud para el usuario y la subasta
            Optional<Participante> existingParticipante = participanteRepository.findByIdSubastaAndIdUsuario(participanteDTO.getIdSubasta(), participanteDTO.getIdUsuario());
            if (existingParticipante.isPresent()) {
                return ResponseEntity.badRequest().body("El usuario ya ha registrado una solicitud para esta subasta");
            }

            Participante participante = new Participante();
            participante.setIdSubasta(participanteDTO.getIdSubasta());
            participante.setIdUsuario(participanteDTO.getIdUsuario());
            participante.setEstado("Por aprobar");
            participante.setFechaRegistro(LocalDateTime.now());
            participante.setDni(participanteDTO.getDni());
            participante.setFechaVoucher(participanteDTO.getFechaVoucher());
            participante.setMonto(participanteDTO.getMonto());

            participanteRepository.save(participante);

            return ResponseEntity.ok("Solicitud registrada exitosamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al registrar la solicitud: " + e.getMessage());
        }
    }


    @GetMapping("/listaParticipantes/{idSubasta}")
    public ResponseEntity<List<Participante>> obtenerOfertasPorLote(@PathVariable int idSubasta) {
        List<Participante> participantes = participanteRepository.findByIdSubastaAndEstadoIsNot(idSubasta,"HABILITADO");
        return ResponseEntity.ok(participantes);
    }

}
