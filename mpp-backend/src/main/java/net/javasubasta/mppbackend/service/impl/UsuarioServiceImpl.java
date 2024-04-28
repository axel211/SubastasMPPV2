package net.javasubasta.mppbackend.service.impl;

import lombok.AllArgsConstructor;
import net.javasubasta.mppbackend.dto.UsuarioDTO;
import net.javasubasta.mppbackend.entity.Usuario;
import net.javasubasta.mppbackend.mapper.UsuarioMapper;
import net.javasubasta.mppbackend.repository.UsuarioRepository;
import net.javasubasta.mppbackend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;


    @Autowired
    private UsuarioMapper usuarioMapper;

    @Override
    public UsuarioDTO registrarUsuario(UsuarioDTO usuarioDto) {
        Usuario usuario = usuarioMapper.toEntity(usuarioDto) ;
        usuario = usuarioRepository.save(usuario);
        return usuarioMapper.toDto(usuario) ;
    }

    @Override
    public UsuarioDTO obtenerUsuarioPorEmail(String email) {
        Usuario usuario = new Usuario() ;
        usuario = usuarioRepository.findByEmail(email) ;
        return usuarioMapper.toDto(usuario) ;
    }


}
