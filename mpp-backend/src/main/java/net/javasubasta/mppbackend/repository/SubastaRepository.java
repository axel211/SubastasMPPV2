package net.javasubasta.mppbackend.repository;

import net.javasubasta.mppbackend.dto.SubastaParticipanteDTO;
import net.javasubasta.mppbackend.entity.Lote;
import net.javasubasta.mppbackend.entity.Subasta;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public interface SubastaRepository extends JpaRepository<Subasta, Integer> {
    @Query("SELECT l FROM Lote l WHERE l.subasta.id = :subastaId")
    Page<Lote> findLotesBySubastaId(@Param("subastaId") int subastaId, Pageable pageable);


    @Query(value = "SELECT s.id, s.descripcion, s.nombre, s.estado AS estado_subasta, s.fecha_creacion, s.fecha_cierre, p.estado AS estado_participante " +
            "FROM Subasta s " +
            "LEFT JOIN Participante p ON s.id = p.id_subasta " +
            "WHERE p.id_usuario = :idUsuario", nativeQuery = true)
    List<Object[]> findSubastasByUsuarioIdNative(@Param("idUsuario") Long idUsuario);

    default List<SubastaParticipanteDTO> findSubastasByUsuarioId(Long idUsuario) {
        List<Object[]> results = findSubastasByUsuarioIdNative(idUsuario);
        List<SubastaParticipanteDTO> dtos = new ArrayList<>();

        for (Object[] result : results) {
            SubastaParticipanteDTO dto = new SubastaParticipanteDTO(
                    (Integer) result[0],     // id
                    (String) result[1],               // descripcion
                    (String) result[2],               // nombre
                    (String) result[3],               // estado_subasta
                    (Date) result[4],                 // fecha_creacion
                    (Date) result[5],                 // fecha_cierre
                    (String) result[6]                // estado_participante
            );
            dtos.add(dto);
        }

        return dtos;
    }


}
