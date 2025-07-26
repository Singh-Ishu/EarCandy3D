import "./App.css";
import { Routes, Route } from "react-router-dom";
import ExperienceBlissCTA from "./components/ExperienceBlissCTA";
import Footer from "./components/Footer";
import SplitScreenLanding from "./components/SplitScreenLanding";
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
                            <SplitScreenLanding />
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
