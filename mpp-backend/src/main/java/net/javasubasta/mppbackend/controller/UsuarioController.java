package net.javasubasta.mppbackend.controller;

import net.javasubasta.mppbackend.dto.PersonaDTO;
import net.javasubasta.mppbackend.dto.RegistroUsuarioPersonaDTO;
import net.javasubasta.mppbackend.dto.UsuarioDTO;
import net.javasubasta.mppbackend.entity.Persona;
import net.javasubasta.mppbackend.entity.Usuario;
import net.javasubasta.mppbackend.service.PersonaService;
import net.javasubasta.mppbackend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private PersonaService personaService;

    @PostMapping("/registrar")
    public ResponseEntity<String> registrarUsuario(@RequestBody RegistroUsuarioPersonaDTO dto) {
        // Registrar la persona primero
        PersonaDTO personaDTO = personaService.registrarPersona(dto.getPersonaDTO());

        // Crear un nuevo usuario
        UsuarioDTO usuario = new UsuarioDTO();
        usuario.setEmail(dto.getUsuarioDTO().getEmail());
        usuario.setPassword(dto.getUsuarioDTO().getPassword());
        usuario.setRol(dto.getUsuarioDTO().getRol());
        // Establecer el ID de la persona en el campo persona_id
        System.out.println(personaDTO.getId());
        Persona persona = new Persona();
        persona.setId(personaDTO.getId());
        usuario.setPersona(persona);

        // Guardar el usuario en la base de datos
        usuarioService.registrarUsuario(usuario);

        return ResponseEntity.ok("Usuario y persona registrados correctamente");
    }
}
