
package com.pizzapetes.backend.service;

import com.pizzapetes.backend.entity.TypesPate;
import com.pizzapetes.backend.repository.TypesPateRepository;

import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class TypesPateService {

    private final TypesPateRepository typesPateRepository;

    public TypesPateService(TypesPateRepository typesPateRepository) {
        this.typesPateRepository = typesPateRepository;
    }

    // Afficher les types de pâte
    public List<TypesPate> getAllTypesPate() {
        return typesPateRepository.findAll();
    }

    // Ajouter
    public TypesPate ajouterTypePate(TypesPate typePate) {
        return typesPateRepository.save(typePate);
    }

    // Modifier
    public TypesPate modifierTypePate(Integer id, TypesPate nouveauType) {

        TypesPate type = typesPateRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Type de pâte introuvable"));

        type.setNom(nouveauType.getNom());
        type.setDescription(nouveauType.getDescription());
        type.setActif(nouveauType.getActif());

        return typesPateRepository.save(type);
    }

    // Supprimer (désactivation)
    public void supprimerTypePate(Integer id) {

        TypesPate type = typesPateRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Type de pâte introuvable"));

        type.setActif(false);
        typesPateRepository.save(type);
    }
}
