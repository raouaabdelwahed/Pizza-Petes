
import { useEffect, useState } from 'react';
import {
  getTypesPate, ajouterTypePate,
  modifierTypePate, supprimerTypePate
} from '../../../services/api';
import './PatesAdmin.css';

export default function PatesAdmin() {
  const [pates, setPates] = useState([]);
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [idModification, setIdModification] = useState(null);
  const [message, setMessage] = useState('');
  const [chargement, setChargement] = useState(false);

  async function charger() {
    const res = await getTypesPate();
    setPates(res.data.filter(p => p.actif !== false));
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
      setMessage("Veuillez saisir le nom du type de pâte.");
      return;
    }

    try {
      setChargement(true);
      const data = { nom: nom.trim(), description: description.trim() };

      if (idModification !== null) {
        await modifierTypePate(idModification, data);
        setMessage("Type de pâte modifié avec succès.");
      } else {
        await ajouterTypePate(data);
        setMessage("Type de pâte ajouté avec succès.");
      }

      vider();
      await charger();
    } catch {
      setMessage("Erreur lors de l'enregistrement.");
    } finally {
      setChargement(false);
    }
  }

  function modifier(p) {
    setIdModification(p.idPate);
    setNom(p.nom);
    setDescription(p.description || '');
    setMessage('');
  }

  async function supprimer(p) {
    if (!window.confirm(`Supprimer le type de pâte "${p.nom}" ?`)) return;

    try {
      await supprimerTypePate(p.idPate);
      if (idModification === p.idPate) vider();
      await charger();
      setMessage("Type de pâte supprimé avec succès.");
    } catch {
      setMessage("Erreur lors de la suppression.");
    }
  }

  return (
    <div className="pates-admin">
      <h2>Gestion des types de pâte</h2>
      <p>Ajouter, modifier et supprimer les types de pâte.</p>

      <form className="pates-form" onSubmit={enregistrer}>
        <div className="pates-form-group">
          <label>Nom du type de pâte</label>
          <input
            value={nom}
            onChange={e => setNom(e.target.value)}
            placeholder="Ex : Pâte classique"
            required
          />
        </div>

        <div className="pates-form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Description du type de pâte..."
            rows="3"
          />
        </div>

        <div className="pates-form-actions">
          <button type="submit" className="pates-save-button" disabled={chargement}>
            {chargement ? "Enregistrement..." :
              idModification !== null ? "Modifier" : "Ajouter"}
          </button>

          {idModification !== null &&
            <button type="button" className="pates-cancel-button" onClick={vider}>
              Annuler
            </button>}
        </div>
      </form>

      {message && <p className="pates-message">{message}</p>}

      <div className="pates-table-container">
        <table className="pates-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pates.map(p => (
              <tr key={p.idPate}>
                <td>{p.idPate}</td>
                <td>{p.nom}</td>
                <td>{p.description || '-'}</td>
                <td className="pates-actions">
                  <button type="button" className="pates-edit-button"
                    onClick={() => modifier(p)}>Modifier</button>
                  <button type="button" className="pates-delete-button"
                    onClick={() => supprimer(p)}>Supprimer</button>
                </td>
              </tr>
            ))}
            {pates.length === 0 &&
              <tr><td colSpan="4">Aucun type de pâte disponible.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
