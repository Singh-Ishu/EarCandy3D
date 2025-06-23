import "./ShopPage.css";
import ShopSidebar from "../components/ShopSidebar";
import ShopSearch from "../components/ShopSearch";
import VerticalProductCard from "../components/VerticalProductCard";

const products = [
    {
        name: "Audiomaster Alpha",
        image: "/template_img.webp",
        description: "High-quality sound with a sleek design.",
        price: 129.99,
    },
    {
        name: "BassBeast X",
        image: "/template_img.webp",
        description: "Deep bass and crystal clarity.",
        price: 159.99,
    },
    {
        name: "CrystalSound Pro",
        image: "/template_img.webp",
        description: "True wireless experience.",
        price: 199.99,
    },
    {
        name: "EchoBuds 2",
        image: "/template_img.webp",
        description: "Alexa built-in, all-day battery.",
        price: 89.99,
    },
];

function ShopPage() {
    return (
        <div className="shop-page" style={{ display: 'flex', minHeight: '80vh' }}>
            <ShopSidebar />
            <div style={{ flex: 1, padding: '32px' }}>
                <ShopSearch />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px', marginTop: '32px' }}>
                    {products.map((product, idx) => (
                        <VerticalProductCard key={idx} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ShopPage;
