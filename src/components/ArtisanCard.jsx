import {Link} from "react-router-dom";
import RatingStars from "./RatingStars";

export default function ArtisanCard({artisan}) {
    return (
        <Link to={`/artisan/${artisan.id}`} className="artisan-card p-3 d-block">
            <h3>{artisan.name}</h3>
            <RatingStars value={artisan.note} />
            <p>{artisan.specialite.name}</p>
            <p>{artisan.city}</p>
           
        </Link>
    );
}