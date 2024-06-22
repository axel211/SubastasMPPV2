package net.javasubasta.mppbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Adjudicado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;
    @ManyToOne
    @JoinColumn(name = "lote_id")
    private Lote lote ;
    @ManyToOne
    @JoinColumn(name = "ganador_id")
    private Usuario ganador ;
    private LocalDateTime fechaAdjudicacion ;
    private int IdSubasta ;
    private String nombreSubasta ;
    private String estado ;

    @Lob
    @Column(name = "pdf_data", columnDefinition = "LONGBLOB")
    private byte[] pdfData;
}
