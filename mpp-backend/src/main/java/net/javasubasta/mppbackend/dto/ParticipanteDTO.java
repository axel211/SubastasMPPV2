package net.javasubasta.mppbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ParticipanteDTO {
    private int idSubasta ;
    private Long idUsuario ;
    private String dni ;
    private LocalDate fechaVoucher ;
    private double monto ;
}
