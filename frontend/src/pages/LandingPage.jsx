import React, { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { ReactLenis } from 'lenis/react';
import { useLanguage } from "@/contexts/LanguageContext";
import {
    ArrowRight, Brain, Zap, Globe, Users, Trophy, Shield,
    Sparkles, ChevronDown, Play, Star, Rocket, BookOpen,
    Gamepad2, Crown, Gem, Heart, GraduationCap, Target,
    CheckCircle, MessageCircle, Download, Award, ChevronRight,
    BarChart3, Flame, Gift, Plus, Minus, Quote, ChevronLeft,
    Eye, Lock, Unlock, Smartphone, Check, X, Clock, TrendingUp,
    Medal, Layers, Cpu, Palette, Music, Code, Compass, Atom,
    Twitter, Github, Youtube, HelpCircle
} from "lucide-react";

// Import ALL stunning effect components
import Hyperspeed from "@/components/Hyperspeed";
import { hyperspeedPresets } from "@/components/HyperSpeedPresets";
import CircularGallery from "@/components/CircularGallery";
import ElectricBorder from "@/components/ElectricBorder";
import GridScan from "@/components/GridScan";
import LaserFlow from "@/components/LaserFlow";
import { MeteorShower, GlitchText, TypeWriter, MagneticElement, PulseRings, FloatingIcons, AnimatedCounter, WaveText, EnergyField } from "@/components/UltraEffects";
import { TiltCard, SpotlightCard, ScrambleText, BlobCursor, AuroraBackground, GradientBorderButton, FloatingCreature, NeonText, StackCards, MorphingBlob, RevealOnScroll, NoiseTexture, EncryptButton } from "@/components/AdvancedEffects";

// ============ ANIMATED LEARNING CREATURES ============
const LearningCreature = ({ type = 'book', delay = 0 }) => {
    const { t } = useLanguage();
    const creatures = {
        book: { emoji: '📚', color: 'from-blue-400 to-cyan-500', name: t('creatureBookName'), message: t('creatureBookMsg') },
        flask: { emoji: '🧪', color: 'from-green-400 to-emerald-500', name: t('creatureFlaskName'), message: t('creatureFlaskMsg') },
        calc: { emoji: '➕', color: 'from-violet-400 to-purple-500', name: t('creatureCalcName'), message: t('creatureCalcMsg') },
        globe: { emoji: '🌍', color: 'from-amber-400 to-orange-500', name: t('creatureGlobeName'), message: t('creatureGlobeMsg') },
        rocket: { emoji: '🚀', color: 'from-pink-400 to-rose-500', name: t('creatureRocketName'), message: t('creatureRocketMsg') },
        star: { emoji: '⭐', color: 'from-yellow-400 to-amber-500', name: t('creatureStarName'), message: t('creatureStarMsg') },
    };

    const creature = creatures[type] || creatures.book;
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay, type: 'spring', damping: 15 }}
            className={`absolute cursor-pointer z-30`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    rotate: isHovered ? [0, -10, 10, 0] : 0,
                }}
                transition={{
                    y: { duration: 3, repeat: Infinity },
                    rotate: { duration: 0.5 }
                }}
            >
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${creature.color} flex items-center justify-center shadow-2xl text-4xl relative`}>
                    {creature.emoji}
                    {/* Glow effect */}
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${creature.color} blur-xl opacity-50 -z-10`} />
                </div>

                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.8 }}
                            className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-gray-900/95 backdrop-blur-xl px-4 py-3 rounded-2xl shadow-xl border border-white/10 min-w-[180px]"
                        >
                            <p className="font-bold text-orange-400 text-sm">{creature.name}</p>
                            <p className="text-white/70 text-xs mt-1">{creature.message}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

// ============ INTRO SCREEN ============
const IntroScreen = ({ onComplete }) => {
    const { t } = useLanguage();
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        const timers = [
            setTimeout(() => setPhase(1), 500),
            setTimeout(() => setPhase(2), 1500),
            setTimeout(() => setPhase(3), 2500),
            setTimeout(() => setPhase(4), 4000),
            setTimeout(() => onComplete(), 5000),
        ];
        return () => timers.forEach(clearTimeout);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: phase >= 4 ? 0 : 1 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
        >
            <AuroraBackground />
            <div className="absolute inset-0">
                <Hyperspeed
                    showLogo={false}
                    effectOptions={{
                        ...hyperspeedPresets.one,
                        colors: {
                            roadColor: 0x080808,
                            islandColor: 0x0a0a0a,
                            background: 0x000000,
                            shoulderLines: 0xf97316,
                            brokenLines: 0xfbbf24,
                            leftCars: [0xf97316, 0xfb923c, 0xfbbf24],
                            rightCars: [0x06b6d4, 0x22d3ee, 0x67e8f9],
                            sticks: 0xf97316,
                        }
                    }}
                />
            </div>

            <div className="relative z-10 text-center">
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: phase >= 1 ? 1 : 0, rotate: phase >= 1 ? 0 : -180 }}
                    transition={{ type: "spring", damping: 15 }}
                    className="mb-8 relative"
                >
                    <div className="w-48 h-48 mx-auto rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center relative z-10 overflow-hidden shadow-2xl shadow-orange-500/30 border-2 border-white/10">
                        <img
                            src="/nav-logo.png"
                            alt="Rulyn Logo"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <PulseRings color="#f97316" size={200} />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : 50 }}
                    className="text-8xl md:text-9xl font-black text-white mb-4 tracking-tighter"
                >
                    <NeonText color="#f97316">RULYN</NeonText>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: phase >= 3 ? 1 : 0, scale: phase >= 3 ? 1 : 0.8 }}
                    className="flex items-center justify-center gap-4 text-3xl md:text-4xl font-bold"
                >
                    <motion.span initial={{ x: -50 }} animate={{ x: phase >= 3 ? 0 : -50 }} className="text-orange-400">{t('introStudy')}</motion.span>
                    <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.5, repeat: Infinity }} className="text-yellow-400">⚡</motion.span>
                    <motion.span initial={{ y: -50 }} animate={{ y: phase >= 3 ? 0 : -50 }} className="text-cyan-400">{t('introStrike')}</motion.span>
                    <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="text-pink-400">🎯</motion.span>
                    <motion.span initial={{ x: 50 }} animate={{ x: phase >= 3 ? 0 : 50 }} className="text-emerald-400">{t('introScore')}</motion.span>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: phase >= 3 ? 1 : 0 }} className="mt-12">
                    <div className="w-64 h-3 bg-white/10 rounded-full mx-auto overflow-hidden backdrop-blur-sm">
                        <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 2, delay: 2.5 }} className="h-full bg-gradient-to-r from-orange-500 via-amber-500 to-cyan-500 rounded-full relative">
                            <motion.div animate={{ x: ['-100%', '200%'] }} transition={{ duration: 0.8, repeat: Infinity }} className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                        </motion.div>
                    </div>
                    <p className="text-white/50 mt-4 text-sm uppercase tracking-widest font-mono">
                        <ScrambleText text={t('introInitAdventure')} />
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
};

