import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ArtisanCard from "../components/ArtisanCard";
import { apiGet } from "../services/api";

export default function Home() {
  const [artisans, setArtisans] = useState([]);
  const [topArtisans, setTopArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        setLoading(true);
        setError(null);

        // Récupère les artisans "top" et la liste complète en parallèle
        const [topData, allData] = await Promise.all([
          apiGet("/artisans/top"),
          apiGet("/artisans"),
        ]);

        if (!isMounted) return;

        setTopArtisans(Array.isArray(topData) ? topData : []);
        setArtisans(Array.isArray(allData) ? allData : []);
      } catch (err) {
        if (!isMounted) return;
        setError("Impossible de charger les artisans. Veuillez réessayer plus tard.");
        setTopArtisans([]);
        setArtisans([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <Header />

      <main id="main-content" className="container mt-4">
        <section>
          <h2>Comment trouver mon artisan ?</h2>
          <ol>
            <li>Choisir la catégorie artisanat.</li>
            <li>Choisir un artisan.</li>
            <li>Le contacter via le formulaire.</li>
            <li>Une réponse sous 48h.</li>
          </ol>
        </section>

        <section className="mt-5">
          <h2>Les artisans du mois</h2>

          {loading && (
            <div className="my-3">
              <span className="text-muted">Chargement des artisans du mois…</span>
            </div>
          )}

          {error && (
            <div className="alert alert-danger my-3" role="alert">
              {error}
            </div>
          )}

          {!loading && !error && topArtisans.length === 0 && (
            <div className="text-muted my-3">Aucun artisan du mois pour le moment.</div>
          )}

          <div className="row">
            {topArtisans.map((artisan) => (
              <div className="col-md-4 mb-3" key={artisan.id}>
                <ArtisanCard artisan={artisan} />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-5">
          <h1>Top Artisans</h1>

          {loading && (
            <div className="my-3">
              <span className="text-muted">Chargement de la liste des artisans…</span>
            </div>
          )}

          {!loading && !error && artisans.length === 0 && (
            <div className="text-muted my-3">Aucun artisan trouvé.</div>
          )}

          <div className="row">
            {artisans.map((artisan) => (
              <div className="col-md-4 mb-3" key={artisan.id}>
                <ArtisanCard artisan={artisan} />
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

