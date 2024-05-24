package net.javasubasta.mppbackend.service.impl;

import lombok.AllArgsConstructor;
import net.javasubasta.mppbackend.dto.PersonaDTO;
import net.javasubasta.mppbackend.dto.RegistroUsuarioPersonaDTO;
import net.javasubasta.mppbackend.dto.UsuarioDTO;
import net.javasubasta.mppbackend.entity.Persona;
import net.javasubasta.mppbackend.entity.Usuario;
import net.javasubasta.mppbackend.mapper.UsuarioMapper;
import net.javasubasta.mppbackend.repository.UsuarioRepository;
import net.javasubasta.mppbackend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

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
        usuario = usuarioRepository.findFirstByEmail(email) ;
        if(usuario == null) return null ;
        return usuarioMapper.toDto(usuario) ;
    }

    @Override
    public RegistroUsuarioPersonaDTO obtenerRegistroUsuarioPersonaDTO(Long id) {
        Optional<Usuario> usuario = Optional.of(new Usuario());
        usuario = usuarioRepository.findById(id) ;

        UsuarioDTO usuarioDatos  = new UsuarioDTO() ;
        usuarioDatos.setId(usuario.get().getId()) ;
        usuarioDatos.setEmail(usuario.get().getEmail()) ;
        usuarioDatos.setRol(usuario.get().getRol()) ;

        PersonaDTO personaDatos = new PersonaDTO() ;
        personaDatos.setNombres(usuario.get().getPersona().getNombres()) ;
        personaDatos.setApellido(usuario.get().getPersona().getApellido()) ;
        personaDatos.setTelefono(usuario.get().getPersona().getTelefono()) ;
        personaDatos.setNumero(usuario.get().getPersona().getNumero()) ;
        personaDatos.setDireccion(usuario.get().getPersona().getDireccion()) ;


        RegistroUsuarioPersonaDTO registroUsuarioPersonaDTO = new RegistroUsuarioPersonaDTO() ;

        registroUsuarioPersonaDTO.setPersonaDTO(personaDatos);
        registroUsuarioPersonaDTO.setUsuarioDTO(usuarioDatos);
        return registroUsuarioPersonaDTO;
    }


}
