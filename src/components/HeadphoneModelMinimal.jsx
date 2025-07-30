import React, { useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber"; // Keep useFrame here
import * as THREE from "three";

export default function HeadphoneModelMinimal() {
    const { scene } = useGLTF("/models/headphone_combined.glb");
    const [processedModel, setProcessedModel] = useState(null);

    useEffect(() => {
        if (scene) {
            const clonedScene = scene.clone();
            clonedScene.traverse((child) => {
                if (child.isMesh) {
                    child.material = child.material.clone();
                    child.material.color.set(0xcccccc); // Light grey/white
                    child.material.roughness = 0.6;
                    child.material.metalness = 0.1;
                    child.material.envMapIntensity = 0.8;
                    child.material.needsUpdate = true;
                }
            });
            setProcessedModel(clonedScene);
        }
    }, [scene]);

    // CALL useFrame UNCONDITIONALLY HERE, before any conditional returns
    useFrame(() => {
        // Only attempt animation if the model is actually loaded and processed
        if (processedModel) {
            // Your optional animation logic
            // processedModel.rotation.y += 0.001; // Example animation
        }
    });

    // Now, conditionally render the primitive AFTER all hooks have been called
    if (!processedModel) {
        return null; // Or a loading spinner
    }

    return (
        <primitive
            object={processedModel}
            scale={1.5}
            position={[0, -0.5, 0]}
        />
    );
}
