package net.javasubasta.mppbackend.service;

import net.javasubasta.mppbackend.dto.ParticipantesSolicitudDTO;
import net.javasubasta.mppbackend.entity.Participante;

import java.util.List;

public interface ParticipanteService {
    List<ParticipantesSolicitudDTO> listarParticipantesByIDSubaste (int idSubasta) ;
    Participante actualizarEstado(int idSolicitud, String nuevoEstado);
}
