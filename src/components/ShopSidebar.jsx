import "./ShopSidebar.css";

const ShopSidebar = () => {
    return (
        <div className="shop-sidebar">
            <h2>Filters</h2>

            <div className="filter-section">
                <h3>Price Range</h3>
                <div className="price-range">
                    <input type="range" min="0" max="1000" />
                    <div className="price-inputs">
                        <input type="number" placeholder="Min" />
                        <input type="number" placeholder="Max" />
                    </div>
                </div>
            </div>

            <div className="sort-container">
                <h3>Sort by</h3>
                <select className="sort-select">
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
                    <label>
                        <input type="checkbox" /> Headphones
                    </label>
                    <label>
                        <input type="checkbox" /> Earbuds
                    </label>
                    <label>
                        <input type="checkbox" /> Speakers
                    </label>
                </div>
            </div>

            <div className="filter-section">
                <h3>Series</h3>
                <div className="series-filters">
                    <label>
                        <input type="checkbox" /> XMZ
                    </label>
                    <label>
                        <input type="checkbox" /> Audiphilic
                    </label>
                    <label>
                        <input type="checkbox" /> Oompa Loompa
                    </label>
                </div>
            </div>

            <div className="filter-section">
                <h3>Rating</h3>
                <div className="rating-filters">
                    <label>
                        <input type="radio" name="rating" /> 4★ & above
                    </label>
                    <label>
                        <input type="radio" name="rating" /> 3★ & above
                    </label>
                    <label>
                        <input type="radio" name="rating" /> 2★ & above
                    </label>
                </div>
            </div>
        </div>
    );
};

export default ShopSidebar;
