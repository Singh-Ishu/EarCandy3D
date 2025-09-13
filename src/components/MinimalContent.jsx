import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import HeadphoneModelMinimal from "./HeadphoneModelMinimal";
import "./MinimalContent.css";

export default function MinimalContent() {
    return (
        <div className="minimal-content-panel">
            <h1>MINIMAL</h1>
            <div className="headphone-canvas">
                <Canvas>
                    <ambientLight intensity={0.8} />
                    <OrbitControls enableZoom={false} />
                    <Environment preset="forest" background />
                    <HeadphoneModelMinimal />
                </Canvas>
            </div>
        </div>
    );
}
