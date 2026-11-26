
import { useEffect, useState } from 'react';
import {
  getTailles, getTypesPate, getGarnitures,
  getPrixPizza, getPrixGarnitures, creerCommande
} from './services/api';

export function usePizza() {
  const [tailles, setTailles] = useState([]);
  const [typesPate, setTypesPate] = useState([]);
  const [garnitures, setGarnitures] = useState([]);
  const [prixPizza, setPrixPizza] = useState([]);
  const [prixGarnitures, setPrixGarnitures] = useState([]);

  const [tailleChoisie, setTailleChoisie] = useState('');
  const [pateChoisie, setPateChoisie] = useState('');
  const [garnituresChoisies, setGarnituresChoisies] = useState([]);
  const [panier, setPanier] = useState([]);

  const [afficherAdmin, setAfficherAdmin] = useState(false);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState('');
  const [message, setMessage] = useState('');

  const [nomClient, setNomClient] = useState('');
  const [telephone, setTelephone] = useState('');
  const [adresse, setAdresse] = useState('');
  const [chargementCommande, setChargementCommande] = useState(false);
  const [messageCommande, setMessageCommande] = useState('');
  const [commandeReussie, setCommandeReussie] = useState(null);

  useEffect(() => {
    Promise.all([
      getTailles(), getTypesPate(), getGarnitures(),
      getPrixPizza(), getPrixGarnitures()
    ])
      .then(r => {
        const t = r[0].data.filter(x => x.actif !== false);
        const p = r[1].data.filter(x => x.actif !== false);

        setTailles(t);
        setTypesPate(p);
        setGarnitures(r[2].data.filter(x => x.actif !== false));
        setPrixPizza(r[3].data);
        setPrixGarnitures(r[4].data);

        if (t.length) setTailleChoisie(String(t[0].idTaille));
        if (p.length) setPateChoisie(String(p[0].idPate));
      })
      .catch(() => setErreur('Erreur de chargement des données.'))
      .finally(() => setChargement(false));
  }, []);

  const taille = tailles.find(
    x => String(x.idTaille) === String(tailleChoisie)
  );

  const pate = typesPate.find(
    x => String(x.idPate) === String(pateChoisie)
  );

  const prixBase = prixPizza.find(x =>
    String(x.taille?.idTaille) === String(tailleChoisie) &&
    String(x.pate?.idPate) === String(pateChoisie)
  );

  const trouverPrixGarniture = id =>
    prixGarnitures.find(x =>
      String(x.taille?.idTaille) === String(tailleChoisie) &&
      String(x.garniture?.idGarniture) === String(id)
    );

  const totalGarnitures = garnituresChoisies.reduce(
    (total, id) => total + Number(trouverPrixGarniture(id)?.prix || 0),
    0
  );

  const tarifManquant = garnituresChoisies.some(
    id => !trouverPrixGarniture(id)
  );

  const prixTotal = prixBase && !tarifManquant
    ? Number(prixBase.prixBase) + totalGarnitures
    : null;

  const changerGarniture = id => {
    const valeur = String(id);

    setGarnituresChoisies(prev =>
      prev.includes(valeur)
        ? prev.filter(x => x !== valeur)
        : [...prev, valeur]
    );
  };

  const ajouterAuPanier = () => {
    if (!taille || !pate || prixTotal === null) {
      setMessage('Prix indisponible ou tarif de garniture manquant.');
      return;
    }

    const gs = garnituresChoisies.map(id => {
      const g = garnitures.find(
        x => String(x.idGarniture) === String(id)
      );
      const p = trouverPrixGarniture(id);

      return {
        idGarniture: Number(id),
        idPrixGarniture: p.idPrixGarniture,
        nom: g?.nom,
        prix: Number(p.prix)
      };
    });

    setPanier(prev => [...prev, {
      id: Date.now(),
      idPrix: prixBase.idPrix,
      taille: taille.nom,
      diametre: taille.diametre,
      idTaille: taille.idTaille,
      pate: pate.nom,
      idPate: pate.idPate,
      garnitures: gs,
      prixUnitaire: prixTotal,
      quantite: 1
    }]);

    setGarnituresChoisies([]);
    setMessage('Pizza ajoutée au panier !');
  };

  const modifierQuantite = (id, v) => {
    setPanier(prev => prev.map(x =>
      x.id === id ? { ...x, quantite: x.quantite + v } : x
    ).filter(x => x.quantite > 0));
  };

  const supprimerPizza = id =>
    setPanier(prev => prev.filter(x => x.id !== id));

  const totalPanier = panier.reduce(
    (s, x) => s + x.prixUnitaire * x.quantite, 0
  );

  const nombrePizzas = panier.reduce(
    (s, x) => s + x.quantite, 0
  );

  const validerCommande = async e => {
    e.preventDefault();

    if (!panier.length || !nomClient.trim() ||
        !telephone.trim() || !adresse.trim()) {
      setMessageCommande('Veuillez remplir tous les champs.');
      return;
    }

    const commande = {
      nomClient: nomClient.trim(),
      telephone: telephone.trim(),
      adresse: adresse.trim(),
      lignes: panier.map(x => ({
        idPrix: x.idPrix,
        quantite: x.quantite,
        idPrixGarnitures: x.garnitures.map(g => g.idPrixGarniture)
      }))
    };

    try {
      setChargementCommande(true);
      const r = await creerCommande(commande);
      setCommandeReussie(r.data);
      setMessageCommande(`Commande n° ${r.data.idCommande} enregistrée !`);
      setPanier([]);
      setNomClient('');
      setTelephone('');
      setAdresse('');
    } catch (e) {
      setMessageCommande(
        e.response?.data?.message || 'Erreur de commande.'
      );
    } finally {
      setChargementCommande(false);
    }
  };

  return {
    tailles, typesPate, garnitures, prixPizza, prixGarnitures,
    afficherAdmin, setAfficherAdmin, chargement, erreur,
    nombrePizzas, panier, totalPanier,
    modifierQuantite, supprimerPizza,
    nomClient, telephone, adresse,
    setNomClient, setTelephone, setAdresse,
    validerCommande, chargementCommande,
    messageCommande, commandeReussie,

    configurateur: {
      tailleChoisie, pateChoisie, garnituresChoisies,
      changerTaille: id => {
        setTailleChoisie(String(id));
        setGarnituresChoisies([]);
      },
      changerPate: id => setPateChoisie(String(id)),
      changerGarniture,
      prixBase: prixBase?.prixBase,
      prixGarnituresTotal: totalGarnitures,
      prixTotal,
      ajouterAuPanier,
      message
    }
  };
}
