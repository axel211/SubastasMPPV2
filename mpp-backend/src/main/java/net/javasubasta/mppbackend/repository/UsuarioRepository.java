package net.javasubasta.mppbackend.repository;

import net.javasubasta.mppbackend.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
