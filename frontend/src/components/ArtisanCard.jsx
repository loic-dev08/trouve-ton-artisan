import { Link } from "react-router-dom";
import RatingStars from "./RatingStars";

export default function ArtisanCard({ artisan }) {
  return (
    <Link to={`/artisan/${artisan.id_artisan}`} className="artisan-card">
      <img src={artisan.image_url} alt={artisan.nom} />
      <h3>{artisan.nom}</h3>
      <RatingStars note={artisan.note} />
      <p>{artisan.specialite?.nom}</p>
      <p>{artisan.ville} ({artisan.code_postal})</p>
    </Link>
  );
}