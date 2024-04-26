package net.javasubasta.mppbackend.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.javasubasta.mppbackend.entity.Persona;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioDTO {

    private Long id;
    private String email ;
    private String password ;
    private String rol ;
    private Persona persona ;

}

