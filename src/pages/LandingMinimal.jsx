import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import HeadphoneModel from '../components/HeadphoneModel';
import "./LandingMinimal.css";

export default function LandingMinimal() {
    return (
        <div className="HeadphoneHero">
            <div className="hero-content">
                <h1 className="hero-title">MINIMAL</h1>
                <div className="canvas-container">
                    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[10, 10, 5]} intensity={1} />
                        <HeadphoneModel 
                            position={[0, 0, 0]} 
                            scale={2}
                        />
                        <Environment preset="studio" />
                        <OrbitControls 
                            enableZoom={false}
                            enablePan={false}
                            maxPolarAngle={Math.PI / 2}
                            minPolarAngle={Math.PI / 2}
                        />
                    </Canvas>
                </div>
            </div>
        </div>
    );
}