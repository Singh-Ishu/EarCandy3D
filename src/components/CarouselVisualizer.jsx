import { useEffect, useRef, useState } from "react";
import "./CarouselVisualizer.css";

export default function CarouselVisualizer() {
    const barCount = 100;
    const [heights, setHeights] = useState(Array(barCount).fill(20));
    const containerRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const bounds = containerRef.current.getBoundingClientRect();
            const x = e.clientX - bounds.left;
            const ratio = x / bounds.width;

            const newHeights = Array.from({ length: barCount }, (_, i) => {
                const distance = Math.abs(i / barCount - ratio);
                return 20 + Math.max(0, 100 - distance * 400); // responsive wave shape
            });

            setHeights(newHeights);
        };

        const container = containerRef.current;
        container.addEventListener("mousemove", handleMouseMove);
        return () =>
            container.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="carousel-visualizer" ref={containerRef}>
            {heights.map((h, i) => (
                <svg className="carousel-visualizer-bar" key={i}>
                    <rect
                        x="0"
                        y={50 - h / 2} // center from middle
                        width="100%"
                        height={h}
                        className="bar-rect"
                    />
                </svg>
            ))}
        </div>
    );
}
