package com.pizzapetes.backend.service;

import com.pizzapetes.backend.entity.Garnitures;
import com.pizzapetes.backend.repository.GarnituresRepository;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class GarnituresService {

    private final GarnituresRepository garnituresRepository;

    public GarnituresService(GarnituresRepository garnituresRepository) {
        this.garnituresRepository = garnituresRepository;
    }

    public List<Garnitures> getAllGarnitures() {
        return garnituresRepository.findAll()
                .stream()
                .filter(Garnitures::getActif)
                .toList();
    }

    public Garnitures ajouterGarniture(Garnitures garniture) {
        garniture.setActif(true);
        return garnituresRepository.save(garniture);
    }

    public Garnitures modifierGarniture(Integer id, Garnitures nouvelleGarniture) {
        Garnitures garniture = garnituresRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Garniture introuvable"));

        garniture.setNom(nouvelleGarniture.getNom());
        garniture.setDescription(nouvelleGarniture.getDescription());

        return garnituresRepository.save(garniture);
    }

    public void supprimerGarniture(Integer id) {
        Garnitures garniture = garnituresRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Garniture introuvable"));

        garniture.setActif(false);
        garnituresRepository.save(garniture);
    }
}
