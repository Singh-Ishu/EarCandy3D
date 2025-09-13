import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import HeadphoneModelFunky from "./HeadphoneModelFunky";
import "./FunkyContent.css";

export default function FunkyContent() {
    return (
        <div className="funky-content-panel">
            <h1>FUNKY</h1>
            <div className="headphone-canvas">
                <Canvas>
                    <ambientLight intensity={0.8} />
                    <OrbitControls enableZoom={false} />
                    <HeadphoneModelFunky />
                </Canvas>
            </div>
        </div>
    );
}
