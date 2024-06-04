package net.javasubasta.mppbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table (name = "subasta")
public class Subasta {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private  int id  ;
    @Column(nullable = false)
    private String nombre ;

    @Column(nullable = false)
    private String descripcion ;



    @Column(nullable = false)
    private Date fechaCreacion ;

    @Column(nullable = false)
    private Date fechaCierre ;

    @Column(nullable = false)
    private String estado ;


    @OneToMany(mappedBy = "subasta" , cascade = CascadeType.ALL , fetch = FetchType.LAZY)
    private List<Lote> lotes ;

    
}
