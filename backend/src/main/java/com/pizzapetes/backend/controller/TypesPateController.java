
package com.pizzapetes.backend.controller;

import com.pizzapetes.backend.entity.TypesPate;
import com.pizzapetes.backend.service.TypesPateService;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/types-pate")
@CrossOrigin(origins = "http://localhost:5173")
public class TypesPateController {

    private final TypesPateService typesPateService;

    public TypesPateController(TypesPateService typesPateService) {
        this.typesPateService = typesPateService;
    }

    // Afficher tous les types de pâte
    @GetMapping
    public List<TypesPate> getAllTypesPate() {
        return typesPateService.getAllTypesPate();
    }

    // Ajouter un type de pâte
    @PostMapping
    public TypesPate ajouterTypePate(@RequestBody TypesPate typePate) {
        return typesPateService.ajouterTypePate(typePate);
    }

    // Modifier un type de pâte
    @PutMapping("/{id}")
    public TypesPate modifierTypePate(
            @PathVariable Integer id,
            @RequestBody TypesPate typePate) {
        return typesPateService.modifierTypePate(id, typePate);
    }

    // Supprimer un type de pâte
    @DeleteMapping("/{id}")
    public void supprimerTypePate(@PathVariable Integer id) {
        typesPateService.supprimerTypePate(id);
    }
}
