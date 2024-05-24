package net.javasubasta.mppbackend.repository;

import net.javasubasta.mppbackend.entity.Participante;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParticipanteRepository extends JpaRepository<Participante, Integer> {
    Participante findByIdSubastaAndIdUsuario(int idSubasta, Long idUsuario);
}
