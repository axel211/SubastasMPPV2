package net.javasubasta.mppbackend.repository;

import net.javasubasta.mppbackend.dto.PersonaDTO;
import net.javasubasta.mppbackend.entity.Persona;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonaRepository extends JpaRepository<Persona, Long> {
    Persona findFirstByDni(String dni);
    Persona findFirstByRuc(String ruc);
}
