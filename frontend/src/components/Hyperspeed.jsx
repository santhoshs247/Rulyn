import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { hyperspeedPresets } from './HyperSpeedPresets';
import PerspectiveLoader from './PerspectiveLoader';

const Hyperspeed = ({
    effectOptions = hyperspeedPresets.three,
    onComplete = null,
    duration = 3000,
    showLogo = true
}) => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // Particle system
        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                // Start from center, spread out
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 50;

                this.x = centerX + Math.cos(angle) * distance;
                this.y = centerY + Math.sin(angle) * distance;
                this.z = Math.random() * 2000;

                this.prevX = this.x;
                this.prevY = this.y;

                // Color selection
                if (effectOptions.particleColor === 'rainbow') {
                    const hue = Math.random() * 360;
                    this.color = `hsl(${hue}, 100%, 60%)`;
                } else if (effectOptions.secondaryColor && Math.random() > 0.5) {
                    this.color = effectOptions.secondaryColor;
                } else if (effectOptions.tertiaryColor && Math.random() > 0.7) {
                    this.color = effectOptions.tertiaryColor;
                } else {
                    this.color = effectOptions.particleColor;
                }
            }

            update(speed) {
                this.prevX = this.x;
                this.prevY = this.y;

                this.z -= speed;

                if (this.z <= 0) {
                    this.reset();
                    this.z = 2000;
                }

                // Project 3D to 2D
                const scale = 1000 / this.z;
                this.x = centerX + (this.x - centerX) * scale;
                this.y = centerY + (this.y - centerY) * scale;
            }

            draw(ctx, options) {
                // Calculate opacity based on distance
                const opacity = Math.min(1, 1 - this.z / 2000);

                // Draw trail
                ctx.beginPath();
                ctx.moveTo(this.prevX, this.prevY);
                ctx.lineTo(this.x, this.y);

                // Apply glow
                if (options.glowIntensity > 0) {
                    ctx.shadowBlur = 10 * options.glowIntensity;
                    ctx.shadowColor = this.color;
                }

                ctx.strokeStyle = this.color;
                ctx.globalAlpha = opacity;
                ctx.lineWidth = options.lineWidth;
                ctx.stroke();

                // Reset shadow
                ctx.shadowBlur = 0;
                ctx.globalAlpha = 1;
            }
        }

        // Create particles
        const particles = [];
        for (let i = 0; i < effectOptions.particleCount; i++) {
            particles.push(new Particle());
        }

        let speed = 0;
        const maxSpeed = effectOptions.particleSpeed;
        let startTime = Date.now();

        // Animation loop
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Accelerate then decelerate
            if (progress < 0.3) {
                speed = maxSpeed * (progress / 0.3);
            } else if (progress > 0.8) {
                speed = maxSpeed * (1 - (progress - 0.8) / 0.2);
            } else {
                speed = maxSpeed;
            }

            // Clear canvas with fade effect
            ctx.fillStyle = effectOptions.backgroundColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particles.forEach(particle => {
                particle.update(speed);
                particle.draw(ctx, effectOptions);
            });

            // Continue or complete
            if (progress < 1) {
                animationRef.current = requestAnimationFrame(animate);
            } else {
                if (onComplete) onComplete();
            }
        };

        // Start animation after a brief delay
        setTimeout(() => {
            setIsReady(true);
            animate();
        }, 100);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [effectOptions, duration, onComplete]);

    return (
        <div className="absolute inset-0 overflow-hidden">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ background: effectOptions.backgroundColor }}
            />

            {/* Logo overlay */}
            <AnimatePresence>
                {showLogo && isReady && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.5 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
                    >
                        <div className="text-center space-y-6">
                            {/* Logo */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <div className="text-8xl md:text-9xl font-black">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-sky-500 drop-shadow-2xl">
                                        RULYN
                                    </span>
                                </div>
                            </motion.div>

                            {/* Tagline */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 }}
                                className={`text-xl md:text-2xl font-medium tracking-wider ${effectOptions.backgroundColor?.startsWith('#fff') || effectOptions.backgroundColor?.startsWith('#f')
                                        ? 'text-slate-700'
                                        : 'text-white'
                                    }`}
                            >
                                Where Learning Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-sky-500 font-bold">Adventure</span>
                            </motion.div>

                            {/* Loading indicator */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.5, duration: 0.5 }}
                                className="flex items-center justify-center mt-4"
                            >
                                <div className="flex items-center gap-2">
                                    {[0, 1, 2].map((i) => (
                                        <motion.div
                                            key={i}
                                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                            className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-sky-500"
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Hyperspeed;

