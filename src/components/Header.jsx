/*The component is a header nav that is available on all pages.Header
The brand logo links to the home page.
The search bar allows users to search for products.
The profile icon links to the profile page
The cart icon links to the cart page*/

import "./Header.css";

export default function Header() {
    return (
        <div className="Header">
            <h1>EARCANDY.CO</h1>
            <div id="nav-icons-div">
                <i className="material-icons">shopping_cart</i>
                <i className="material-icons">person</i>
            </div>
        </div>
    );
}
