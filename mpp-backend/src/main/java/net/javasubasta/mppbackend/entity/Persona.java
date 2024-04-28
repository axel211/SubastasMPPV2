package net.javasubasta.mppbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public  class Persona {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String tipo ;
    private String dni ;
    private String nombres;
    private String apellido ;
    private Date fechaNacimiento;
    private String sexo ;
    private String estadoCivil ;
    private String telefono ;

    private String nombreComercial ;
    private String ruc ;
    private String actividadEconomica ;

    private String departamento ;
    private String provincia ;
    private String distrito ;
    private String direccion ;
    private String numero ;
    private String piso ;

    private Boolean activo ;


    @OneToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;
}
