import "./App.css";
import { Routes, Route } from "react-router-dom";
import ExperienceBlissCTA from "./pages/ExperienceBlissCTA";
import Footer from "./components/layout/Footer/Footer";
import ProductShowcase from "./pages/ProductShowcase";
import ShopPage from "./pages/ShopPage";
import SplitScreenComparison from "./pages/SplitScreenComparison";
import ProfilePage from "./pages/ProfilePage";
import CartPage from "./pages/CartPage";

function App() {
    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <SplitScreenComparison />
                            <ProductShowcase />
                            <ExperienceBlissCTA />
                        </>
                    }
                />
                <Route path="/products/:id" element={<ProductShowcase />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/cart" element={<CartPage />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
