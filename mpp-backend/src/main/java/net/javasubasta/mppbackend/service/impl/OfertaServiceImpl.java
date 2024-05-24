package net.javasubasta.mppbackend.service.impl;

import lombok.AllArgsConstructor;
import net.javasubasta.mppbackend.dto.OfertaDTO;
import net.javasubasta.mppbackend.entity.Lote;
import net.javasubasta.mppbackend.entity.Oferta;
import net.javasubasta.mppbackend.entity.Participante;
import net.javasubasta.mppbackend.repository.LoteRepository;
import net.javasubasta.mppbackend.repository.OfertaRepository;
import net.javasubasta.mppbackend.repository.ParticipanteRepository;
import net.javasubasta.mppbackend.service.OfertaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@AllArgsConstructor
public class OfertaServiceImpl implements OfertaService {

    @Autowired
    private OfertaRepository ofertaRepository;

    @Autowired
    private LoteRepository loteRepository;

    @Autowired
    private ParticipanteRepository participanteRepository;


    @Override
    public Oferta realizarOferta(OfertaDTO ofertaDTO) {
        Lote lote  = loteRepository.findLoteById(ofertaDTO.getLoteId()) ;

        Participante participante = participanteRepository.findByIdSubastaAndIdUsuario(lote.getId() , ofertaDTO.getIdUsuario()) ;

        if(participante == null || !"HABILITADO".equals(participante.getEstado())) {
            throw new RuntimeException("Participante no habilitado para esta subasta");
        }

        Oferta oferta = new Oferta();
        oferta.setIdUsuario(ofertaDTO.getIdUsuario());
        oferta.setFechaOferta(new Date());
        oferta.setTipoOferta(ofertaDTO.getTipoOferta());
        oferta.setMontoOferta(ofertaDTO.getMontoOferta());
        oferta.setLote(lote);
        return ofertaRepository.save(oferta);
    }
}
