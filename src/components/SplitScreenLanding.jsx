import { useState, useRef, useEffect } from "react";
import LandingMinimal from "../pages/LandingMinimal";
import LandingBold from "../pages/LandingBold";
import "./SplitScreenLanding.css";

export default function SplitScreenLanding() {
    const [splitPosition, setSplitPosition] = useState(50); // Percentage
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);

    const handleMouseDown = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleMouseMove = (e) => {
        if (!isDragging || !containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const newPosition =
            ((e.clientX - containerRect.left) / containerRect.width) * 100;

        // Constrain between 10% and 90%
        const constrainedPosition = Math.max(10, Math.min(90, newPosition));
        setSplitPosition(constrainedPosition);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Touch events for mobile
    const handleTouchStart = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleTouchMove = (e) => {
        if (!isDragging || !containerRef.current) return;

        const touch = e.touches[0];
        const containerRect = containerRef.current.getBoundingClientRect();
        const newPosition =
            ((touch.clientX - containerRect.left) / containerRect.width) * 100;

        const constrainedPosition = Math.max(10, Math.min(90, newPosition));
        setSplitPosition(constrainedPosition);
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
            document.addEventListener("touchmove", handleTouchMove);
            document.addEventListener("touchend", handleTouchEnd);
        }

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("touchmove", handleTouchMove);
            document.removeEventListener("touchend", handleTouchEnd);
        };
    }, [isDragging]);

    return (
        <div className="split-screen-container" ref={containerRef}>
            <div
                className="split-panel left-panel"
                style={{ width: `${splitPosition}%` }}
            >
                <div className="panel-content">
                    <LandingMinimal />
                </div>
            </div>

            <div
                className="split-panel right-panel"
                style={{ width: `${100 - splitPosition}%` }}
            >
                <div className="panel-content">
                    <LandingBold />
                </div>
            </div>

            <div
                className={`split-divider ${isDragging ? "dragging" : ""}`}
                style={{ left: `${splitPosition}%` }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
            >
                <div className="divider-handle">
                    <div className="handle-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    );
}
