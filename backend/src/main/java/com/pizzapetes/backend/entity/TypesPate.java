package com.pizzapetes.backend.entity;
import jakarta.persistence.*;

@Entity
@Table(name = "types_pate")
public class TypesPate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pate")
    private Integer idPate;

    @Column(name = "nom", nullable = false, unique = true, length = 50)
    private String nom;

    @Column(name = "description")
    private String description;

    @Column(name = "actif")
    private Boolean actif = true;

    public TypesPate() {
    }

    public Integer getIdPate() {
        return idPate;
    }

    public void setIdPate(Integer idPate) {
        this.idPate = idPate;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getActif() {
        return actif;
    }

    public void setActif(Boolean actif) {
        this.actif = actif;
    }
}
