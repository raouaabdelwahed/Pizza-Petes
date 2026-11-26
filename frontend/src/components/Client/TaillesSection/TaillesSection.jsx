
import './TaillesSection.css';

function TaillesSection({ tailles }) {
  return (
    <section className="tailles-section" id="tailles">
      <h2>Nos tailles de pizza</h2>
      <p className="tailles-intro">
        Choisissez la taille qui vous convient.
      </p>

      <div className="tailles-list">
        {tailles.map(taille => (
          <div className="taille-card" key={taille.idTaille}>
            <h3>{taille.nom}</h3>
            <p>{taille.diametre} cm</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TaillesSection;
