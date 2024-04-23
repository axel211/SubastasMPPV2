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
@Table(name = "Persona")
public abstract class Persona {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id  ;
    @Column(name = "direccion")
    private String direccion;
    @Column(name = "telefono")
    private String telefono;
    @Column(name = "fechaNacimiento")
    private Date fechaNacimiento;
    @Column(name = "sexo")
    private String sexo ;
    @Column(name = "departamento")
    private String departamento ;
    @Column(name = "provincia")
    private String provincia;
    @Column(name = "distrito")
    private String distrito;
    @Column(name = "foto")
    private byte[] foto;
    @Column(name = "activo")
    private Boolean activo ;
    @Column(name = "habilitadoParticipar")
    private Boolean habilitadoParticipar;
}
