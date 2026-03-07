import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// ============ TILT CARD (3D Hover Effect) ============
export const TiltCard = ({ children, className = "", intensity = 15 }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-0.5, 0.5], [intensity, -intensity]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-intensity, intensity]);

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) / rect.width);
        y.set((e.clientY - centerY) / rect.height);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// ============ SPOTLIGHT CARD ============
export const SpotlightCard = ({ children, className = "", spotlightColor = "rgba(249, 115, 22, 0.15)" }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <div
            className={`relative overflow-hidden ${className}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered && (
                <div
                    className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 60%)`,
                    }}
                />
            )}
            {children}
        </div>
    );
};

// ============ SCRAMBLE TEXT ============
export const ScrambleText = ({ text, className = "", scrambleSpeed = 50 }) => {
    const [displayText, setDisplayText] = useState(text);
    const [isHovered, setIsHovered] = useState(false);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

    useEffect(() => {
        if (!isHovered) {
            setDisplayText(text);
            return;
        }

        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(
                text.split('').map((char, index) => {
                    if (index < iteration) return text[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join('')
            );
            iteration += 1 / 3;
            if (iteration >= text.length) clearInterval(interval);
        }, scrambleSpeed);

        return () => clearInterval(interval);
    }, [isHovered, text]);

    return (
        <span
            className={className}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {displayText}
        </span>
    );
};

// ============ BLOB CURSOR ============
export const BlobCursor = ({ color = "#f97316" }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <motion.div
            className="pointer-events-none fixed z-[9999] hidden md:block"
            animate={{ x: position.x - 150, y: position.y - 150 }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
        >
            <div
                className="w-[300px] h-[300px] rounded-full blur-3xl opacity-30"
                style={{ background: color }}
            />
        </motion.div>
    );
};

// ============ AURORA BACKGROUND ============
export const AuroraBackground = ({ className = "" }) => {
    return (
        <div className={`absolute inset-0 overflow-hidden ${className}`}>
            <div className="absolute inset-0 bg-black" />
            <motion.div
                className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%]"
                style={{
                    background: `
                        radial-gradient(ellipse at 20% 50%, rgba(249, 115, 22, 0.15) 0%, transparent 50%),
                        radial-gradient(ellipse at 80% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 50%),
                        radial-gradient(ellipse at 50% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)
                    `,
                }}
                animate={{
                    rotate: [0, 360],
                }}
                transition={{
                    duration: 60,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            />
        </div>
    );
};

// ============ GRADIENT BORDER BUTTON ============
export const GradientBorderButton = ({ children, className = "", onClick }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`relative group ${className}`}
        >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 via-amber-500 to-cyan-500 rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-300 animate-pulse" />
            <div className="relative px-8 py-4 bg-black rounded-2xl font-bold text-white flex items-center gap-2">
                {children}
            </div>
        </motion.button>
    );
};

// ============ FLOATING CREATURE ============
export const FloatingCreature = ({ emoji, name, message, position = "left", delay = 0 }) => {
    const [showMessage, setShowMessage] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, type: 'spring' }}
            className={`fixed z-50 cursor-pointer ${position === 'left' ? 'left-4 bottom-20' : 'right-4 bottom-20'}`}
            onMouseEnter={() => setShowMessage(true)}
            onMouseLeave={() => setShowMessage(false)}
        >
            <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="relative"
            >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-2xl shadow-orange-500/50 text-4xl">
                    {emoji}
                </div>

                {showMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className={`absolute bottom-full mb-3 ${position === 'left' ? 'left-0' : 'right-0'} bg-gray-900 text-white px-4 py-3 rounded-2xl shadow-xl min-w-[200px]`}
                    >
                        <p className="font-bold text-orange-400 text-sm">{name}</p>
                        <p className="text-white/80 text-xs mt-1">{message}</p>
                        <div className={`absolute bottom-0 ${position === 'left' ? 'left-6' : 'right-6'} w-3 h-3 bg-gray-900 transform rotate-45 translate-y-1.5`} />
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
};

