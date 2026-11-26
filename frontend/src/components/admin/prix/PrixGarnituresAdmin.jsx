
import { useEffect, useState } from "react";
import {
  getTailles, getGarnitures, getPrixGarnitures,
  ajouterPrixGarniture, modifierPrixGarniture, supprimerPrixGarniture
} from "../../../services/api";
import "./PrixGarnituresAdmin.css";

export default function PrixGarnituresAdmin() {
  const [tailles, setTailles] = useState([]);
  const [garnitures, setGarnitures] = useState([]);
  const [prix, setPrix] = useState([]);
  const [taille, setTaille] = useState("");
  const [garniture, setGarniture] = useState("");
  const [montant, setMontant] = useState("");
  const [idModification, setIdModification] = useState(null);
  const [message, setMessage] = useState("");

  async function charger() {
    try {
      const [t, g, p] = await Promise.all([
        getTailles(), getGarnitures(), getPrixGarnitures()
      ]);

      setTailles(t.data.filter(x => x.actif !== false));
      setGarnitures(g.data.filter(x => x.actif !== false));
      setPrix(p.data);
    } catch (error) {
      console.error(error);
      setMessage("Erreur de chargement.");
    }
  }

  useEffect(() => {
    charger();
  }, []);

  function chercherPrix(t, g) {
    const existe = prix.find(x =>
      String(x.taille?.idTaille) === String(t) &&
      String(x.garniture?.idGarniture) === String(g)
    );

    setMontant(existe ? String(existe.prix) : "");
  }

  function changerTaille(value) {
    setTaille(value);
    if (idModification === null && garniture) {
      chercherPrix(value, garniture);
    }
  }

  function changerGarniture(value) {
    setGarniture(value);
    if (idModification === null && taille) {
      chercherPrix(taille, value);
    }
  }

  function vider() {
    setTaille("");
    setGarniture("");
    setMontant("");
    setIdModification(null);
  }

  async function enregistrer(e) {
    e.preventDefault();
    setMessage("");

    if (!taille || !garniture || montant === "") return;

    const data = {
      taille: { idTaille: Number(taille) },
      garniture: { idGarniture: Number(garniture) },
      prix: Number(montant)
    };

    try {
      if (idModification !== null) {
        await modifierPrixGarniture(idModification, data);
        setMessage("Prix modifié avec succès.");
      } else {
        const existe = prix.find(x =>
          String(x.taille?.idTaille) === String(taille) &&
          String(x.garniture?.idGarniture) === String(garniture)
        );

        if (existe) {
          setMessage("Ce prix existe déjà. Utilisez Modifier.");
          return;
        }

        await ajouterPrixGarniture(data);
        setMessage("Prix ajouté avec succès.");
      }

      vider();
      await charger();
    } catch (error) {
      console.error("Erreur enregistrement :", error.response?.data || error);

      setMessage(
        error.response?.data?.message ||
        error.response?.data ||
        "Erreur d'enregistrement."
      );
    }
  }

  async function supprimer(id) {
    if (!window.confirm("Supprimer ce prix ?")) return;

    try {
      await supprimerPrixGarniture(id);

      if (idModification === id) vider();

      setMessage("Prix supprimé avec succès.");
      await charger();
    } catch (error) {
      console.error("Erreur suppression :", error.response?.data || error);
      setMessage("Erreur de suppression.");
    }
  }

  return (
    <section className="prix-garnitures-admin">
      <h2>Gestion des prix des garnitures</h2>

      <form className="prix-garnitures-form" onSubmit={enregistrer}>
        <div>
          <label>Taille</label>
          <select value={taille} onChange={e => changerTaille(e.target.value)} required>
            <option value="">Choisir une taille</option>
            {tailles.map(t => (
              <option key={t.idTaille} value={t.idTaille}>
                {t.nom} - {t.diametre} cm
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Garniture</label>
          <select value={garniture} onChange={e => changerGarniture(e.target.value)} required>
            <option value="">Choisir une garniture</option>
            {garnitures.map(g => (
              <option key={g.idGarniture} value={g.idGarniture}>
                {g.nom}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Prix (DT)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={montant}
            onChange={e => setMontant(e.target.value)}
            required
          />
        </div>

        <div className="prix-garnitures-actions-form">
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

      <table className="prix-garnitures-table">
        <thead>
          <tr>
            <th>Taille</th>
            <th>Garniture</th>
            <th>Prix (DT)</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {prix.map(item => (
            <tr key={item.idPrixGarniture}>
              <td>{item.taille?.nom}</td>
              <td>{item.garniture?.nom}</td>
              <td>{Number(item.prix).toFixed(2)}</td>
              <td>
                <button
                  type="button"
                  className="garniture-prix-modifier"
                  onClick={() => {
                    setTaille(String(item.taille?.idTaille || ""));
                    setGarniture(String(item.garniture?.idGarniture || ""));
                    setMontant(String(item.prix));
                    setIdModification(item.idPrixGarniture);
                    setMessage("");
                  }}
                >
                  Modifier
                </button>

                <button
                  type="button"
                  className="garniture-prix-supprimer"
                  onClick={() => supprimer(item.idPrixGarniture)}
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
