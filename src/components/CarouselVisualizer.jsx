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
        uniform float u_mouseX;
        uniform vec2 u_resolution;
        
        void main() {
            vec2 uv = v_texCoord;
            
            // Create multiple sine waves with different offsets and amplitudes
            float amplitude = 0.03 + 0.06 * u_mouseX;
            float frequency = 8.0;
            float speed = 2.0;
            
            // Add mouse disturbance - create a ripple effect around mouse position
            float mouseDist = abs(uv.x - u_mouseX);
            float mouseDisturbance = exp(-mouseDist * 20.0) * 0.2 * sin(u_time * 10.0 + mouseDist * 50.0);
            
            // Line 1 - Main wave
            float wave1 = sin(uv.x * frequency + u_time * speed) * amplitude;
            float wave1_2 = sin(uv.x * frequency * 1.5 + u_time * speed * 0.8) * amplitude * 0.7;
            float wave1_3 = sin(uv.x * frequency * 0.5 + u_time * speed * 1.2) * amplitude * 0.5;
            float combinedWave1 = (wave1 + wave1_2 + wave1_3) / 3.0 + mouseDisturbance;
            
            // Line 2 - Slightly offset and different phase
            float wave2 = sin(uv.x * frequency + u_time * speed * 1.1 + 0.5) * amplitude * 0.8;
            float wave2_2 = sin(uv.x * frequency * 1.3 + u_time * speed * 0.9 + 0.3) * amplitude * 0.6;
            float wave2_3 = sin(uv.x * frequency * 0.7 + u_time * speed * 1.3 + 0.7) * amplitude * 0.4;
            float combinedWave2 = (wave2 + wave2_2 + wave2_3) / 3.0 + mouseDisturbance * 0.8;
            
            // Line 3 - Another offset with different characteristics
            float wave3 = sin(uv.x * frequency + u_time * speed * 0.9 - 0.3) * amplitude * 0.9;
            float wave3_2 = sin(uv.x * frequency * 1.7 + u_time * speed * 1.1 - 0.1) * amplitude * 0.5;
            float wave3_3 = sin(uv.x * frequency * 0.3 + u_time * speed * 0.7 - 0.5) * amplitude * 0.3;
            float combinedWave3 = (wave3 + wave3_2 + wave3_3) / 3.0 + mouseDisturbance * 0.6;
            
            // Line 4 - Higher frequency variation
            float wave4 = sin(uv.x * frequency * 1.2 + u_time * speed * 1.2 + 1.0) * amplitude * 0.7;
            float wave4_2 = sin(uv.x * frequency * 0.8 + u_time * speed * 0.6 + 0.8) * amplitude * 0.4;
            float wave4_3 = sin(uv.x * frequency * 2.0 + u_time * speed * 1.4 + 1.2) * amplitude * 0.2;
            float combinedWave4 = (wave4 + wave4_2 + wave4_3) / 3.0 + mouseDisturbance * 0.4;
            
            // Line 5 - Lower frequency variation
            float wave5 = sin(uv.x * frequency * 0.6 + u_time * speed * 0.8 - 1.0) * amplitude * 0.6;
            float wave5_2 = sin(uv.x * frequency * 1.1 + u_time * speed * 1.0 - 0.8) * amplitude * 0.3;
            float wave5_3 = sin(uv.x * frequency * 0.4 + u_time * speed * 0.5 - 1.2) * amplitude * 0.2;
            float combinedWave5 = (wave5 + wave5_2 + wave5_3) / 3.0 + mouseDisturbance * 0.3;
            
            // Calculate distances for each line with slight vertical offsets
            float dist1 = abs(uv.y - 0.5 - combinedWave1);
            float dist2 = abs(uv.y - 0.45 - combinedWave2);
            float dist3 = abs(uv.y - 0.55 - combinedWave3);
            float dist4 = abs(uv.y - 0.4 - combinedWave4);
            float dist5 = abs(uv.y - 0.6 - combinedWave5);
            
            // Very thin lines
            float glow1 = 1.0 - smoothstep(0.0, 0.008, dist1);
            float core1 = 1.0 - smoothstep(0.0, 0.002, dist1);
            
            float glow2 = 1.0 - smoothstep(0.0, 0.008, dist2);
            float core2 = 1.0 - smoothstep(0.0, 0.002, dist2);
            
            float glow3 = 1.0 - smoothstep(0.0, 0.008, dist3);
            float core3 = 1.0 - smoothstep(0.0, 0.002, dist3);
            
            float glow4 = 1.0 - smoothstep(0.0, 0.008, dist4);
            float core4 = 1.0 - smoothstep(0.0, 0.002, dist4);
            
            float glow5 = 1.0 - smoothstep(0.0, 0.008, dist5);
            float core5 = 1.0 - smoothstep(0.0, 0.002, dist5);
            
            // Different neon colors for each line
            vec3 neon1 = vec3(0.0, 1.0, 1.0); // Cyan
            vec3 neon2 = vec3(1.0, 0.0, 1.0); // Magenta
            vec3 neon3 = vec3(0.0, 1.0, 0.0); // Green
            vec3 neon4 = vec3(1.0, 0.5, 0.0); // Orange
            vec3 neon5 = vec3(0.5, 0.0, 1.0); // Purple
            
            // Color mixing based on position and time
            float colorMix = sin(u_time * 0.5 + uv.x * 3.0) * 0.5 + 0.5;
            
            // Apply colors and effects to each line
            vec3 finalColor = vec3(0.0);
            
            // Line 1 - Cyan
            finalColor += neon1 * glow1 * 1.2 + neon1 * core1 * 1.8;
            
            // Line 2 - Magenta
            finalColor += neon2 * glow2 * 1.0 + neon2 * core2 * 1.5;
            
            // Line 3 - Green
            finalColor += neon3 * glow3 * 1.1 + neon3 * core3 * 1.6;
            
            // Line 4 - Orange
            finalColor += neon4 * glow4 * 0.9 + neon4 * core4 * 1.4;
            
            // Line 5 - Purple
            finalColor += neon5 * glow5 * 0.8 + neon5 * core5 * 1.3;
            
            // Add subtle background glow
            float bgGlow1 = 0.02 * (1.0 - smoothstep(0.0, 0.1, dist1));
            float bgGlow2 = 0.02 * (1.0 - smoothstep(0.0, 0.1, dist2));
            float bgGlow3 = 0.02 * (1.0 - smoothstep(0.0, 0.1, dist3));
            float bgGlow4 = 0.02 * (1.0 - smoothstep(0.0, 0.1, dist4));
            float bgGlow5 = 0.02 * (1.0 - smoothstep(0.0, 0.1, dist5));
            
            finalColor += neon1 * bgGlow1 + neon2 * bgGlow2 + neon3 * bgGlow3 + neon4 * bgGlow4 + neon5 * bgGlow5;
            
            gl_FragColor = vec4(finalColor, 1.0);
        }
    `;

    const createShader = (gl, type, source) => {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
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
            console.error('Program linking error:', gl.getProgramInfoLog(program));
            gl.deleteProgram(program);
            return null;
        }
        return program;
    };

    const initWebGL = () => {
        const canvas = canvasRef.current;
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (!gl) {
            console.error('WebGL not supported');
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
        window.addEventListener('resize', resizeCanvas);

        // Create shaders
        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
        
        if (!vertexShader || !fragmentShader) return;

        // Create program
        const program = createProgram(gl, vertexShader, fragmentShader);
        if (!program) return;

        programRef.current = program;
        gl.useProgram(program);

        // Create full-screen quad
        const positions = new Float32Array([
            -1, -1,
             1, -1,
            -1,  1,
             1,  1,
        ]);

        const texCoords = new Float32Array([
            0, 0,
            1, 0,
            0, 1,
            1, 1,
        ]);

        // Create buffers
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

        const texCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);

        // Set up attributes
        const positionLocation = gl.getAttribLocation(program, 'a_position');
        const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');

        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
        gl.enableVertexAttribArray(texCoordLocation);
        gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

        // Get uniform locations
        const timeLocation = gl.getUniformLocation(program, 'u_time');
        const mouseXLocation = gl.getUniformLocation(program, 'u_mouseX');
        const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');

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

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div className="carousel-visualizer">
            <canvas ref={canvasRef} className="webgl-canvas" />
        </div>
    );
}
