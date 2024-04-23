package net.javasubasta.mppbackend.repository;

import net.javasubasta.mppbackend.entity.Subasta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface SubastaRepository extends JpaRepository<Subasta, Integer> {
}
