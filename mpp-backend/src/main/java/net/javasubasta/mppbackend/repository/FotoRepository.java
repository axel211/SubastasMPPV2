package net.javasubasta.mppbackend.repository;

import net.javasubasta.mppbackend.entity.Foto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FotoRepository extends JpaRepository<Foto, Integer> {
    Page<Foto> findByLoteId(int loteId, Pageable pageable);
}
