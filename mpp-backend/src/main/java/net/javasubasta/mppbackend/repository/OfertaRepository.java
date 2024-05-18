package net.javasubasta.mppbackend.repository;

import net.javasubasta.mppbackend.entity.Lote;
import net.javasubasta.mppbackend.entity.Oferta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OfertaRepository extends JpaRepository<Oferta, Integer> {
    @Query("SELECT l FROM Oferta l  WHERE l.lote.id = :subastaId")
    List<Oferta> findByLotesID(int subastaId);
}
