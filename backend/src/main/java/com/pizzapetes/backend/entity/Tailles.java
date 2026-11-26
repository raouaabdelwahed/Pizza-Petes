package com.pizzapetes.backend.entity;
import jakarta.persistence.*;

@Entity
@Table(name = "tailles")
public class Tailles {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_taille")
    private Integer idTaille;

    @Column(name = "nom", nullable = false, unique = true, length = 50)
    private String nom;

    @Column(name = "diametre")
    private Integer diametre;

    @Column(name = "actif")
    private Boolean actif = true;

    public Tailles() {
    }

    public Integer getIdTaille() {
        return idTaille;
    }

    public void setIdTaille(Integer idTaille) {
        this.idTaille = idTaille;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Integer getDiametre() {
        return diametre;
    }

    public void setDiametre(Integer diametre) {
        this.diametre = diametre;
    }

    public Boolean getActif() {
        return actif;
    }

    public void setActif(Boolean actif) {
        this.actif = actif;
    }
}
