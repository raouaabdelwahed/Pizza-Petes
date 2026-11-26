package com.pizzapetes.backend.controller;

import com.pizzapetes.backend.dto.CommandeRequest;
import com.pizzapetes.backend.entity.Commande;
import com.pizzapetes.backend.service.CommandeService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/commandes")
public class CommandeController {

    private final CommandeService commandeService;

    public CommandeController(CommandeService commandeService) {
        this.commandeService = commandeService;
    }

    @PostMapping
    public ResponseEntity<Commande> creerCommande(
            @RequestBody CommandeRequest request) {

        Commande commande = commandeService.creerCommande(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(commande);
    }
}
