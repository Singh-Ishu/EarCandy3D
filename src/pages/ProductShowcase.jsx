import "./ProductShowcase.css";
import VerticalProductCard from "../components/shared/VerticalProductCard/VerticalProductCard";
import CarouselVisualizer from "../components/shared/CarouselVisualizer/CarouselVisualizer";
import templateImg from "../assets/template_img.webp";
export default function ProductShowcase() {
    const products = [
        {
            name: "Audiomaster Alpha",
            image: templateImg,
            description: "High-quality sound with a sleek design.",
            price: 129.99,
        },
        {
            name: "BassBeast X",
            image: templateImg,
            description: "Deep bass and crystal clarity.",
            price: 159.99,
        },
        {
            name: "CrystalSound Pro",
            image: templateImg,
            description: "True wireless experience.",
            price: 199.99,
        },
        {
            name: "EchoBuds 2",
            image: templateImg,
            description: "Alexa built-in, all-day battery.",
            price: 89.99,
        },
    ];

    // Create enough duplicates to ensure seamless infinite scroll
    const duplicatedProducts = [
        ...products,
        ...products,
        ...products,
        ...products,
    ];
    return (
        <div className="product-showcase">
            <div className="visualizer-container">
                <CarouselVisualizer />
            </div>
            <div className="carousel-track">
                {duplicatedProducts.map((product, index) => (
                    <VerticalProductCard key={index} product={product} />
                ))}
            </div>
        </div>
    );
}
