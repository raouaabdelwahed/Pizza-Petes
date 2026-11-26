
package com.pizzapetes.backend.service;

import com.pizzapetes.backend.dto.CommandeRequest;
import com.pizzapetes.backend.entity.Commande;
import com.pizzapetes.backend.entity.LigneCommande;
import com.pizzapetes.backend.entity.PrixPizza;
import com.pizzapetes.backend.entity.PrixGarnitures;
import com.pizzapetes.backend.repository.CommandeRepository;
import com.pizzapetes.backend.repository.PrixPizzaRepository;
import com.pizzapetes.backend.repository.PrixGarnituresRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class CommandeService {

    private final CommandeRepository commandeRepository;
    private final PrixPizzaRepository prixPizzaRepository;
    private final PrixGarnituresRepository prixGarnituresRepository;

    public CommandeService(
            CommandeRepository commandeRepository,
            PrixPizzaRepository prixPizzaRepository,
            PrixGarnituresRepository prixGarnituresRepository) {

        this.commandeRepository = commandeRepository;
        this.prixPizzaRepository = prixPizzaRepository;
        this.prixGarnituresRepository = prixGarnituresRepository;
    }

    @Transactional
    public Commande creerCommande(CommandeRequest request) {

        if (request == null ||
            request.getNomClient() == null ||
            request.getNomClient().isBlank() ||
            request.getTelephone() == null ||
            request.getTelephone().isBlank() ||
            request.getAdresse() == null ||
            request.getAdresse().isBlank() ||
            request.getLignes() == null ||
            request.getLignes().isEmpty()) {

            throw new IllegalArgumentException(
                "Veuillez remplir toutes les informations et ajouter au moins une pizza."
            );
        }

        Commande commande = new Commande();

        commande.setNomClient(request.getNomClient().trim());
        commande.setTelephone(request.getTelephone().trim());
        commande.setAdresse(request.getAdresse().trim());

        BigDecimal totalCommande = BigDecimal.ZERO;

        for (CommandeRequest.LigneRequest ligneRequest : request.getLignes()) {

            if (ligneRequest.getIdPrix() == null ||
                ligneRequest.getQuantite() == null ||
                ligneRequest.getQuantite() <= 0) {

                throw new IllegalArgumentException("Pizza ou quantité invalide.");
            }

            PrixPizza prixPizza = prixPizzaRepository
                    .findById(ligneRequest.getIdPrix())
                    .orElseThrow(() -> new IllegalArgumentException(
                        "Prix de pizza introuvable."
                    ));

            BigDecimal prixUnitaire = prixPizza.getPrixBase();

            LigneCommande ligne = new LigneCommande();
            ligne.setPrixPizza(prixPizza);
            ligne.setQuantite(ligneRequest.getQuantite());

            List<Integer> idsGarnitures = ligneRequest.getIdPrixGarnitures();

            if (idsGarnitures != null) {
                for (Integer id : idsGarnitures) {

                    if (id == null) {
                        throw new IllegalArgumentException(
                            "Identifiant de garniture invalide."
                        );
                    }

                    PrixGarnitures garniture = prixGarnituresRepository
                            .findById(id)
                            .orElseThrow(() -> new IllegalArgumentException(
                                "Prix de garniture introuvable."
                            ));

                    if (!garniture.getTaille().getIdTaille()
                            .equals(prixPizza.getTaille().getIdTaille())) {

                        throw new IllegalArgumentException(
                            "La garniture ne correspond pas à la taille de la pizza."
                        );
                    }

                    ligne.getGarnitures().add(garniture);
                    prixUnitaire = prixUnitaire.add(garniture.getPrix());
                }
            }

            BigDecimal sousTotal = prixUnitaire.multiply(
                    BigDecimal.valueOf(ligneRequest.getQuantite())
            );

            ligne.setPrixUnitaire(prixUnitaire);
            ligne.setSousTotal(sousTotal);

            commande.ajouterLigne(ligne);

            totalCommande = totalCommande.add(sousTotal);
        }

        commande.setTotal(totalCommande);

        return commandeRepository.save(commande);
    }
}
