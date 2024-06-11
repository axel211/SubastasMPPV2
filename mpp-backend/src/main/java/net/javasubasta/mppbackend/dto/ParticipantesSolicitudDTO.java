package net.javasubasta.mppbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ParticipantesSolicitudDTO {
    private int idSolicitud ;
    private String nombre ;
    private String apellidos ;
    private Date fechaRegistro ;
    private Date fechaRevision ;
    private String dni ;
    private double monto ;
    private String estado ;
}
