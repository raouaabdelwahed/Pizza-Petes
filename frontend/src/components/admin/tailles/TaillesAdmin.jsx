
import { useEffect, useState } from 'react';
import {
  getTailles, ajouterTaille, modifierTaille, supprimerTaille
} from '../../../services/api';
import './TaillesAdmin.css';

export default function TaillesAdmin() {
  const [tailles, setTailles] = useState([]);
  const [nom, setNom] = useState('');
  const [diametre, setDiametre] = useState('');
  const [idModification, setIdModification] = useState(null);
  const [message, setMessage] = useState('');
  const [chargement, setChargement] = useState(false);

  async function charger() {
    const res = await getTailles();
    setTailles(res.data.filter(t => t.actif !== false));
  }

  useEffect(() => {
    charger().catch(() => setMessage("Erreur de chargement."));
  }, []);

  function vider() {
    setNom('');
    setDiametre('');
    setIdModification(null);
  }

  async function enregistrer(e) {
    e.preventDefault();

    if (!nom.trim() || !diametre || Number(diametre) <= 0) {
      setMessage("Veuillez remplir correctement les champs.");
      return;
    }

    try {
      setChargement(true);
      const data = { nom: nom.trim(), diametre: Number(diametre) };

      if (idModification !== null) {
        await modifierTaille(idModification, data);
        setMessage("Taille modifiée avec succès.");
      } else {
        await ajouterTaille(data);
        setMessage("Taille ajoutée avec succès.");
      }

      vider();
      await charger();
    } catch (error) {
      setMessage(error.response?.data?.message || "Erreur d'enregistrement.");
    } finally {
      setChargement(false);
    }
  }

  function modifier(t) {
    setIdModification(t.idTaille);
    setNom(t.nom);
    setDiametre(String(t.diametre));
    setMessage('');
  }

  async function supprimer(t) {
    if (!window.confirm(`Supprimer la taille ${t.nom} ?`)) return;

    try {
      await supprimerTaille(t.idTaille);
      if (idModification === t.idTaille) vider();
      await charger();
      setMessage("Taille supprimée avec succès.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Erreur de suppression.");
    }
  }

  return (
    <div className="tailles-admin">
      <h2>Gestion des tailles</h2>
      <p>Ajouter, modifier et supprimer les tailles des pizzas.</p>

      <form className="tailles-form" onSubmit={enregistrer}>
        <div className="tailles-form-group">
          <label>Nom de la taille</label>
          <input
            value={nom}
            onChange={e => setNom(e.target.value)}
            placeholder="Ex : Petite, Moyenne, Grande"
            required
          />
        </div>

        <div className="tailles-form-group">
          <label>Diamètre (cm)</label>
          <input
            type="number"
            min="1"
            value={diametre}
            onChange={e => setDiametre(e.target.value)}
            placeholder="Ex : 20"
            required
          />
        </div>

        <div className="tailles-form-actions">
          <button type="submit" disabled={chargement}>
            {chargement ? "Enregistrement..." :
              idModification !== null ? "Modifier" : "Ajouter"}
          </button>

          {idModification !== null &&
            <button type="button" onClick={vider}>Annuler</button>}
        </div>
      </form>

      {message && <p className="tailles-message">{message}</p>}

      <div className="tailles-table-container">
        <table className="tailles-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Diamètre</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tailles.map(t => (
              <tr key={t.idTaille}>
                <td>{t.idTaille}</td>
                <td>{t.nom}</td>
                <td>{t.diametre} cm</td>
                <td className="tailles-actions">
                  <button className="tailles-edit-button"
                    type="button" onClick={() => modifier(t)}>
                    Modifier
                  </button>
                  <button className="tailles-delete-button"
                    type="button" onClick={() => supprimer(t)}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
            {tailles.length === 0 &&
              <tr><td colSpan="4">Aucune taille disponible.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
