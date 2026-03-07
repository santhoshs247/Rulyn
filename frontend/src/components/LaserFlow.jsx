import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const LaserFlow = ({
    color = '#f97316',
    horizontalBeamOffset = 0.1,
    verticalBeamOffset = 0.0
}) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 3;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Create laser beams
        const beamCount = 20;
        const beams = [];
        const beamMaterial = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.6
        });

        for (let i = 0; i < beamCount; i++) {
            const geometry = new THREE.PlaneGeometry(0.02, 8);
            const beam = new THREE.Mesh(geometry, beamMaterial.clone());
            beam.position.x = (i - beamCount / 2) * 0.5;
            beam.position.z = Math.random() * 2 - 1;
            beam.userData = {
                speed: 0.02 + Math.random() * 0.03,
                offset: Math.random() * Math.PI * 2
            };
            scene.add(beam);
            beams.push(beam);
        }

        // Horizontal beams
        for (let i = 0; i < beamCount / 2; i++) {
            const geometry = new THREE.PlaneGeometry(10, 0.02);
            const beam = new THREE.Mesh(geometry, beamMaterial.clone());
            beam.position.y = (i - beamCount / 4) * 0.6 + horizontalBeamOffset;
            beam.position.z = Math.random() - 0.5;
            beam.userData = {
                speed: 0.01 + Math.random() * 0.02,
                offset: Math.random() * Math.PI * 2,
                isHorizontal: true
            };
            scene.add(beam);
            beams.push(beam);
        }

        let time = 0;
        const animate = () => {
            time += 0.01;

            beams.forEach((beam) => {
                const { speed, offset, isHorizontal } = beam.userData;
                if (isHorizontal) {
                    beam.position.x = Math.sin(time * speed * 10 + offset) * 2;
                    beam.material.opacity = 0.3 + Math.sin(time + offset) * 0.3;
                } else {
                    beam.position.y = Math.sin(time * speed * 10 + offset) * 3;
                    beam.material.opacity = 0.4 + Math.sin(time * 2 + offset) * 0.2;
                }
            });

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };
        animate();

        const handleResize = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            container.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, [color]);

    return <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />;
};

export default LaserFlow;
