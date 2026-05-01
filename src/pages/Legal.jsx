import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

/**
 * Legal page component
 *
 * - Gère les 4 pages légales via le paramètre de route `:page`
 *   (mentions | donnees | accessibilite | cookies)
 * - Contient uniquement header + footer + message "Page en construction"
 * - Accessible (landmarks, aria, skip link), mobile first, SEO minimal (title + meta description)
 * - Styles attendus via Bootstrap / Sass (classes utilitaires)
 */

const PAGES = {
  mentions: {
    title: "Mentions légales",
    description:
      "Page en construction — Mentions légales du site Trouve ton artisan. Contenu à venir.",
  },
  donnees: {
    title: "Données personnelles",
    description:
      "Page en construction — Politique de protection des données personnelles. Contenu à venir.",
  },
  accessibilite: {
    title: "Accessibilité",
    description:
      "Page en construction — Informations sur l'accessibilité (WCAG 2.1). Contenu à venir.",
  },
  cookies: {
    title: "Cookies",
    description:
      "Page en construction — Politique de cookies. Contenu à venir.",
  },
};

export default function Legal() {
  const { page } = useParams(); // route: /legal/:page
  const key = page && PAGES[page] ? page : "mentions";
  const { title, description } = PAGES[key];

  useEffect(() => {
    // SEO minimal : titre et meta description
    document.title = `${title} — Trouve ton artisan`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);
  }, [title, description]);

  return (
    <>
      {/* Skip link for keyboard users */}
      <a className="visually-hidden-focusable" href="#mainContent">
        Aller au contenu
      </a>

      <Header />

      <main id="mainContent" role="main" className="container py-4">
        <nav aria-label="Fil d'Ariane" className="mb-3">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Accueil</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/legal/mentions">Mentions légales</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {title}
            </li>
          </ol>
        </nav>

        <section aria-labelledby="legalTitle" className="bg-white p-3 rounded shadow-sm">
          <h1 id="legalTitle" className="h3 mb-3">
            {title}
          </h1>

          {/* Message d'attente conforme à la consigne */}
          <div
            className="alert alert-info"
            role="status"
            aria-live="polite"
          >
            <strong>Page en construction</strong>
            <p className="mb-0">Le contenu de cette page sera ajouté prochainement par un cabinet spécialisé.</p>
          </div>

          {/* Informations de contact utiles pour la collectivité (accessibles) */}
          <div className="mt-4">
            <h2 className="h5">Contact</h2>
            <address>
              <strong>Région Auvergne-Rhône-Alpes — Antenne de Lyon</strong>
              <br />
              101 cours Charlemagne
              <br />
              CS 20033
              <br />
              69269 LYON CEDEX 02
              <br />
              France
              <br />
              <a href="tel:+33426734000">+33 (0)4 26 73 40 00</a>
            </address>
          </div>
        </section>

        {/* Liens rapides vers les autres pages légales */}
        <nav aria-label="Pages légales" className="mt-4">
          <ul className="list-inline">
            <li className="list-inline-item">
              <Link to="/legal/mentions" className={key === "mentions" ? "fw-bold" : ""}>
                Mentions légales
              </Link>
            </li>
            <li className="list-inline-item">·</li>
            <li className="list-inline-item">
              <Link to="/legal/donnees" className={key === "donnees" ? "fw-bold" : ""}>
                Données personnelles
              </Link>
            </li>
            <li className="list-inline-item">·</li>
            <li className="list-inline-item">
              <Link to="/legal/accessibilite" className={key === "accessibilite" ? "fw-bold" : ""}>
                Accessibilité
              </Link>
            </li>
            <li className="list-inline-item">·</li>
            <li className="list-inline-item">
              <Link to="/legal/cookies" className={key === "cookies" ? "fw-bold" : ""}>
                Cookies
              </Link>
            </li>
          </ul>
        </nav>
      </main>

      <Footer />
    </>
  );
}

