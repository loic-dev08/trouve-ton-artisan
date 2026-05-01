import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import {apiGet} from "../services/api";
import SearchBar from "./SearchBar";

export default function Header() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        apiGet("/categories").then(setCategories);
    }, []);

    return (
        <header className="header p-3">
            <div className="container d-flex justify-content-between align-items-center">
                <Link to="/" >
                    <img src="/logo.png" alt="Trouve ton artisan" height="40" />
                    </Link>

                    <nav>
                        {categories.map((cat) => (
                            <Link key={cat.id} to={`/categories/${cat.slug}`} className="me-3">
                                {cat.name}
                            </Link>
                        ))}
                    </nav>

                <SearchBar onResults={() => {}} />
            </div>
        </header>
    );
}
