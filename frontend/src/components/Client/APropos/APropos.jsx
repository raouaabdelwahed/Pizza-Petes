
import './APropos.css';

function APropos() {
  return (
    <section className="apropos-section" id="apropos">
      <div className="apropos-content">
        <h2>À propos de Pizza Pete's</h2>
        <p>
          Chez Pizza Pete's, nous préparons des pizzas avec passion,
          des ingrédients de qualité et des recettes savoureuses.
          Notre objectif est de vous offrir une expérience gourmande
          et un service de qualité.
        </p>
      </div>

      <div className="apropos-image">
        <img
          src="https://images.unsplash.com/photo-1579751626657-72bc17010498?w=800"
          alt="Pizza fraîchement préparée"
        />
      </div>
    </section>
  );
}

export default APropos;
