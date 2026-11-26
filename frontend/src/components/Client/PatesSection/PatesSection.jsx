
import './PatesSection.css';

function PatesSection({ typesPate }) {
  return (
    <section className="pates-section" id="pates">
      <h2>Nos types de pâte</h2>
      <p className="pates-intro">
        Découvrez nos différentes pâtes.
      </p>

      <div className="pates-list">
        {typesPate.map(pate => (
          <div className="pate-card" key={pate.idPate}>
            <h3>{pate.nom}</h3>
            {pate.description && <p>{pate.description}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

export default PatesSection;
