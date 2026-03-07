import React, { useRef, useEffect } from 'react';

// CREDIT
// Component inspired by @BalintFerenczy on X
// https://codepen.io/BalintFerenczy/pen/KwdoyEN

const ElectricBorder = ({
    children,
    color = "#7df9ff",
    speed = 1,
    chaos = 0.5,
    thickness = 2,
    style = {},
    className = ""
}) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        let time = 0;

        const resize = () => {
            const rect = container.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            canvas.width = width;
            canvas.height = height;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            const perimeter = (width + height) * 2;
            const particleCount = Math.floor(perimeter / 10);

            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    progress: i / particleCount,
                    speed: (Math.random() * 0.5 + 0.5) * speed,
                    offset: (Math.random() - 0.5) * chaos * 20
                });
            }
        };

        const getPointOnBorder = (progress, offset = 0) => {
            const perimeter = (width + height) * 2;
            let distance = (progress * perimeter + offset) % perimeter;

            if (distance < 0) distance += perimeter;

            // Top edge
            if (distance < width) {
                return { x: distance, y: 0 };
            }
            distance -= width;

            // Right edge
            if (distance < height) {
                return { x: width, y: distance };
            }
            distance -= height;

            // Bottom edge
            if (distance < width) {
                return { x: width - distance, y: height };
            }
            distance -= width;

            // Left edge
            return { x: 0, y: height - distance };
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            time += 0.016 * speed;

            particles.forEach((particle, index) => {
                particle.progress += particle.speed * 0.0005;
                if (particle.progress > 1) particle.progress -= 1;

                const waveOffset = Math.sin(time + index * 0.5) * particle.offset;
                const pos = getPointOnBorder(particle.progress, waveOffset);
                const nextPos = getPointOnBorder(particle.progress + 0.001, waveOffset);

                // Draw glow
                const gradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, thickness * 3);
                gradient.addColorStop(0, color);
                gradient.addColorStop(0.5, color + '80');
                gradient.addColorStop(1, color + '00');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(pos.x, pos.y, thickness * 3, 0, Math.PI * 2);
                ctx.fill();

                // Draw particle trail
                ctx.strokeStyle = color;
                ctx.lineWidth = thickness;
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(pos.x, pos.y);
                ctx.lineTo(nextPos.x, nextPos.y);
                ctx.stroke();
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        resize();
        animate();

        window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('resize', resize);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [color, speed, chaos, thickness]);

    return (
        <div
            ref={containerRef}
            className={`relative ${className}`}
            style={style}
        >
            <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none"
                style={{ zIndex: 1 }}
            />
            <div className="relative" style={{ zIndex: 2 }}>
                {children}
            </div>
        </div>
    );
};

export default ElectricBorder;
