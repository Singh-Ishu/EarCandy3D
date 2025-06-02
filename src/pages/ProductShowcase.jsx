import "./ProductShowcase.css";
import VerticalProductCard from "../components/VerticalProductCard";
import CarouselVisualizer from "../components/CarouselVisualizer";

export default function ProductShowcase() {
    const products = [
        {
            name: "Audiomaster Alpha",
            image: "/images/product1.png",
            description: "High-quality sound with a sleek design.",
            price: 129.99,
        },
        {
            name: "BassBeast X",
            image: "/images/product2.png",
            description: "Deep bass and crystal clarity.",
            price: 159.99,
        },
        {
            name: "CrystalSound Pro",
            image: "/images/product3.png",
            description: "True wireless experience.",
            price: 199.99,
        },
        {
            name: "EchoBuds 2",
            image: "/images/product4.png",
            description: "Alexa built-in, all-day battery.",
            price: 89.99,
        },
        {
            name: "Audiomaster Alpha",
            image: "/images/product1.png",
            description: "High-quality sound with a sleek design.",
            price: 129.99,
        },
        {
            name: "BassBeast X",
            image: "/images/product2.png",
            description: "Deep bass and crystal clarity.",
            price: 159.99,
        },
        {
            name: "CrystalSound Pro",
            image: "/images/product3.png",
            description: "True wireless experience.",
            price: 199.99,
        },
        {
            name: "EchoBuds 2",
            image: "/images/product4.png",
            description: "Alexa built-in, all-day battery.",
            price: 89.99,
        },
    ];

    return (
        <div className="product-showcase">
            <div className="visualizer-container">
                <CarouselVisualizer />
            </div>
            <div className="carousel-track">
                {[...products, ...products].map((product, index) => (
                    <VerticalProductCard key={index} product={product} />
                ))}
            </div>
        </div>
    );
}
