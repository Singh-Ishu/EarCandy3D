import React, { useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber"; // Keep useFrame here
import * as THREE from "three";

export default function HeadphoneModelFunky() {
    const { scene } = useGLTF("/models/headphone_combined.glb");
    const [processedModel, setProcessedModel] = useState(null);

    useEffect(() => {
        if (scene) {
            const clonedScene = scene.clone();
            clonedScene.traverse((child) => {
                if (child.isMesh) {
                    child.material = child.material.clone();
                    const funkyColor = new THREE.Color(0xff00ff);
                    const funkyEmissive = new THREE.Color(0x00ffff);
                    child.material.color = funkyColor;
                    child.material.emissive = funkyEmissive;
                    child.material.emissiveIntensity = 0.4;
                    child.material.roughness = 0.2;
                    child.material.metalness = 0.8;
                    child.material.envMapIntensity = 1.5;
                    child.material.needsUpdate = true;
                }
            });
            setProcessedModel(clonedScene);
        }
    }, [scene]);

    // CALL useFrame UNCONDITIONALLY HERE, before any conditional returns
    useFrame(() => {
        if (processedModel) {
            // Your optional animation logic
            // processedModel.rotation.y += 0.003; // Example animation
        }
    });

    if (!processedModel) {
        return null;
    }

    return (
        <primitive
            object={processedModel}
            scale={1.5}
            position={[0, -0.5, 0]}
        />
    );
}
