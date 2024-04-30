package net.javasubasta.mppbackend.controller;
import java.security.MessageDigest;
import net.javasubasta.mppbackend.dto.PersonaDTO;
import net.javasubasta.mppbackend.dto.RegistroUsuarioPersonaDTO;
import net.javasubasta.mppbackend.dto.UsuarioDTO;
import net.javasubasta.mppbackend.entity.Persona;
import net.javasubasta.mppbackend.entity.Usuario;
import net.javasubasta.mppbackend.service.PersonaService;
import net.javasubasta.mppbackend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private PersonaService personaService;

    @CrossOrigin(origins = "http://localhost:3000") // Permitir solicitudes desde http://localhost:3000
    @PostMapping("/registrar")
    public ResponseEntity<String> registrarUsuario(@RequestBody RegistroUsuarioPersonaDTO dto) {
        // Registrar la persona primero
        System.out.println(dto.getPersonaDTO().getDni());
        System.out.println(dto.getUsuarioDTO().getEmail());
        UsuarioDTO usuarioDTO = usuarioService.obtenerUsuarioPorEmail(dto.getUsuarioDTO().getEmail());
        System.out.println(dto.getUsuarioDTO().getEmail());
        if (usuarioDTO != null ) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "usuario registrado en la bd email");
            System.out.println("Usuario registrado en la bd por email");
            return ResponseEntity.badRequest().body(error.toString());
        }
        System.out.println(dto.getPersonaDTO().getDni());
        System.out.println(dto.getPersonaDTO().getRuc());
        if(dto.getPersonaDTO().getDni()!=null) {
            System.out.println(dto.getPersonaDTO().getDni());
            PersonaDTO personaValidar = personaService.buscarPersonaPorDNI(dto.getPersonaDTO().getDni());
            if(personaValidar!=null) {
                Map<String, Object> error = new HashMap<>();
                error.put("error", "Usuario registrado en la bd dni");
                System.out.println("Usuario registrado en la bd por dni");
                return ResponseEntity.badRequest().body(error.toString());
            }
        }
        System.out.println(dto.getPersonaDTO().getDni());
        System.out.println(dto.getPersonaDTO().getRuc());
        if(dto.getPersonaDTO().getRuc()!=null) {
            PersonaDTO personaValidar2 = personaService.buscarPersonaPorRuc(dto.getPersonaDTO().getRuc());
            if(personaValidar2!=null) {
                Map<String, Object> error = new HashMap<>();
                error.put("error", "Usuario registrado en la bd ruc");
                System.out.println("");
                System.out.println("Usuario registrado en la bd por ruc");
                return ResponseEntity.badRequest().body(error.toString());
            }
        }
        System.out.println(dto.getPersonaDTO().getDni());
        System.out.println(dto.getPersonaDTO().getRuc());
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

    @CrossOrigin(origins = "http://localhost:3000") // Permitir solicitudes desde http://localhost:3000
    @PostMapping("/autenticar")
    public ResponseEntity<Map<String, Object>> autenticar(@RequestBody UsuarioDTO usuarioDTO) {
        UsuarioDTO usuario = usuarioService.obtenerUsuarioPorEmail(usuarioDTO.getEmail());
        if (usuario == null || !usuario.getPassword().equals(usuarioDTO.getPassword())) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Usuario no encontrado o contraseña incorrecta");
            return ResponseEntity.badRequest().body(error);
        }
        String token = generarToken(usuario);
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("usuario", usuario); // Asumiendo que quieres devolver toda la info del usuario
        return ResponseEntity.ok(response);
    }


    private static final String SECRET_KEY = "clave_secreta_para_generar_el_token";
    public static String generarToken(UsuarioDTO user) {
        // Concatenar el ID del usuario y la clave secreta
        String dataToHash = user.getId() + SECRET_KEY;

        try {
            // Crear un objeto MessageDigest para generar el hash
            MessageDigest digest = MessageDigest.getInstance("SHA-256");

            // Obtener el hash de los datos concatenados
            byte[] hashedBytes = digest.digest(dataToHash.getBytes());

            // Convertir el hash a una cadena hexadecimal
            StringBuilder hexString = new StringBuilder();
            for (byte b : hashedBytes) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }

            // Devolver el token generado
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            // Manejar la excepción en caso de que el algoritmo no esté disponible
            e.printStackTrace();
            return null;
        }
    }

}
