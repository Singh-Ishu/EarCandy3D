import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useEffect } from "react";

export default function HeadphoneHero() {
    useEffect(() => {
        // Initialize the scene
        const scene = new THREE.Scene();
        // Camera setup
        const camera = new THREE.PerspectiveCamera(
            50,
            window.innerWidth / window.innerHeight,
            0.1,
            100
        );
        camera.position.set(0, 0, 3);

        // Renderer setup
        const canvas = document.getElementById("hero-canvas");
        const renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            alpha: true, // Enable transparency
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        // GLTF Loader
        const loader = new GLTFLoader();
        loader.load(
            "/models/headphone_combined.glb",
            (gltf) => {
                const model = gltf.scene;
                model.position.set(0, 0, 0);
                scene.add(model);

                // Center the model
                const box = new THREE.Box3().setFromObject(model);
                const center = box.getCenter(new THREE.Vector3());
                model.position.sub(center);

                camera.position.set(3, 1.5, -6);
                camera.lookAt(new THREE.Vector3(0, 0, 0));
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
            // scene.rotation.y += 0.005;
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
            <h1 className="hero-title">Sony XX-XYZ</h1>
            <div id="hero-container">
                <canvas id="hero-canvas"></canvas>
            </div>
        </div>
    );
}
