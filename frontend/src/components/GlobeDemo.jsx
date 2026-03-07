import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const GlobeDemo = () => {
    const canvasRef = useRef(null);
    const [connections, setConnections] = useState([]);

    // Major educational hubs around the world
    const locations = [
        { name: "New Delhi", lat: 28.6139, lng: 77.209, students: "15,000" },
        { name: "Mumbai", lat: 19.0760, lng: 72.8777, students: "12,000" },
        { name: "Bangalore", lat: 12.9716, lng: 77.5946, students: "18,000" },
        { name: "Singapore", lat: 1.3521, lng: 103.8198, students: "5,000" },
        { name: "Dubai", lat: 25.2048, lng: 55.2708, students: "8,000" },
        { name: "London", lat: 51.5072, lng: -0.1276, students: "6,000" },
        { name: "New York", lat: 40.7128, lng: -74.0060, students: "7,000" },
        { name: "Sydney", lat: -33.8688, lng: 151.2093, students: "4,000" },
    ];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * 2; // Retina display
        canvas.height = rect.height * 2;
        ctx.scale(2, 2);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const radius = Math.min(centerX, centerY) * 0.8;

        let rotation = 0;
        let animationId;

        // Convert lat/lng to 3D coordinates
        const latLngToXY = (lat, lng, r, rot) => {
            const phi = (90 - lat) * (Math.PI / 180);
            const theta = (lng + rot) * (Math.PI / 180);

            const x = r * Math.sin(phi) * Math.cos(theta);
            const z = r * Math.sin(phi) * Math.sin(theta);
            const y = r * Math.cos(phi);

            // Simple perspective projection
            const scale = 300 / (300 + z);
            return {
                x: centerX + x * scale,
                y: centerY + y * scale,
                z: z,
                scale: scale,
                visible: z > -radius * 0.3 // Only show front hemisphere
            };
        };

        // Draw grid lines
        const drawGrid = (rot) => {
            ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
            ctx.lineWidth = 0.5;

            // Latitude lines
            for (let lat = -80; lat <= 80; lat += 20) {
                ctx.beginPath();
                for (let lng = 0; lng <= 360; lng += 5) {
                    const point = latLngToXY(lat, lng, radius, rot);
                    if (point.visible) {
                        if (lng === 0) {
                            ctx.moveTo(point.x, point.y);
                        } else {
                            ctx.lineTo(point.x, point.y);
                        }
                    }
                }
                ctx.stroke();
            }

            // Longitude lines
            for (let lng = 0; lng < 360; lng += 20) {
                ctx.beginPath();
                for (let lat = -90; lat <= 90; lat += 5) {
                    const point = latLngToXY(lat, lng, radius, rot);
                    if (point.visible) {
                        if (lat === -90) {
                            ctx.moveTo(point.x, point.y);
                        } else {
                            ctx.lineTo(point.x, point.y);
                        }
                    }
                }
                ctx.stroke();
            }
        };

        // Draw location markers
        const drawMarkers = (rot) => {
            locations.forEach((loc, index) => {
                const point = latLngToXY(loc.lat, loc.lng, radius, rot);

                if (point.visible) {
                    // Glow effect
                    const gradient = ctx.createRadialGradient(
                        point.x, point.y, 0,
                        point.x, point.y, 15 * point.scale
                    );
                    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
                    gradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.4)');
                    gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');

                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(point.x, point.y, 15 * point.scale, 0, Math.PI * 2);
                    ctx.fill();

                    // Dot
                    ctx.fillStyle = '#3b82f6';
                    ctx.beginPath();
                    ctx.arc(point.x, point.y, 4 * point.scale, 0, Math.PI * 2);
                    ctx.fill();

                    // Pulse ring
                    const pulseRadius = 8 * point.scale + Math.sin(Date.now() / 500 + index) * 3;
                    ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.arc(point.x, point.y, pulseRadius, 0, Math.PI * 2);
                    ctx.stroke();
                }
            });
        };

        // Draw connection arcs
        const drawConnections = (rot) => {
            ctx.strokeStyle = 'rgba(147, 51, 234, 0.3)';
            ctx.lineWidth = 1.5;

            for (let i = 0; i < locations.length; i++) {
                for (let j = i + 1; j < locations.length; j++) {
                    if (Math.random() > 0.7) { // Only some connections
                        const start = latLngToXY(locations[i].lat, locations[i].lng, radius, rot);
                        const end = latLngToXY(locations[j].lat, locations[j].lng, radius, rot);

                        if (start.visible && end.visible) {
                            // Draw curved arc
                            ctx.beginPath();
                            ctx.moveTo(start.x, start.y);

                            const midX = (start.x + end.x) / 2;
                            const midY = (start.y + end.y) / 2;
                            const distance = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
                            const controlY = midY - distance * 0.2;

                            ctx.quadraticCurveTo(midX, controlY, end.x, end.y);
                            ctx.stroke();
                        }
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, rect.width, rect.height);

            // Draw globe sphere background
            const gradient = ctx.createRadialGradient(
                centerX, centerY, 0,
                centerX, centerY, radius
            );
            gradient.addColorStop(0, 'rgba(30, 58, 138, 0.1)');
            gradient.addColorStop(1, 'rgba(30, 58, 138, 0.05)');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.fill();

            // Draw outer glow
            ctx.strokeStyle = 'rgba(99, 102, 241, 0.3)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.stroke();

            drawGrid(rotation);
            drawConnections(rotation);
            drawMarkers(rotation);

            rotation += 0.2; // Rotation speed
            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        };
    }, []);

    return (
        <div className="relative w-full h-screen md:h-[700px] bg-gradient-to-b from-white to-gray-50 dark:from-zinc-950 dark:to-zinc-900 overflow-hidden">
            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-6xl font-black mb-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                            50,000+ Students
                        </span>
                        <br />
                        Learning Worldwide
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                        Join our global community of curious minds exploring Science, Technology, Engineering, and Mathematics
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 relative z-20"
                >
                    {[
                        { label: "Countries", value: "50+", icon: "🌍" },
                        { label: "Active Students", value: "50K+", icon: "👥" },
                        { label: "Lessons Completed", value: "1M+", icon: "📚" },
                        { label: "Success Rate", value: "98%", icon: "🎯" }
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * index }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-xl"
                        >
                            <div className="text-4xl mb-2">{stat.icon}</div>
                            <div className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                                {stat.value}
                            </div>
                            <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Globe Canvas */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full"
                    style={{ maxWidth: '800px', maxHeight: '800px' }}
                />
            </div>

            {/* Gradient overlay at bottom */}
            <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-white dark:from-zinc-950 to-transparent pointer-events-none z-30" />
        </div>
    );
};

export default GlobeDemo;
