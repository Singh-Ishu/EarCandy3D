import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import ShopPage from "./ShopPage";
import "./ExperienceBlissCTA.css";

const ExperienceBlissCTA = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const leftRef = useRef(null);
    const rightRef = useRef(null);
    const glassRef = useRef(null);
    const buttonRef = useRef(null);
    const shopPageRef = useRef(null);

    const handleHover = () => {
        gsap.to(leftRef.current, {
            x: "-100%",
            duration: 0.6,
            ease: "power2.out",
        });
        gsap.to(rightRef.current, {
            x: "100%",
            duration: 0.6,
            ease: "power2.out",
        });
        gsap.to(glassRef.current, {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
        });
        gsap.to(shopPageRef.current, {
            opacity: 0.8,
            duration: 0.6,
            ease: "power2.out",
        });
    };

    const handleHoverExit = () => {
        gsap.to(leftRef.current, {
            x: 0,
            duration: 0.6,
            ease: "power2.in",
        });
        gsap.to(rightRef.current, {
            x: 0,
            duration: 0.6,
            ease: "power2.in",
        });
        gsap.to(glassRef.current, {
            opacity: 0,
            duration: 0.6,
            ease: "power2.in",
        });
        gsap.to(shopPageRef.current, {
            opacity: 0,
            duration: 0.6,
            ease: "power2.in",
        });
    };

    const handleClick = () => {
        gsap.to([glassRef.current, buttonRef.current], {
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => navigate("/shop"),
        });
    };

    useEffect(() => {
        gsap.set(leftRef.current, { x: 0 });
        gsap.set(rightRef.current, { x: 0 });
        gsap.set(glassRef.current, { opacity: 0 });
        gsap.set(shopPageRef.current, { opacity: 0 });
    }, []);

    return (
        <div className="experience-bliss-cta" ref={containerRef}>
            <div className="shop-page-preview" ref={shopPageRef}>
                <ShopPage />
            </div>
            <div className="split left" ref={leftRef}></div>
            <div className="split right" ref={rightRef}></div>
            <div className="glass-blur" ref={glassRef}></div>
            <button
                className="cta-button"
                ref={buttonRef}
                onMouseEnter={handleHover}
                onMouseLeave={handleHoverExit}
                onClick={handleClick}
            >
                Experience Bliss
            </button>
        </div>
    );
};

export default ExperienceBlissCTA;
