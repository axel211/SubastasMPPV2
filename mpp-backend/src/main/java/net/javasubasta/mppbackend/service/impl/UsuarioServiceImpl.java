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
        usuarioDatos.setEmail(usuario.get().getEmail().toUpperCase()) ;
        usuarioDatos.setRol(usuario.get().getRol().toUpperCase()) ;

        PersonaDTO personaDatos = new PersonaDTO() ;
        personaDatos.setApellido(usuario.get().getPersona().getApellido()) ;
        personaDatos.setTelefono(usuario.get().getPersona().getTelefono()) ;
        personaDatos.setNumero(usuario.get().getPersona().getNumero()) ;
        personaDatos.setDireccion(usuario.get().getPersona().getDireccion()) ;
        personaDatos.setNombres(usuario.get().getPersona().getNombres()) ;
        personaDatos.setApellido(usuario.get().getPersona().getApellido()) ;
        personaDatos.setTelefono(usuario.get().getPersona().getTelefono()) ;
        personaDatos.setNumero(usuario.get().getPersona().getNumero()) ;
        personaDatos.setDireccion(usuario.get().getPersona().getDireccion()) ;
        personaDatos.setDepartamento(usuario.get().getPersona().getDepartamento()) ;
        personaDatos.setProvincia(usuario.get().getPersona().getProvincia()) ;
        personaDatos.setDistrito(usuario.get().getPersona().getDistrito()) ;
        personaDatos.setDni(usuario.get().getPersona().getDni()) ;
        personaDatos.setRuc(usuario.get().getPersona().getRuc()) ;
        personaDatos.setTelefono(usuario.get().getPersona().getTelefono()) ;
        personaDatos.setTipo(usuario.get().getPersona().getTipo()) ;


        RegistroUsuarioPersonaDTO registroUsuarioPersonaDTO = new RegistroUsuarioPersonaDTO() ;

        registroUsuarioPersonaDTO.setPersonaDTO(personaDatos);
        registroUsuarioPersonaDTO.setUsuarioDTO(usuarioDatos);
        return registroUsuarioPersonaDTO;
    }

    public UsuarioDTO obtenerUsuarioPorId(Long id) throws Exception {
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(id);
        if (usuarioOptional.isPresent()) {
            Usuario usuario = usuarioOptional.get();

            UsuarioDTO usuarioDatos  = new UsuarioDTO() ;
            usuarioDatos.setId(usuario.getId()) ;
            usuarioDatos.setEmail(usuario.getEmail().toUpperCase()) ;
            usuarioDatos.setRol(usuario.getRol().toUpperCase()) ;

            Persona personaDatos = new Persona() ;
            personaDatos.setNombres(usuario.getPersona().getNombres().toUpperCase()) ;
            personaDatos.setApellido(usuario.getPersona().getApellido().toUpperCase()) ;
            personaDatos.setTelefono(usuario.getPersona().getTelefono().toUpperCase()) ;
            personaDatos.setNumero(usuario.getPersona().getNumero().toUpperCase()) ;
            personaDatos.setDireccion(usuario.getPersona().getDireccion().toUpperCase()) ;
            personaDatos.setDepartamento(usuario.getPersona().getDepartamento().toUpperCase()) ;
            personaDatos.setProvincia(usuario.getPersona().getProvincia().toUpperCase()) ;
            personaDatos.setDistrito(usuario.getPersona().getDistrito().toUpperCase()) ;
            personaDatos.setDni(usuario.getPersona().getDni().toUpperCase()) ;
            personaDatos.setRuc(usuario.getPersona().getRuc().toUpperCase()) ;
            personaDatos.setTelefono(usuario.getPersona().getTelefono().toUpperCase()) ;
            personaDatos.setTipo(usuario.getPersona().getTipo().toUpperCase()) ;
            usuarioDatos.setPersona(personaDatos);

            return usuarioDatos ;
        } else {
            throw new Exception("Usuario no encontrado");
        }
    }

}
