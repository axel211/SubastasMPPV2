package net.javasubasta.mppbackend.service.impl;

import lombok.AllArgsConstructor;
import net.javasubasta.mppbackend.dto.OfertaDTO;
import net.javasubasta.mppbackend.dto.OfertaResponseDTO;
import net.javasubasta.mppbackend.entity.Lote;
import net.javasubasta.mppbackend.entity.Oferta;
import net.javasubasta.mppbackend.entity.Participante;
import net.javasubasta.mppbackend.entity.Usuario;
import net.javasubasta.mppbackend.repository.LoteRepository;
import net.javasubasta.mppbackend.repository.OfertaRepository;
import net.javasubasta.mppbackend.repository.ParticipanteRepository;
import net.javasubasta.mppbackend.repository.UsuarioRepository;
import net.javasubasta.mppbackend.service.OfertaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class OfertaServiceImpl implements OfertaService {

    @Autowired
    private OfertaRepository ofertaRepository;

    @Autowired
    private LoteRepository loteRepository;

    @Autowired
    private ParticipanteRepository participanteRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;


    @Override
    public Oferta realizarOferta(OfertaDTO ofertaDTO) {
        Lote lote = loteRepository.findById(ofertaDTO.getLoteId())
                .orElseThrow(() -> new RuntimeException("Lote no encontrado"));


        LocalDateTime fechaHoraCierreLocalDateTime = lote.getFechaHoraCierre();
        ZonedDateTime zonedDateTime = fechaHoraCierreLocalDateTime.atZone(ZoneId.systemDefault());
        Date fechaHoraCierreDate = Date.from(zonedDateTime.toInstant());

        // Verificar si la oferta está dentro de la fecha_hora_cierre
        Date now = new Date();
        if (now.after(fechaHoraCierreDate)) {
            throw new RuntimeException("La subasta ha cerrado. No se pueden aceptar más ofertas.");
        }


        Optional<Participante>  participante = participanteRepository.findByIdSubastaAndIdUsuario(ofertaDTO.getSubastaId(), ofertaDTO.getIdUsuario());
        if (participante == null || !"HABILITADO".equals(participante.get().getEstado())) {
            throw new RuntimeException("Participante no habilitado para esta subasta");
        }

        Optional<Oferta> ofertaMaxima = ofertaRepository.findTopByLoteIdOrderByMontoOfertaDesc(ofertaDTO.getLoteId());
        if (ofertaMaxima.isPresent() && ofertaDTO.getMontoOferta() <= ofertaMaxima.get().getMontoOferta()) {
            System.out.println(ofertaMaxima.get().getMontoOferta());
            System.out.println(ofertaDTO.getMontoOferta());
            throw new RuntimeException("El monto ofertado debe ser mayor que la oferta actual más alta");
        }

        long diffInMillies = fechaHoraCierreDate.getTime() - now.getTime();
        if (diffInMillies <= 30000) {
            LocalDateTime nuevaFechaHoraCierre = fechaHoraCierreLocalDateTime.plusSeconds(30);
            lote.setFechaHoraCierre(nuevaFechaHoraCierre);
            loteRepository.save(lote);  // Guardar el cambio en la base de datos
        }

        Oferta oferta = new Oferta();
        oferta.setIdUsuario(ofertaDTO.getIdUsuario());
        oferta.setFechaOferta(new Date());
        oferta.setTipoOferta(ofertaDTO.getTipoOferta());
        oferta.setMontoOferta(ofertaDTO.getMontoOferta());
        oferta.setLote(lote);

        return ofertaRepository.save(oferta);
    }

    public List<OfertaResponseDTO> obtenerOfertasPorLote(int loteId) {
        List<Oferta> ofertas = ofertaRepository.findByLoteId(loteId);
        return ofertas.stream().map(oferta -> {
            OfertaResponseDTO dto = new OfertaResponseDTO();
            dto.setMonto(oferta.getMontoOferta());
            dto.setFechaHora(oferta.getFechaOferta());
            Usuario usuario = usuarioRepository.findById(oferta.getIdUsuario()).orElse(null);
            dto.setUsuario(usuario != null ? usuario.getEmail() : "Usuario desconocido");
            return dto;
        }).collect(Collectors.toList());
    }

}
