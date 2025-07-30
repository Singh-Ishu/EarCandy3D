import "./App.css";
import { Routes, Route } from "react-router-dom";
import ExperienceBlissCTA from "./components/ExperienceBlissCTA";
import Footer from "./components/Footer";
import ProductShowcase from "./pages/ProductShowcase";
import ShopPage from "./pages/ShopPage";
import SplitScreenComparison from "./pages/SplitScreenComparison";

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
            </Routes>
            <Footer />
        </>
    );
}

export default App;
