import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, School, ArrowRight, Sparkles, Eye, EyeOff, BookOpen, Users, TrendingUp, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "../contexts/LanguageContext";

const TeacherLogin = () => {
    const { t } = useTranslation();
    const [, setLocation] = useLocation();
    const [step, setStep] = useState(0); // 0: welcome, 1: login form
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        schoolCode: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    // Floating particles for background
    const particles = [...Array(20)].map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 20 + 10
    }));

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate login delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Navigate to teacher dashboard
        setLocation("/teacher");
    };

    const welcomeMessages = [
        t("welcomeTeacher") || "Welcome back, Teacher.",
        t("learningHappenedToday") || "Learning happened today.",
        t("studentsWaiting") || "Your students are waiting."
    ];

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
            {/* Animated gradient background */}
            <div className="absolute inset-0">
                <motion.div
                    animate={{
                        background: [
                            "radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)",
                            "radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
                            "radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
                            "radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)"
                        ]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0"
                />
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {particles.map(particle => (
                    <motion.div
                        key={particle.id}
                        className="absolute rounded-full bg-white/10"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: particle.size,
                            height: particle.size
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.3, 0.7, 0.3]
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            {/* Glowing orbs */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"
            />
            <motion.div
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
            />

            {/* Main content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
                <AnimatePresence mode="wait">
                    {step === 0 ? (
                        /* Welcome Screen */
                        <motion.div
                            key="welcome"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, y: -50 }}
                            className="text-center max-w-2xl"
                        >
                            {/* Logo */}
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", duration: 1 }}
                                className="mb-8"
                            >
                                <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-2xl shadow-indigo-500/30">
                                    <BookOpen className="h-12 w-12 text-white" />
                                </div>
                            </motion.div>

                            {/* Welcome messages */}
                            <div className="space-y-4 mb-12">
                                {welcomeMessages.map((msg, i) => (
                                    <motion.p
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 + i * 0.3 }}
                                        className={`${i === 0 ? 'text-4xl md:text-5xl font-bold text-white' : 'text-xl text-indigo-200/70'}`}
                                    >
                                        {msg}
                                    </motion.p>
                                ))}
                            </div>

                            {/* Stats preview */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.5 }}
                                className="grid grid-cols-3 gap-4 mb-12"
                            >
                                {[
                                    { icon: Users, label: t("studentsActive") || "Students Active", value: "156" },
                                    { icon: TrendingUp, label: t("growthToday") || "Growth Today", value: "+12%" },
                                    { icon: Heart, label: t("engagement") || "Engagement", value: "94%" }
                                ].map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                                    >
                                        <stat.icon className="h-6 w-6 text-indigo-400 mx-auto mb-2" />
                                        <div className="text-2xl font-bold text-white">{stat.value}</div>
                                        <div className="text-xs text-indigo-300/60">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Enter button */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 2 }}
                            >
                                <Button
                                    size="lg"
                                    onClick={() => setStep(1)}
                                    className="rounded-full px-10 py-6 text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-2xl shadow-indigo-500/30 group"
                                >
                                    {t("enterEduverse") || "Enter EDUVERSE"}
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </motion.div>
                        </motion.div>
                    ) : (
                        /* Login Form */
                        <motion.div
                            key="login"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="w-full max-w-md"
                        >
                            {/* Card */}
                            <div className="relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
                                {/* Glow effect */}
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-xl" />

                                <div className="relative z-10">
                                    {/* Header */}
                                    <div className="text-center mb-8">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-4"
                                        >
                                            <Sparkles className="h-8 w-8 text-white" />
                                        </motion.div>
                                        <h2 className="text-2xl font-bold text-white mb-2">{t("welcomeEduverse") || "Welcome to EDUVERSE"}</h2>
                                        <p className="text-indigo-200/60 text-sm">{t("signInImpact") || "Sign in to experience learning impact"}</p>
                                    </div>

                                    {/* Form */}
                                    <form onSubmit={handleLogin} className="space-y-5">
                                        {/* Email */}
                                        <div className="space-y-2">
                                            <label className="text-sm text-indigo-200/80 font-medium">{t("loginEmailLabel") || "Email or Phone"}</label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-400" />
                                                <Input
                                                    type="text"
                                                    placeholder={t("emailPlaceholder") || "teacher@school.edu"}
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="pl-12 h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl focus:border-indigo-500 focus:ring-indigo-500/20"
                                                />
                                            </div>
                                        </div>

                                        {/* Password */}
                                        <div className="space-y-2">
                                            <label className="text-sm text-indigo-200/80 font-medium">{t("loginPasswordLabel") || "Password"}</label>
                                            <div className="relative">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-400" />
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="••••••••"
                                                    value={formData.password}
                                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                    className="pl-12 pr-12 h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl focus:border-indigo-500 focus:ring-indigo-500/20"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-400 hover:text-indigo-300"
                                                >
                                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                                </button>
                                            </div>
                                        </div>

                                        {/* School Code */}
                                        <div className="space-y-2">
                                            <label className="text-sm text-indigo-200/80 font-medium">{t("schoolCode") || "School Code"}</label>
                                            <div className="relative">
                                                <School className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-400" />
                                                <Input
                                                    type="text"
                                                    placeholder={t("schoolCodePlaceholder") || "RULYN-001"}
                                                    value={formData.schoolCode}
                                                    onChange={(e) => setFormData({ ...formData, schoolCode: e.target.value })}
                                                    className="pl-12 h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl focus:border-indigo-500 focus:ring-indigo-500/20"
                                                />
                                            </div>
                                        </div>

                                        {/* Submit */}
                                        <Button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold shadow-lg shadow-indigo-500/25"
                                        >
                                            {isLoading ? (
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                                />
                                            ) : (
                                                <>
                                                    {t("enterWorld") || "Enter Your World"}
                                                    <ArrowRight className="ml-2 h-5 w-5" />
                                                </>
                                            )}
                                        </Button>
                                    </form>

                                    {/* Back link */}
                                    <button
                                        onClick={() => setStep(0)}
                                        className="w-full mt-4 text-center text-sm text-indigo-300/60 hover:text-indigo-300 transition-colors"
                                    >
                                        {t("backToWelcome") || "← Back to welcome"}
                                    </button>
                                </div>
                            </div>

                            {/* Help text */}
                            <p className="text-center text-xs text-indigo-300/40 mt-6">
                                {t("needHelpAdmin") || "Need help? Contact your school administrator"}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Bottom gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent" />
        </div>
    );
};

export default TeacherLogin;
