package net.javasubasta.mppbackend.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegistroUsuarioPersonaDTO {
    private UsuarioDTO usuarioDTO;
    private PersonaDTO personaDTO;
}
