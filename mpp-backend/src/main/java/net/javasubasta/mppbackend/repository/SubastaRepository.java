package net.javasubasta.mppbackend.repository;

import net.javasubasta.mppbackend.entity.Lote;
import net.javasubasta.mppbackend.entity.Subasta;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface SubastaRepository extends JpaRepository<Subasta, Integer> {
    @Query("SELECT l FROM Lote l WHERE l.subasta.id = :subastaId")
    Page<Lote> findLotesBySubastaId(@Param("subastaId") int subastaId, Pageable pageable);
}
