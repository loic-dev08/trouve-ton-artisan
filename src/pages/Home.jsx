import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ArtisanCard from "../components/ArtisanCard";
import { apiGet } from "../services/api";

export default function Home() {
  const [artisans, setArtisans] = useState([]); 

    useEffect(() => {
      apiGet("/artisans/top").then((setTopArtisans));
    }, []);

  return ( 
    <>
      <Header />

      <main className="container mt-4">
        <section>
            <h2>Comment trouver mon artisan ?</h2>
            <ol>
                <li>Choisir la catégorie artisanat.</li>
                <li>Chosir un artisan.</li>
                <li>Le contacter via le formulaire.</li>
                <li>Une réponse sous 48h.</li>
            </ol>
        </section>

        <section className="mt-5">
            <h2>Les artisans du mois.</h2>
                <div className="row">
                    {topArtisans.map((artisan) => (
                        <div className="col-md-4" key={artisan.id}>
                            <ArtisanCard artisan={artisan} />
                        </div>
                    ))}
                </div>
        </section>
        <h1>Top Artisans</h1>
        <div className="row">
          {artisans.map((artisan) => (
            <div className="col-md-4" key={artisan.id}>
              <ArtisanCard artisan={artisan} />
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
