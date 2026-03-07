import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Sparkles, Octahedron, MeshDistortMaterial, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

function Core() {
    const mesh = useRef();
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        mesh.current.rotation.y = t * 0.1;
        mesh.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <Icosahedron ref={mesh} args={[1.5, 0]}>
                <meshStandardMaterial
                    color="#4f46e5"
                    roughness={0.2}
                    metalness={0.9}
                    wireframe
                />
            </Icosahedron>
        </Float>
    );
}

function InnerCore() {
    return (
        <Float speed={3} rotationIntensity={2} floatIntensity={0}>
            <Octahedron args={[0.8, 0]}>
                <MeshDistortMaterial
                    color="#818cf8"
                    speed={5}
                    distort={0.3}
                    radius={1}
                />
            </Octahedron>
        </Float>
    )
}

function HeroScene() {
    return (
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
            <color attach="background" args={['#050505']} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ec4899" />

            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Sparkles count={100} scale={4} size={2} speed={0.4} opacity={0.5} color="#cbd5e1" />

            <mesh scale={100}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshBasicMaterial color="#000000" side={THREE.BackSide} transparent opacity={0.6} />
            </mesh>

            <Core />
            <InnerCore />
        </Canvas>
    );
}

export default HeroScene;
