
package com.pizzapetes.backend.controller;

import com.pizzapetes.backend.entity.Tailles;
import com.pizzapetes.backend.service.TaillesService;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tailles")
@CrossOrigin(origins = "http://localhost:5173")
public class TaillesController {

    private final TaillesService taillesService;

    public TaillesController(TaillesService taillesService) {
        this.taillesService = taillesService;
    }

    // Afficher les tailles
    @GetMapping
    public List<Tailles> getAllTailles() {
        return taillesService.getAllTailles();
    }

    // Ajouter une taille
    @PostMapping
    public Tailles ajouterTaille(@RequestBody Tailles taille) {
        return taillesService.ajouterTaille(taille);
    }

    // Modifier une taille
    @PutMapping("/{id}")
    public Tailles modifierTaille(
            @PathVariable Integer id,
            @RequestBody Tailles taille) {
        return taillesService.modifierTaille(id, taille);
    }

    // Supprimer une taille
    @DeleteMapping("/{id}")
    public void supprimerTaille(@PathVariable Integer id) {
        taillesService.supprimerTaille(id);
    }
}
