package net.javasubasta.mppbackend.repository;

import net.javasubasta.mppbackend.entity.Lote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LoteRepository extends JpaRepository<Lote, Integer> {
    @Query("SELECT l FROM Lote l LEFT JOIN FETCH l.fotos WHERE l.subasta.id = :subastaId")
    List<Lote> findBySubastaIdWithFotos(int subastaId);

    Lote findLoteById(int id);
    List<Lote> findBySubastaId(int subastaId);
}
