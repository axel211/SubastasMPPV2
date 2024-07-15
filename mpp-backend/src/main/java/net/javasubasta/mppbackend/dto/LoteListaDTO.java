package net.javasubasta.mppbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class LoteListaDTO {
    private int id;
    private String tipo ;
    private String descripcion ;
    private double precioBase ;
    private String moneda ;
}
