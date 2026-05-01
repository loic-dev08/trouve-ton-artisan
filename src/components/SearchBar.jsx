import { useEffect, useId, useMemo, useRef, useState } from "react";
import { apiGet } from "../services/api";

/**
 * SearchBar (accessible)
 *
 * Props:
 * - onSelect(item) : callback à l'item sélectionné
 * - minlength (default 2)
 * - debounceMs (default 300)
 * - placeholder (default "Rechercher un artisan...")
 */

export default function SearchBar({
  onSelect,
  minlength = 2,
  debounceMs = 300,
  placeholder = "Rechercher un artisan...",
}) {
  const inputId = useId();
  const listboxId = useId();

  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const hasResults = useMemo(() => results.length > 0, [results]);

  // Ferme la liste quand clic extérieur
  useEffect(() => {
    function handleClickOutside(event) {
      if (!containerRef.current?.contains(event.target)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounce + fetch
  useEffect(() => {
    let ignored = false;
    let timer = null;

    async function fetchResults() {
      const q = query.trim();

      if (q.length < minlength) {
        if (!ignored) {
          setResults([]);
          setLoading(false);
          setError(null);
          setActiveIndex(-1);
          setOpen(false);
        }
        return;
      }

      if (!ignored) {
        setLoading(true);
        setError(null);
      }

      try {
        const data = await apiGet("/artisans/search?q=" + encodeURIComponent(q));
        if (!ignored) {
          const safeResults = Array.isArray(data) ? data : [];
          setResults(safeResults);
          setOpen(true);
          setActiveIndex(safeResults.length ? 0 : -1);
        }
      } catch (err) {
        if (!ignored) {
          setError("Erreur lors de la recherche");
          setResults([]);
          setOpen(true);
          setActiveIndex(-1);
        }
      } finally {
        if (!ignored) setLoading(false);
      }
    }

    timer = setTimeout(fetchResults, debounceMs);

    return () => {
      ignored = true;
      clearTimeout(timer);
    };
  }, [query, debounceMs, minlength]);

  function reset() {
    setQuery("");
    setResults([]);
    setLoading(false);
    setError(null);
    setOpen(false);
    setActiveIndex(-1);
  }

  function chooseItem(item) {
    if (!item) return;
    setOpen(false);
    setActiveIndex(-1);
    reset();
    onSelect?.(item);
  }

  function onKeyDown(e) {
    // If dropdown is closed and user presses ArrowDown and there are results, open it
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp") && hasResults) {
      e.preventDefault();
      setOpen(true);
      setActiveIndex(0);
      return;
    }

    if (!open) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!hasResults) return;
        setActiveIndex((idx) => {
          const next = idx + 1;
          return next >= results.length ? 0 : next;
        });
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!hasResults) return;
        setActiveIndex((idx) => {
          const prev = idx - 1;
          return prev < 0 ? results.length - 1 : prev;
        });
        break;
      case "Enter":
        if (activeIndex >= 0 && activeIndex < results.length) {
          e.preventDefault();
          chooseItem(results[activeIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        setActiveIndex(-1);
        break;
      default:
        break;
    }
  }

  // aria-activedescendant : l'item actif du listbox
  const activeDescendant =
    activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined;

  return (
    <div ref={containerRef} className="search-bar" style={{ minWidth: 240 }}>
      <label htmlFor={inputId} className="visually-hidden">
        Rechercher un artisan
      </label>

      <div className="position-relative">
        <input
          id={inputId}
          ref={inputRef}
          type="search"
          className="form-control"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (results.length) setOpen(true);
          }}
          onKeyDown={onKeyDown}
          autoComplete="off"
          spellCheck="false"
          role="combobox"
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-expanded={open}
          aria-activedescendant={activeDescendant}
        />

        {/* indicateur loading discret */}
        {loading && (
          <span
            className="position-absolute top-50 end-0 translate-middle-y me-3 small text-muted"
            aria-live="polite"
          >
            Chargement...
          </span>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div
          id={listboxId}
          role="listbox"
          aria-label="Résultats de recherche"
          className="searchbar__dropdown border rounded shadow-sm bg-white mt-2"
          style={{ maxHeight: "280px", overflowY: "auto" }}
        >
          {/* Message d'état */}
          {error && (
            <div className="p-3 text-danger" role="alert">
              {error}
            </div>
          )}

          {!error && !results.length && !loading && (
            <div className="p-3 text-muted" aria-live="polite">
              Aucun résultat
            </div>
          )}

          {!error && results.length > 0 && (
            <ul className="list-unstyled mb-0">
              {results.map((item, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <li
                    key={item.id}
                    id={`${listboxId}-option-${idx}`}
                    role="option"
                    aria-selected={isActive}
                    className={`searchbar__option p-0 ${isActive ? "active" : ""}`}
                  >
                    <button
                      type="button"
                      className="w-100 text-start border-0 bg-transparent p-3"
                      onMouseEnter={() => setActiveIndex(idx)}
                      onMouseLeave={() => setActiveIndex(-1)}
                      onClick={() => chooseItem(item)}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <div className="fw-semibold">{item.name}</div>
                          <div className="small text-muted">
                            {item.speciality || item.specialty || item.category || ""}
                          </div>
                        </div>
                        <div className="small text-muted">{item.city || item.location || ""}</div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

