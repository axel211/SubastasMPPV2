package net.javasubasta.mppbackend.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "lote")
@DiscriminatorColumn(name = "tipo_lote" , discriminatorType = DiscriminatorType.STRING)
public abstract class Lote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column( nullable = false)
    private String descripcion;
    @Column( nullable = false)
    private double precioBase ;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subasta_id")
    private Subasta subasta;

    public Lote() {

    }

}
