import { BrowserRouter , Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Category from '../pages/Category';
import Artisan from"../pages/Artisan";
import Legal from '../pages/Legal';
import NotFound from '../pages/NotFound';

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/category" element={<Category />} />
                <Route path="/artisan" element={<Artisan />} />
                <Route path="/legal" element={<Legal />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}