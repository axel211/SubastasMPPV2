package net.javasubasta.mppbackend.repository;

import net.javasubasta.mppbackend.dto.ParticipantesSolicitudDTO;
import net.javasubasta.mppbackend.dto.SubastaParticipanteDTO;
import net.javasubasta.mppbackend.entity.Participante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface ParticipanteRepository extends JpaRepository<Participante, Integer> {
    Optional<Participante> findByIdSubastaAndIdUsuario(int idSubasta, Long idUsuario);
    List<Participante> findByIdSubastaAndEstadoIsNot(int idUsuario , String estado);


    @Query(value = "SELECT A.id  , P.nombres , P.apellido , A.fecha_registro , A.fecha_actualizacion , A.dni  , A.monto , A.estado " +
            "FROM Participante  A " +
            "LEFT JOIN Usuario B on A.id_usuario = B.id " +
            "LEFT JOIN Persona P on P.id = B.persona_id " +
            "WHERE A.id_subasta = :idSubasta", nativeQuery = true)
    List<Object[]> findSolicitudesBySubasta(@Param("idSubasta") int idSubasta);

    default List<ParticipantesSolicitudDTO> findSolicitudesParticipantesByIdSubasta(int idSubasta) {
        List<Object[]> results = findSolicitudesBySubasta(idSubasta);
        List<ParticipantesSolicitudDTO> dtos = new ArrayList<>();

        for (Object[] result : results) {
            ParticipantesSolicitudDTO dto = new ParticipantesSolicitudDTO();
            dto.setIdSolicitud( (Integer) result[0]);
            dto.setNombre( (String) result[1]);
            dto.setApellidos( (String) result[2]);
            dto.setFechaRegistro( (Date) result[3]);
            dto.setFechaRevision( (Date) result[4]);
            dto.setDni( (String) result[5]);
            dto.setMonto( (Double) result[6]);
            dto.setEstado( (String) result[7]);
            dtos.add(dto);
        }

        return dtos;
    }

    Participante findById (Long id);


}
