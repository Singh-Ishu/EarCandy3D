import { useState } from "react";
import "./ShopSearch.css";

export default function ShopSearch({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch?.(searchTerm);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        // Real-time search as user types
        onSearch?.(value);
    };

    return (
        <div className="shop-search">
            <form onSubmit={handleSearch} className="search-container">
                <input
                    type="text"
                    placeholder="Search products..."
                    className="search-input"
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                <button type="submit" className="search-button">
                    <i className="material-icons">search</i>
                </button>
            </form>
        </div>
    );
}