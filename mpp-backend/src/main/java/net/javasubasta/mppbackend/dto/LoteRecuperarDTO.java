package net.javasubasta.mppbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.javasubasta.mppbackend.entity.Oferta;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoteRecuperarDTO {
    private int id ;
    private String tipoLote;
    private String placa;
    private String nombre;
    private String descripcion;
    private double km;
    private int anio;
    private String modelo;
    private String moneda;
    private double precioBase;

    private List<byte[]> imagenes;

    private LocalDateTime fechaHoraCierre;
    private int subastaId ;

    private FotoPageDTO fotoPage ;
}
