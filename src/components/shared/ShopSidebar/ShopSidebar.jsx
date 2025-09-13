import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./ShopSidebar.css";

const ShopSidebar = ({ onFiltersChange }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filters, setFilters] = useState({
        priceRange: [0, 1000],
        categories: [],
        series: [],
        rating: "",
        sortBy: "featured"
    });

    // Initialize filters from URL params
    useEffect(() => {
        const category = searchParams.get('category');
        const newFilters = {
            priceRange: [0, 1000],
            categories: [],
            series: [],
            rating: "",
            sortBy: "featured"
        };
        
        if (category) {
            newFilters.categories = [category];
        }
        
        setFilters(newFilters);
        onFiltersChange?.(newFilters);
    }, [searchParams]);

    const updateFilters = (newFilters) => {
        setFilters(newFilters);
        onFiltersChange?.(newFilters);
        
        // Update URL params
        const params = new URLSearchParams(searchParams);
        if (newFilters.categories.length > 0) {
            params.set('category', newFilters.categories[0]);
        } else {
            params.delete('category');
        }
        setSearchParams(params);
    };

    const handlePriceChange = (index, value) => {
        const newPriceRange = [...filters.priceRange];
        newPriceRange[index] = parseInt(value);
        
        // Ensure min doesn't exceed max and vice versa
        if (index === 0 && newPriceRange[0] > newPriceRange[1]) {
            newPriceRange[1] = newPriceRange[0];
        }
        if (index === 1 && newPriceRange[1] < newPriceRange[0]) {
            newPriceRange[0] = newPriceRange[1];
        }
        
        updateFilters({ ...filters, priceRange: newPriceRange });
    };

    const handleCategoryChange = (category) => {
        const newCategories = filters.categories.includes(category)
            ? filters.categories.filter(c => c !== category)
            : [...filters.categories, category];
        
        updateFilters({ ...filters, categories: newCategories });
    };

    const handleSeriesChange = (series) => {
        const newSeries = filters.series.includes(series)
            ? filters.series.filter(s => s !== series)
            : [...filters.series, series];
        
        updateFilters({ ...filters, series: newSeries });
    };

    const handleRatingChange = (rating) => {
        updateFilters({ ...filters, rating });
    };

    const handleSortChange = (sortBy) => {
        updateFilters({ ...filters, sortBy });
    };

    const clearAllFilters = () => {
        const clearedFilters = {
            priceRange: [0, 1000],
            categories: [],
            series: [],
            rating: "",
            sortBy: "featured"
        };
        setFilters(clearedFilters);
        onFiltersChange?.(clearedFilters);
        
        // Clear URL params
        const params = new URLSearchParams();
        setSearchParams(params);
    };

    return (
        <div className="shop-sidebar">
            <h2>Filters</h2>

            <div className="filter-section">
                <h3>Price Range</h3>
                <div className="price-range">
                    <div className="price-slider-container">
                        <input
                            type="range"
                            min="0"
                            max="1000"
                            value={filters.priceRange[0]}
                            onChange={(e) => handlePriceChange(0, e.target.value)}
                            className="price-slider min-slider"
                        />
                        <input
                            type="range"
                            min="0"
                            max="1000"
                            value={filters.priceRange[1]}
                            onChange={(e) => handlePriceChange(1, e.target.value)}
                            className="price-slider max-slider"
                        />
                        <div className="slider-track"></div>
                        <div 
                            className="slider-range"
                            style={{
                                left: `${(filters.priceRange[0] / 1000) * 100}%`,
                                width: `${((filters.priceRange[1] - filters.priceRange[0]) / 1000) * 100}%`
                            }}
                        ></div>
                    </div>
                    <div className="price-inputs">
                        <input
                            type="number"
                            placeholder="Min"
                            value={filters.priceRange[0]}
                            onChange={(e) => handlePriceChange(0, e.target.value)}
                            min="0"
                            max="1000"
                        />
                        <input
                            type="number"
                            placeholder="Max"
                            value={filters.priceRange[1]}
                            onChange={(e) => handlePriceChange(1, e.target.value)}
                            min="0"
                            max="1000"
                        />
                    </div>
                </div>
            </div>

            <div className="filter-section">
                <h3>Sort by</h3>
                <select 
                    className="sort-select"
                    value={filters.sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                    <option value="newest">Newest</option>
                </select>
            </div>

            <div className="filter-section">
                <h3>Categories</h3>
                <div className="category-filters">
                    {['headphones', 'speakers', 'soundbars', 'luxury', 'accessories'].map(category => (
                        <label key={category}>
                            <input
                                type="checkbox"
                                checked={filters.categories.includes(category)}
                                onChange={() => handleCategoryChange(category)}
                            />
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </label>
                    ))}
                </div>
            </div>

            <div className="filter-section">
                <h3>Series</h3>
                <div className="series-filters">
                    {['XMZ', 'Audiphilic', 'Oompa Loompa'].map(series => (
                        <label key={series}>
                            <input
                                type="checkbox"
                                checked={filters.series.includes(series)}
                                onChange={() => handleSeriesChange(series)}
                            />
                            {series}
                        </label>
                    ))}
                </div>
            </div>

            <div className="filter-section">
                <h3>Rating</h3>
                <div className="rating-filters">
                    {['4', '3', '2'].map(rating => (
                        <label key={rating}>
                            <input
                                type="radio"
                                name="rating"
                                checked={filters.rating === rating}
                                onChange={() => handleRatingChange(rating)}
                            />
                            {rating}★ & above
                        </label>
                    ))}
                </div>
            </div>
            
            <button className="clear-filters-btn" onClick={clearAllFilters}>
                Clear All Filters
            </button>
        </div>
    );
};

export default ShopSidebar;