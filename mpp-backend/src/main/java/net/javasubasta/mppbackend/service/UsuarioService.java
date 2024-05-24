package net.javasubasta.mppbackend.service;


import net.javasubasta.mppbackend.dto.RegistroUsuarioPersonaDTO;
import net.javasubasta.mppbackend.dto.UsuarioDTO;

public interface UsuarioService  {
    UsuarioDTO registrarUsuario(UsuarioDTO usuarioDto);
    UsuarioDTO obtenerUsuarioPorEmail(String email);
    RegistroUsuarioPersonaDTO obtenerRegistroUsuarioPersonaDTO(Long id);
}
