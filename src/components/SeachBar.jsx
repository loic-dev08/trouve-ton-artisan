import { useState } from "react";
import {apiGet} from "../services/apiService";

export default function SearchBar({onResults}) {
    const [query, setQuery] = useState("");

    async function handleChange(e) {
        const value = e.target.value;
        setQuery(value);

        if (value.length >= 2) {
            const results = await apiGet(`/artisans/search?q=${value}`);
            onResults(results);
        }
    }

    return (
        <label>
            <span className="visually-hidden">Rechercher un artisan...</span>
            <input
                type="search"
                value={query}
                onChange={handleChange}
                placeholder="Rechercher un artisan..."
                className="form-control"
                />
        </label>

    );
}


   

  