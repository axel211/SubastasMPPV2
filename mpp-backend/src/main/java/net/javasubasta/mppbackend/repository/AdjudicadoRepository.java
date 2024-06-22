package net.javasubasta.mppbackend.repository;

import net.javasubasta.mppbackend.entity.Adjudicado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface AdjudicadoRepository extends JpaRepository<Adjudicado, Long> {
    List<Adjudicado> findAll();
    List<Adjudicado> findByGanadorId(Long usuarioId);
}
