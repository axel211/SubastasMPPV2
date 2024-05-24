package net.javasubasta.mppbackend.controller;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;
import net.javasubasta.mppbackend.dto.LoteRecuperarDTO;
import net.javasubasta.mppbackend.dto.PersonaDTO;
import net.javasubasta.mppbackend.dto.RegistroUsuarioPersonaDTO;
import net.javasubasta.mppbackend.dto.UsuarioDTO;
import net.javasubasta.mppbackend.entity.Persona;
import net.javasubasta.mppbackend.service.PersonaService;
import net.javasubasta.mppbackend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private PersonaService personaService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/registrar")
    public ResponseEntity<Map<String, Object>> registrarUsuario(@RequestBody RegistroUsuarioPersonaDTO dto) {
        Map<String, Object> response = new HashMap<>();

        // Validar si el usuario ya existe por email
        UsuarioDTO usuarioExistente = usuarioService.obtenerUsuarioPorEmail(dto.getUsuarioDTO().getEmail());
        if (usuarioExistente != null) {
            response.put("error", "Usuario ya registrado con este email");
            return ResponseEntity.badRequest().body(response);
        }

        // Validar si la persona ya existe por DNI
        if (dto.getPersonaDTO().getDni() != null) {
            PersonaDTO personaExistenteDNI = personaService.buscarPersonaPorDNI(dto.getPersonaDTO().getDni());
            if (personaExistenteDNI != null) {
                response.put("error", "Persona ya registrada con este DNI");
                return ResponseEntity.badRequest().body(response);
            }
        }

        // Validar si la persona ya existe por RUC
        if (dto.getPersonaDTO().getRuc() != null) {
            PersonaDTO personaExistenteRUC = personaService.buscarPersonaPorRuc(dto.getPersonaDTO().getRuc());
            if (personaExistenteRUC != null) {
                response.put("error", "Persona ya registrada con este RUC");
                return ResponseEntity.badRequest().body(response);
            }
        }

        // Registrar la persona
        PersonaDTO personaDTO = personaService.registrarPersona(dto.getPersonaDTO());

        // Crear y registrar el usuario
        UsuarioDTO usuario = new UsuarioDTO();
        usuario.setEmail(dto.getUsuarioDTO().getEmail());
        usuario.setPassword(dto.getUsuarioDTO().getPassword());  // Considera encriptar la contraseña aquí
        usuario.setRol(dto.getUsuarioDTO().getRol());

        Persona persona = new Persona();
        persona.setId(personaDTO.getId());
        usuario.setPersona(persona);

        usuarioService.registrarUsuario(usuario);

        response.put("message", "Usuario y persona registrados correctamente");
        return ResponseEntity.ok(response);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/autenticar")
    public ResponseEntity<Map<String, Object>> autenticar(@RequestBody UsuarioDTO usuarioDTO) {
        Map<String, Object> response = new HashMap<>();

        UsuarioDTO usuario = usuarioService.obtenerUsuarioPorEmail(usuarioDTO.getEmail());
        if (usuario == null || !usuario.getPassword().equals(usuarioDTO.getPassword())) {  // Mejorar con BCrypt
            response.put("error", "Usuario no encontrado o contraseña incorrecta");
            return ResponseEntity.badRequest().body(response);
        }

        String token = generarToken(usuario);
        response.put("token", token);
        response.put("usuario", usuario);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/usuario/{id}")
    public RegistroUsuarioPersonaDTO obtenerUsuarioPorID(@PathVariable Long id) throws Exception {
        RegistroUsuarioPersonaDTO usuario = usuarioService.obtenerRegistroUsuarioPersonaDTO(id);
        return usuario ;
    }


    private static final String SECRET_KEY = "clave_secreta_para_generar_el_token";

    public static String generarToken(UsuarioDTO user) {
        String dataToHash = user.getId() + SECRET_KEY;

        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashedBytes = digest.digest(dataToHash.getBytes());

            StringBuilder hexString = new StringBuilder();
            for (byte b : hashedBytes) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
    }
}
