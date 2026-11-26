
import { useEffect, useState } from "react";
import {
  getTailles, getTypesPate, getPrixPizza,
  ajouterPrixPizza, modifierPrixPizza, supprimerPrixPizza
} from "../../../services/api";
import "./PrixPizzaAdmin.css";

export default function PrixPizzaAdmin() {
  const [tailles, setTailles] = useState([]);
  const [pates, setPates] = useState([]);
  const [prix, setPrix] = useState([]);
  const [taille, setTaille] = useState("");
  const [pate, setPate] = useState("");
  const [prixBase, setPrixBase] = useState("");
  const [idModification, setIdModification] = useState(null);
  const [message, setMessage] = useState("");

  async function charger() {
    try {
      const [t, p, pr] = await Promise.all([
        getTailles(), getTypesPate(), getPrixPizza()
      ]);

      setTailles(t.data.filter(x => x.actif !== false));
      setPates(p.data.filter(x => x.actif !== false));
      setPrix(pr.data);
    } catch (error) {
      console.error("Chargement :", error.response?.data || error);
      setMessage("Erreur de chargement.");
    }
  }

  useEffect(() => {
    charger();
  }, []);

  useEffect(() => {
    if (!taille || !pate || idModification !== null) return;

    const existe = prix.find(x =>
      String(x.taille?.idTaille) === String(taille) &&
      String(x.pate?.idPate) === String(pate)
    );

    setPrixBase(existe ? String(existe.prixBase) : "");
  }, [taille, pate, prix, idModification]);

  function vider() {
    setTaille("");
    setPate("");
    setPrixBase("");
    setIdModification(null);
  }

  async function enregistrer(e) {
    e.preventDefault();
    setMessage("");

    if (!taille || !pate || prixBase === "") return;

    const data = {
      taille: { idTaille: Number(taille) },
      pate: { idPate: Number(pate) },
      prixBase: Number(prixBase)
    };

    try {
      if (idModification !== null) {
        await modifierPrixPizza(idModification, data);
        setMessage("Prix modifié avec succès.");
      } else {
        const existe = prix.find(x =>
          String(x.taille?.idTaille) === String(taille) &&
          String(x.pate?.idPate) === String(pate)
        );

        if (existe) {
          setMessage("Ce prix existe déjà. Utilisez Modifier.");
          return;
        }

        await ajouterPrixPizza(data);
        setMessage("Prix ajouté avec succès.");
      }

      vider();
      await charger();
    } catch (error) {
      console.error("Erreur enregistrement :", error.response?.data || error);

      setMessage(
        error.response?.data?.message ||
        "Erreur d'enregistrement."
      );
    }
  }

  async function supprimer(id) {
    if (!window.confirm("Supprimer ce prix ?")) return;

    try {
      await supprimerPrixPizza(id);

      if (idModification === id) vider();

      setMessage("Prix supprimé avec succès.");
      await charger();
    } catch (error) {
      console.error("Erreur suppression :", error.response?.data || error);
      setMessage("Erreur de suppression.");
    }
  }

  return (
    <section className="prix-pizza-admin">
      <h2>Gestion des prix des pizzas</h2>

      <form className="prix-pizza-form" onSubmit={enregistrer}>
        <div>
          <label>Taille</label>
          <select value={taille} onChange={e => setTaille(e.target.value)} required>
            <option value="">Choisir une taille</option>
            {tailles.map(t => (
              <option key={t.idTaille} value={t.idTaille}>
                {t.nom} - {t.diametre} cm
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Type de pâte</label>
          <select value={pate} onChange={e => setPate(e.target.value)} required>
            <option value="">Choisir une pâte</option>
            {pates.map(p => (
              <option key={p.idPate} value={p.idPate}>
                {p.nom}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Prix de base (DT)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={prixBase}
            onChange={e => setPrixBase(e.target.value)}
            required
          />
        </div>

        <div className="prix-pizza-actions-form">
          <button type="submit">
            {idModification !== null ? "Modifier" : "Ajouter"}
          </button>

          {idModification !== null && (
            <button type="button" onClick={() => {
              vider();
              setMessage("");
            }}>
              Annuler
            </button>
          )}
        </div>
      </form>

      {message && <p>{message}</p>}

      <table className="prix-pizza-table">
        <thead>
          <tr>
            <th>Taille</th>
            <th>Pâte</th>
            <th>Prix (DT)</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {prix.map(item => (
            <tr key={item.idPrix}>
              <td>{item.taille?.nom}</td>
              <td>{item.pate?.nom}</td>
              <td>{Number(item.prixBase).toFixed(2)}</td>
              <td>
                <button
                  type="button"
                  className="prix-btn-modifier"
                  onClick={() => {
                    setTaille(String(item.taille?.idTaille || ""));
                    setPate(String(item.pate?.idPate || ""));
                    setPrixBase(String(item.prixBase));
                    setIdModification(item.idPrix);
                    setMessage("");
                  }}
                >
                  Modifier
                </button>

                <button
                  type="button"
                  className="prix-btn-supprimer"
                  onClick={() => supprimer(item.idPrix)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}

          {prix.length === 0 && (
            <tr>
              <td colSpan="4">Aucun prix disponible.</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}
