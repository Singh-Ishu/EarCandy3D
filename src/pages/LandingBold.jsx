import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import "./LandingBold.css";

const canvasHeight = window.innerHeight;
const canvasWidth = window.innerWidth;
const modelScale = 1.2;
const headphoneModelName = "AudioMaster Pro 3000";

export default function LandingBold() {
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
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        //Setting camera aspect ratio to match the renderer size
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        const loader = new GLTFLoader();
        loader.load(
            "/models/headphone_combined.glb",
            (gltf) => {
                const model = gltf.scene;

                //Setting up the model
                model.scale.set(modelScale, modelScale, modelScale);
                model.position.set(0, 0, 0);
                let modelMesh;
                model.traverse((child) => {
                    if (child.isMesh) {
                        modelMesh = child;
                        child.material.depthWrite = true;
                    }
                });
                scene.add(model);

                // Center the model
                const box = new THREE.Box3().setFromObject(model);
                const center = box.getCenter(new THREE.Vector3());
                model.position.sub(center);

                camera.position.set(3, 1.5, -6);
                camera.lookAt(new THREE.Vector3(0, 0.3, 0));

                // Add scroll-triggered animations
                // gsap.to(model.scale, {
                //     x: 15, // Scale up to 15
                //     y: 15,
                //     z: 15,
                //     scrollTrigger: {
                //         trigger: ".HeadphoneHero",
                //         start: "top top",
                //         end: "600px top",
                //         ease: "none",
                //         scrub: true,
                //         pin: false,
                //     },
                // });
                // gsap.to(model.rotation, {
                //     y: Math.PI,
                //     scrollTrigger: {
                //         trigger: ".HeadphoneHero",
                //         start: "top top",
                //         end: "600px top",
                //         ease: "none",
                //         scrub: true,
                //         pin: false,
                //     },
                // });
                // gsap.to(".HeadphoneHero", {
                //     opacity: 0,
                //     scrollTrigger: {
                //         trigger: ".HeadphoneHero",
                //         start: "top top",
                //         end: "600px top",
                //         scrub: true,
                //         pin: false,
                //     },
                // });
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
            renderer.render(scene, camera);
        };
        animate();

        // Cleanup on component unmount
        return () => {
            renderer.dispose();
        };
    }, []);

    return (
        <div className="HeadphoneHero-bold">
            {/* <h1 className="hero-title">{headphoneModelName}</h1> */}

            <div className="hero-para-container" id="hero-para-container1">
                <p className="hero-para">
                    Experience the ultimate sound quality with the{" "}
                    <strong>{headphoneModelName}</strong> headphones. Designed
                    for audiophiles, these headphones deliver crystal-clear
                    audio and deep bass, making every note come alive.
                </p>
            </div>

            <div id="hero-container">
                <canvas id="hero-canvas"></canvas>
            </div>

            <div className="hero-para-container" id="hero-para-container2">
                <p className="hero-para">
                    With precision engineering and ergonomic design, the{" "}
                    <strong>{headphoneModelName}</strong> ensures comfort for
                    extended listening sessions. Elevate your audio experience
                    now.
                </p>
            </div>
        </div>
    );
}
