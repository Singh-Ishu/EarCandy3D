import "./App.css";
import { Routes, Route } from "react-router-dom";
import ExperienceBlissCTA from "./components/ExperienceBlissCTA";
import Footer from "./components/Footer";
import LandingMinimal from "./pages/LandingMinimal";
import LandingBold from "./pages/LandingBold";
import ProductShowcase from "./pages/ProductShowcase";
import ShopPage from "./pages/ShopPage";

function App() {
    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <LandingMinimal />
                            <LandingBold />
                            <ProductShowcase />
                            <ExperienceBlissCTA />
                        </>
                    }
                />
                <Route path="/products/:id" element={<ProductShowcase />} />
                <Route path="/shop" element={<ShopPage />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
