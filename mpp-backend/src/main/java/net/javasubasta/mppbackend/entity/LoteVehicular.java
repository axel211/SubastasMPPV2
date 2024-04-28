package net.javasubasta.mppbackend.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@DiscriminatorValue("vehicular")
@Table(name = "lotes_vehiculares")
public class LoteVehicular extends Lote{
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
