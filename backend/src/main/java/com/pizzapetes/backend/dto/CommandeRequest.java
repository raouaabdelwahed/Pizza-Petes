package com.pizzapetes.backend.dto;

import java.util.ArrayList;
import java.util.List;

public class CommandeRequest {

    private String nomClient;
    private String telephone;
    private String adresse;
    private List<LigneRequest> lignes = new ArrayList<>();

    public CommandeRequest() {
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

    public List<LigneRequest> getLignes() {
        return lignes;
    }

    public void setLignes(List<LigneRequest> lignes) {
        this.lignes = lignes;
    }

    public static class LigneRequest {

        private Integer idPrix;
        private Integer quantite;
        private List<Integer> idPrixGarnitures = new ArrayList<>();

        public LigneRequest() {
        }

        public Integer getIdPrix() {
            return idPrix;
        }

        public void setIdPrix(Integer idPrix) {
            this.idPrix = idPrix;
        }

        public Integer getQuantite() {
            return quantite;
        }

        public void setQuantite(Integer quantite) {
            this.quantite = quantite;
        }

        public List<Integer> getIdPrixGarnitures() {
            return idPrixGarnitures;
        }

        public void setIdPrixGarnitures(List<Integer> idPrixGarnitures) {
            this.idPrixGarnitures = idPrixGarnitures;
        }
    }
}
