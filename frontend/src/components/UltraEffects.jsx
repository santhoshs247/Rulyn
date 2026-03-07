import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// ============ METEOR SHOWER EFFECT ============
export const MeteorShower = ({ count = 20 }) => {
    const meteors = Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 5,
        duration: Math.random() * 2 + 1,
        size: Math.random() * 2 + 1,
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {meteors.map((meteor) => (
                <motion.div
                    key={meteor.id}
                    className="absolute"
                    style={{
                        left: meteor.left,
                        top: '-5%',
                        width: `${meteor.size}px`,
                        height: `${meteor.size * 50}px`,
                        background: `linear-gradient(to bottom, rgba(249, 115, 22, 0.8), transparent)`,
                        borderRadius: '50%',
                        filter: 'blur(1px)',
                    }}
                    animate={{
                        y: ['0vh', '110vh'],
                        opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                        duration: meteor.duration,
                        delay: meteor.delay,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />
            ))}
        </div>
    );
};

// ============ GLITCH TEXT EFFECT ============
export const GlitchText = ({ text, className = "" }) => {
    const [glitch, setGlitch] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setGlitch(true);
            setTimeout(() => setGlitch(false), 200);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`relative inline-block ${className}`}>
            <span className="relative z-10">{text}</span>
            {glitch && (
                <>
                    <span
                        className="absolute inset-0 text-cyan-400 z-0"
                        style={{
                            clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
                            transform: 'translate(-4px, -2px)',
                        }}
                    >
                        {text}
                    </span>
                    <span
                        className="absolute inset-0 text-pink-500 z-0"
                        style={{
                            clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
                            transform: 'translate(4px, 2px)',
                        }}
                    >
                        {text}
                    </span>
                </>
            )}
        </div>
    );
};

// ============ TYPING EFFECT ============
export const TypeWriter = ({ texts, speed = 100, pause = 2000, className = "" }) => {
    const [displayText, setDisplayText] = useState('');
    const [textIndex, setTextIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentText = texts[textIndex];

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (charIndex < currentText.length) {
                    setDisplayText(currentText.slice(0, charIndex + 1));
                    setCharIndex(prev => prev + 1);
                } else {
                    setTimeout(() => setIsDeleting(true), pause);
                }
            } else {
                if (charIndex > 0) {
                    setDisplayText(currentText.slice(0, charIndex - 1));
                    setCharIndex(prev => prev - 1);
                } else {
                    setIsDeleting(false);
                    setTextIndex((prev) => (prev + 1) % texts.length);
                }
            }
        }, isDeleting ? speed / 2 : speed);

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, textIndex, texts, speed, pause]);

    return (
        <span className={className}>
            {displayText}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-1 h-8 bg-orange-500 ml-1"
            />
        </span>
    );
};

// ============ MAGNETIC HOVER EFFECT ============
export const MagneticElement = ({ children, className = "", strength = 0.3 }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 150, damping: 15 });
    const springY = useSpring(y, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) * strength);
        y.set((e.clientY - centerY) * strength);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            style={{ x: springX, y: springY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// ============ PULSE RING EFFECT ============
export const PulseRings = ({ color = "#f97316", size = 200 }) => {
    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[...Array(4)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full border-2"
                    style={{
                        borderColor: color,
                        width: size,
                        height: size,
                    }}
                    animate={{
                        scale: [1, 2, 2.5],
                        opacity: [0.5, 0.2, 0],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.7,
                        ease: 'easeOut',
                    }}
                />
            ))}
        </div>
    );
};

// ============ FLOATING ICONS ============
export const FloatingIcons = ({ icons = ['🎮', '📚', '🏆', '⭐', '🚀', '💎'] }) => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {icons.map((icon, i) => (
                <motion.div
                    key={i}
                    className="absolute text-4xl"
                    style={{
                        left: `${10 + (i * 15)}%`,
                        top: `${20 + Math.random() * 60}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 4 + i,
                        repeat: Infinity,
                        delay: i * 0.5,
                    }}
                >
                    {icon}
                </motion.div>
            ))}
        </div>
    );
};

// ============ SPOTLIGHT EFFECT ============
export const Spotlight = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
            style={{
                background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(249, 115, 22, 0.1), transparent 40%)`,
            }}
        />
    );
};

// ============ ANIMATED COUNTER ============
export const AnimatedCounter = ({ value, duration = 2, suffix = '' }) => {
    const [count, setCount] = useState(0);
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

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        const end = parseInt(value.toString().replace(/\D/g, ''));
        const increment = end / (duration * 60);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, 1000 / 60);

        return () => clearInterval(timer);
    }, [isVisible, value, duration]);

    return (
        <span ref={ref}>
            {count.toLocaleString()}{suffix}
        </span>
    );
};

// ============ WAVE ANIMATION ============
export const WaveText = ({ text, className = "" }) => {
    return (
        <span className={`inline-flex ${className}`}>
            {text.split('').map((char, i) => (
                <motion.span
                    key={i}
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.05,
                    }}
                    className="inline-block"
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </span>
    );
};

// ============ ENERGY FIELD ============
export const EnergyField = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-px bg-gradient-to-b from-transparent via-orange-500 to-transparent"
                    style={{
                        left: `${i * 5}%`,
                        height: '100%',
                    }}
                    animate={{
                        opacity: [0, 0.5, 0],
                        scaleY: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.1,
                    }}
                />
            ))}
        </div>
    );
};

export default {
    MeteorShower,
    GlitchText,
    TypeWriter,
    MagneticElement,
    PulseRings,
    FloatingIcons,
    Spotlight,
    AnimatedCounter,
    WaveText,
    EnergyField,
};
