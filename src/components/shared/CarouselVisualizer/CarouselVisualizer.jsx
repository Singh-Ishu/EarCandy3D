import { useEffect, useRef, useState } from "react";
import "./CarouselVisualizer.css";

export default function CarouselVisualizer() {
    const canvasRef = useRef(null);
    const glRef = useRef(null);
    const programRef = useRef(null);
    const mouseXRef = useRef(0.5); // Normalized mouse position (0-1)
    const animationRef = useRef(null);
    const timeRef = useRef(0);

    // Vertex shader
    const vertexShaderSource = `
        attribute vec2 a_position;
        attribute vec2 a_texCoord;
        varying vec2 v_texCoord;
        
        void main() {
            gl_Position = vec4(a_position, 0.0, 1.0);
            v_texCoord = a_texCoord;
        }
    `;

    // Fragment shader with multiple neon sine waves
    const fragmentShaderSource = `
            precision mediump float;
            varying vec2 v_texCoord;
            uniform float u_time;
            uniform float u_mouseX; // Normalized X (0 to 1)
            uniform float u_mouseY; // Normalized Y (0 to 1)
            uniform vec2 u_resolution;

            void main() {
                vec2 uv = v_texCoord; // uv coordinates range from 0 to 1

                // --- Amplitude Control based on Mouse and Screen Center ---
                float baseAmplitude = 0.008; // Very small base amplitude for thin lines at edges

                // Influence based on X-axis distance from screen center (strongest at center)
                float xCenterInfluence = 1.0 - smoothstep(0.0, 0.5, abs(uv.x - 0.5));
                xCenterInfluence = pow(xCenterInfluence, 2.5); // Increased power for more pronounced center
                
                // Mouse X-position localized pulse (where the amplitude increases)
                float mouseXPulse = exp(-pow(uv.x - u_mouseX, 2.0) * 80.0);

                // Mouse Y-position strength (how much the amplitude increases)
                float mouseYStrength = 1.0 - u_mouseY; // Invert for stronger effect when mouse is lower

                // New amplitude calculation:
                // Start with a base amplitude that's higher in the middle due to xCenterInfluence.
                // The multiplier 0.25 significantly bumps up the central amplitude.
                float amplitudeFromCenter = baseAmplitude + xCenterInfluence * 0.3; // Slightly increased multiplier
                // Add mouse influence, modulated by mouseYStrength
                float mouseAmplitude = mouseXPulse * mouseYStrength * 0.2; // Slightly increased mouse contribution

                float currentAmplitude = amplitudeFromCenter + mouseAmplitude;

                // Clamp amplitude to prevent extreme values, allowing higher max for central waves
                currentAmplitude = clamp(currentAmplitude, 0.005, 0.35); // Increased max clamp to 0.35


                float frequency = 10.0; // Slightly lower frequency for smoother waves
                float speed = 2.0;

                // Define vertical offsets for each line to prevent overlap
                // These offsets are now much closer to the center (0.5)
                float offset1 = 0.50;
                float offset2 = 0.49;
                float offset3 = 0.51;
                float offset4 = 0.48;
                float offset5 = 0.52;
                float offset6 = 0.47;
                float offset7 = 0.53;
                float offset8 = 0.46;
                float offset9 = 0.54;
                float offset10 = 0.45;

                // Create multiple sine waves with different offsets and phases
                // Adjusted multipliers for frequency and speed to make them intertwine more
                float wave1 = sin(uv.x * frequency + u_time * speed) * currentAmplitude;
                float wave2 = sin(uv.x * frequency * 1.05 + u_time * speed * 0.95 + 0.5) * currentAmplitude * 0.9;
                float wave3 = sin(uv.x * frequency * 0.95 + u_time * speed * 1.05 - 0.3) * currentAmplitude * 0.8;
                float wave4 = sin(uv.x * frequency * 1.1 + u_time * speed * 0.9 + 1.0) * currentAmplitude * 0.7;
                float wave5 = sin(uv.x * frequency * 0.9 + u_time * speed * 1.1 - 1.0) * currentAmplitude * 0.6;
                float wave6 = sin(uv.x * frequency * 1.15 + u_time * speed * 0.85 + 0.2) * currentAmplitude * 0.5;
                float wave7 = sin(uv.x * frequency * 0.85 + u_time * speed * 1.15 - 0.7) * currentAmplitude * 0.4;
                float wave8 = sin(uv.x * frequency * 1.2 + u_time * speed * 0.8 + 0.8) * currentAmplitude * 0.3;
                float wave9 = sin(uv.x * frequency * 0.8 + u_time * speed * 1.2 - 0.1) * currentAmplitude * 0.2;
                float wave10 = sin(uv.x * frequency * 1.25 + u_time * speed * 0.75 + 0.6) * currentAmplitude * 0.1;


                // Calculate distances for each line from its vertical offset
                float dist1 = abs(uv.y - offset1 - wave1);
                float dist2 = abs(uv.y - offset2 - wave2);
                float dist3 = abs(uv.y - offset3 - wave3);
                float dist4 = abs(uv.y - offset4 - wave4);
                float dist5 = abs(uv.y - offset5 - wave5);
                float dist6 = abs(uv.y - offset6 - wave6);
                float dist7 = abs(uv.y - offset7 - wave7);
                float dist8 = abs(uv.y - offset8 - wave8);
                float dist9 = abs(uv.y - offset9 - wave9);
                float dist10 = abs(uv.y - offset10 - wave10);

                // Thin lines and glow effect
                float lineThickness = 0.0015; // Slightly thicker core for smoother appearance
                float glowWidth = 0.007;    // Wider glow for smoother transition

                float glow1 = 1.0 - smoothstep(0.0, glowWidth, dist1);
                float core1 = 1.0 - smoothstep(0.0, lineThickness, dist1);

                float glow2 = 1.0 - smoothstep(0.0, glowWidth, dist2);
                float core2 = 1.0 - smoothstep(0.0, lineThickness, dist2);

                float glow3 = 1.0 - smoothstep(0.0, glowWidth, dist3);
                float core3 = 1.0 - smoothstep(0.0, lineThickness, dist3);

                float glow4 = 1.0 - smoothstep(0.0, glowWidth, dist4);
                float core4 = 1.0 - smoothstep(0.0, lineThickness, dist4);

                float glow5 = 1.0 - smoothstep(0.0, glowWidth, dist5);
                float core5 = 1.0 - smoothstep(0.0, lineThickness, dist5);

                float glow6 = 1.0 - smoothstep(0.0, glowWidth, dist6);
                float core6 = 1.0 - smoothstep(0.0, lineThickness, dist6);

                float glow7 = 1.0 - smoothstep(0.0, glowWidth, dist7);
                float core7 = 1.0 - smoothstep(0.0, lineThickness, dist7);

                float glow8 = 1.0 - smoothstep(0.0, glowWidth, dist8);
                float core8 = 1.0 - smoothstep(0.0, lineThickness, dist8);

                float glow9 = 1.0 - smoothstep(0.0, glowWidth, dist9);
                float core9 = 1.0 - smoothstep(0.0, lineThickness, dist9);

                float glow10 = 1.0 - smoothstep(0.0, glowWidth, dist10);
                float core10 = 1.0 - smoothstep(0.0, lineThickness, dist10);


                // Different neon colors for each line
                vec3 neon1 = vec3(0.0, 1.0, 1.0); // Cyan
                vec3 neon2 = vec3(1.0, 0.0, 1.0); // Magenta
                vec3 neon3 = vec3(0.0, 1.0, 0.0); // Green
                vec3 neon4 = vec3(1.0, 0.5, 0.0); // Orange
                vec3 neon5 = vec3(0.5, 0.0, 1.0); // Purple
                vec3 neon6 = vec3(1.0, 0.0, 0.5); // Pink
                vec3 neon7 = vec3(0.0, 0.5, 1.0); // Light Blue
                vec3 neon8 = vec3(1.0, 1.0, 0.0); // Yellow
                vec3 neon9 = vec3(0.0, 1.0, 0.5); // Spring Green
                vec3 neon10 = vec3(0.5, 1.0, 0.0); // Chartreuse

                // Apply colors and effects to each line
                vec3 finalColor = vec3(0.0);

                finalColor += neon1 * (glow1 * 0.8 + core1 * 1.5);
                finalColor += neon2 * (glow2 * 0.7 + core2 * 1.4);
                finalColor += neon3 * (glow3 * 0.9 + core3 * 1.6);
                finalColor += neon4 * (glow4 * 0.6 + core4 * 1.3);
                finalColor += neon5 * (glow5 * 0.85 + core5 * 1.55);
                finalColor += neon6 * (glow6 * 0.75 + core6 * 1.45);
                finalColor += neon7 * (glow7 * 0.95 + core7 * 1.65);
                finalColor += neon8 * (glow8 * 0.65 + core8 * 1.35);
                finalColor += neon9 * (glow9 * 0.8 + core9 * 1.5);
                finalColor += neon10 * (glow10 * 0.7 + core10 * 1.4);

                // Add subtle background glow based on all lines
                float totalGlow = (glow1 + glow2 + glow3 + glow4 + glow5 + glow6 + glow7 + glow8 + glow9 + glow10) * 0.02;
                finalColor += totalGlow * vec3(0.5); // General light background glow

                gl_FragColor = vec4(finalColor, 1.0);
            }
        `;

    const createShader = (gl, type, source) => {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error(
                "Shader compilation error:",
                gl.getShaderInfoLog(shader)
            );
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    };

    const createProgram = (gl, vertexShader, fragmentShader) => {
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error(
                "Program linking error:",
                gl.getProgramInfoLog(program)
            );
            gl.deleteProgram(program);
            return null;
        }
        return program;
    };

    const initWebGL = () => {
        const canvas = canvasRef.current;
        const gl =
            canvas.getContext("webgl") ||
            canvas.getContext("experimental-webgl");

        if (!gl) {
            console.error("WebGL not supported");
            return;
        }

        glRef.current = gl;

        // Set canvas size
        const resizeCanvas = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * window.devicePixelRatio;
            canvas.height = rect.height * window.devicePixelRatio;
            gl.viewport(0, 0, canvas.width, canvas.height);
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Create shaders
        const vertexShader = createShader(
            gl,
            gl.VERTEX_SHADER,
            vertexShaderSource
        );
        const fragmentShader = createShader(
            gl,
            gl.FRAGMENT_SHADER,
            fragmentShaderSource
        );

        if (!vertexShader || !fragmentShader) return;

        // Create program
        const program = createProgram(gl, vertexShader, fragmentShader);
        if (!program) return;

        programRef.current = program;
        gl.useProgram(program);

        // Create full-screen quad
        const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);

        const texCoords = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]);

        // Create buffers
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

        const texCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);

        // Set up attributes
        const positionLocation = gl.getAttribLocation(program, "a_position");
        const texCoordLocation = gl.getAttribLocation(program, "a_texCoord");

        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
        gl.enableVertexAttribArray(texCoordLocation);
        gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

        // Get uniform locations
        const timeLocation = gl.getUniformLocation(program, "u_time");
        const mouseXLocation = gl.getUniformLocation(program, "u_mouseX");
        const resolutionLocation = gl.getUniformLocation(
            program,
            "u_resolution"
        );

        // Animation loop
        const render = () => {
            timeRef.current += 0.016; // ~60fps

            gl.uniform1f(timeLocation, timeRef.current);
            gl.uniform1f(mouseXLocation, mouseXRef.current);
            gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            animationRef.current = requestAnimationFrame(render);
        };

        render();
    };

    useEffect(() => {
        initWebGL();

        const handleMouseMove = (e) => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            mouseXRef.current = Math.max(0, Math.min(1, x / rect.width));
        };

        const handleMouseLeave = () => {
            mouseXRef.current = 0.5; // Reset to center
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <div className="carousel-visualizer">
            <canvas ref={canvasRef} className="webgl-canvas" />
        </div>
    );
}
