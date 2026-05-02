
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";

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
 * - Route légale paramétrée (/legal/:page)
 * - Catch-all pour la 404 client-side
 */

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout global */}
        <Route element={<AppLayout />}>
          
          {/* Page d'accueil */}
          <Route path="/" element={<Home />} />

          {/* Alias /home et /Home */}
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/Home" element={<Navigate to="/" replace />} />

          {/* Catégories */}
          <Route path="/category" element={<Category />} />
          <Route path="/category/:slug" element={<Category />} />

          {/* Artisan */}
          <Route path="/artisan" element={<Artisan />} />
          <Route path="/artisan/:id" element={<Artisan />} />

          {/* Pages légales */}
          <Route path="/legal" element={<Legal />} />
          <Route path="/legal/:page" element={<Legal />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
