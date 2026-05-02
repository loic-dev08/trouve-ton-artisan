import { useEffect, useRef } from "react";
import {Outlet, useLocation} from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

/**
 * Layout global
 * - garantit un seul <main id="main-content">pour toute l'app
 * - permet au skip-link de fonctionner sur toutes les routes
 * - remet le focus sur <main> à chaque navigation (SPA = pas de "reload")
 */

export default function AppLayout() {
    const mainRef = useRef(null);
    const location = useLocation();

    // IMPORTANT SPA : à chaque changement de route, on remet le focus sur le contenu principal.
    useEffect(() => {
        // focus sans scroll brutal : meilleure UX
        mainRef.current?.focus({preventScroll:true});

        // option : remonter en haut de la page (souvent attendu)
        window.scrollTo({top: 0, behavior:"instant"});
    }, [location.pathname]);

    return (
        <>
        <Header />

        {/* tablindex=-1 : focusable programmatique, sans entrer dans l'ordre de tabulation */}
        <main id="main-content"
        ref={mainRef}
        tablIndex="-1"
        className="container mt-4 mb-5">
            {/* Les pages s'affichent ici */}
            <Outlet />
        </main>

        <Footer />
        </>
    );

    
}
