import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
    BookOpen, Activity, Users, Calendar, MessageCircle, Settings,
    LogOut, ChevronLeft, ChevronRight, Sun, Moon, Bell, Search,
    LayoutDashboard, FileText, BarChart3, Sparkles
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTranslation } from "../contexts/LanguageContext";

const TeacherLayout = ({ children }) => {
    const { t } = useTranslation();
    const [location] = useLocation();
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [liteMode, setLiteMode] = useState(false);

    const menuItems = [
        { icon: LayoutDashboard, label: t("sidebarDashboard"), href: "/teacher" },
        { icon: Activity, label: t("sidebarAnalytics"), href: "/teacher/analytics" },
        { icon: Users, label: t("sidebarStudents"), href: "/teacher/students" },
        { icon: FileText, label: t("sidebarContent"), href: "/teacher/content" },
        { icon: Calendar, label: t("sidebarSchedule"), href: "/teacher/schedule" },
        { icon: MessageCircle, label: t("sidebarMessages"), href: "/teacher/messages", badge: 3 },
        { icon: BarChart3, label: t("sidebarReports"), href: "/teacher/reports" },
        { icon: Settings, label: t("sidebarSettings"), href: "/teacher/settings" }
    ];

    const isActive = (href) => {
        if (href === "/teacher") return location === "/teacher";
        return location.startsWith(href);
    };

    return (
        <div className={`min-h-screen flex ${liteMode ? 'bg-[#f0f0f0]' : 'bg-[#01030A]'}`} style={!liteMode ? { background: 'linear-gradient(135deg, #01030A 0%, #1a1205 50%, #01030A 100%)' } : {}}>
            {/* Animated background */}
            {!liteMode && (
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7A5C1D]/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#7A5C1D]/5 rounded-full blur-[120px]" />
                    {/* Add a subtle gold scanline or grid */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                </div>
            )}

            {/* Sidebar */}
            <aside
                className={`relative z-20 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'w-20' : 'w-64'
                    } border-r border-[#7A5C1D]/20 backdrop-blur-xl bg-[#01030A]/50`}
            >
                {/* Logo Area - Interactive RULYN Brand */}
                <div className="p-6 border-b border-[#7A5C1D]/20">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-3 cursor-pointer group"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-[#7A5C1D] blur-md opacity-20 group-hover:opacity-40 transition-opacity rounded-full" />
                            <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-[0_4px_20px_rgba(122,92,29,0.3)] border border-[#7A5C1D]/30">
                                <img src="/nav-logo.png" alt="Rulyn Teacher" className="w-full h-full object-cover" />
                            </div>
                        </div>

                        {!isSidebarCollapsed && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex flex-col"
                            >
                                <h1 className="text-xl font-black text-white tracking-widest group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#eec170] group-hover:to-amber-500 transition-all duration-300">
                                    RULYN
                                </h1>
                                <p className="text-[9px] font-mono text-[#7A5C1D] uppercase tracking-[0.2em] group-hover:text-[#eec170] transition-colors">
                                    Teacher Portal
                                </p>
                            </motion.div>
                        )}
                    </motion.div>
                </div>

                {/* Navigation - High Interactivity */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto overflow-x-hidden">
                    {menuItems.map((item) => {
                        const active = isActive(item.href);
                        return (
                            <Link key={item.href} href={item.href}>
                                <motion.div
                                    whileHover={{ x: 5, backgroundColor: "rgba(122, 92, 29, 0.1)" }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`relative flex items-center gap-3 p-3.5 rounded-xl cursor-pointer transition-all duration-300 group overflow-hidden ${active
                                        ? 'bg-[#7A5C1D]/10 border border-[#7A5C1D]/50 shadow-[0_0_15px_rgba(122,92,29,0.1)]'
                                        : 'border border-transparent hover:border-[#7A5C1D]/30 text-white/50 hover:text-white'
                                        }`}
                                >
                                    {/* Active Glow Strip (Left) */}
                                    {active && (
                                        <motion.div
                                            layoutId="activeStrip"
                                            className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-[#7A5C1D] shadow-[0_0_8px_#7A5C1D]"
                                        />
                                    )}

                                    {/* Hover Shine Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shine pointer-events-none" />

                                    {/* Icon */}
                                    <item.icon
                                        className={`h-5 w-5 flex-shrink-0 transition-colors duration-300 ${active
                                            ? 'text-[#eec170]'
                                            : 'group-hover:text-[#7A5C1D]'
                                            }`}
                                    />

                                    {/* Label */}
                                    {!isSidebarCollapsed && (
                                        <>
                                            <span className={`text-sm font-medium tracking-wide transition-colors duration-300 ${active ? 'text-white' : ''}`}>
                                                {item.label}
                                            </span>
                                            {item.badge && (
                                                <span className={`ml-auto px-2 py-0.5 text-[10px] font-bold rounded-full ${active ? 'bg-[#7A5C1D] text-black' : 'bg-white/10 text-white group-hover:bg-[#7A5C1D]/20'}`}>
                                                    {item.badge}
                                                </span>
                                            )}
                                        </>
                                    )}
                                </motion.div>
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom section */}
                <div className="p-3 border-t border-[#7A5C1D]/20 space-y-2">
                    {/* Lite mode toggle */}
                    <button
                        onClick={() => setLiteMode(!liteMode)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-colors ${isSidebarCollapsed ? 'justify-center' : ''}`}
                    >
                        {liteMode ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5" />}
                        {!isSidebarCollapsed && <span className="text-sm">{liteMode ? t("fullModeLabel") : t("liteModeLabel")}</span>}
                    </button>

                    {/* Logout */}
                    <Link href="/teacher/login">
                        <div className={`flex items-center gap-3 p-3 rounded-xl text-red-400/80 hover:text-red-400 hover:bg-red-500/10 cursor-pointer transition-colors ${isSidebarCollapsed ? 'justify-center' : ''}`}>
                            <LogOut className="h-5 w-5" />
                            {!isSidebarCollapsed && <span className="text-sm">{t("signOut")}</span>}
                        </div>
                    </Link>
                </div>

                {/* Collapse button */}
                <button
                    onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
                    className="absolute -right-3 top-1/2 w-6 h-6 rounded-full bg-[#7A5C1D] text-white flex items-center justify-center hover:bg-amber-700 transition-colors shadow-lg border border-[#01030A]"
                >
                    {isSidebarCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
                </button>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
                {/* Decorative top glow */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7A5C1D]/50 to-transparent z-20" />

                {/* Top Header */}
                <header className="relative z-10 h-16 border-b border-[#7A5C1D]/10 backdrop-blur-xl bg-[#01030A]/30 flex items-center justify-between px-6">
                    {/* Search */}
                    <div className="relative w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-500/50" />
                        <Input
                            placeholder={t("searchPlaceholder")}
                            className="pl-10 h-10 bg-white/5 border-[#7A5C1D]/20 text-white placeholder:text-white/30 rounded-xl focus:border-[#7A5C1D]/50 focus:ring-1 focus:ring-[#7A5C1D]/50 transition-all"
                        />
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-4">
                        {/* AI Companion hint */}
                        <motion.div
                            animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 0px #7A5C1D", "0 0 10px #7A5C1D", "0 0 0px #7A5C1D"] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#7A5C1D]/20 to-amber-900/20 border border-[#7A5C1D]/40 cursor-pointer"
                        >
                            <Sparkles className="h-4 w-4 text-[#eec170]" />
                            <span className="text-xs text-[#eec170] font-medium">{t("aiInsightsReady")}</span>
                        </motion.div>

                        {/* Notifications */}
                        <button className="relative p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors hover:text-[#7A5C1D]">
                            <Bell className="h-5 w-5 text-white/70" />
                            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 border border-[#01030A]" />
                        </button>

                        {/* Profile */}
                        <div className="flex items-center gap-3 pl-4 border-l border-[#7A5C1D]/20">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7A5C1D] to-amber-700 flex items-center justify-center text-lg shadow-inner ring-2 ring-[#01030A]">
                                👩‍🏫
                            </div>
                            <div className="hidden md:block text-right">
                                <p className="text-sm font-medium text-white">Dr. Sharma</p>
                                <p className="text-[10px] text-[#7A5C1D] uppercase tracking-wide">Grade 8 Science</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-[#7A5C1D]/20 scrollbar-track-transparent">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default TeacherLayout;
