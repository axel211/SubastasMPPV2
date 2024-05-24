package net.javasubasta.mppbackend.repository;

import net.javasubasta.mppbackend.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findFirstByEmail(String email);
    Optional<Usuario> findById(Long id);
}
