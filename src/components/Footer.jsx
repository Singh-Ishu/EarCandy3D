import "./Footer.css";

export default function Footer() {
    return (
        <div className="Footer">
            {/* <table>
                <tr>
                    <th>SHOP</th>
                    <th>SUPPORT</th>
                    <th>ABOUT US</th>
                    <th>CONTACT US</th>
                </tr>
                <tr>

                </tr>
            </table> */}
            <div className="footer-sections-container">
                <div className="footer-section" id="shop">
                    <h3>SHOP</h3>
                    <ul>
                        <li>
                            <a href="#products">Products</a>
                        </li>
                        <li>
                            <a href="#collections">Collections</a>
                        </li>
                        <li>
                            <a href="#sale">Sale</a>
                        </li>
                    </ul>
                </div>
                <div className="footer-section" id="support">
                    <h3>SUPPORT</h3>
                    <ul>
                        <li>
                            <a href="#faq">FAQ</a>
                        </li>
                        <li>
                            <a href="#shipping">Shipping</a>
                        </li>
                        <li>
                            <a href="#returns">Returns</a>
                        </li>
                    </ul>
                </div>
                <div className="footer-section" id="about-us">
                    <h3>ABOUT US</h3>
                    <ul>
                        <li>
                            <a href="#our-story">Our Story</a>
                        </li>
                        <li>
                            <a href="#careers">Careers</a>
                        </li>
                        <li>
                            <a href="#press">Press</a>
                        </li>
                    </ul>
                </div>
                <div className="footer-section" id="contact-us">
                    <h3>CONTACT US</h3>
                    <ul>
                        <li>
                            <a href="#contact-form">Contact Form</a>
                        </li>
                        <li>
                            <a href="#support-email">Support Email</a>
                        </li>
                        <li>
                            <a href="#social-media">Social Media</a>
                        </li>
                    </ul>
                </div>
                <div className="footer-section" id="socials">
                    <h3>FOLLOW US</h3>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2025 EARCANDY.CO. All rights reserved.</p>
                <p>Privacy Policy | Terms of Service</p>
            </div>
        </div>
    );
}
