package net.javasubasta.mppbackend.repository;

import net.javasubasta.mppbackend.entity.Participante;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ParticipanteRepository extends JpaRepository<Participante, Integer> {
    Optional<Participante> findByIdSubastaAndIdUsuario(int idSubasta, Long idUsuario);
    List<Participante> findByIdSubastaAndEstadoIsNot(int idUsuario , String estado);
}
