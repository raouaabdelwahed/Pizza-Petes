
import './GarnituresSection.css';

function GarnituresSection({ garnitures }) {
  return (
    <section className="garnitures-section" id="garnitures">
      <h2>Nos garnitures</h2>
      <p className="garnitures-intro">
        Ajoutez vos ingrédients préférés.
      </p>

      <div className="garnitures-list">
        {garnitures.map(garniture => (
          <div className="garniture-card" key={garniture.idGarniture}>
            <h3>{garniture.nom}</h3>
            {garniture.description && <p>{garniture.description}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

export default GarnituresSection;
