
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2>Pizza Pete's</h2>
        <p>La passion de la pizza, le goût de la tradition.</p>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Pizza Pete's. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
