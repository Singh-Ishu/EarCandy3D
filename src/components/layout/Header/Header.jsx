/*The component is a header nav that is available on all pages.Header
The brand logo links to the home page.
The search bar allows users to search for products.
The profile icon links to the profile page
The cart icon links to the cart page*/
import { useState } from "react";
import { Link } from "react-router-dom";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import "./Header.css";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <>
            <div className="Header">
                <div className="brand-and-options">
                    <Link to="/">
                        <h1>EARCANDY.CO</h1>
                    </Link>
                    <div className="header-options">
                        <Link
                            to="/shop?category=headphones"
                            className="header-option"
                        >
                            Headphones
                        </Link>
                        <Link
                            to="/shop?category=speakers"
                            className="header-option"
                        >
                            Speakers
                        </Link>
                        <Link
                            to="/shop?category=soundbars"
                            className="header-option"
                        >
                            Soundbars
                        </Link>
                        <Link
                            to="/shop?category=luxury"
                            className="header-option"
                        >
                            Luxury Audio
                        </Link>
                        <Link
                            to="/shop?category=accessories"
                            className="header-option"
                        >
                            Accessories
                        </Link>
                    </div>
                </div>
                <div id="nav-icons-div">
                    <Link to="/search" style={{ color: "inherit" }}>
                        <i className="material-icons">search</i>
                    </Link>
                    <Link to="/cart" style={{ color: "inherit" }}>
                        <i className="material-icons">shopping_cart</i>
                    </Link>
                    <Link to="/profile" style={{ color: "inherit" }}>
                        <i className="material-icons">person</i>
                    </Link>
                </div>
                <div id="hamburger-menu" onClick={toggleMenu}>
                    <i className="material-icons">
                        {menuOpen ? "close" : "menu"}
                    </i>
                </div>
            </div>
            {menuOpen && (
                <div className="hamburger-menu-backdrop" onClick={closeMenu}>
                    <HamburgerMenu onClose={closeMenu} />
                </div>
            )}
        </>
    );
}
