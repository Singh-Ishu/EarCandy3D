import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useEffect } from "react";

const canvasHeight = 600;
const canvasWidth = 600;

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
        // renderer.setSize(window.innerWidth - 500, window.innerHeight);
        renderer.setSize(
            Math.min(window.innerWidth, canvasWidth),
            Math.min(window.innerHeight, canvasHeight)
        );
        renderer.setPixelRatio(window.devicePixelRatio);
        //Setting camera aspect ratio to match the renderer size
        camera.aspect =
            Math.min(window.innerWidth, canvasWidth) /
            Math.min(window.innerHeight, canvasHeight);
        camera.updateProjectionMatrix();
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

                // Scale the model to fit the scene
                const scale = 1.4; // Adjust this value as needed
                model.scale.set(scale, scale, scale);
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

        // Cleanup on component unmount
        return () => {
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