// ============ NEON TEXT ============
export const NeonText = ({ children, color = "#f97316", className = "" }) => {
    return (
        <span
            className={className}
            style={{
                textShadow: `0 0 10px ${color}, 0 0 20px ${color}, 0 0 40px ${color}, 0 0 80px ${color}`,
            }}
        >
            {children}
        </span>
    );
};

// ============ STACK CARDS ============
export const StackCards = ({ cards }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="relative h-[400px] w-full flex items-center justify-center">
            {cards.map((card, i) => {
                const isActive = i === activeIndex;
                const offset = (i - activeIndex) * 30;

                return (
                    <motion.div
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        animate={{
                            x: offset,
                            scale: isActive ? 1 : 0.9,
                            zIndex: cards.length - Math.abs(i - activeIndex),
                            opacity: Math.abs(i - activeIndex) > 2 ? 0 : 1,
                        }}
                        whileHover={{ scale: isActive ? 1.02 : 0.92 }}
                        className="absolute w-80 h-96 rounded-3xl cursor-pointer"
                        style={{
                            background: card.gradient,
                        }}
                    >
                        <div className="p-8 h-full flex flex-col justify-between text-white">
                            <div className="text-5xl">{card.emoji}</div>
                            <div>
                                <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
                                <p className="opacity-80">{card.description}</p>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};

// ============ MORPHING BLOB ============
export const MorphingBlob = ({ color = "#f97316", size = 200 }) => {
    return (
        <motion.div
            className="absolute rounded-full blur-3xl opacity-50"
            style={{ width: size, height: size, background: color }}
            animate={{
                borderRadius: [
                    "60% 40% 30% 70% / 60% 30% 70% 40%",
                    "30% 60% 70% 40% / 50% 60% 30% 60%",
                    "60% 40% 30% 70% / 60% 30% 70% 40%",
                ],
                rotate: [0, 180, 360],
            }}
            transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
            }}
        />
    );
};

// ============ REVEAL ON SCROLL ============
export const RevealOnScroll = ({ children, direction = "up", className = "" }) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const variants = {
        up: { y: 50, opacity: 0 },
        down: { y: -50, opacity: 0 },
        left: { x: -50, opacity: 0 },
        right: { x: 50, opacity: 0 },
    };

    return (
        <motion.div
            ref={ref}
            initial={variants[direction]}
            animate={isVisible ? { x: 0, y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// ============ NOISE TEXTURE ============
export const NoiseTexture = ({ opacity = 0.03 }) => {
    return (
        <div
            className="fixed inset-0 pointer-events-none z-[100]"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                opacity,
            }}
        />
    );
};

// ============ ENCRYPT BUTTON ============
export const EncryptButton = ({ children, className = "", onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [displayText, setDisplayText] = useState(children);
    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    useEffect(() => {
        if (!isHovered) {
            setDisplayText(children);
            return;
        }

        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(
                children.split('').map((char, index) => {
                    if (char === ' ') return ' ';
                    if (index < iteration) return children[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join('')
            );
            iteration += 0.3;
            if (iteration >= children.length) setDisplayText(children);
        }, 30);

        return () => clearInterval(interval);
    }, [isHovered, children]);

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
            className={`relative overflow-hidden ${className}`}
        >
            <span className="relative z-10 font-mono">{displayText}</span>
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500"
                initial={{ x: '-100%' }}
                animate={{ x: isHovered ? 0 : '-100%' }}
                transition={{ duration: 0.3 }}
            />
        </motion.button>
    );
};

export default {
    TiltCard,
    SpotlightCard,
    ScrambleText,
    BlobCursor,
    AuroraBackground,
    GradientBorderButton,
    FloatingCreature,
    NeonText,
    StackCards,
    MorphingBlob,
    RevealOnScroll,
    NoiseTexture,
    EncryptButton,
};
