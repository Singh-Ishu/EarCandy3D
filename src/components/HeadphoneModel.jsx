import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export default function HeadphoneModel({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {
    const meshRef = useRef();
    
    // Load the headphone model
    const { scene } = useGLTF('/models/headphone_combined.glb');

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