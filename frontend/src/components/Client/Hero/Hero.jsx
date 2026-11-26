
import './Hero.css';

function Hero() {
  return (
    <section className="hero" id="accueil">
      <div className="hero-content">
        <h1>Pizza Pete's</h1>
        <p>La passion de la pizza, le goût de la tradition.</p>
        <a href="#commande" className="hero-button">
          Commander maintenant
        </a>
      </div>
    </section>
  );
}

export default Hero;
