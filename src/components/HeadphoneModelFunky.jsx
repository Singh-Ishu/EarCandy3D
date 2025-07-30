import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function HeadphoneModelFunky() {
    // Load the same 3D model for both versions
    const { scene } = useGLTF("/models/headphone.glb");
    const modelRef = useRef();

    useEffect(() => {
        // Apply funky styling to the loaded model
        const clonedScene = scene.clone();
        clonedScene.traverse((child) => {
            if (child.isMesh) {
                child.material = child.material.clone();

                const funkyColor = new THREE.Color(0xff00ff); // Vibrant Magenta
                const funkyEmissive = new THREE.Color(0x00ffff); // Cyan glow

                child.material.color = funkyColor;
                child.material.emissive = funkyEmissive;
                child.material.emissiveIntensity = 0.4; // Intensity of the glow
                child.material.roughness = 0.2;
                child.material.metalness = 0.8;
                child.material.envMapIntensity = 1.5; // How much it reflects the environment
                // You could add textures for patterns here
                // child.material.map = new THREE.TextureLoader().load('/textures/funky_pattern.png');
                child.material.needsUpdate = true;
            }
        });
        modelRef.current = clonedScene;
    }, [scene]);

    useFrame(() => {
        // Optional: Add a more dynamic animation to the funky model
        // if (modelRef.current) {
        //     modelRef.current.rotation.y += 0.003;
        // }
    });

    // Scale and position must be EXACTLY identical to HeadphoneModelMinimal
    return (
        <primitive
            object={modelRef.current}
            scale={1.5}
            position={[0, -0.5, 0]}
        />
    );
}
