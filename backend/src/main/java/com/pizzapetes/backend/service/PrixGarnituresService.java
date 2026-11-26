
package com.pizzapetes.backend.service;

import com.pizzapetes.backend.entity.PrixGarnitures;
import com.pizzapetes.backend.entity.Tailles;
import com.pizzapetes.backend.entity.Garnitures;

import com.pizzapetes.backend.repository.PrixGarnituresRepository;
import com.pizzapetes.backend.repository.TaillesRepository;
import com.pizzapetes.backend.repository.GarnituresRepository;

import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.List;

@Service
public class PrixGarnituresService {

    private final PrixGarnituresRepository prixGarnituresRepository;
    private final TaillesRepository taillesRepository;
    private final GarnituresRepository garnituresRepository;

    public PrixGarnituresService(
            PrixGarnituresRepository prixGarnituresRepository,
            TaillesRepository taillesRepository,
            GarnituresRepository garnituresRepository) {

        this.prixGarnituresRepository = prixGarnituresRepository;
        this.taillesRepository = taillesRepository;
        this.garnituresRepository = garnituresRepository;
    }

    // Afficher tous les prix
    public List<PrixGarnitures> getAllPrixGarnitures() {
        return prixGarnituresRepository.findAll();
    }

    // Ajouter un prix de garniture
    public PrixGarnitures ajouterPrixGarniture(PrixGarnitures nouveauPrix) {

        verifierPrix(nouveauPrix);

        Integer idTaille = nouveauPrix.getTaille().getIdTaille();
        Integer idGarniture = nouveauPrix.getGarniture().getIdGarniture();

        Tailles taille = taillesRepository.findById(idTaille)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Taille introuvable"));

        Garnitures garniture = garnituresRepository.findById(idGarniture)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Garniture introuvable"));

        nouveauPrix.setTaille(taille);
        nouveauPrix.setGarniture(garniture);

        return prixGarnituresRepository.save(nouveauPrix);
    }

    // Modifier un prix
    public PrixGarnitures modifierPrixGarniture(
            Integer id, PrixGarnitures nouveauPrix) {

        verifierPrix(nouveauPrix);

        PrixGarnitures prix = prixGarnituresRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Prix introuvable"));

        Integer idTaille = nouveauPrix.getTaille().getIdTaille();
        Integer idGarniture = nouveauPrix.getGarniture().getIdGarniture();

        Tailles taille = taillesRepository.findById(idTaille)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Taille introuvable"));

        Garnitures garniture = garnituresRepository.findById(idGarniture)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Garniture introuvable"));

        prix.setTaille(taille);
        prix.setGarniture(garniture);
        prix.setPrix(nouveauPrix.getPrix());

        return prixGarnituresRepository.save(prix);
    }

    // Supprimer un prix
    public void supprimerPrixGarniture(Integer id) {

        PrixGarnitures prix = prixGarnituresRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Prix introuvable"));

        prixGarnituresRepository.delete(prix);
    }

    // Vérifier les données du prix
    private void verifierPrix(PrixGarnitures prix) {

        if (prix.getTaille() == null
                || prix.getTaille().getIdTaille() == null
                || prix.getGarniture() == null
                || prix.getGarniture().getIdGarniture() == null
                || prix.getPrix() == null
                || prix.getPrix().compareTo(BigDecimal.ZERO) <= 0) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Veuillez fournir une taille, une garniture et un prix valide");
        }
    }
}

