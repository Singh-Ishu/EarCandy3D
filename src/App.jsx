import "./App.css";
import ExperienceBlissCTA from "./components/ExperienceBlissCTA";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import ProductShowcase from "./pages/ProductShowcase";

function App() {
    return (
        <>
            <Landing />
            <ProductShowcase />
            <ExperienceBlissCTA />
            <Footer />
        </>
    );
}

export default App;
