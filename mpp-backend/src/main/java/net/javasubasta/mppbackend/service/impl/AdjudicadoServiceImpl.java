package net.javasubasta.mppbackend.service.impl;

import net.javasubasta.mppbackend.dto.AdjudicadoDTO;
import net.javasubasta.mppbackend.entity.Adjudicado;
import net.javasubasta.mppbackend.repository.AdjudicadoRepository;
import net.javasubasta.mppbackend.service.AdjudicadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdjudicadoServiceImpl implements AdjudicadoService {

    @Autowired
    private AdjudicadoRepository adjudicadoRepository;

    public void savePdf(Long id, MultipartFile file) throws IOException {
        Adjudicado adjudicado = adjudicadoRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid adjudicado ID"));
        adjudicado.setPdfData(file.getBytes());
        adjudicadoRepository.save(adjudicado);
    }

    public byte[] getPdf(Long id) {
        Adjudicado adjudicado = adjudicadoRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid adjudicado ID"));
        return adjudicado.getPdfData();
    }

    public List<AdjudicadoDTO> getAllAdjudicados() {
        return adjudicadoRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private AdjudicadoDTO convertToDTO(Adjudicado adjudicado) {
        AdjudicadoDTO dto = new AdjudicadoDTO();
        dto.setIdLote(adjudicado.getId());
        dto.setTituloLote(adjudicado.getLote().getNombre());
        dto.setIdSubasta(adjudicado.getIdSubasta());
        dto.setNombreSubasta(adjudicado.getNombreSubasta());
        dto.setNombresAdjudicado(adjudicado.getGanador().getPersona().getNombres());
        dto.setApellidosAdjudicado(adjudicado.getGanador().getPersona().getApellido());
        dto.setFechaAdjudicacion(adjudicado.getFechaAdjudicacion());
        dto.setEstado(adjudicado.getEstado());
        return dto;
    }


    public List<AdjudicadoDTO> getAdjudicacionesByUsuario(Long usuarioId) {
        return adjudicadoRepository.findByGanadorId(usuarioId).stream().map(this::convertToDTO).collect(Collectors.toList());
    }


    public boolean pdfExists(Long id) {
        Adjudicado adjudicado = adjudicadoRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid adjudicado ID"));
        return adjudicado.getPdfData() != null;
    }

    public void updateEstado(Long id, String estado) {
        Adjudicado adjudicado = adjudicadoRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid adjudicado ID"));
        adjudicado.setEstado(estado);
        adjudicadoRepository.save(adjudicado);
    }

}
