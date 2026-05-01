import {Link} from "react-router-dom";

export default function Footer() {
    return (
        <footer className="footer p-4 mt-5">
            <div className="container">
            <nav>
                <Link to="/legal/mentions">Mentions légales</Link>.{" "}
                <Link to="/legal/donnees">Données personnelles</Link>.{" "}
                <Link to="/legal/accessibilite">Accessibilité</Link>.{" "}
                <Link to="/legal/cookies">Cookies</Link>
            </nav>

            <address className="mt-3">
            101 cours Charlemagne <br />
            CS 20033 -69269 LYON CEDEX 02 <br />
            France <br />
            +33 (0)4 26 73 40 00
            </address>
            </div>
        </footer>
    );
}   

