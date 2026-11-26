
package com.pizzapetes.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(
    name = "prix_pizza",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"id_taille", "id_pate"})
    }
)
public class PrixPizza {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_prix")
    private Integer idPrix;

    @ManyToOne
    @JoinColumn(name = "id_taille", nullable = false)
    private Tailles taille;

    @ManyToOne
    @JoinColumn(name = "id_pate", nullable = false)
    private TypesPate pate;

    @Column(name = "prix_base", nullable = false, precision = 8, scale = 2)
    private BigDecimal prixBase;

    public PrixPizza() {
    }

    public Integer getIdPrix() {
        return idPrix;
    }

    public void setIdPrix(Integer idPrix) {
        this.idPrix = idPrix;
    }

    public Tailles getTaille() {
        return taille;
    }

    public void setTaille(Tailles taille) {
        this.taille = taille;
    }

    public TypesPate getPate() {
        return pate;
    }

    public void setPate(TypesPate pate) {
        this.pate = pate;
    }

    public BigDecimal getPrixBase() {
        return prixBase;
    }

    public void setPrixBase(BigDecimal prixBase) {
        this.prixBase = prixBase;
    }
}
