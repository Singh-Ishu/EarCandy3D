import { useEffect, useRef, useState } from "react";
import "./CarouselVisualizer.css";

export default function CarouselVisualizer() {
    const barCount = 100;
    const [heights, setHeights] = useState(Array(barCount).fill(20));
    const containerRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;

            const bounds = containerRef.current.getBoundingClientRect();
            const x = e.clientX - bounds.left;

            if (x < 0 || x > bounds.width) return; // Optional: ignore out-of-bounds

            const ratio = x / bounds.width;

            const newHeights = Array.from({ length: barCount }, (_, i) => {
                const distance = Math.abs(i / barCount - ratio);
                return 20 + Math.max(0, 100 - distance * 400);
            });

            setHeights(newHeights);
        };

        const handleMouseLeave = () => {
            setHeights(Array(barCount).fill(20));
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <div className="carousel-visualizer" ref={containerRef}>
            {heights.map((h, i) => (
                <svg className="carousel-visualizer-bar" key={i}>
                    <rect
                        x="0"
                        y={50 - h / 2} // center from middle
                        rx="5"
                        ry="5"
                        width="100%"
                        height={h}
                        className="bar-rect"
                    />
                </svg>
            ))}
        </div>
    );
}
