
import './Features.css';

function Features() {
  return (
    <section className="features-section">
      <h2>Pourquoi choisir Pizza Pete's ?</h2>

      <div className="features-list">
        <div className="feature-card">
          <h3>Qualité</h3>
          <p>Des ingrédients soigneusement sélectionnés.</p>
        </div>

        <div className="feature-card">
          <h3>Personnalisation</h3>
          <p>Composez votre pizza selon vos préférences.</p>
        </div>

        <div className="feature-card">
          <h3>Fraîcheur</h3>
          <p>Des pizzas préparées avec soin et fraîcheur.</p>
        </div>

        <div className="feature-card">
          <h3>Service</h3>
          <p>Un service pensé pour vous satisfaire.</p>
        </div>
      </div>
    </section>
  );
}

export default Features;
