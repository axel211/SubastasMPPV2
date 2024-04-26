package net.javasubasta.mppbackend.mapper;

import net.javasubasta.mppbackend.dto.UsuarioDTO;
import net.javasubasta.mppbackend.entity.Usuario;
import org.springframework.stereotype.Component;

@Component
public class UsuarioMapper {

    public Usuario toEntity(UsuarioDTO usuarioDto) {
        Usuario usuario = new Usuario();

        usuario.setId(usuarioDto.getId());
        usuario.setEmail(usuarioDto.getEmail());
        usuario.setPassword(usuarioDto.getPassword());
        usuario.setRol(usuarioDto.getRol());
        usuario.setPersona(usuarioDto.getPersona());

        return usuario;
    }

    public UsuarioDTO toDto(Usuario usuario) {
        UsuarioDTO usuarioDto = new UsuarioDTO();

        usuarioDto.setId(usuario.getId());
        usuarioDto.setEmail(usuario.getEmail());
        usuarioDto.setPassword(usuario.getPassword());
        usuarioDto.setRol(usuario.getRol());
        usuarioDto.setPersona(usuario.getPersona());
        return usuarioDto;
    }


}
