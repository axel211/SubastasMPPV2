package net.javasubasta.mppbackend.repository;

import net.javasubasta.mppbackend.dto.PersonaDTO;
import net.javasubasta.mppbackend.entity.Persona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PersonaRepository extends JpaRepository<Persona, Long> {
    Persona findFirstByDni(String dni);
    Persona findFirstByRuc(String ruc);

    @Query("SELECT p FROM Persona p WHERE p.ruc!='' and p.ruc = :ruc")
    Persona findRUC( @Param("ruc") String ruc);


    @Query("SELECT p FROM Persona p WHERE p.dni!='' and p.ruc = :dni")
    Persona findDNI(@Param("dni") String dni);
}
