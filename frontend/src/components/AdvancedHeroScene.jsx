import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Sparkles, MeshDistortMaterial, Sphere, OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Animated particle field
function ParticleField() {
    const count = 2000;
    const mesh = useRef();

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const x = Math.random() * 2000 - 1000;
            const y = Math.random() * 2000 - 1000;
            const z = Math.random() * 2000 - 1000;
            temp.push({ t, factor, speed, x, y, z, mx: 0, my: 0 });
        }
        return temp;
    }, [count]);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        particles.forEach((particle, i) => {
            let { t, factor, speed, x, y, z } = particle;
            t = particle.t += speed / 2;
            const a = Math.cos(t) + Math.sin(t * 1) / 10;
            const b = Math.sin(t) + Math.cos(t * 2) / 10;
            const s = Math.cos(t);

            dummy.position.set(
                x + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                y + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                z + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            );
            dummy.scale.set(s, s, s);
            dummy.rotation.set(s * 5, s * 5, s * 5);
            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[null, null, count]}>
            <dodecahedronGeometry args={[0.5, 0]} />
            <meshPhongMaterial color="#4f46e5" />
        </instancedMesh>
    );
}

// Central rotating core
function CoreSphere() {
    const mesh = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        mesh.current.rotation.x = Math.sin(t / 4) / 2;
        mesh.current.rotation.y = t / 2;
        mesh.current.rotation.z = Math.cos(t / 4) / 2;
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Sphere ref={mesh} args={[2, 64, 64]}>
                <MeshDistortMaterial
                    color="#6366f1"
                    attach="material"
                    distort={0.5}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                />
            </Sphere>
        </Float>
    );
}

// Orbiting rings
function OrbitRings() {
    const group = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        group.current.rotation.y = t * 0.1;
    });

    return (
        <group ref={group}>
            {[0, 1, 2].map((i) => (
                <mesh key={i} rotation={[Math.PI / 2, 0, (Math.PI / 3) * i]}>
                    <torusGeometry args={[4 + i, 0.05, 16, 100]} />
                    <meshBasicMaterial color="#818cf8" transparent opacity={0.3} />
                </mesh>
            ))}
        </group>
    );
}

// Grid floor
function GridFloor() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
            <planeGeometry args={[100, 100, 50, 50]} />
            <meshBasicMaterial
                color="#1e1b4b"
                wireframe
                transparent
                opacity={0.1}
            />
        </mesh>
    );
}

function AdvancedHeroScene() {
    return (
        <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
            <color attach="background" args={['#000000']} />

            {/* Lighting */}
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ec4899" />
            <spotLight position={[0, 20, 0]} angle={0.3} penumbra={1} intensity={1} color="#818cf8" />

            {/* Background elements */}
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Sparkles count={200} scale={20} size={3} speed={0.3} opacity={0.6} color="#cbd5e1" />

            {/* Main elements */}
            <ParticleField />
            <CoreSphere />
            <OrbitRings />
            <GridFloor />

            {/* Fog for depth */}
            <fog attach="fog" args={['#000000', 10, 50]} />
        </Canvas>
    );
}

export default AdvancedHeroScene;
