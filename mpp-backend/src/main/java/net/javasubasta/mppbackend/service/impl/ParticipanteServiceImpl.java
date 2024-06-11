package net.javasubasta.mppbackend.service.impl;

import lombok.AllArgsConstructor;
import net.javasubasta.mppbackend.dto.ParticipantesSolicitudDTO;
import net.javasubasta.mppbackend.entity.Participante;
import net.javasubasta.mppbackend.repository.ParticipanteRepository;
import net.javasubasta.mppbackend.service.ParticipanteService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ParticipanteServiceImpl implements ParticipanteService {

    private ParticipanteRepository participanteRepository;
    @Override
    public List<ParticipantesSolicitudDTO> listarParticipantesByIDSubaste(int idSubasta) {
        return participanteRepository.findSolicitudesParticipantesByIdSubasta(idSubasta) ;
    }

    public Participante actualizarEstado(int idSolicitud, String nuevoEstado) {
        Participante participante = participanteRepository.findById(idSolicitud).orElseThrow(() -> new RuntimeException("Participante no encontrado"));
        participante.setEstado(nuevoEstado);
        return participanteRepository.save(participante);
    }
}
