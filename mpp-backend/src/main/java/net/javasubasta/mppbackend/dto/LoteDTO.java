package net.javasubasta.mppbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoteDTO {
    private String tipoLote;
    private String placa;
    private String nombre;
    private String descripcion;
    private double km;
    private int anio;
    private String modelo;
    private String moneda;
    private double precioBase;
    private List<MultipartFile> imagenes;

    private LocalDateTime fechaHoraCierre ;
    private String estado;
}
