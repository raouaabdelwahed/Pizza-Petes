
package com.pizzapetes.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(
    name = "prix_garnitures",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"id_taille", "id_garniture"})
    }
)
public class PrixGarnitures {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_prix_garniture")
    private Integer idPrixGarniture;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_taille", nullable = false)
    private Tailles taille;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_garniture", nullable = false)
    private Garnitures garniture;

    @Column(name = "prix", nullable = false, precision = 8, scale = 2)
    private BigDecimal prix;

    public PrixGarnitures() {
    }

    public Integer getIdPrixGarniture() {
        return idPrixGarniture;
    }

    public void setIdPrixGarniture(Integer idPrixGarniture) {
        this.idPrixGarniture = idPrixGarniture;
    }

    public Tailles getTaille() {
        return taille;
    }

    public void setTaille(Tailles taille) {
        this.taille = taille;
    }

    public Garnitures getGarniture() {
        return garniture;
    }

    public void setGarniture(Garnitures garniture) {
        this.garniture = garniture;
    }

    public BigDecimal getPrix() {
        return prix;
    }

    public void setPrix(BigDecimal prix) {
        this.prix = prix;
    }
}