const LanguageSwitcher = () => {
    const { language, setLanguage, languages } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="relative z-50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
            >
                <span className="text-xl">{languages[language]?.flag}</span>
                <span className="text-white/80 text-sm font-medium uppercase hidden md:inline">{language}</span>
                <ChevronDown className={`w-3 h-3 text-white/60 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full right-0 mt-2 w-48 bg-gray-900/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl overflow-hidden"
                    >
                        {Object.entries(languages).map(([code, lang]) => (
                            <button
                                key={code}
                                onClick={() => { setLanguage(code); setIsOpen(false); }}
                                className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-white/5 transition-colors ${language === code ? 'text-orange-400 bg-orange-500/10' : 'text-white/80'}`}
                            >
                                <span className="text-lg">{lang.flag}</span>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium">{lang.nativeName}</span>
                                    <span className="text-xs text-white/40">{lang.name}</span>
                                </div>
                                {language === code && <Check className="w-3 h-3 ml-auto" />}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// ============ FLOATING PARTICLES ============
const FloatingParticles = ({ count = 50 }) => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(count)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute"
                style={{
                    width: Math.random() * 8 + 2,
                    height: Math.random() * 8 + 2,
                    borderRadius: '50%',
                    background: ['#f97316', '#fbbf24', '#06b6d4', '#8b5cf6', '#f43f5e', '#10b981'][i % 6],
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    boxShadow: `0 0 15px currentColor`,
                }}
                animate={{ y: [0, -120, 0], opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                transition={{ duration: Math.random() * 6 + 4, repeat: Infinity, delay: Math.random() * 5 }}
            />
        ))}
    </div>
);

