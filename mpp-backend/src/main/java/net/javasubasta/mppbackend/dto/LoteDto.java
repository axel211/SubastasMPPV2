package net.javasubasta.mppbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoteDto {
    private String tipoLote;
    private String placa;
    private String nombre;
    private String descripcion;
    private double km;
    private int anio;
    private String modelo;
    private double precioBase;
    private String moneda;
    private List<String> fotos ;
}
