package net.javasubasta.mppbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdjudicadoDTO {
    private Long idLote;
    private String tituloLote;
    private int idSubasta;
    private String nombreSubasta;
    private String nombresAdjudicado;
    private String apellidosAdjudicado;
    private LocalDateTime fechaAdjudicacion;
    private String estado;
}
