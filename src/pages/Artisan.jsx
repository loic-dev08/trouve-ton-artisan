import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RatingStars from "../components/RatingStars";
import { apiGet, apiPost } from "../services/api";

export default function Artisan() {
    const { id } = useParams();
    const [artisan, setArtisan] = useState(null);
    const [form, setForm] = useState({});

    useEffect(() => {
        apiGet(`/artisans/${id}`).then(setArtisan);
    }, [id]);

    function handleChange(e) {
        setForm({...form, [e.target.name]: e.target.value});
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await apiPost(`/artisans/${id}/contact`, form);
        alert("Message envoyé !");
    }

    if (!artisan) return  null;

    return (
        <>
            <Header />  
            <main className="container mt-4">
                <h1>{artisan.name}</h1>
                <RatingStars rating={artisan.note} />
                <p>{artisan.specialite.name} - {artisan.city}</p>

                <h2>A propos</h2>
                <p>{artisan.about}</p>

                <h2>Contact</h2>
                <form onSubmit={handleSubmit}>
                    <input name="name" placeholder="Nom" required onChange={handleChange} />
                    <input name="email" placeholder="Email" required onChange={handleChange} />
                    <input name="subject" placeholder="Objet" required onChange={handleChange} />   
                    <textarea name="message" placeholder="Message" required onChange={handleChange}></textarea>
                    <button className="btn btn-primary">Envoyer</button>
                </form>
            </main>
            <Footer />  
        </>
    );
}
                   