package net.javasubasta.mppbackend.service.impl;

import net.javasubasta.mppbackend.dto.LoteDto;
import net.javasubasta.mppbackend.entity.Foto;
import net.javasubasta.mppbackend.entity.Lote;
import net.javasubasta.mppbackend.entity.Subasta;
import net.javasubasta.mppbackend.mapper.LoteMapper;
import net.javasubasta.mppbackend.repository.LoteRepository;
import net.javasubasta.mppbackend.repository.SubastaRepository;
import net.javasubasta.mppbackend.service.LoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LoteServiceImpl implements LoteService {


    @Autowired
    private LoteRepository loteRepository;

    @Autowired
    private SubastaRepository subastaRepository;



    @Autowired
    private LoteMapper loteMapper;

    @Override
    public Lote addLoteToSubasta(LoteDto loteDto, int subastaId) {
        Subasta subasta = subastaRepository.findById(subastaId)
                .orElseThrow(() -> new RuntimeException("Subasta not found"));

        Lote lote = loteMapper.toEntity(loteDto);
        lote.setSubasta(subasta);

        // Asumiendo que LoteDto tiene un campo List<String> fotos que contiene las imágenes en base64
        if (loteDto.getFotos() != null && !loteDto.getFotos().isEmpty()) {
            List<Foto> fotos = loteDto.getFotos().stream()
                    .map(base64Image -> {
                        Foto foto = new Foto();
                        foto.setContenido(Base64.getDecoder().decode(base64Image));
                        foto.setLote(lote); // Establecer el lote asociado a cada foto
                        return foto;
                    })
                    .collect(Collectors.toList());
            lote.setFotos(fotos); // Establecer las fotos al lote
        }

        return loteRepository.save(lote);
    }


}
