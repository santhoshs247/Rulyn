import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CoolMode = ({ children, options = {} }) => {
    const [particles, setParticles] = useState([]);
    const containerRef = useRef(null);
    const particleIdRef = useRef(0);

    const defaultOptions = {
        particle: '🎉',
        particleCount: 40,
        speedRange: [100, 300],
        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
        shapes: ['🎉', '⭐', '✨', '🎊', '🌟', '💫', '🎈', '🚀'],
        ...options
    };

    const createParticles = (e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        const newParticles = Array.from({ length: defaultOptions.particleCount }, () => {
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * (defaultOptions.speedRange[1] - defaultOptions.speedRange[0]) + defaultOptions.speedRange[0];
            const shape = defaultOptions.shapes[Math.floor(Math.random() * defaultOptions.shapes.length)];
            const color = defaultOptions.colors[Math.floor(Math.random() * defaultOptions.colors.length)];

            return {
                id: particleIdRef.current++,
                x: clickX,
                y: clickY,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 720,
                scale: Math.random() * 0.5 + 0.5,
                shape,
                color
            };
        });

        setParticles(prev => [...prev, ...newParticles]);

        // Remove particles after animation
        setTimeout(() => {
            setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
        }, 2000);
    };

    const handleClick = (e) => {
        createParticles(e);

        // Call original onClick if exists
        if (children?.props?.onClick) {
            children.props.onClick(e);
        }
    };

    return (
        <div ref={containerRef} className="relative inline-block">
            {/* Render children with click handler */}
            {React.cloneElement(children, {
                onClick: handleClick
            })}

            {/* Particles */}
            <AnimatePresence>
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        initial={{
                            x: particle.x,
                            y: particle.y,
                            scale: particle.scale,
                            opacity: 1,
                            rotate: particle.rotation
                        }}
                        animate={{
                            x: particle.x + particle.vx,
                            y: particle.y + particle.vy + 200, // Gravity effect
                            opacity: 0,
                            rotate: particle.rotation + particle.rotationSpeed
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 2,
                            ease: [0.23, 1, 0.32, 1]
                        }}
                        className="absolute pointer-events-none text-2xl"
                        style={{
                            left: 0,
                            top: 0,
                            color: particle.color,
                            filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.3))'
                        }}
                    >
                        {particle.shape}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default CoolMode;
