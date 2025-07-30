import React, { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";

import HeadphoneModelMinimal from "./components/HeadphoneModelMinimal";
import HeadphoneModelFunky from "./components/HeadphoneModelFunky";
import MinimalContent from "./components/MinimalContent";
import FunkyContent from "./components/FunkyContent";

import "./SplitScreenComparison.css";

export default function SplitScreenComparison() {
    const [splitPosition, setSplitPosition] = useState(50); // Initial position 50%
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);

    // --- Slider Interaction Logic ---
    const handleMouseDown = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleMouseMove = (e) => {
        if (!isDragging || !containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const newPosition =
            ((e.clientX - containerRect.left) / containerRect.width) * 100;

        // Constrain the slider between 10% and 90% to avoid hiding one side completely
        const constrainedPosition = Math.max(10, Math.min(90, newPosition));
        setSplitPosition(constrainedPosition);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // --- Touch events for mobile ---
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

    // Add and remove event listeners based on dragging state
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
    }, [isDragging]); // Dependency array ensures effect runs only when isDragging changes

    return (
        <div className="split-screen-container" ref={containerRef}>
            {/* Layer 1: 3D Models (rendered fullscreen, clipped by wrappers) */}
            <div className="model-layer">
                {/* Minimal Headphone: always covers the full width underneath the funky one */}
                <div className="model-canvas-wrapper minimal-headphone-wrapper">
                    <Canvas>
                        <ambientLight intensity={0.8} />{" "}
                        {/* General scene lighting */}
                        <OrbitControls enableZoom={false} />{" "}
                        {/* Disable zoom to keep model size consistent */}
                        <Environment preset="forest" background />{" "}
                        {/* Environmental lighting and background */}
                        <HeadphoneModelMinimal />
                    </Canvas>
                </div>

                {/* Funky Headphone: its wrapper's width and position change to reveal/hide it */}
                <div
                    className="model-canvas-wrapper funky-headphone-wrapper"
                    style={{
                        width: `${100 - splitPosition}%`,
                        left: `${splitPosition}%`,
                    }}
                >
                    <Canvas>
                        <ambientLight intensity={0.8} />
                        <OrbitControls enableZoom={false} />
                        <Environment preset="studio" background />{" "}
                        {/* Different environment for funky look */}
                        <HeadphoneModelFunky />
                    </Canvas>
                </div>
            </div>

            {/* Layer 2: Content (Backgrounds and Text) */}
            <div className="content-layer">
                {/* Left Content Panel (Minimal) */}
                <div
                    className="content-panel left-content-panel"
                    style={{ width: `${splitPosition}%` }}
                >
                    <MinimalContent />
                </div>

                {/* Right Content Panel (Funky) */}
                <div
                    className="content-panel right-content-panel"
                    style={{ width: `${100 - splitPosition}%` }}
                >
                    <FunkyContent />
                </div>
            </div>

            {/* Layer 3: The Slider Divider (Always on top and interactive) */}
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
