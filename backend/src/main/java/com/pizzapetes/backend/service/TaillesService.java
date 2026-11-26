
package com.pizzapetes.backend.service;

import com.pizzapetes.backend.entity.Tailles;
import com.pizzapetes.backend.repository.TaillesRepository;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class TaillesService {

    private final TaillesRepository taillesRepository;

    public TaillesService(TaillesRepository taillesRepository) {
        this.taillesRepository = taillesRepository;
    }

    public List<Tailles> getAllTailles() {
        return taillesRepository.findAll();
    }

    public Tailles ajouterTaille(Tailles taille) {
        taille.setActif(true);
        return taillesRepository.save(taille);
    }

    public Tailles modifierTaille(Integer id, Tailles nouvelleTaille) {
        Tailles taille = taillesRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Taille introuvable"));

        taille.setNom(nouvelleTaille.getNom());
        taille.setDiametre(nouvelleTaille.getDiametre());

        return taillesRepository.save(taille);
    }

    public void supprimerTaille(Integer id) {
        Tailles taille = taillesRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Taille introuvable"));

        taille.setActif(false);
        taillesRepository.save(taille);
    }
}
