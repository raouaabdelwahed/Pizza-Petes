
import './PrixPizzaSection.css';

function PrixPizzaSection({ prixPizza }) {
  return (
    <section className="prix-pizza-section" id="prix-pizzas">
      <h2>Prix de nos pizzas</h2>
      <p className="prix-pizza-intro">
        Consultez les prix selon la taille et le type de pâte.
      </p>

      <div className="prix-pizza-list">
        {prixPizza.map(prix => (
          <div className="prix-pizza-card" key={prix.idPrix}>
            <h3>{prix.taille?.nom}</h3>
            <p>{prix.pate?.nom}</p>
            <strong>{Number(prix.prixBase || 0).toFixed(2)} DT</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PrixPizzaSection;
