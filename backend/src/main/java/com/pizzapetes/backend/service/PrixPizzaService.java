
package com.pizzapetes.backend.service;

import com.pizzapetes.backend.entity.PrixPizza;
import com.pizzapetes.backend.repository.PrixPizzaRepository;

import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class PrixPizzaService {

    private final PrixPizzaRepository prixPizzaRepository;

    public PrixPizzaService(PrixPizzaRepository prixPizzaRepository) {
        this.prixPizzaRepository = prixPizzaRepository;
    }

    public List<PrixPizza> getAllPrixPizza() {
        return prixPizzaRepository.findAll();
    }

    public PrixPizza ajouterPrixPizza(PrixPizza prixPizza) {
        return prixPizzaRepository.save(prixPizza);
    }

    public PrixPizza modifierPrixPizza(Integer id, PrixPizza nouveauPrix) {
        PrixPizza prix = prixPizzaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Prix pizza introuvable"));

        prix.setTaille(nouveauPrix.getTaille());
        prix.setPate(nouveauPrix.getPate());
        prix.setPrixBase(nouveauPrix.getPrixBase());

        return prixPizzaRepository.save(prix);
    }

    public void supprimerPrixPizza(Integer id) {
        if (!prixPizzaRepository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Prix pizza introuvable");
        }

        prixPizzaRepository.deleteById(id);
    }
}
