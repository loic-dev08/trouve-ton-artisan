import { useEffect, useId, useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { apiGet } from "../services/api";
import SearchBar from "./SearchBar";

/**
 * Header global
 * - logo -> accueil
 * - menu -> catégories (alimenté depuis l'API)
 * - barre de recherche -> remonte les artisans par nom
 */

export default function Header() {
  const navigate = useNavigate();
  const collapseId = `navbar-${useId()}`;

  const [categories, setCategories] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [errorCats, setErrorCats] = useState(null);

  // Résultats de recherche (remontés par SearchBar)
  const [searchResults, setSearchResults] = useState([]);
  const [showCResults, setShowCResults] = useState(false);

  // Fermer la liste quand on clique en dehors de la zone de recherche
  useEffect(() => {
    function onDocumentClick(e) {
      if (!e.target.closest?.(".search-container")) {
        setShowCResults(false);
      }
    }

    document.addEventListener("click", onDocumentClick);
    return () => document.removeEventListener("click", onDocumentClick);
  }, []);

  // Chargement des catégories depuis l'API
  useEffect(() => {
    let isMounted = true;

    async function loadCategories() {
      try {
        setLoadingCats(true);
        setErrorCats(null);
        const data = await apiGet("/categories");
        if (isMounted) {
          setCategories(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (isMounted) {
          setErrorCats("Impossible de charger le menu.");
        }
      } finally {
        if (isMounted) {
          setLoadingCats(false);
        }
      }
    }

    loadCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  const hasResults = useMemo(() => searchResults.length > 0, [searchResults]);

  function handleResults(results) {
    setSearchResults(results);
    setShowCResults(true);
  }

  function goToArtisan(artisanId) {
    setShowCResults(false);
    setSearchResults([]);
    navigate(`/artisans/${artisanId}`);
  }

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar navbar-expand-lg py-3" aria-label="Navigation principale">
          {/* LOGO */}
          <Link to="/" className="navbar-brand d-flex align-items-center gap-2" aria-label="Retour à l'accueil">
            <img
              src="/logo.png"
              alt="Trouve ton artisan"
              width="140"
              height="40"
              style={{ objectFit: "contain" }}
            />
          </Link>

          {/* Bouton burger (mobile) */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#${collapseId}`}
            aria-controls={collapseId}
            aria-expanded="false"
            aria-label="Ouvrir ou fermer le menu"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* MENU + SEARCH */}
          <div className="collapse navbar-collapse" id={collapseId}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {loadingCats && (
                <li className="nav-item">
                  <span className="nav-link">Chargement…</span>
                </li>
              )}

              {errorCats && (
                <li className="nav-item">
                  <span className="nav-link text-danger">{errorCats}</span>
                </li>
              )}

              {!loadingCats &&
                !errorCats &&
                categories.map((cat) => (
                  <li className="nav-item" key={cat.id}>
                    <NavLink to={`/categories/${cat.slug}`} className="nav-link">
                      {cat.name}
                    </NavLink>
                  </li>
                ))}
            </ul>

            {/* Search container */}
            <div className="d-flex align-items-center position-relative search-container" style={{ minWidth: 240 }}>
              <SearchBar onResults={handleResults} />
              {/* Dropdown résultats */}
              {showCResults && hasResults && (
                <ul
                  className="list-group position-absolute shadow-sm"
                  style={{ top: "100%", right: 0, zIndex: 1050, width: 320 }}
                  role="listbox"
                  aria-label="Résultats de recherche"
                >
                  {searchResults.map((artisan) => (
                    <li
                      key={artisan.id}
                      className="list-group-item list-group-item-action"
                      role="option"
                      onClick={() => goToArtisan(artisan.id)}
                      onKeyDown={(e) => e.key === "Enter" && goToArtisan(artisan.id)}
                      tabIndex={0}
                    >
                      <div className="d-flex justify-content-between">
                        <span>{artisan.name}</span>
                        <small className="text-muted">{artisan.city || artisan.location}</small>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

