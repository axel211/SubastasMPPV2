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
@DiscriminatorValue("inmueble")
@Table(name = "lotes_inmubles")
public class LoteInmueble extends Lote{
    private String direccion ;
    private String descripcion ;
}
