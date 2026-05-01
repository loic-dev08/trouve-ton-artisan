import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Category from "../pages/Category";
import Artisan from "../pages/Artisan";
import Legal from "../pages/Legal";
import NotFound from "../pages/NotFound";

/**
 * Routeur principal
 *
 * - Redirections pour normaliser les URLs (/Home -> /)
 * - Routes paramétrées pour category et artisan
 * - Route légale paramétrée (/legal/:page) pour mentions/donnees/accessibilite/cookies
 * - Catch-all pour la 404 client-side
 */

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Page d'accueil */}
        <Route path="/" element={<Home />} />

        {/* Acceptation d'alias /home et /Home -> redirection vers / */}
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/Home" element={<Navigate to="/" replace />} />

        {/* Liste / page catégorie (paramétrée par slug) */}
        <Route path="/category" element={<Category />} />
        <Route path="/category/:slug" element={<Category />} />

        {/* Fiche artisan (paramétrée par id ou slug selon ton API) */}
        <Route path="/artisan" element={<Artisan />} />
        <Route path="/artisan/:id" element={<Artisan />} />

        {/* Pages légales (mentions, donnees, accessibilite, cookies) */}
        <Route path="/legal" element={<Legal />} />
        <Route path="/legal/:page" element={<Legal />} />

        {/* 404 client-side */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

