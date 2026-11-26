
package com.pizzapetes.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "lignes_commande")
public class LigneCommande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ligne")
    private Integer idLigne;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_commande", nullable = false)
    private Commande commande;

    @ManyToOne
    @JoinColumn(name = "id_prix", nullable = false)
    private PrixPizza prixPizza;

    @Column(name = "quantite", nullable = false)
    private Integer quantite;

    @Column(name = "prix_unitaire", nullable = false, precision = 10, scale = 2)
    private BigDecimal prixUnitaire;

    @Column(name = "sous_total", nullable = false, precision = 10, scale = 2)
    private BigDecimal sousTotal;

    @ManyToMany
    @JoinTable(
        name = "ligne_commande_garnitures",
        joinColumns = @JoinColumn(name = "id_ligne"),
        inverseJoinColumns = @JoinColumn(name = "id_prix_garniture")
    )
    private List<PrixGarnitures> garnitures = new ArrayList<>();

    public LigneCommande() {
    }

    public Integer getIdLigne() {
        return idLigne;
    }

    public void setIdLigne(Integer idLigne) {
        this.idLigne = idLigne;
    }

    public Commande getCommande() {
        return commande;
    }

    public void setCommande(Commande commande) {
        this.commande = commande;
    }

    public PrixPizza getPrixPizza() {
        return prixPizza;
    }

    public void setPrixPizza(PrixPizza prixPizza) {
        this.prixPizza = prixPizza;
    }

    public Integer getQuantite() {
        return quantite;
    }

    public void setQuantite(Integer quantite) {
        this.quantite = quantite;
    }

    public BigDecimal getPrixUnitaire() {
        return prixUnitaire;
    }

    public void setPrixUnitaire(BigDecimal prixUnitaire) {
        this.prixUnitaire = prixUnitaire;
    }

    public BigDecimal getSousTotal() {
        return sousTotal;
    }

    public void setSousTotal(BigDecimal sousTotal) {
        this.sousTotal = sousTotal;
    }

    public List<PrixGarnitures> getGarnitures() {
        return garnitures;
    }

    public void setGarnitures(List<PrixGarnitures> garnitures) {
        this.garnitures = garnitures;
    }
}
