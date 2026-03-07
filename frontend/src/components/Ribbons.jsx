import React, { useRef, useEffect } from 'react';

const Ribbons = ({
    baseThickness = 30,
    colors = ['#f97316', '#fbbf24', '#06b6d4'],
    speedMultiplier = 0.5,
    maxAge = 500,
    enableFade = true,
    enableShaderEffect = true
}) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width = canvas.parentElement.clientWidth;
        let height = canvas.parentElement.clientHeight;
        canvas.width = width;
        canvas.height = height;

        const ribbons = [];
        let time = 0;

        class Ribbon {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * width;
                this.y = height + 100;
                this.vx = (Math.random() - 0.5) * 2;
                this.vy = -Math.random() * 3 - 2;
                this.thickness = baseThickness * (0.5 + Math.random() * 0.5);
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.age = 0;
                this.segments = [];
                this.wave = Math.random() * Math.PI * 2;
                this.waveSpeed = 0.02 + Math.random() * 0.03;
                this.waveAmplitude = 50 + Math.random() * 100;
            }

            update() {
                this.age++;
                this.wave += this.waveSpeed * speedMultiplier;

                // Calculate new position with wave motion
                const waveX = Math.sin(this.wave) * this.waveAmplitude;
                this.x += this.vx * speedMultiplier + Math.cos(this.wave) * 0.5;
                this.y += this.vy * speedMultiplier;

                // Add current position to segments
                this.segments.unshift({ x: this.x + waveX, y: this.y });

                // Limit segment count
                if (this.segments.length > 50) {
                    this.segments.pop();
                }

                // Reset if off screen or too old
                if (this.y < -100 || this.age > maxAge) {
                    this.reset();
                }
            }

            draw(ctx) {
                if (this.segments.length < 2) return;

                ctx.save();

                // Calculate opacity based on age
                let opacity = 1;
                if (enableFade) {
                    opacity = Math.max(0, 1 - this.age / maxAge);
                }

                // Draw ribbon as a flowing path
                ctx.beginPath();
                ctx.moveTo(this.segments[0].x, this.segments[0].y);

                for (let i = 1; i < this.segments.length - 1; i++) {
                    const xc = (this.segments[i].x + this.segments[i + 1].x) / 2;
                    const yc = (this.segments[i].y + this.segments[i + 1].y) / 2;
                    ctx.quadraticCurveTo(this.segments[i].x, this.segments[i].y, xc, yc);
                }

                // Gradient stroke
                const gradient = ctx.createLinearGradient(
                    this.segments[0].x, this.segments[0].y,
                    this.segments[this.segments.length - 1].x, this.segments[this.segments.length - 1].y
                );

                const r = parseInt(this.color.slice(1, 3), 16);
                const g = parseInt(this.color.slice(3, 5), 16);
                const b = parseInt(this.color.slice(5, 7), 16);

                gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${opacity})`);
                gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${opacity * 0.8})`);
                gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

                ctx.strokeStyle = gradient;
                ctx.lineWidth = this.thickness;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.stroke();

                // Shader effect - glow
                if (enableShaderEffect) {
                    ctx.shadowColor = this.color;
                    ctx.shadowBlur = 20;
                    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity * 0.3})`;
                    ctx.lineWidth = this.thickness * 2;
                    ctx.stroke();
                }

                ctx.restore();
            }
        }

        // Initialize ribbons
        const ribbonCount = 8;
        for (let i = 0; i < ribbonCount; i++) {
            ribbons.push(new Ribbon());
        }

        // Animation loop
        const animate = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, width, height);

            time++;

            ribbons.forEach(ribbon => {
                ribbon.update();
                ribbon.draw(ctx);
            });

            requestAnimationFrame(animate);
        };

        animate();

        // Handle resize
        const handleResize = () => {
            width = canvas.parentElement.clientWidth;
            height = canvas.parentElement.clientHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [baseThickness, colors, speedMultiplier, maxAge, enableFade, enableShaderEffect]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none'
            }}
        />
    );
};

export default Ribbons;
