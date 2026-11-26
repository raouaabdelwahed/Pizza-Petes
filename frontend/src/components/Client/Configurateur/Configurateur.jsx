
import './Configurateur.css';

const formatPrice = value => `${Number(value || 0).toFixed(2)} DT`;

function Configurateur({
  tailles = [], typesPate = [], garnitures = [],
  prixGarnitures = [], tailleChoisie = '', pateChoisie = '',
  garnituresChoisies = [], changerTaille = () => {},
  changerPate = () => {}, changerGarniture = () => {},
  prixBase = null, prixGarnituresTotal = 0,
  prixTotal = null, ajouterAuPanier = () => {}, message = ''
}) {
  const taille = tailles.find(t => String(t.idTaille) === String(tailleChoisie));
  const pate = typesPate.find(p => String(p.idPate) === String(pateChoisie));

  const tarifGarniture = id => prixGarnitures.find(p =>
    String(p.taille?.idTaille) === String(tailleChoisie) &&
    String(p.garniture?.idGarniture) === String(id)
  );

  return (
    <section className="menu-section order-section" id="commande">
      <div className="section-heading">
        <span className="subtitle">CRÉEZ VOTRE PIZZA</span>
        <h2>Composez votre pizza</h2>
        <p>Choisissez vos ingrédients et découvrez votre prix.</p>
      </div>

      <div className="configurator">
        <div className="configurator-group">
          <h3>1. Choisissez votre taille</h3>
          <div className="choice-grid">
            {tailles.map(t => (
              <button type="button" key={t.idTaille}
                className={`choice-card ${String(tailleChoisie) === String(t.idTaille) ? 'selected' : ''}`}
                onClick={() => changerTaille(t.idTaille)}>
                <strong>{t.nom}</strong>
                <span>{t.diametre} cm</span>
              </button>
            ))}
          </div>
        </div>

        <div className="configurator-group">
          <h3>2. Choisissez votre pâte</h3>
          <div className="choice-grid">
            {typesPate.map(p => (
              <button type="button" key={p.idPate}
                className={`choice-card ${String(pateChoisie) === String(p.idPate) ? 'selected' : ''}`}
                onClick={() => changerPate(p.idPate)}>
                <strong>{p.nom}</strong>
                <span>{p.description}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="configurator-group">
          <h3>3. Choisissez vos garnitures</h3>
          <div className="topping-grid">
            {garnitures.map(g => {
              const tarif = tarifGarniture(g.idGarniture);
              const selected = garnituresChoisies.includes(String(g.idGarniture));

              return (
                <label key={g.idGarniture}
                  className={`topping-card ${selected ? 'selected' : ''}`}>
                  <input type="checkbox" checked={selected}
                    onChange={() => changerGarniture(g.idGarniture)} />
                  <span className="topping-name">{g.nom}</span>
                  <strong>{tarif ? `+ ${formatPrice(tarif.prix)}` : 'Tarif absent'}</strong>
                </label>
              );
            })}
          </div>
        </div>

        <div className="price-summary">
          <h3>Récapitulatif de votre pizza</h3>
          <div className="summary-line">
            <span>Taille</span><strong>{taille?.nom || 'Non choisie'}</strong>
          </div>
          <div className="summary-line">
            <span>Pâte</span><strong>{pate?.nom || 'Non choisie'}</strong>
          </div>
          <div className="summary-line">
            <span>Prix de base</span>
            <strong>{prixBase != null ? formatPrice(prixBase) : 'Indisponible'}</strong>
          </div>
          <div className="summary-line">
            <span>Garnitures ({garnituresChoisies.length})</span>
            <strong>{formatPrice(prixGarnituresTotal)}</strong>
          </div>
          <div className="summary-total">
            <span>Prix total</span>
            <strong>{prixTotal != null ? formatPrice(prixTotal) : 'Indisponible'}</strong>
          </div>
          <button type="button" className="primary-button"
            onClick={ajouterAuPanier} disabled={prixTotal == null}>
            Ajouter au panier
          </button>
          {message && <p className="success-message">{message}</p>}
        </div>
      </div>
    </section>
  );
}

export default Configurateur;
