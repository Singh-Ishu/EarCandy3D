import "./ShopSearch.css";

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
                    <i className="material-icons">search</i>
                </button>
            </div>
        </div>
    );
}
