import "./VerticalProductCard.css";

export default function VerticalProductCard({ product }) {
    return (
        <div className="VerticalProductCard">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <span className="price">${product.price.toFixed(2)}</span>
            <button className="add-to-cart">Add to Cart</button>
        </div>
    );
}
