import React, { useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function HeadphoneModelFunky() {
    const { scene } = useGLTF("/models/headphone_funky.glb");
    const [processedModel, setProcessedModel] = useState(null);

    useEffect(() => {
        if (scene) {
            const clonedScene = scene.clone();

            setProcessedModel(clonedScene);
        }
    }, [scene]);

    useFrame(() => {
        // if (processedModel) {
        // }
    });

    if (!processedModel) {
        return null;
    }

    return (
        <primitive
            object={processedModel}
            scale={1.5}
            position={[0, 0, -1.5]}
            rotation={[0, 15, 0]}
        />
    );
}
