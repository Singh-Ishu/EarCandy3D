import { useState } from "react";
import "./CartPage.css";
import templateImg from "../assets/template_img.webp";

export default function CartPage() {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Audiomaster Alpha",
            image: templateImg,
            price: 129.99,
            quantity: 2,
        },
        {
            id: 2,
            name: "BassBeast X",
            image: templateImg,
            price: 159.99,
            quantity: 1,
        },
        {
            id: 3,
            name: "CrystalSound Pro",
            image: templateImg,
            price: 199.99,
            quantity: 1,
        },
    ]);

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity <= 0) {
            removeItem(id);
            return;
        }
        setCartItems((items) =>
            items.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const removeItem = (id) => {
        setCartItems((items) => items.filter((item) => item.id !== id));
    };

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const tax = subtotal * 0.08; // 8% tax
    const shipping = subtotal > 100 ? 0 : 9.99;
    const total = subtotal + tax + shipping;

    return (
        <div className="cart-page">
            <div className="cart-container">
                <div className="cart-header">
                    <h1>Shopping Cart</h1>
                    <span className="item-count">
                        {cartItems.length} item
                        {cartItems.length !== 1 ? "s" : ""}
                    </span>
                </div>

                {cartItems.length === 0 ? (
                    <div className="empty-cart">
                        <i className="material-icons">shopping_cart</i>
                        <h2>Your cart is empty</h2>
                        <p>Add some products to get started</p>
                        <button className="continue-shopping-btn">
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <div className="cart-content">
                        <div className="cart-items">
                            {cartItems.map((item) => (
                                <div key={item.id} className="cart-item">
                                    <div className="item-image">
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <div className="item-details">
                                        <h3>{item.name}</h3>
                                        <p className="item-price">
                                            ${item.price.toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="quantity-controls">
                                        <button
                                            className="quantity-btn"
                                            onClick={() =>
                                                updateQuantity(
                                                    item.id,
                                                    item.quantity - 1
                                                )
                                            }
                                        >
                                            -
                                        </button>
                                        <span className="quantity">
                                            {item.quantity}
                                        </span>
                                        <button
                                            className="quantity-btn"
                                            onClick={() =>
                                                updateQuantity(
                                                    item.id,
                                                    item.quantity + 1
                                                )
                                            }
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className="item-total">
                                        $
                                        {(item.price * item.quantity).toFixed(
                                            2
                                        )}
                                    </div>
                                    <button
                                        className="remove-btn"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        <i className="material-icons">delete</i>
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="cart-summary">
                            <h2>Order Summary</h2>
                            <div className="summary-line">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="summary-line">
                                <span>Tax</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <div className="summary-line">
                                <span>Shipping</span>
                                <span>
                                    {shipping === 0
                                        ? "Free"
                                        : `$${shipping.toFixed(2)}`}
                                </span>
                            </div>
                            {shipping === 0 && (
                                <div className="free-shipping-note">
                                    🎉 Free shipping on orders over $100!
                                </div>
                            )}
                            <div className="summary-line total">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <button className="checkout-btn">
                                Proceed to Checkout
                            </button>
                            <button className="continue-shopping-btn">
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
