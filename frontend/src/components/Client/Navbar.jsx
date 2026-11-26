
import './Navbar.css';

function Navbar({
  nombrePizzas = 0,
  onAdminClick = () => {},
  afficherAdmin = false
}) {
  return (
    <nav className="navbar">
      <a href="#accueil" className="logo">
        Pizza <span>Pete's</span>
      </a>

      <div className="nav-links">
        {!afficherAdmin && (
          <>
            <a href="#accueil">Accueil</a>
            <a href="#tailles">Tailles</a>
            <a href="#pates">Nos pâtes</a>
            <a href="#garnitures">Garnitures</a>
            <a href="#prix-pizzas">Prix des pizzas</a>
            <a href="#prix-garnitures">Prix des garnitures</a>
            <a href="#commande">Commander</a>
            <a href="#panier">Panier ({nombrePizzas})</a>
            <a href="#apropos">À propos</a>
          </>
        )}

        <button type="button" onClick={onAdminClick}>
          {afficherAdmin ? 'Retour au site' : 'Administration'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
