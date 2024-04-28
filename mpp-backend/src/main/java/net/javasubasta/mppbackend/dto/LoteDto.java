package net.javasubasta.mppbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoteDto {
    private String descripcion ;
    private double precioBase ;
    private String placa ;
    private String tipo ;
    private String combustible ;
    private String anio ;
    private String condicion ;
    private String color ;
    private String transmision ;
    private String cilindrajeMotor;
    private double kilometraje ;
    private int puertas ;
}
