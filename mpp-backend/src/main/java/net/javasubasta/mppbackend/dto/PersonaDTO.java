package net.javasubasta.mppbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PersonaDTO {
    private long id;
    private String tipo ;
    private String dni ;
    private String ruc ;
    private String apellido;
    private String razonsocial ;
}
