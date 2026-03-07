import React, { useRef, useEffect } from 'react';

const ParticleRing = ({
    title = "Learn. Play. Grow.",
    subtitle = "Interactive 3D Learning Experience"
}) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * 2; // Retina
        canvas.height = rect.height * 2;
        ctx.scale(2, 2);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Create particles in two rings
        class Particle {
            constructor(radius, angle, layer, color) {
                this.baseRadius = radius;
                this.angle = angle;
                this.layer = layer;
                this.color = color;
                this.size = Math.random() * 3 + 2;
                this.speed = (Math.random() * 0.5 + 0.3) * (layer === 'inner' ? 1 : -1);
                this.z = Math.random() * 200 - 100; // Depth
                this.pulseOffset = Math.random() * Math.PI * 2;
            }

            update(time) {
                // Rotate
                this.angle += this.speed * 0.001;

                // Pulse effect
                this.z = Math.sin(time * 0.001 + this.pulseOffset) * 100;
            }

            draw(ctx, time) {
                // Calculate 3D position
                const scale = 300 / (300 + this.z);
                const radius = this.baseRadius * scale;
                const size = this.size * scale;

                const x = centerX + Math.cos(this.angle) * radius;
                const y = centerY + Math.sin(this.angle) * radius;

                // Opacity based on depth
                const opacity = Math.max(0.3, Math.min(1, (this.z + 100) / 200));

                // Glow
                const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 3);
                gradient.addColorStop(0, this.color + Math.floor(opacity * 255).toString(16).padStart(2, '0'));
                gradient.addColorStop(0.5, this.color + Math.floor(opacity * 128).toString(16).padStart(2, '0'));
                gradient.addColorStop(1, this.color + '00');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(x, y, size * 3, 0, Math.PI * 2);
                ctx.fill();

                // Core particle
                ctx.fillStyle = this.color + Math.floor(opacity * 255).toString(16).padStart(2, '0');
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Generate particles
        const particles = [];
        const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4'];

        // Inner ring
        for (let i = 0; i < 50; i++) {
            const angle = (i / 50) * Math.PI * 2;
            const color = colors[Math.floor(Math.random() * colors.length)];
            particles.push(new Particle(120, angle, 'inner', color));
        }

        // Outer ring
        for (let i = 0; i < 80; i++) {
            const angle = (i / 80) * Math.PI * 2;
            const color = colors[Math.floor(Math.random() * colors.length)];
            particles.push(new Particle(200, angle, 'outer', color));
        }

        // Mouse interaction
        let mouseX = centerX;
        let mouseY = centerY;
        let isDragging = false;

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };

        const handleTouchMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.touches[0].clientX - rect.left;
            mouseY = e.touches[0].clientY - rect.top;
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('touchmove', handleTouchMove);

        // Animation
        let animationId;
        const startTime = Date.now();

        const animate = () => {
            const time = Date.now() - startTime;

            ctx.clearRect(0, 0, rect.width, rect.height);

            // Sort particles by depth for proper layering
            particles.sort((a, b) => a.z - b.z);

            // Update and draw
            particles.forEach(particle => {
                particle.update(time);
                particle.draw(ctx, time);
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationId) cancelAnimationFrame(animationId);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    return (
        <div className="relative w-full h-screen bg-gradient-to-br from-white to-gray-100 dark:from-zinc-950 dark:to-zinc-900 overflow-hidden">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
            />

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center space-y-4 z-10">
                    <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                        {title}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-medium">
                        {subtitle}
                    </p>
                    <div className="text-sm text-gray-500 dark:text-gray-500 mt-8">
                        Move your mouse to interact with the particles
                    </div>
                </div>
            </div>

            {/* Gradient overlays for edge fade */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white dark:from-zinc-950 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-gray-100 dark:from-zinc-900 to-transparent" />
            </div>
        </div>
    );
};

export default ParticleRing;
