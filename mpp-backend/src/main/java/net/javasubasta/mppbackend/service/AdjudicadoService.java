package net.javasubasta.mppbackend.service;

import net.javasubasta.mppbackend.dto.AdjudicadoDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


public interface AdjudicadoService {

    List<AdjudicadoDTO> getAllAdjudicados();
    void savePdf(Long id, MultipartFile file) throws IOException;
    byte[] getPdf(Long id) ;
    List<AdjudicadoDTO> getAdjudicacionesByUsuario(Long usuarioId);
    boolean pdfExists(Long id) ;
    void updateEstado(Long id, String estado) ;
}
