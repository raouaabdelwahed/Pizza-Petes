
package com.pizzapetes.backend.controller;

import com.pizzapetes.backend.entity.PrixPizza;
import com.pizzapetes.backend.service.PrixPizzaService;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/prix-pizza")
@CrossOrigin(origins = "http://localhost:5173")
public class PrixPizzaController {

    private final PrixPizzaService prixPizzaService;

    public PrixPizzaController(PrixPizzaService prixPizzaService) {
        this.prixPizzaService = prixPizzaService;
    }

    // Afficher les prix
    @GetMapping
    public List<PrixPizza> getAllPrixPizza() {
        return prixPizzaService.getAllPrixPizza();
    }

    // Ajouter un prix
    @PostMapping
    public PrixPizza ajouterPrixPizza(@RequestBody PrixPizza prixPizza) {
        return prixPizzaService.ajouterPrixPizza(prixPizza);
    }

    // Modifier un prix
    @PutMapping("/{id}")
    public PrixPizza modifierPrixPizza(
            @PathVariable Integer id,
            @RequestBody PrixPizza prixPizza) {
        return prixPizzaService.modifierPrixPizza(id, prixPizza);
    }

    // Supprimer un prix
    @DeleteMapping("/{id}")
    public void supprimerPrixPizza(@PathVariable Integer id) {
        prixPizzaService.supprimerPrixPizza(id);
    }
}
