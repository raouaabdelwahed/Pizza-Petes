
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/api'
});

// Tailles
export const getTailles = () => API.get('/tailles');
export const ajouterTaille = data => API.post('/tailles', data);
export const modifierTaille = (id, data) => API.put(`/tailles/${id}`, data);
export const supprimerTaille = id => API.delete(`/tailles/${id}`);

// Types de pâte
export const getTypesPate = () => API.get('/types-pate');
export const ajouterTypePate = data => API.post('/types-pate', data);
export const modifierTypePate = (id, data) => API.put(`/types-pate/${id}`, data);
export const supprimerTypePate = id => API.delete(`/types-pate/${id}`);

// Garnitures
export const getGarnitures = () => API.get('/garnitures');
export const ajouterGarniture = data => API.post('/garnitures', data);
export const modifierGarniture = (id, data) => API.put(`/garnitures/${id}`, data);
export const supprimerGarniture = id => API.delete(`/garnitures/${id}`);

// Prix des pizzas
export const getPrixPizza = () => API.get('/prix-pizza');
export const ajouterPrixPizza = data => API.post('/prix-pizza', data);
export const modifierPrixPizza = (id, data) => API.put(`/prix-pizza/${id}`, data);
export const supprimerPrixPizza = id => API.delete(`/prix-pizza/${id}`);

// Prix des garnitures
export const getPrixGarnitures = () => API.get('/prix-garnitures');
export const ajouterPrixGarniture = data => API.post('/prix-garnitures', data);
export const modifierPrixGarniture = (id, data) => API.put(`/prix-garnitures/${id}`, data);
export const supprimerPrixGarniture = id => API.delete(`/prix-garnitures/${id}`);

// Commandes
export const creerCommande = commande => API.post('/commandes', commande);
