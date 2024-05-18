package net.javasubasta.mppbackend.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "lote")
public class Lote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String tipo_lote  ;
    private String placa ;
    private String nombre ;
    private String descripcion;
    private double km  ;
    private int anio ;
    private String modelo ;


    @OneToMany(mappedBy = "lote", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Foto> fotos ;

    private String moneda ;
    private double precioBase ;
    private double precioActual;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subasta_id")
    private Subasta subasta;


    @OneToMany(mappedBy = "lote", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Oferta> ofertas ;




}
