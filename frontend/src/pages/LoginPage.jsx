import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, Gamepad2, Brain, ArrowLeft, Rocket, GraduationCap } from "lucide-react";
import { AuroraBackground, NeonText, GradientBorderButton } from "@/components/AdvancedEffects";
import { MeteorShower, GlitchText, WaveText } from "@/components/UltraEffects";


// I'll copy the imports from LandingPage logic.

const CircularLoginBackground = () => {
    const bars = Array.from({ length: 50 });
    const [activeBars, setActiveBars] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveBars(prev => (prev + 1) % 50);
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative w-[600px] h-[600px]"
            >
                {bars.map((_, i) => (
                    <div
                        key={i}
                        className={`absolute w-3 h-12 rounded-full left-1/2 top-0 transition-all duration-300 origin-center`}
                        style={{
                            transform: `rotate(${i * (360 / 50)}deg) translateY(-280px)`,
                            transformOrigin: "center 310px",
                            backgroundColor: (activeBars >= i && activeBars < i + 8) || (activeBars + 8 >= 50 && i < (activeBars + 8) % 50)
                                ? '#f97316' // Orange glow
                                : '#4a5f7f', // Visible slate blue
                            opacity: (activeBars >= i && activeBars < i + 8) || (activeBars + 8 >= 50 && i < (activeBars + 8) % 50)
                                ? 1
                                : 0.6, // Much more visible inactive state
                            boxShadow: (activeBars >= i && activeBars < i + 8) || (activeBars + 8 >= 50 && i < (activeBars + 8) % 50)
                                ? '0 0 20px rgba(249, 115, 22, 0.8)'
                                : 'none',
                        }}
                    />
                ))}
            </motion.div>
        </div>
    );
};


