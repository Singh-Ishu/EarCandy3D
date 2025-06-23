import { Link } from "react-router-dom";
import "./HamburgerMenu.css";

export default function HamburgerMenu() {
    return (
        <div className="hamburger-menu-overlay">
            <nav className="hamburger-menu-content">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/shop">Shop</Link>
                    </li>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                        <Link to="/cart">Cart</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
