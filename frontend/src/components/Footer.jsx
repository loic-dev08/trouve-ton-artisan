import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <nav>
        <ul>
          <li><Link to="/mentions-legales">Mentions légales</Link></li>
          <li><Link to="/donnees-personnelles">Données personnelles</Link></li>
          <li><Link to="/accessibilite">Accessibilité</Link></li>
          <li><Link to="/cookies">Cookies</Link></li>
        </ul>
      </nav>

      <address>
        101 cours Charlemagne<br />
        CS 20033<br />
        69269 LYON CEDEX 02<br />
        France<br />
        +33 (0)4 26 73 40 00
      </address>
    </footer>
  );
}