const RoleCard = ({ role, icon: Icon, title, desc, onClick, color, stats }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onClick(role)}
            className={`relative w-80 h-[480px] rounded-3xl bg-black/60 backdrop-blur-xl border border-white/10 overflow-hidden cursor-pointer group hover:border-${color}-500/50 transition-all duration-500 shadow-2xl`}
        >
            {/* Holographic Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-b from-${color}-900/20 via-transparent to-${color}-900/40 opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />

            {/* Animated Grid Background */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

            {/* Content Container */}
            <div className="absolute inset-0 flex flex-col p-6 z-10 relative">

                {/* Header: Level & Class */}
                <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                    <span className={`text-xs font-mono text-${color}-400 tracking-widest uppercase`}>Class: {title}</span>
                    <div className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full bg-${color}-500 animate-pulse`} />
                        <span className="text-xs text-white/40 font-mono">ONLINE</span>
                    </div>
                </div>

                {/* Main Icon / Avatar */}
                <div className="relative mx-auto mb-8 group-hover:scale-110 transition-transform duration-500">
                    <div className={`w-28 h-28 rounded-2xl bg-gradient-to-br from-${color}-500 to-${color}-700 flex items-center justify-center shadow-[0_0_30px_rgba(var(--${color}-rgb),0.4)]`}>
                        <Icon className="w-14 h-14 text-white" />
                    </div>
                    {/* Orbiting Particles */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className={`absolute -inset-4 border border-${color}-500/30 rounded-full border-dashed`}
                    />
                </div>

                {/* Role Title */}
                <h3 className={`text-4xl font-black text-center text-white mb-2 uppercase tracking-tighter group-hover:text-${color}-400 transition-colors`}>
                    {title}
                </h3>
                <p className="text-white/60 text-center text-xs mb-8 h-8 font-medium leading-relaxed">
                    {desc}
                </p>

                {/* Stats / Features Grid */}
                <div className="bg-black/40 rounded-xl p-3 backdrop-blur-md border border-white/5 mb-6">
                    <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                        {stats && stats.map((stat, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <span className="text-lg">{stat.icon}</span>
                                <div>
                                    <div className="text-[10px] text-white/40 uppercase tracking-wider">{stat.label}</div>
                                    <div className={`text-xs font-bold text-${color}-300`}>{stat.value}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Button */}
                <div className="mt-auto">
                    <div className={`w-full py-3 rounded-lg bg-white/5 border border-white/10 text-center text-sm font-bold text-white group-hover:bg-${color}-600 group-hover:border-${color}-500 transition-all uppercase tracking-widest`}>
                        Select Character
                    </div>
                </div>
            </div>

            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-1 w-full pointer-events-none animate-[scan_4s_linear_infinite]" />
        </motion.div>
    );
};

const LoginForm = ({ role, onBack }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [, setLocation] = useLocation();

    const handleLogin = (e) => {
        e.preventDefault();
        // In a real app, verify email/password here.
        if (role === 'student') {
            setLocation("/student");
        } else {
            setLocation("/teacher");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-20 w-full max-w-md bg-black/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-orange-500/10"
        >
            <button onClick={onBack} className="absolute top-6 left-6 text-white/40 hover:text-white transition-colors">
                <ArrowLeft className="w-6 h-6" />
            </button>

            <h2 className="text-3xl font-black text-center text-white mb-8 uppercase tracking-widest">
                <span className="text-orange-500">{role}</span> Login
            </h2>

            <form onSubmit={handleLogin} className="space-y-6">
                <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-orange-500 transition-colors" />
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-orange-500 focus:bg-white/10 transition-all"
                        required
                    />
                </div>

                <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-orange-500 transition-colors" />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-12 text-white placeholder-white/30 focus:outline-none focus:border-orange-500 focus:bg-white/10 transition-all"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>

                <div className="flex justify-end">
                    <a href="#" className="text-sm text-orange-400 hover:text-orange-300 transition-colors">Forgot Password?</a>
                </div>

                <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold text-lg uppercase tracking-wider hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-1 transition-all"
                >
                    Enter World
                </button>
            </form>

            {/* Demo Credentials Hint */}
            <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white/50">
                <div className="mb-1 text-orange-400 font-bold">DEMO ACCESS KEYS:</div>
                <div className="flex justify-between">
                    <span>{role === 'student' ? 'student@rulyn.com' : 'teacher@rulyn.com'}</span>
                    <span className="text-white/30">Password: <span className="text-white/70">any</span></span>
                </div>
            </div>

            <div className="mt-8 text-center">
                <p className="text-white/40 text-sm mb-4">or continue with</p>
                <div className="flex justify-center gap-4">
                    {['G', '𝕏', 'f'].map((icon, i) => (
                        <button key={i} className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all hover:scale-110">
                            {icon}
                        </button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default function LoginPage() {
    const [role, setRole] = useState(null);
    const [, setLocation] = useLocation();

    // Now both Student and Teacher utilize the Login Form
    const handleRoleSelect = (selectedRole) => {
        setRole(selectedRole);
    };

    return (
        <div className="min-h-screen bg-black overflow-hidden flex items-center justify-center relative font-sans selection:bg-orange-500/30">
            <AuroraBackground />
            <MeteorShower count={20} />
            <CircularLoginBackground />
            <CircularLoginBackground />

            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black/80 pointer-events-none" />

            <div className="relative z-10 w-full max-w-6xl px-6">
                <AnimatePresence mode="wait">
                    {!role ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex flex-col items-center justify-center w-full"
                        >
                            <div className="text-center mb-12 relative z-20">
                                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter flex flex-wrap items-center justify-center gap-3 md:gap-6">
                                    <span className="text-transparent bg-clip-text bg-orange-500">ENTER.</span>
                                    <span className="text-white">ENGAGE.</span>
                                    <span className="text-transparent bg-clip-text bg-orange-500">EVOLVE.</span>
                                </h1>
                            </div>

                            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 w-full">
                                <RoleCard
                                    role="student"
                                    icon={Rocket}
                                    title="Student"
                                    desc="Join the adventure, earn XP, and level up!"
                                    color="orange"
                                    onClick={handleRoleSelect}
                                    stats={[
                                        { icon: '🛡️', label: 'Class', value: 'Learner' },
                                        { icon: '⚡', label: 'Power', value: 'Infinite' },
                                        { icon: '🎒', label: 'Items', value: '0/10' },
                                        { icon: '🌟', label: 'Status', value: 'Rookie' }
                                    ]}
                                />
                                <RoleCard
                                    role="teacher"
                                    icon={Brain}
                                    title="Teacher"
                                    desc="Manage classes, track progress, and inspire."
                                    color="cyan"
                                    onClick={handleRoleSelect}
                                    stats={[
                                        { icon: '🧠', label: 'Class', value: 'Mentor' },
                                        { icon: '📊', label: 'Vision', value: 'Crystal' },
                                        { icon: '🛠️', label: 'Tools', value: 'Unlocked' },
                                        { icon: '🎓', label: 'Rank', value: 'Master' }
                                    ]}
                                />
                            </div>
                        </motion.div>
                    ) : (
                        <div className="flex justify-center">
                            <LoginForm role={role} onBack={() => setRole(null)} />
                        </div>
                    )}
                </AnimatePresence>
            </div>

            {/* Logo */}
            <div className="absolute top-8 left-8 flex items-center gap-3 z-50">
                <img src="/nav-logo.png" alt="Rulyn" className="w-10 h-10 rounded-full object-cover shadow-lg shadow-orange-500/20" />
                <span className="text-2xl font-black text-white tracking-tight">RULYN</span>
            </div>
        </div>
    );
}
