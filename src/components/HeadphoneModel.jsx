import { useRef, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useGLTF } from '@react-three/drei';

export default function HeadphoneModel({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {
    const meshRef = useRef();
    
    // Load the headphone model
    const { scene } = useGLTF('/models/headphone_combined.glb');
    
    // Rotate the model slowly
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
        }
    });

    return (
        <primitive 
            ref={meshRef}
            object={scene.clone()} 
            position={position}
            rotation={rotation}
            scale={scale}
        />
    );
}

// Preload the model
useGLTF.preload('/models/headphone_combined.glb');