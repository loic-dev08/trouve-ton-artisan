import { useEffect,useState } from "react";
import api from "../api/api";
import { Link,useNavigate} from "react-router-dom";

export default function Header() {
  const [cats, setCats] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    api.get("/categories").then(res =>setCats(res.data));
  },[]);

  const onSearch =(e) => {
    e.preventDefault();
    navigate(`/recherche?q{search}`);
  };

 return (
  <header className="p-3 bg-light border-bottom">
    <div className="container d-flex justify-content-between">
      <Link to = "/" className="navbar-brand">
      <img src="./Logo.png" height ="50" alt="Trouve ton artisan" />
      </Link>

      <nav className="d-flex gap-4">
        {cats.map (c => (
          <Link key ={c.id} to ={`/categorie/${c.id}`}>{c.nom}</Link>
        ))}
      </nav>
      <form onSubmit={onSearch}>
        <input
         type="text"placeholder="Rechercher..." onChange={e => setSearch(e.target.value)}/>
      </form>
    </div>
  </header>
 );

 }