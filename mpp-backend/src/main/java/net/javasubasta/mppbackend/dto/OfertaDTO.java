package net.javasubasta.mppbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OfertaDTO {

    private Long idUsuario;
    private String tipoOferta;
    private double montoOferta;
    private int loteId;

}
