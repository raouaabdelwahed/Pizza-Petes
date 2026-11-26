
package com.pizzapetes.backend.controller;

import com.pizzapetes.backend.entity.PrixGarnitures;
import com.pizzapetes.backend.service.PrixGarnituresService;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/prix-garnitures")
@CrossOrigin(origins = "http://localhost:5173")
public class PrixGarnituresController {

    private final PrixGarnituresService prixGarnituresService;

    public PrixGarnituresController(PrixGarnituresService prixGarnituresService) {
        this.prixGarnituresService = prixGarnituresService;
    }

    // Afficher les prix des garnitures
    @GetMapping
    public List<PrixGarnitures> getAllPrixGarnitures() {
        return prixGarnituresService.getAllPrixGarnitures();
    }

    // Ajouter un prix
    @PostMapping
    public PrixGarnitures ajouterPrixGarniture(
            @RequestBody PrixGarnitures prix) {
        return prixGarnituresService.ajouterPrixGarniture(prix);
    }

    // Modifier un prix
    @PutMapping("/{id}")
    public PrixGarnitures modifierPrixGarniture(
            @PathVariable Integer id,
            @RequestBody PrixGarnitures prix) {
        return prixGarnituresService.modifierPrixGarniture(id, prix);
    }

    // Supprimer un prix
    @DeleteMapping("/{id}")
    public void supprimerPrixGarniture(@PathVariable Integer id) {
        prixGarnituresService.supprimerPrixGarniture(id);
    }
}
