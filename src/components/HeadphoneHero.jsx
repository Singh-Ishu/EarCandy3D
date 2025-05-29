import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useEffect } from "react";

export default function HeadphoneHero() {
    useEffect(() => {
        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x1a1a1a);

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.set(0, 1, 3);

        // Renderer setup
        const canvas = document.getElementById("hero-canvas");
        const renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        // GLTF Loader
        const loader = new GLTFLoader();
        loader.load(
            "public/models/headphone_combined.glb",
            (gltf) => {
                const model = gltf.scene;
                // Adjust model scale and position as needed
                model.scale.set(1, 1, 1);
                model.position.set(0, 0, 0);
                scene.add(model);

                // Optional: Center the model
                const box = new THREE.Box3().setFromObject(model);
                const center = box.getCenter(new THREE.Vector3());
                model.position.sub(center);
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
            },
            (error) => {
                console.error(
                    "An error occurred while loading the GLTF model:",
                    error
                );
            }
        );

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            // Optional: Rotate the scene for a dynamic effect
            scene.rotation.y += 0.005;
            renderer.render(scene, camera);
        };
        animate();

        // Handle window resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", handleResize);

        // Cleanup on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
            renderer.dispose();
        };
    }, []);

    return (
        <div className="HeadphoneHero">
            <div id="hero-container">
                <canvas id="hero-canvas"></canvas>
            </div>
        </div>
    );
}
