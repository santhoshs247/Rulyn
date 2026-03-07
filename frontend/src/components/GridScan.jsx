import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

const GridScan = ({
    sensitivity = 0.55,
    lineThickness = 1,
    linesColor = '#f97316',
    gridScale = 0.1,
    scanColor = '#ffaa00',
    scanOpacity = 0.4,
    enablePost = true,
    bloomIntensity = 0.6,
}) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Grid
        const gridHelper = new THREE.GridHelper(20, 40, linesColor, linesColor);
        gridHelper.rotation.x = Math.PI / 2;
        gridHelper.material.opacity = 0.3;
        gridHelper.material.transparent = true;
        scene.add(gridHelper);

        // Scan line
        const scanGeometry = new THREE.PlaneGeometry(20, 0.1);
        const scanMaterial = new THREE.MeshBasicMaterial({
            color: scanColor,
            transparent: true,
            opacity: scanOpacity,
        });
        const scanLine = new THREE.Mesh(scanGeometry, scanMaterial);
        scene.add(scanLine);

        // Post processing
        let composer;
        if (enablePost) {
            composer = new EffectComposer(renderer);
            composer.addPass(new RenderPass(scene, camera));
            const bloomPass = new UnrealBloomPass(
                new THREE.Vector2(width, height),
                bloomIntensity,
                0.4,
                0.85
            );
            composer.addPass(bloomPass);
        }

        // Animation
        let time = 0;
        const animate = () => {
            time += 0.02;
            scanLine.position.y = Math.sin(time) * 5;
            gridHelper.rotation.z += 0.001;

            if (composer) {
                composer.render();
            } else {
                renderer.render(scene, camera);
            }
            requestAnimationFrame(animate);
        };
        animate();

        // Resize
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
    }, []);

    return <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />;
};

export default GridScan;
