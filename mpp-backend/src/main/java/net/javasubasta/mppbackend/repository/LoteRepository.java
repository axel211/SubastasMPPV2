package net.javasubasta.mppbackend.repository;

import net.javasubasta.mppbackend.entity.Lote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoteRepository extends JpaRepository<Lote, Integer> {
}
