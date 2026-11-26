
import './PrixGarnituresSection.css';

function PrixGarnituresSection({ prixGarnitures }) {
  return (
    <section className="prix-garnitures-section" id="prix-garnitures">
      <h2>Prix des garnitures</h2>
      <p className="prix-garnitures-intro">
        Les prix des garnitures varient selon la taille de la pizza.
      </p>

      <div className="prix-garnitures-list">
        {prixGarnitures.map(item => (
          <div className="prix-garniture-card" key={item.idPrixGarniture}>
            <h3>{item.garniture?.nom}</h3>
            <p>{item.taille?.nom}</p>
            <strong>{Number(item.prix || 0).toFixed(2)} DT</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PrixGarnituresSection;
