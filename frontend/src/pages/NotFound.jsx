import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found">
      <img src="https://picsum.photos/400" alt="404" />
      <h1>Page non trouvée</h1>
      <p>La page que vous avez demandée n’existe pas.</p>
      <Link to="/">Retour à l’accueil</Link>
    </div>
  );
}