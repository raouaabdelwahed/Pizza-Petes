
package com.pizzapetes.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "commandes")
public class Commande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_commande")
    private Integer idCommande;

    @Column(name = "date_commande", nullable = false)
    private LocalDateTime dateCommande;

    @Column(name = "nom_client", nullable = false, length = 100)
    private String nomClient;

    @Column(name = "telephone", nullable = false, length = 20)
    private String telephone;

    @Column(name = "adresse", nullable = false, length = 255)
    private String adresse;

    @Column(name = "total", nullable = false, precision = 10, scale = 2)
    private BigDecimal total;

    @Column(name = "statut", nullable = false, length = 30)
    private String statut;

    @OneToMany(
        mappedBy = "commande",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<LigneCommande> lignes = new ArrayList<>();

    public Commande() {
    }

    @PrePersist
    public void avantEnregistrement() {
        if (dateCommande == null) {
            dateCommande = LocalDateTime.now();
        }
        if (statut == null) {
            statut = "EN_ATTENTE";
        }
    }

    public Integer getIdCommande() {
        return idCommande;
    }

    public void setIdCommande(Integer idCommande) {
        this.idCommande = idCommande;
    }

    public LocalDateTime getDateCommande() {
        return dateCommande;
    }

    public void setDateCommande(LocalDateTime dateCommande) {
        this.dateCommande = dateCommande;
    }

    public String getNomClient() {
        return nomClient;
    }

    public void setNomClient(String nomClient) {
        this.nomClient = nomClient;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public List<LigneCommande> getLignes() {
        return lignes;
    }

    public void setLignes(List<LigneCommande> lignes) {
        this.lignes = lignes;
    }

    public void ajouterLigne(LigneCommande ligne) {
        lignes.add(ligne);
        ligne.setCommande(this);
    }
}
