package net.javasubasta.mppbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.javasubasta.mppbackend.entity.Lote;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubastaDTO {

    private  int id  ;
    private String nombre ;
    private String descripcion ;
    private Date fechaCreacion ;
    private Date fechaCierre ;
    private String estado ;
    private List<Lote> lotes ;
}
