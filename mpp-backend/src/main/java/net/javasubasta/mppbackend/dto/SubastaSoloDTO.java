package net.javasubasta.mppbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SubastaSoloDTO {
    private  int id  ;
    private String nombre ;
    private String descripcion ;
    private Date fechaCreacion ;
    private Date fechaCierre ;
    private String estado ;
}
