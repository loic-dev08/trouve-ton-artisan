import { useEffect, useState } from "react";
import { apiGet } from "../api/api";
import ArtisanCard from "../components/ArtisanCard";
import StepCard from "../components/StepCard";

export default function Home() {
  const [topArtisans, setTopArtisans] = useState([]);

  useEffect(() => {
    apiGet("/artisans/top").then(setTopArtisans);
  }, []);

  return (
    <div className="home">
      <section className="steps">
        <h2>Comment trouver mon artisan ?</h2>
        <div className="steps-grid">
          <StepCard number="1" text="Choisir la catégorie d’artisanat dans le menu." />
          <StepCard number="2" text="Choisir un artisan." />
          <StepCard number="3" text="Le contacter via le formulaire de contact." />
          <StepCard number="4" text="Une réponse sera apportée sous 48h." />
        </div>
      </section>

      <section className="top-artisans">
        <h2>Artisans du mois</h2>
        <div className="artisan-grid">
          {topArtisans.map(a => <ArtisanCard key={a.id_artisan} artisan={a} />)}
        </div>
      </section>
    </div>
  );
}