import { useEffect,useState } from "react";
import api from "../api/api";
import ArtisanCard from "../components/ArtisanCard";
import { useParams} from "react-router-dom";

export default function ArtisanList() {
  const {id} = useParams();
  const [artisans, setArtisans] = useState([]);

  useEffect(() => {
    api.get("/artisans").then(res => {
      setArtisans(res.data.filter(a =>a.specialite.categorie_id ==id));
    });
  },[id]);

  return (
    <div className="container py-5">
      <h1>Artisans</h1>
      <div className="row">
        {artisans.map(a => (
          <ArtisanCard key = {a.id} artisan ={a}/>
        ))}
      </div>
    </div>
  );
}