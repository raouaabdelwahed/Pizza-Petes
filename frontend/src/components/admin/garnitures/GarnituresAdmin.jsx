
import { useEffect, useState } from 'react';
import {
  getGarnitures, ajouterGarniture,
  modifierGarniture, supprimerGarniture
} from '../../../services/api';
import './GarnituresAdmin.css';

export default function GarnituresAdmin() {
  const [garnitures, setGarnitures] = useState([]);
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [idModification, setIdModification] = useState(null);
  const [message, setMessage] = useState('');
  const [chargement, setChargement] = useState(false);

  async function charger() {
    const res = await getGarnitures();
    setGarnitures(res.data.filter(g => g.actif !== false));
  }

  useEffect(() => {
    charger().catch(() => setMessage("Erreur de chargement."));
  }, []);

  function vider() {
    setNom('');
    setDescription('');
    setIdModification(null);
  }

  async function enregistrer(e) {
    e.preventDefault();

    if (!nom.trim()) {
      setMessage("Veuillez saisir le nom de la garniture.");
      return;
    }

    try {
      setChargement(true);
      const data = {
        nom: nom.trim(),
        description: description.trim()
      };

      if (idModification !== null) {
        await modifierGarniture(idModification, data);
        setMessage("Garniture modifiée avec succès.");
      } else {
        await ajouterGarniture(data);
        setMessage("Garniture ajoutée avec succès.");
      }

      vider();
      await charger();
    } catch {
      setMessage("Erreur lors de l'enregistrement.");
    } finally {
      setChargement(false);
    }
  }

  function modifier(g) {
    setIdModification(g.idGarniture);
    setNom(g.nom);
    setDescription(g.description || '');
    setMessage('');
  }

  async function supprimer(g) {
    if (!window.confirm(`Supprimer la garniture "${g.nom}" ?`)) return;

    try {
      await supprimerGarniture(g.idGarniture);
      if (idModification === g.idGarniture) vider();
      await charger();
      setMessage("Garniture supprimée avec succès.");
    } catch {
      setMessage("Erreur lors de la suppression.");
    }
  }

  return (
    <div className="garnitures-admin">
      <h2>Gestion des garnitures</h2>
      <p>Ajouter, modifier et supprimer les garnitures.</p>

      <form className="garnitures-form" onSubmit={enregistrer}>
        <div className="garnitures-form-group">
          <label>Nom de la garniture</label>
          <input
            value={nom}
            onChange={e => setNom(e.target.value)}
            placeholder="Ex : Mozzarella"
            required
          />
        </div>

        <div className="garnitures-form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Description de la garniture..."
            rows="3"
          />
        </div>

        <div className="garnitures-form-actions">
          <button type="submit" className="garnitures-save-button" disabled={chargement}>
            {chargement ? "Enregistrement..." :
              idModification !== null ? "Modifier" : "Ajouter"}
          </button>

          {idModification !== null &&
            <button type="button" className="garnitures-cancel-button" onClick={vider}>
              Annuler
            </button>}
        </div>
      </form>

      {message && <p className="garnitures-message">{message}</p>}

      <div className="garnitures-table-container">
        <table className="garnitures-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {garnitures.map(g => (
              <tr key={g.idGarniture}>
                <td>{g.idGarniture}</td>
                <td>{g.nom}</td>
                <td>{g.description || '-'}</td>
                <td className="garnitures-actions">
                  <button type="button" className="garnitures-edit-button"
                    onClick={() => modifier(g)}>Modifier</button>
                  <button type="button" className="garnitures-delete-button"
                    onClick={() => supprimer(g)}>Supprimer</button>
                </td>
              </tr>
            ))}
            {garnitures.length === 0 &&
              <tr><td colSpan="4">Aucune garniture disponible.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
