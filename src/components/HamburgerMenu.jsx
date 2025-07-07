import { Link } from "react-router-dom";
import "./HamburgerMenu.css";

export default function HamburgerMenu({ onClose }) {
    const handleLinkClick = () => {
        onClose?.();
    };

    return (
        <div className="hamburger-menu-overlay">
            <nav className="hamburger-menu-content">
                <ul>
                    <li>
                        <Link to="/" onClick={handleLinkClick}>Home</Link>
                    </li>
                    <li>
                        <Link to="/shop" onClick={handleLinkClick}>Shop</Link>
                    </li>
                    <li>
                        <Link to="/shop?category=headphones" onClick={handleLinkClick}>Headphones</Link>
                    </li>
                    <li>
                        <Link to="/shop?category=speakers" onClick={handleLinkClick}>Speakers</Link>
                    </li>
                    <li>
                        <Link to="/shop?category=soundbars" onClick={handleLinkClick}>Soundbars</Link>
                    </li>
                    <li>
                        <Link to="/shop?category=luxury" onClick={handleLinkClick}>Luxury Audio</Link>
                    </li>
                    <li>
                        <Link to="/shop?category=accessories" onClick={handleLinkClick}>Accessories</Link>
                    </li>
                    <li>
                        <Link to="/profile" onClick={handleLinkClick}>Profile</Link>
                    </li>
                    <li>
                        <Link to="/cart" onClick={handleLinkClick}>Cart</Link>
                    </li>
                    <li>
                        <Link to="/search" onClick={handleLinkClick}>Search</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}