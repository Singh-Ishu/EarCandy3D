import { useState, useEffect } from "react";
import "./ShopPage.css";
import ShopSidebar from "../components/ShopSidebar";
import ShopSearch from "../components/ShopSearch";
import ResponsiveProductCard from "../components/ResponsiveProductCard";

const allProducts = [
    {
        id: 1,
        name: "Audiomaster Alpha",
        image: "/template_img.webp",
        description: "High-quality sound with a sleek design perfect for audiophiles.",
        price: 129.99,
        category: "headphones",
        series: "XMZ",
        rating: 4.5
    },
    {
        id: 2,
        name: "BassBeast X",
        image: "/template_img.webp",
        description: "Deep bass and crystal clarity for an immersive experience.",
        price: 159.99,
        category: "headphones",
        series: "Audiphilic",
        rating: 4.8
    },
    {
        id: 3,
        name: "CrystalSound Pro",
        image: "/template_img.webp",
        description: "True wireless experience with premium sound quality.",
        price: 199.99,
        category: "speakers",
        series: "XMZ",
        rating: 4.2
    },
    {
        id: 4,
        name: "EchoBuds 2",
        image: "/template_img.webp",
        description: "Alexa built-in, all-day battery life for convenience.",
        price: 89.99,
        category: "accessories",
        series: "Oompa Loompa",
        rating: 3.9
    },
    {
        id: 5,
        name: "SoundWave Elite",
        image: "/template_img.webp",
        description: "Premium soundbar with surround sound technology.",
        price: 299.99,
        category: "soundbars",
        series: "Audiphilic",
        rating: 4.6
    },
    {
        id: 6,
        name: "Luxury Audio Master",
        image: "/template_img.webp",
        description: "High-end luxury audio system for the discerning listener.",
        price: 799.99,
        category: "luxury",
        series: "XMZ",
        rating: 4.9
    },
    {
        id: 7,
        name: "Studio Monitor Pro",
        image: "/template_img.webp",
        description: "Professional studio monitors for accurate sound reproduction.",
        price: 449.99,
        category: "speakers",
        series: "Audiphilic",
        rating: 4.7
    },
    {
        id: 8,
        name: "Wireless Freedom",
        image: "/template_img.webp",
        description: "Complete wireless freedom with exceptional battery life.",
        price: 179.99,
        category: "headphones",
        series: "Oompa Loompa",
        rating: 4.3
    }
];

function ShopPage() {
    const [filteredProducts, setFilteredProducts] = useState(allProducts);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        priceRange: [0, 1000],
        categories: [],
        series: [],
        rating: "",
        sortBy: "featured"
    });

    useEffect(() => {
        applyFilters();
    }, [filters, searchTerm]);

    const applyFilters = () => {
        let filtered = [...allProducts];

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply price range filter
        filtered = filtered.filter(product =>
            product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
        );

        // Apply category filter
        if (filters.categories.length > 0) {
            filtered = filtered.filter(product =>
                filters.categories.includes(product.category)
            );
        }

        // Apply series filter
        if (filters.series.length > 0) {
            filtered = filtered.filter(product =>
                filters.series.includes(product.series)
            );
        }

        // Apply rating filter
        if (filters.rating) {
            const minRating = parseInt(filters.rating);
            filtered = filtered.filter(product => product.rating >= minRating);
        }

        // Apply sorting
        switch (filters.sortBy) {
            case "price-low":
                filtered.sort((a, b) => a.price - b.price);
                break;
            case "price-high":
                filtered.sort((a, b) => b.price - a.price);
                break;
            case "rating":
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case "newest":
                filtered.sort((a, b) => b.id - a.id);
                break;
            default:
                // Featured - keep original order
                break;
        }

        setFilteredProducts(filtered);
    };

    const handleFiltersChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    return (
        <div className="shop-page">
            <div className="shop-layout">
                <ShopSidebar onFiltersChange={handleFiltersChange} />
                <div className="shop-content">
                    <div className="shop-header">
                        <h1 className="shop-title">Our Products</h1>
                        <p className="shop-subtitle">
                            Discover our premium collection of audio equipment
                        </p>
                    </div>
                    <ShopSearch onSearch={handleSearch} />
                    <div className="products-info">
                        <span className="products-count">
                            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                        </span>
                    </div>
                    <div className="products-grid">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <ResponsiveProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <div className="no-products">
                                <p>No products found matching your criteria.</p>
                                <p>Try adjusting your filters or search terms.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShopPage;