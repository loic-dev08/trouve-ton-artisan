import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Header from "../components/Header";  
import Footer from "../components/Footer";  
import ArtisanCard from "../components/ArtisanCard";
import { apiGet } from "../services/api";

export default function Category() {
    const { slug } = useParams();
    const [artisans, setArtisans] = useState([]);

    useEffect(() => {
        apiGet(`/categories/${slug}/artisans`).then(setArtisans);
    }, [slug]);

    return (
        <>
            <Header />
            <main className="container mt-4">
                <h1>Artisans</h1>
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
            
