package net.javasubasta.mppbackend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Participante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int idSubasta  ;
    private Long idUsuario ;
    private String estado ; // Habilitado , Por aprobar , rechazado ,
    private LocalDateTime fechaRegistro ;
    private LocalDateTime fechaActualizacion ;
    private Long idUsuarioRevisado   ;
    private String dni ;
    private LocalDate fechaVoucher  ;
    private double monto ;
}
