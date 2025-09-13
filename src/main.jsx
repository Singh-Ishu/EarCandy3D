import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Header from "./components/layout/Header/Header";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter basename="/EarCandy3D">
            <Header />
            <App />
        </BrowserRouter>
    </StrictMode>
);
