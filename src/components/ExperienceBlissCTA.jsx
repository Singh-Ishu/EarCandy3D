import React, { useRef } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import "./ExperienceBlissCTA.css";

function ExperienceBlissCTA() {
    const leftRef = useRef(null);
    const rightRef = useRef(null);
    const glassRef = useRef(null);
    const containerRef = useRef(null);
    const buttonRef = useRef(null);
    const navigate = useNavigate();

    const handleHover = () => {
        gsap.to([leftRef.current, rightRef.current], {
            width: "50%",
            duration: 1.2,
            ease: "power3.out",
        });

        gsap.to(glassRef.current, {
            opacity: 1,
            duration: 1,
            ease: "power2.out",
        });
    };

    const handleClick = () => {
        const tl = gsap.timeline({
            onComplete: () => navigate("/shop"),
        });

        tl.to(buttonRef.current, {
            opacity: 0,
            scale: 0.9,
            duration: 0.4,
        })
            .to(
                [leftRef.current, rightRef.current, glassRef.current],
                {
                    opacity: 0,
                    duration: 0.6,
                },
                "-=0.2"
            )
            .to(
                containerRef.current,
                {
                    opacity: 0,
                    duration: 0.8,
                    ease: "power1.out",
                },
                "-=0.5"
            );
    };

    return (
        <div className="experience-bliss-cta" ref={containerRef}>
            <div className="split left" ref={leftRef}></div>
            <div className="split right" ref={rightRef}></div>
            <div className="glass-blur" ref={glassRef}></div>

            <button
                className="cta-button"
                ref={buttonRef}
                onMouseEnter={handleHover}
                onClick={handleClick}
            >
                Experience Bliss
            </button>
        </div>
    );
}

export default ExperienceBlissCTA;
