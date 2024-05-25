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
import java.util.Optional;

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
        Lote lote = loteRepository.findById(ofertaDTO.getLoteId())
                .orElseThrow(() -> new RuntimeException("Lote no encontrado"));

        Participante participante = participanteRepository.findByIdSubastaAndIdUsuario(ofertaDTO.getSubastaId(), ofertaDTO.getIdUsuario());
        if (participante == null || !"HABILITADO".equals(participante.getEstado())) {
            throw new RuntimeException("Participante no habilitado para esta subasta");
        }

        Optional<Oferta> ofertaMaxima = ofertaRepository.findTopByLoteIdOrderByMontoOfertaDesc(ofertaDTO.getLoteId());
        if (ofertaMaxima.isPresent() && ofertaDTO.getMontoOferta() <= ofertaMaxima.get().getMontoOferta()) {
            throw new RuntimeException("El monto ofertado debe ser mayor que la oferta actual más alta");
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
