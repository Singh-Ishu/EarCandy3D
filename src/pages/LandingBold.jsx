import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import HeadphoneModel from '../components/HeadphoneModel';
import "./LandingBold.css";

export default function LandingBold() {
    return (
        <div className="Headphone-hero-bold">
            <div className="hero-content">
                <h1 className="hero-title">FUNKY</h1>
                <div className="canvas-container">
                    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                        <ambientLight intensity={0.7} />
                        <directionalLight position={[10, 10, 5]} intensity={1.5} />
                        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ff6b6b" />
                        <pointLight position={[10, -10, -5]} intensity={0.5} color="#4ecdc4" />
                        <HeadphoneModel 
                            position={[0, 0, 0]} 
                            scale={2.2}
                        />
                        <Environment preset="sunset" />
                        <OrbitControls 
                            enableZoom={false}
                            enablePan={false}
                            maxPolarAngle={Math.PI / 2}
                            minPolarAngle={Math.PI / 2}
                            autoRotate
                            autoRotateSpeed={2}
                        />
                    </Canvas>
                </div>
            </div>
        </div>
    );
}