// ============ NAVBAR ============
const Navbar = () => {
    const { t } = useLanguage();
    const [isCompact, setIsCompact] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // For mobile menu
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            // Scroll Down (>50px) -> Compact & Left
            if (currentScrollY > 50 && currentScrollY > lastScrollY.current) {
                setIsCompact(true);
            }
            // Scroll Up OR Top -> Expanded & Center
            else if (currentScrollY < lastScrollY.current || currentScrollY <= 50) {
                setIsCompact(false);
            }
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <div className={`fixed top-0 left-0 right-0 z-50 flex pointer-events-none transition-all duration-700 pt-6 px-6 ${isCompact ? 'justify-start' : 'justify-center'}`}>
                {/* Desktop Navbar */}
                <motion.div
                    layout
                    initial={{ y: -100, opacity: 0 }}
                    animate={{
                        y: 0,
                        opacity: 1,
                        padding: isCompact ? '0px' : '8px',
                        gap: isCompact ? '0px' : '16px',
                        // When compact, just show the image (no extra background if possible), or small pill
                        borderRadius: '9999px',
                        backgroundColor: isCompact ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0.7)'
                    }}
                    transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                    className={`hidden md:flex pointer-events-auto items-center border transition-all duration-500 ${isCompact ? "border-transparent shadow-none" : "border-white/10 backdrop-blur-2xl shadow-2xl shadow-black/50"
                        }`}
                >
                    {/* Logo - Always Visible (Replaced with Image) */}
                    <MagneticElement strength={0.2}>
                        <Link href="/">
                            <motion.div
                                layoutId="nav-logo"
                                className={`relative z-20 cursor-pointer group hover:scale-105 transition-transform duration-300 ${isCompact ? 'w-16 h-16' : 'w-12 h-12'}`}
                            >
                                <img
                                    src="/nav-logo.png"
                                    alt="Rulyn Logo"
                                    className="w-full h-full object-cover rounded-full shadow-lg shadow-orange-500/20"
                                />
                            </motion.div>
                        </Link>
                    </MagneticElement>

                    {/* Collapsible Content */}
                    <AnimatePresence mode="popLayout">
                        {!isCompact && (
                            <motion.div
                                initial={{ opacity: 0, width: 0, clipPath: "inset(0 0 0 100%)" }}
                                animate={{ opacity: 1, width: "auto", clipPath: "inset(0 0 0 0%)" }}
                                exit={{ opacity: 0, width: 0, clipPath: "inset(0 0 0 100%)" }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="flex items-center gap-4 overflow-hidden"
                            >
                                {/* Nav Items */}
                                <div className="flex items-center gap-1">
                                    {[
                                        { label: t('navFeatures'), href: '#features' },
                                        { label: t('navTeachers'), href: '#teachers' },
                                        { label: t('navSubjects'), href: '#subjects' },
                                        { label: t('navPricing'), href: '#pricing' },
                                        { label: t('navReviews'), href: '#reviews' },
                                        { label: t('navFaq'), href: '#faq' }
                                    ].map((item, i) => (
                                        <MagneticElement key={i} strength={0.1}>
                                            <a href={item.href}>
                                                <div className="px-4 py-2 rounded-full text-sm font-bold text-gray-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer relative group whitespace-nowrap">
                                                    <span className="relative z-10">{item.label}</span>
                                                </div>
                                            </a>
                                        </MagneticElement>
                                    ))}
                                </div>

                                {/* Divider */}
                                <div className="w-px h-6 bg-white/10 flex-shrink-0" />

                                {/* Extras */}
                                <div className="flex items-center gap-3">
                                    <div className="bg-white/5 rounded-full px-1 border border-white/5 hover:border-white/20 transition-colors">
                                        <div className="scale-90">
                                            <LanguageSwitcher />
                                        </div>
                                    </div>

                                    <Link href="/login">
                                        <MagneticElement strength={0.2}>
                                            <button className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm tracking-wide flex items-center gap-2 group hover:bg-gray-200 transition-colors shadow-lg shadow-white/10 whitespace-nowrap">
                                                <span>{t('navPlayNow')}</span>
                                                <Play className="w-3 h-3 fill-current group-hover:translate-x-0.5 transition-transform" />
                                            </button>
                                        </MagneticElement>
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Mobile Navbar Button (Simplified for mobile) */}
                <div className={`md:hidden pointer-events-auto w-full flex justify-between items-center px-4 py-3 rounded-2xl bg-black/90 backdrop-blur-xl border border-white/10 transition-all duration-500 ${isCompact ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                    <div className="flex items-center gap-2">
                        <img src="/nav-logo.png" alt="Logo" className="w-8 h-8 rounded-full object-cover" />
                        <span className="font-bold text-white tracking-widest">RULYN</span>
                    </div>
                    <button onClick={() => setIsOpen(true)} className="text-white p-2 bg-white/5 rounded-full">
                        <Layers className="w-6 h-6" />
                    </button>
                </div>

                {/* Mobile Compact Logo (When scrolled down) */}
                <div className={`md:hidden fixed top-6 left-6 pointer-events-auto transition-all duration-500 ${isCompact ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"}`}>
                    <button onClick={() => setIsOpen(true)} className="rounded-full shadow-lg shadow-orange-500/20">
                        <img src="/nav-logo.png" alt="Logo" className="w-12 h-12 rounded-full object-cover" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[60] bg-black border-l border-white/10 flex flex-col pointer-events-auto"
                    >
                        <div className="p-6 flex justify-between items-center border-b border-white/10">
                            <div className="flex items-center gap-2">
                                <img src="/nav-logo.png" alt="Logo" className="w-10 h-10 rounded-full object-cover" />
                                <span className="font-black text-white text-xl tracking-tighter">MENU</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="flex-1 flex flex-col justify-center px-8 gap-6">
                            {[
                                { label: t('navFeatures'), href: '#features' },
                                { label: t('navTeachers'), href: '#teachers' },
                                { label: t('navSubjects'), href: '#subjects' },
                                { label: t('navPricing'), href: '#pricing' },
                                { label: t('navReviews'), href: '#reviews' },
                                { label: t('navFaq'), href: '#faq' }
                            ].map((item, i) => (
                                <a
                                    key={i}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-4xl font-black text-white/50 hover:text-white hover:pl-4 transition-all duration-300"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                        <div className="p-8 border-t border-white/10 flex flex-col gap-4">
                            <LanguageSwitcher />
                            <Link href="/login">
                                <button className="w-full py-4 bg-[#fa5a2a] text-white rounded-xl font-bold text-lg">
                                    {t('navPlayNow')}
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

// ============ HERO ============
const Hero = () => {
    const { t } = useLanguage();
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const typingTexts = [t('heroTyping1'), t('heroTyping2'), t('heroTyping3'), t('heroTyping4')];

    return (
        <section ref={ref} className="relative min-h-screen overflow-hidden">
            <AuroraBackground />
            <MeteorShower count={25} />
            <FloatingParticles count={40} />
            <FloatingIcons icons={['🎮', '📚', '🏆', '⭐', '🚀', '💎', '🔥', '✨', '🎯', '💡']} />

            {/* Learning Creatures */}
            <LearningCreature type="book" position="top-40 left-10" delay={5.5} />
            <LearningCreature type="flask" position="top-60 right-10" delay={5.7} />
            <LearningCreature type="calc" position="bottom-40 left-20" delay={5.9} />
            <LearningCreature type="globe" position="bottom-60 right-20" delay={6.1} />

            <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 min-h-screen flex items-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
                    <div>
                        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 5.2 }}>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/20 to-amber-500/20 backdrop-blur-sm border border-orange-500/30 rounded-full mb-6">
                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
                                    <Sparkles className="w-4 h-4 text-orange-400" />
                                </motion.div>
                                <span className="text-orange-400 font-semibold text-sm">🔥 World's First Ultra-Gamified Learning</span>
                            </div>
                        </motion.div>

                        <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 5.4 }} className="text-5xl md:text-8xl font-black text-white mb-6 leading-none tracking-tighter">
                            <span className="block text-transparent bg-clip-text bg-orange-500">
                                LOAD.
                            </span>
                            <span className="block pl-12 text-white">
                                LEARN.
                            </span>
                            <span className="block pl-24 text-transparent bg-clip-text bg-orange-500">
                                LEAD.
                            </span>
                        </motion.h1>

                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5.6 }} className="text-xl text-white/70 mb-8 h-12">
                            <TypeWriter texts={typingTexts} speed={60} pause={2500} className="text-cyan-400 font-medium" />
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 5.8 }} className="flex flex-wrap gap-4">
                            <Link href="/login">
                                <GradientBorderButton>
                                    <Play className="w-6 h-6" /> {t('heroStart')} <ArrowRight className="w-5 h-5" />
                                </GradientBorderButton>
                            </Link>
                            <motion.button whileHover={{ scale: 1.05 }} className="px-8 py-4 border-2 border-white/20 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-white/5 backdrop-blur-sm transition-all">
                                <Eye className="w-5 h-5" /> Watch Demo
                            </motion.button>
                        </motion.div>

                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 6 }} className="mt-12 flex gap-8 md:gap-12">
                            {[
                                { value: '50000', suffix: '+', label: 'Students', icon: Users, color: 'text-cyan-400' },
                                { value: '1000000', suffix: '+', label: 'Quests', icon: Trophy, color: 'text-amber-400' },
                                { value: '98', suffix: '%', label: 'Success', icon: TrendingUp, color: 'text-green-400' }
                            ].map((stat, i) => (
                                <RevealOnScroll key={i} direction="up" className="text-center">
                                    <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                                    <div className="text-2xl md:text-3xl font-black text-white">
                                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                                    </div>
                                    <div className="text-sm text-white/50">{stat.label}</div>
                                </RevealOnScroll>
                            ))}
                        </motion.div>
                    </div>

                    <motion.div initial={{ opacity: 0, scale: 0.8, rotateY: -30 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }} transition={{ delay: 5.5, duration: 0.8 }} className="relative" style={{ perspective: 1000 }}>
                        <TiltCard intensity={10}>
                            <SpotlightCard spotlightColor="rgba(249, 115, 22, 0.2)" className="bg-gray-900/80 backdrop-blur-2xl rounded-3xl p-8 border border-orange-500/20 shadow-2xl shadow-orange-500/10">
                                <div className="flex items-center gap-4 mb-6">
                                    <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-xl shadow-orange-500/40">
                                        <span className="text-3xl">🎮</span>
                                    </motion.div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-white">Welcome, Hero!</h3>
                                        <p className="text-white/60">Champion Learner</p>
                                    </div>
                                    <div className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-white text-xs font-bold flex items-center gap-1">
                                        <Crown className="w-3 h-3" /> PRO
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-white font-bold flex items-center gap-2">
                                            <span className="text-lg">👑</span> Level 42
                                        </span>
                                        <span className="text-cyan-400 font-mono">7,500 / 10,000 XP</span>
                                    </div>
                                    <div className="h-4 bg-gray-800/80 rounded-full overflow-hidden backdrop-blur-sm">
                                        <motion.div initial={{ width: 0 }} animate={{ width: '75%' }} transition={{ duration: 2, delay: 6 }} className="h-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-full relative">
                                            <motion.div animate={{ x: ['-100%', '200%'] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                                        </motion.div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-3 mb-6">
                                    {[
                                        { icon: '🏆', value: '127', label: 'Badges' },
                                        { icon: '🔥', value: '45', label: 'Streak' },
                                        { icon: '⭐', value: '4.9', label: 'Rating' }
                                    ].map((item, i) => (
                                        <motion.div key={i} whileHover={{ scale: 1.05, y: -5 }} className="p-3 bg-white/5 backdrop-blur-sm rounded-xl text-center cursor-pointer border border-white/5 hover:border-orange-500/30 transition-all">
                                            <span className="text-2xl">{item.icon}</span>
                                            <div className="text-white font-bold">{item.value}</div>
                                            <div className="text-white/40 text-xs">{item.label}</div>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="space-y-3">
                                    {[
                                        { emoji: '🔬', title: 'Science Quest', xp: '+150 XP', progress: 85, color: 'from-cyan-500 to-blue-500' },
                                        { emoji: '➕', title: 'Math Challenge', xp: '+100 XP', progress: 60, color: 'from-violet-500 to-purple-500' }
                                    ].map((quest, i) => (
                                        <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 6.2 + i * 0.2 }} whileHover={{ scale: 1.02, x: 5 }} className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/5 cursor-pointer hover:border-orange-500/30 transition-all">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-3">
                                                    <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-2xl">{quest.emoji}</motion.span>
                                                    <span className="font-semibold text-white">{quest.title}</span>
                                                </div>
                                                <span className={`text-sm font-bold bg-gradient-to-r ${quest.color} text-transparent bg-clip-text`}>{quest.xp}</span>
                                            </div>
                                            <div className="h-2 bg-gray-800/80 rounded-full overflow-hidden">
                                                <motion.div initial={{ width: 0 }} animate={{ width: `${quest.progress}%` }} transition={{ duration: 1, delay: 6.5 }} className={`h-full bg-gradient-to-r ${quest.color} rounded-full`} />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </SpotlightCard>
                        </TiltCard>
                    </motion.div>
                </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 7 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
                <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 2, repeat: Infinity }} className="flex flex-col items-center text-white/50">
                    <span className="text-xs uppercase tracking-widest mb-2 font-mono">Scroll to Explore</span>
                    <ChevronDown className="w-6 h-6" />
                </motion.div>
            </motion.div>
        </section>
    );
};

// ============ SUBJECTS SECTION ============
const SubjectsSection = () => {
    const { t } = useLanguage();
    const subjects = [
        { emoji: '🔬', name: t('subjectScience'), color: 'from-cyan-500 to-blue-600', students: '12K', quests: 150, icon: Atom },
        { emoji: '➕', name: t('subjectMath'), color: 'from-violet-500 to-purple-600', students: '15K', quests: 200, icon: Cpu },
        { emoji: '🌍', name: t('subjectGeography'), color: 'from-emerald-500 to-green-600', students: '8K', quests: 100, icon: Compass },
        { emoji: '📚', name: t('subjectEnglish'), color: 'from-amber-500 to-orange-600', students: '10K', quests: 180, icon: BookOpen },
        { emoji: '💻', name: t('subjectCoding'), color: 'from-pink-500 to-rose-600', students: '20K', quests: 250, icon: Code },
        { emoji: '🎨', name: t('subjectArt'), color: 'from-yellow-500 to-amber-600', students: '6K', quests: 80, icon: Palette },
    ];

    return (
        <section id="subjects" className="py-32 relative overflow-hidden">
            <AuroraBackground />
            <FloatingParticles count={25} />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <RevealOnScroll className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full mb-6 backdrop-blur-sm">
                        <BookOpen className="w-4 h-4 text-orange-400" />
                        <span className="text-orange-400 font-semibold text-sm">{t('fiftyPlusSubjects')}</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black mb-4">
                        <span className="text-transparent bg-clip-text bg-orange-500">
                            {t('chooseQuest')}
                        </span>
                    </h2>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">{t('subjectSubtitle')}</p>
                </RevealOnScroll>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {subjects.map((subject, i) => (
                        <RevealOnScroll key={i} direction={i % 2 === 0 ? 'up' : 'down'}>
                            <MagneticElement strength={0.15}>
                                <TiltCard intensity={8}>
                                    <SpotlightCard className="h-full">
                                        <motion.div whileHover={{ y: -10 }} className="relative group cursor-pointer h-full">
                                            <div className={`absolute inset-0 bg-gradient-to-br ${subject.color} rounded-3xl blur-2xl opacity-0 group-hover:opacity-40 transition-all duration-500`} />
                                            <div className="relative p-6 bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-white/10 group-hover:border-orange-500/50 transition-all h-full">
                                                <motion.div animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.2 }} className="text-5xl mb-4 filter drop-shadow-lg">{subject.emoji}</motion.div>
                                                <h3 className="text-lg font-bold text-white mb-2"><ScrambleText text={subject.name} /></h3>
                                                <div className="flex flex-col gap-1 text-xs text-white/50">
                                                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {subject.students}</span>
                                                    <span className="flex items-center gap-1"><Target className="w-3 h-3" /> {subject.quests} Quests</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </SpotlightCard>
                                </TiltCard>
                            </MagneticElement>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ============ FEATURES SECTION ============
const FeaturesSection = () => {
    const { t } = useLanguage();
    const features = [
        { icon: Brain, title: t('featAI'), desc: t('featAIDesc'), xp: 100, color: 'from-cyan-500 to-blue-500' },
        { icon: Gamepad2, title: t('featGamified'), desc: t('featGamifiedDesc'), xp: 150, color: 'from-violet-500 to-purple-500' },
        { icon: Trophy, title: t('featAchievements'), desc: t('featAchievementsDesc'), xp: 75, color: 'from-amber-500 to-orange-500' },
        { icon: Users, title: t('featGuilds'), desc: t('featGuildsDesc'), xp: 120, color: 'from-pink-500 to-rose-500' },
        { icon: Shield, title: t('featSafe'), desc: t('featSafeDesc'), xp: 50, color: 'from-green-500 to-emerald-500' },
        { icon: Download, title: t('featOffline'), desc: t('featOfflineDesc'), xp: 80, color: 'from-indigo-500 to-blue-500' },
    ];

    return (
        <section id="features" className="py-32 relative overflow-hidden">
            <MeteorShower count={20} />
            <div className="absolute inset-0 opacity-10">
                <GridScan linesColor="#f97316" scanColor="#fbbf24" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <RevealOnScroll className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full mb-6 backdrop-blur-sm">
                        <Zap className="w-4 h-4 text-orange-400" />
                        <span className="text-orange-400 font-semibold text-sm">{t('superpowers')}</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black mb-4">
                        <span className="text-transparent bg-clip-text bg-orange-500">
                            {t('unlockPowers')}
                        </span>
                    </h2>
                </RevealOnScroll>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                        <RevealOnScroll key={i} direction={['up', 'left', 'right'][i % 3]}>
                            <TiltCard intensity={8}>
                                <SpotlightCard className="h-full">
                                    <motion.div whileHover={{ scale: 1.02 }} className="group relative h-full">
                                        <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-all duration-500`} />
                                        <div className="relative p-8 bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-white/10 group-hover:border-orange-500/50 transition-all h-full">
                                            <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-xs font-bold shadow-lg">+{feature.xp} XP</div>
                                            <motion.div whileHover={{ rotate: [0, -15, 15, 0], scale: 1.1 }} transition={{ duration: 0.5 }} className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-xl`}>
                                                <feature.icon className="w-8 h-8 text-white" />
                                            </motion.div>
                                            <h3 className="text-xl font-bold text-white mb-3"><ScrambleText text={feature.title} /></h3>
                                            <p className="text-white/60">{feature.desc}</p>
                                        </div>
                                    </motion.div>
                                </SpotlightCard>
                            </TiltCard>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ============ TEACHER FEATURES SECTION ============
const TeacherFeaturesSection = () => {
    const { t } = useLanguage();
    const teacherFeatures = [
        { icon: BarChart3, title: t('teacherAnalytics'), desc: t('teacherAnalyticsDesc'), color: 'from-cyan-500 to-blue-600', stat: '360°' },
        { icon: Users, title: t('teacherClassMgmt'), desc: t('teacherClassMgmtDesc'), color: 'from-violet-500 to-purple-600', stat: '∞' },
        { icon: Brain, title: t('teacherAI'), desc: t('teacherAIDesc'), color: 'from-pink-500 to-rose-600', stat: 'AI' },
        { icon: Trophy, title: t('teacherGamified'), desc: t('teacherGamifiedDesc'), color: 'from-amber-500 to-orange-600', stat: '500+' },
        { icon: Target, title: t('teacherCustom'), desc: t('teacherCustomDesc'), color: 'from-emerald-500 to-green-600', stat: 'DIY' },
        { icon: BarChart3, title: t('teacherReports'), desc: t('teacherReportsDesc'), color: 'from-indigo-500 to-blue-600', stat: 'PDF' },
    ];

    const testimonials = [
        { name: t('teachTest1Name'), role: t('teachTest1Role'), quote: t('teachTest1Quote'), avatar: '👩‍🏫', rating: 5 },
        { name: t('teachTest2Name'), role: t('teachTest2Role'), quote: t('teachTest2Quote'), avatar: '👨‍🏫', rating: 5 },
        { name: t('teachTest3Name'), role: t('teachTest3Role'), quote: t('teachTest3Quote'), avatar: '👩‍💻', rating: 5 },
    ];

    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="teachers" className="py-32 relative overflow-hidden">
            <AuroraBackground />
            <MeteorShower count={15} />
            <FloatingIcons icons={['📊', '👩‍🏫', '📈', '🎯', '📝', '💡', '🏆', '⭐']} />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <RevealOnScroll className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full mb-6 backdrop-blur-sm">
                        <GraduationCap className="w-4 h-4 text-orange-400" />
                        <span className="text-orange-400 font-semibold text-sm">{t('teacherForEducators')}</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black mb-4">
                        <span className="text-transparent bg-clip-text bg-orange-500">
                            {t('teacherTitle1')} {t('teacherTitle2')}
                        </span>
                    </h2>
                    <p className="text-xl text-white/60 max-w-3xl mx-auto">
                        {t('teacherSubtitle')}
                    </p>
                </RevealOnScroll>

                {/* Stats Bar */}
                <RevealOnScroll className="mb-16">
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                        {[
                            { value: '5000', suffix: '+', label: t('teacherStatTeachers'), icon: GraduationCap, color: 'text-orange-400' },
                            { value: '200000', suffix: '+', label: t('teacherStatStudents'), icon: Users, color: 'text-cyan-400' },
                            { value: '95', suffix: '%', label: t('teacherStatSatisfaction'), icon: Heart, color: 'text-pink-400' },
                            { value: '40', suffix: '%', label: t('teacherStatTimeSaved'), icon: Clock, color: 'text-amber-400' },
                        ].map((stat, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="text-center">
                                <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                                <div className="text-3xl md:text-4xl font-black text-white">
                                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                                </div>
                                <div className="text-sm text-white/50">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </RevealOnScroll>

                {/* Feature Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    {teacherFeatures.map((feature, i) => (
                        <RevealOnScroll key={i} direction={['up', 'left', 'right'][i % 3]}>
                            <TiltCard intensity={10}>
                                <SpotlightCard className="h-full" spotlightColor="rgba(249, 115, 22, 0.15)">
                                    <motion.div whileHover={{ scale: 1.02 }} className="group relative h-full">
                                        <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-3xl blur-2xl opacity-0 group-hover:opacity-25 transition-all duration-500`} />
                                        <div className="relative p-8 bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-white/10 group-hover:border-orange-500/50 transition-all h-full">
                                            {/* Stat Badge */}
                                            <div className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center border border-orange-500/30">
                                                <span className="text-orange-400 font-black text-sm">{feature.stat}</span>
                                            </div>

                                            <motion.div
                                                whileHover={{ rotate: [0, -15, 15, 0], scale: 1.1 }}
                                                transition={{ duration: 0.5 }}
                                                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-xl`}
                                            >
                                                <feature.icon className="w-8 h-8 text-white" />
                                            </motion.div>
                                            <h3 className="text-xl font-bold text-white mb-3"><ScrambleText text={feature.title} /></h3>
                                            <p className="text-white/60 leading-relaxed">{feature.desc}</p>
                                        </div>
                                    </motion.div>
                                </SpotlightCard>
                            </TiltCard>
                        </RevealOnScroll>
                    ))}
                </div>

                {/* Teacher Dashboard Preview */}
                <RevealOnScroll className="mb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Dashboard Preview Card */}
                        <TiltCard intensity={8}>
                            <SpotlightCard spotlightColor="rgba(249, 115, 22, 0.2)">
                                <div className="p-8 bg-gray-900/80 backdrop-blur-2xl rounded-3xl border border-orange-500/20 shadow-2xl shadow-orange-500/10">
                                    {/* Dashboard Header */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <motion.div
                                                animate={{ rotate: [0, 5, -5, 0] }}
                                                transition={{ duration: 3, repeat: Infinity }}
                                                className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center"
                                            >
                                                <span className="text-2xl">👩‍🏫</span>
                                            </motion.div>
                                            <div>
                                                <h4 className="font-bold text-white">{t('teacherDashTitle')}</h4>
                                                <p className="text-white/50 text-sm">{t('teacherDashClass')}</p>
                                            </div>
                                        </div>
                                        <div className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-bold flex items-center gap-1">
                                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                            {t('teacherDashLive')}
                                        </div>
                                    </div>

                                    {/* Mini Stats */}
                                    <div className="grid grid-cols-3 gap-3 mb-6">
                                        {[
                                            { label: t('teacherDashStatStudents'), value: '42', icon: '👥', color: 'from-cyan-500 to-blue-500' },
                                            { label: t('teacherDashStatActive'), value: '28', icon: '🟢', color: 'from-emerald-500 to-green-500' },
                                            { label: t('teacherDashStatAvg'), value: '87%', icon: '📊', color: 'from-amber-500 to-orange-500' },
                                        ].map((stat, i) => (
                                            <motion.div
                                                key={i}
                                                whileHover={{ scale: 1.05 }}
                                                className="p-3 bg-white/5 rounded-xl text-center border border-white/5"
                                            >
                                                <span className="text-lg">{stat.icon}</span>
                                                <div className="text-white font-bold">{stat.value}</div>
                                                <div className="text-white/40 text-xs">{stat.label}</div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Progress Bars */}
                                    <div className="space-y-4">
                                        {[
                                            { name: t('teacherDashCh5'), progress: 78, color: 'from-orange-500 to-amber-500' },
                                            { name: t('teacherDashQuiz'), progress: 85, color: 'from-cyan-500 to-blue-500' },
                                            { name: t('teacherDashEngage'), progress: 92, color: 'from-emerald-500 to-green-500' },
                                        ].map((item, i) => (
                                            <div key={i}>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="text-white/70">{item.name}</span>
                                                    <span className="text-white font-bold">{item.progress}%</span>
                                                </div>
                                                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${item.progress}%` }}
                                                        transition={{ duration: 1, delay: i * 0.2 }}
                                                        className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Recent Activity */}
                                    <div className="mt-6 p-4 bg-orange-500/10 rounded-xl border border-orange-500/20">
                                        <h5 className="text-sm font-bold text-orange-400 mb-3">🔔 {t('teacherDashRecent')}</h5>
                                        <div className="space-y-2">
                                            {[
                                                { text: t('teacherAct1'), time: '2m ago' },
                                                { text: t('teacherAct2'), time: '5m ago' },
                                                { text: t('teacherAct3'), time: '12m ago' },
                                            ].map((activity, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.1 }}
                                                    className="flex justify-between text-xs"
                                                >
                                                    <span className="text-white/60">{activity.text}</span>
                                                    <span className="text-white/40">{activity.time}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </SpotlightCard>
                        </TiltCard>

                        {/* Text Content */}
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                            >
                                <h3 className="text-4xl font-black text-white mb-4">
                                    Your <span className="bg-gradient-to-r from-orange-400 to-amber-400 text-transparent bg-clip-text">Command Center</span>
                                </h3>
                                <p className="text-lg text-white/60 leading-relaxed mb-6">
                                    Get a bird's-eye view of your entire classroom. Monitor progress, identify at-risk students,
                                    and celebrate achievements—all in one beautiful, intuitive dashboard.
                                </p>
                            </motion.div>

                            <div className="space-y-4">
                                {[
                                    { icon: Eye, text: 'Real-time visibility into every student\'s journey' },
                                    { icon: Zap, text: 'Instant notifications for milestones and alerts' },
                                    { icon: TrendingUp, text: 'AI-powered predictions for student success' },
                                    { icon: Download, text: 'One-click report generation for parents & admin' },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-orange-500/30 transition-all"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
                                            <item.icon className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="text-white/80 font-medium">{item.text}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>

                {/* Teacher Testimonials Carousel */}
                <RevealOnScroll className="mb-16">
                    <div className="relative max-w-4xl mx-auto">
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-6xl opacity-50"
                            >
                                <Quote className="w-16 h-16 text-orange-500/30" />
                            </motion.div>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentTestimonial}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="text-center p-8 bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-orange-500/20"
                            >
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="text-6xl mb-4"
                                >
                                    {testimonials[currentTestimonial].avatar}
                                </motion.div>
                                <p className="text-xl md:text-2xl text-white font-medium mb-6 italic">
                                    "{testimonials[currentTestimonial].quote}"
                                </p>
                                <div className="flex justify-center gap-1 mb-4">
                                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                                        <motion.span
                                            key={i}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="text-yellow-400 text-xl"
                                        >
                                            ⭐
                                        </motion.span>
                                    ))}
                                </div>
                                <h4 className="text-lg font-bold text-orange-400">{testimonials[currentTestimonial].name}</h4>
                                <p className="text-white/50">{testimonials[currentTestimonial].role}</p>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Dots */}
                        <div className="flex justify-center gap-2 mt-6">
                            {testimonials.map((_, i) => (
                                <motion.button
                                    key={i}
                                    onClick={() => setCurrentTestimonial(i)}
                                    className={`w-3 h-3 rounded-full transition-all ${i === currentTestimonial ? 'bg-orange-500 w-8' : 'bg-white/20 hover:bg-white/40'}`}
                                    whileHover={{ scale: 1.2 }}
                                />
                            ))}
                        </div>
                    </div>
                </RevealOnScroll>

                {/* CTA for Teachers */}
                <RevealOnScroll>
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="relative p-10 md:p-16 rounded-3xl bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 shadow-2xl shadow-orange-500/30 overflow-hidden"
                    >
                        {/* Background Elements */}
                        <div className="absolute inset-0 overflow-hidden">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                                className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl"
                            />
                            <FloatingParticles count={20} />
                        </div>

                        <div className="relative z-10 text-center">
                            <motion.div
                                animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="text-7xl mb-6"
                            >
                                🎓
                            </motion.div>
                            <h3 className="text-4xl md:text-5xl font-black text-white mb-4">
                                Ready to Transform Your Classroom?
                            </h3>
                            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                                Join 5,000+ teachers already using Rulyn to make learning fun and track progress like never before!
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link href="/teacher">
                                    <MagneticElement strength={0.2}>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-8 py-4 bg-white text-orange-600 rounded-2xl font-bold text-lg flex items-center gap-2 shadow-xl hover:shadow-2xl transition-all"
                                        >
                                            <GraduationCap className="w-6 h-6" />
                                            Access Teacher Portal
                                            <ArrowRight className="w-5 h-5" />
                                        </motion.button>
                                    </MagneticElement>
                                </Link>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-white/10 border-2 border-white/30 text-white rounded-2xl font-bold text-lg flex items-center gap-2 backdrop-blur-sm hover:bg-white/20 transition-all"
                                >
                                    <Play className="w-5 h-5" />
                                    Watch Demo
                                </motion.button>
                            </div>
                            <p className="text-white/60 mt-6 text-sm">
                                ✨ Free for individual teachers • No credit card required
                            </p>
                        </div>
                    </motion.div>
                </RevealOnScroll>
            </div>
        </section>
    );
};

// ============ PRICING SECTION ============
const PricingSection = () => {
    const { t } = useLanguage();
    const plans = [
        { name: t('planFree'), price: '₹0', period: t('planPeriodForever'), features: [t('feat5Subjects'), t('featBasicQuests'), t('featAds'), t('featCommunity')], color: 'from-gray-500 to-gray-600', popular: false },
        { name: t('planPro'), price: '₹199', period: t('planPeriodMonth'), features: [t('featAllSubjects'), t('featUnlimQuests'), t('featNoAds'), t('featAITutor'), t('featOfflineMode'), t('featPriority')], color: 'from-orange-500 to-amber-600', popular: true },
        { name: t('planFamily'), price: '₹399', period: t('planPeriodMonth'), features: [t('feat5Kids'), t('featAllPro'), t('featParentDash'), t('featProgressRep'), t('featFamilyChall'), t('featDedSupport')], color: 'from-violet-500 to-purple-600', popular: false },
    ];

    return (
        <section id="pricing" className="py-32 relative overflow-hidden">
            <AuroraBackground />
            <FloatingParticles count={20} />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <RevealOnScroll className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full mb-6 backdrop-blur-sm">
                        <Gift className="w-4 h-4 text-amber-400" />
                        <span className="text-amber-400 font-semibold text-sm">{t('pricingSimple')}</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black mb-4">
                        <span className="text-transparent bg-clip-text bg-orange-500">
                            {t('pricingTitle')} {t('pricingPlan')}
                        </span>
                    </h2>
                    <p className="text-xl text-white/60">{t('pricingSubtitle')}</p>
                </RevealOnScroll>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, i) => (
                        <RevealOnScroll key={i} direction="up">
                            <TiltCard intensity={plan.popular ? 12 : 8}>
                                <motion.div whileHover={{ y: -15, scale: 1.02 }} className={`relative p-8 rounded-3xl ${plan.popular ? 'bg-gradient-to-br from-orange-500 to-amber-600 shadow-2xl shadow-orange-500/30' : 'bg-gray-900/60 backdrop-blur-xl border border-white/10'}`}>
                                    {plan.popular && (
                                        <motion.div initial={{ y: -20 }} animate={{ y: 0 }} className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white text-orange-600 rounded-full font-bold text-sm shadow-xl">⭐ {t('planMostPopular')}</motion.div>
                                    )}
                                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                    <div className="flex items-end gap-1 mb-6">
                                        <span className="text-5xl font-black text-white">{plan.price}</span>
                                        <span className={plan.popular ? 'text-white/80' : 'text-white/50'}>{plan.period}</span>
                                    </div>
                                    <ul className="space-y-3 mb-8">
                                        {plan.features.map((feature, j) => (
                                            <motion.li key={j} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: j * 0.1 }} className={`flex items-center gap-2 ${plan.popular ? 'text-white/90' : 'text-white/70'}`}>
                                                <Check className={`w-5 h-5 ${plan.popular ? 'text-white' : 'text-green-500'}`} />
                                                {feature}
                                            </motion.li>
                                        ))}
                                    </ul>
                                    {plan.popular ? (
                                        <EncryptButton className="w-full py-4 bg-white text-orange-600 rounded-2xl font-bold text-lg shadow-xl">
                                            {t('planGetStarted')}
                                        </EncryptButton>
                                    ) : (
                                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-2xl font-bold text-lg shadow-lg">
                                            {t('planGetStarted')}
                                        </motion.button>
                                    )}
                                </motion.div>
                            </TiltCard>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ============ REVIEWS SECTION ============
const ReviewsSection = () => {
    const { t } = useLanguage();
    return (
        <section id="reviews" className="py-20 relative overflow-hidden bg-black/40">
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/10 backdrop-blur-md z-20">
                <span className="text-yellow-400 text-xs">⭐</span>
                <span className="text-white/80 text-xs font-bold">{t('reviewsCount')}</span>
            </div>
            <div className="text-center mb-10 relative z-10">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-2"><GlitchText text={t('reviewsTitle')} /></h2>
                <p className="text-white/50">{t('reviewsSubtitle')}</p>
            </div>
            <div className="h-[550px] relative">
                <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} scrollEase={0.02} />
            </div>
        </section>
    );
};

// ============ FAQ SECTION ============
const FAQSection = () => {
    const { t } = useLanguage();
    const faqs = [
        { q: t('faq1Q'), a: t('faq1A') },
        { q: t('faq2Q'), a: t('faq2A') },
        { q: t('faq3Q'), a: t('faq3A') },
        { q: t('faq4Q'), a: t('faq4A') },
        { q: t('faq5Q'), a: t('faq5A') },
    ];

    const [openFaq, setOpenFaq] = useState(null);

    return (
        <section id="faq" className="py-32 relative overflow-hidden">
            <AuroraBackground />
            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <RevealOnScroll className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full mb-6 backdrop-blur-sm">
                        <HelpCircle className="w-4 h-4 text-blue-400" />
                        <span className="text-blue-400 font-semibold text-sm">{t('faqSubtitle')}</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black mb-4">
                        <span className="text-transparent bg-clip-text bg-orange-500">
                            {t('faqGot')} {t('faqQuestions')}
                        </span>
                    </h2>
                </RevealOnScroll>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <RevealOnScroll key={i} direction="up">
                            <motion.div onClick={() => setOpenFaq(openFaq === i ? null : i)} whileHover={{ scale: 1.01 }} className={`p-6 bg-gray-900/60 backdrop-blur-xl rounded-2xl border ${openFaq === i ? 'border-orange-500' : 'border-white/10'} cursor-pointer transition-all`}>
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-bold text-white">{faq.q}</h3>
                                    <motion.div animate={{ rotate: openFaq === i ? 45 : 0 }} className={`${openFaq === i ? 'text-orange-500' : 'text-white/50'}`}>
                                        <Plus className="w-5 h-5" />
                                    </motion.div>
                                </div>
                                <AnimatePresence>
                                    {openFaq === i && (
                                        <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="text-white/60 mt-4 pt-4 border-t border-white/10">
                                            {faq.a}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ============ CTA SECTION ============
const CTASection = () => {
    const { t } = useLanguage();
    return (
        <section className="py-32 relative overflow-hidden">
            <MeteorShower count={30} />
            <AuroraBackground />
            <FloatingIcons icons={['🚀', '⭐', '🎮', '🏆', '💎', '🔥', '✨']} />

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                <RevealOnScroll>
                    <div className="relative inline-block mb-8">
                        <motion.div animate={{ rotate: [0, 10, -10, 0], y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity }} className="text-9xl filter drop-shadow-2xl">🚀</motion.div>
                        <PulseRings color="#f97316" size={200} />
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
                        <NeonText color="#f97316">{t('ctaReady')}</NeonText>
                    </h2>
                    <p className="text-xl text-white/60 mb-10">{t('ctaJoin')}</p>
                    <Link href="/login">
                        <MagneticElement strength={0.2}>
                            <GradientBorderButton className="text-2xl">
                                <Gamepad2 className="w-8 h-8 mr-2" /> {t('ctaButton')} <ArrowRight className="w-7 h-7 ml-2" />
                            </GradientBorderButton>
                        </MagneticElement>
                    </Link>
                </RevealOnScroll>
            </div>
        </section>
    );
};
// ============ FOOTER ============
const Footer = () => {
    const { t } = useLanguage();
    return (
        <footer className="py-20 bg-black/80 border-t border-white/10 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center transform -rotate-12">
                                <span className="text-2xl">🚀</span>
                            </div>
                            <span className="text-2xl font-black text-white tracking-tight">RULYN</span>
                        </div>
                        <p className="text-white/60 mb-6 max-w-sm">
                            {t('footerTagline')}<br />
                            {t('footerDesc')}
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: Twitter, name: 'twitter' },
                                { icon: Github, name: 'github' },
                                { icon: MessageCircle, name: 'discord' },
                                { icon: Youtube, name: 'youtube' }
                            ].map((social, i) => (
                                <motion.a key={i} href="#" whileHover={{ y: -3, color: '#f97316' }} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 transition-colors">
                                    <social.icon className="w-5 h-5" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">{t('footerProduct')}</h4>
                        <ul className="space-y-4">
                            {['linkFeatures', 'linkSubjects', 'linkPricing', 'linkDownload'].map((key, i) => (
                                <li key={i}><a href="#" className="text-white/60 hover:text-orange-400 transition-colors">{t(key)}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">{t('footerCompany')}</h4>
                        <ul className="space-y-4">
                            {['linkAbout', 'linkBlog', 'linkCareers', 'linkPress'].map((key, i) => (
                                <li key={i}><a href="#" className="text-white/60 hover:text-orange-400 transition-colors">{t(key)}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/40 text-sm">{t('footerCopyright')}</p>
                    <div className="flex gap-8">
                        {['linkPrivacy', 'linkTerms'].map((key, i) => (
                            <a key={i} href="#" className="text-white/40 hover:text-white text-sm transition-colors">{t(key)}</a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

// ============ MAIN COMPONENT ============
export default function LandingPage() {
    const [showIntro, setShowIntro] = useState(true);

    return (
        <>
            {showIntro && <IntroScreen onComplete={() => setShowIntro(false)} />}
            <BlobCursor color="#f97316" />
            <NoiseTexture opacity={0.02} />

            <ReactLenis root options={{ lerp: 0.02, duration: 1.8, smoothWheel: true }}>
                <div className="min-h-screen bg-black antialiased overflow-x-hidden">
                    <Navbar />
                    <Hero />
                    <SubjectsSection />
                    <FeaturesSection />
                    <TeacherFeaturesSection />
                    <PricingSection />
                    <ReviewsSection />
                    <FAQSection />
                    <CTASection />
                    <Footer />
                </div>
            </ReactLenis>
        </>
    );
}
