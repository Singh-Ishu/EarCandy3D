import './ShopSearch.css';

export default function ShopSearch() {
    return (
        <div className="shop-search">
            <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Search products..." 
                    className="search-input"
                />
                <button className="search-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </button>
            </div>
            
            <div className="sort-container">
                <select className="sort-select">
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                    <option value="newest">Newest</option>
                </select>
            </div>
        </div>
    );
};
