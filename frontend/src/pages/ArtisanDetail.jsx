import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet, apiPost } from "../api/api";
import RatingStars from "../components/RatingStars";

export default function ArtisanDetail() {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [form, setForm] = useState({ nom: "", email: "", objet: "", message: "" });

  useEffect(() => {
    apiGet(`/artisans/${id}`).then(setArtisan);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await apiPost(`/artisans/${id}/contact`, form);
    alert("Message envoyé !");
  };

  if (!artisan) return <p>Chargement...</p>;

  return (
    <div className="artisan-detail">
      <img src={artisan.image_url} alt={artisan.nom} />
      <h1>{artisan.nom}</h1>
      <RatingStars note={artisan.note} />
      <p>{artisan.specialite.nom}</p>
      <p>{artisan.ville} ({artisan.code_postal})</p>

      <section>
        <h2>À propos</h2>
        <p>{artisan.description}</p>
      </section>

      <section>
        <h2>Contact</h2>
        <form onSubmit={handleSubmit}>
          <input placeholder="Nom" onChange={e => setForm({ ...form, nom: e.target.value })} />
          <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
          <input placeholder="Objet" onChange={e => setForm({ ...form, objet: e.target.value })} />
          <textarea placeholder="Message" onChange={e => setForm({ ...form, message: e.target.value })} />
          <button type="submit">Envoyer</button>
        </form>
      </section>

      {artisan.site_web && (
        <p><a href={artisan.site_web} target="_blank">Site web</a></p>
      )}
    </div>
  );
}