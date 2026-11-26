
package com.pizzapetes.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "garnitures")
public class Garnitures {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_garniture")
    private Integer idGarniture;

    @Column(name = "nom", nullable = false, unique = true, length = 100)
    private String nom;

    @Column(name = "description")
    private String description;

    @Column(name = "actif")
    private Boolean actif = true;

    public Garnitures() {
    }

    public Integer getIdGarniture() {
        return idGarniture;
    }

    public void setIdGarniture(Integer idGarniture) {
        this.idGarniture = idGarniture;
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
