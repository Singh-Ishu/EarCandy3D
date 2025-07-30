import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function HeadphoneModelMinimal() {
    // Load your 3D model. Make sure the path is correct.
    // E.g., if headphone.glb is in public/models/, the path is "/models/headphone.glb"
    const { scene } = useGLTF("/models/headphone.glb");
    const modelRef = useRef();

    useEffect(() => {
        // Apply minimal styling to the loaded model
        // We clone the scene to ensure each model instance is independent
        const clonedScene = scene.clone();
        clonedScene.traverse((child) => {
            if (child.isMesh) {
                // Clone the material to prevent shared material issues if you're loading the same GLB twice
                child.material = child.material.clone();
                child.material.color.set(0xcccccc); // Light grey/white
                child.material.roughness = 0.6;
                child.material.metalness = 0.1;
                child.material.envMapIntensity = 0.8;
                child.material.needsUpdate = true;
            }
        });
        // Assign the cloned scene to the ref
        modelRef.current = clonedScene;
    }, [scene]);

    useFrame(() => {
        // Optional: Add a subtle animation to the model
        // if (modelRef.current) {
        //     modelRef.current.rotation.y += 0.001;
        // }
    });

    // It's crucial that scale and position are identical to HeadphoneModelFunky
    return (
        <primitive
            object={modelRef.current}
            scale={1.5}
            position={[0, -0.5, 0]}
        />
    );
}
