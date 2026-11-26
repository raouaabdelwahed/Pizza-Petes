
package com.pizzapetes.backend.controller;

import com.pizzapetes.backend.entity.Garnitures;
import com.pizzapetes.backend.service.GarnituresService;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/garnitures")
@CrossOrigin(origins = "http://localhost:5173")
public class GarnituresController {

    private final GarnituresService garnituresService;

    public GarnituresController(GarnituresService garnituresService) {
        this.garnituresService = garnituresService;
    }

    // Afficher les garnitures
    @GetMapping
    public List<Garnitures> getAllGarnitures() {
        return garnituresService.getAllGarnitures();
    }

    // Ajouter une garniture
    @PostMapping
    public Garnitures ajouterGarniture(@RequestBody Garnitures garniture) {
        return garnituresService.ajouterGarniture(garniture);
    }

    // Modifier une garniture
    @PutMapping("/{id}")
    public Garnitures modifierGarniture(
            @PathVariable Integer id,
            @RequestBody Garnitures garniture) {
        return garnituresService.modifierGarniture(id, garniture);
    }

    // Supprimer une garniture
    @DeleteMapping("/{id}")
    public void supprimerGarniture(@PathVariable Integer id) {
        garnituresService.supprimerGarniture(id);
    }
}
