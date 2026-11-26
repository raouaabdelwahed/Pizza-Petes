
import './Panier.css';

function Panier({
  panier = [],
  modifierQuantite = () => {},
  supprimerPizza = () => {},
  totalPanier = 0,
  nomClient = '',
  telephone = '',
  adresse = '',
  setNomClient = () => {},
  setTelephone = () => {},
  setAdresse = () => {},
  validerCommande = () => {},
  chargementCommande = false,
  messageCommande = '',
  commandeReussie = null
}) {
  return (
    <section className="panier-section" id="panier">
      <h2>Mon panier</h2>

      {panier.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          {panier.map((pizza, index) => (
            <div className="panier-item" key={pizza.id || index}>
              <div>
                <h3>Pizza {pizza.taille} - {pizza.pate}</h3>
                <p>
                  Garnitures : {pizza.garnitures?.map(g => g.nom).join(', ') || 'Aucune'}
                </p>
                <strong>
                  {Number(pizza.prixUnitaire || 0).toFixed(2)} DT
                </strong>
              </div>

              <div className="panier-actions">
                <button onClick={() => modifierQuantite(pizza.id, -1)}>-</button>
                <span>{pizza.quantite}</span>
                <button onClick={() => modifierQuantite(pizza.id, 1)}>+</button>
                <button onClick={() => supprimerPizza(pizza.id)}>
                  Supprimer
                </button>
              </div>
            </div>
          ))}

          <h3 className="panier-total">
            Total : {Number(totalPanier).toFixed(2)} DT
          </h3>

          <div className="commande-form">
            <h3>Informations client</h3>

            <input
              type="text"
              placeholder="Votre nom"
              value={nomClient}
              onChange={e => setNomClient(e.target.value)}
            />

            <input
              type="tel"
              placeholder="Votre téléphone"
              value={telephone}
              onChange={e => setTelephone(e.target.value)}
            />

            <textarea
              placeholder="Votre adresse"
              value={adresse}
              onChange={e => setAdresse(e.target.value)}
            />

            <button
              type="button"
              onClick={validerCommande}
              disabled={chargementCommande}
            >
              {chargementCommande ? 'Validation...' : 'Valider la commande'}
            </button>
          </div>
        </>
      )}

      {messageCommande && (
        <p className={commandeReussie ? 'success-message' : 'error-message'}>
          {messageCommande}
        </p>
      )}

      {commandeReussie && (
        <div className="commande-confirmation">
          <h3>Commande enregistrée !</h3>
          <p>Numéro : {commandeReussie.idCommande}</p>
          <h3>
            Montant total : {Number(commandeReussie.total || 0).toFixed(2)} DT
          </h3>
        </div>
      )}
    </section>
  );
}

export default Panier;
