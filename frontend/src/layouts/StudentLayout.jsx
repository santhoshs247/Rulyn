import { Link, useLocation } from "wouter";
import { Home, BookOpen, User, Trophy, Settings, Bell, Menu, X, LogOut, Search, Gift, Star, Zap, CheckCircle, Clock, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";

export default function StudentLayout({ children }) {
    const [location] = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const notificationRef = useRef(null);
    const { t } = useLanguage();

    // Sample notifications data
    const notifications = [
        {
            id: 1,
            type: "achievement",
            title: "New Badge Unlocked! 🏆",
            message: "You earned the 'Science Whiz' badge!",
            time: "2 min ago",
            read: false,
            icon: <Trophy className="h-4 w-4 text-yellow-400" />
        },
        {
            id: 2,
            type: "xp",
            title: "XP Bonus! ⚡",
            message: "You earned 50 bonus XP for your streak!",
            time: "15 min ago",
            read: false,
            icon: <Zap className="h-4 w-4 text-amber-400" />
        },
        {
            id: 3,
            type: "quest",
            title: "Daily Quest Available 🎯",
            message: "Complete 3 stories to earn 100 XP",
            time: "1 hour ago",
            read: true,
            icon: <Gift className="h-4 w-4 text-pink-400" />
        },
        {
            id: 4,
            type: "reminder",
            title: "Keep your streak going! 🔥",
            message: "Complete a lesson today to maintain your 12-day streak",
            time: "3 hours ago",
            read: true,
            icon: <Clock className="h-4 w-4 text-orange-400" />
        },
        {
            id: 5,
            type: "teacher",
            title: "Message from Dr. Sharma 👩‍🏫",
            message: "Great job on your last quiz!",
            time: "Yesterday",
            read: true,
            icon: <MessageCircle className="h-4 w-4 text-blue-400" />
        }
    ];

    const unreadCount = notifications.filter(n => !n.read).length;

    // Close notifications when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setIsNotificationsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const navItems = [
        { href: "/student", icon: Home, label: t('home') },
        { href: "/student/learn", icon: BookOpen, label: t('learn') },
        { href: "/student/achievements", icon: Trophy, label: t('achievementsNav') },
        { href: "/student/profile", icon: User, label: t('profileNav') },
    ];

    return (
        <div className="min-h-screen bg-zinc-950 flex font-sans transition-colors duration-300">

            {/* Desktop Sidebar */}
            <aside
                className={cn(
                    "hidden md:flex flex-col border-r border-orange-500/20 bg-gradient-to-b from-zinc-900 via-black to-zinc-950 backdrop-blur-xl h-screen fixed top-0 left-0 transition-all duration-300 z-30 overflow-hidden",
                    isSidebarOpen ? "w-64" : "w-20"
                )}
            >
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{ y: [0, -20, 0], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute top-20 left-4 w-16 h-16 bg-orange-500/10 rounded-full blur-xl"
                    />
                    <motion.div
                        animate={{ y: [0, 20, 0], opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                        className="absolute bottom-40 right-4 w-20 h-20 bg-amber-500/10 rounded-full blur-xl"
                    />
                </div>

                <div className="p-4 h-16 flex items-center justify-between border-b border-orange-500/20 relative z-10">
                    {isSidebarOpen ? (
                        <div className="font-bold text-xl tracking-tight flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full shadow-lg shadow-orange-500/30">
                                <img src="/nav-logo.png" alt="Rulyn" className="w-full h-full object-cover rounded-full" />
                            </div>
                            <span className="bg-gradient-to-r from-orange-400 to-amber-400 text-transparent bg-clip-text font-black">RULYN</span>
                        </div>
                    ) : (
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 10 }}
                            className="mx-auto w-10 h-10 rounded-full shadow-lg shadow-orange-500/30"
                        >
                            <img src="/nav-logo.png" alt="Rulyn" className="w-full h-full object-cover rounded-full" />
                        </motion.div>
                    )}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="hidden lg:flex text-orange-400 hover:text-orange-300 hover:bg-orange-500/10"
                    >
                        {isSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                    </Button>
                </div>

                {/* Floating Creature */}
                {isSidebarOpen && (
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="px-4 py-3"
                    >
                        <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-2xl border border-orange-500/20"
                        >
                            <motion.span
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-3xl"
                            >
                                🦉
                            </motion.span>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold text-orange-400">Wise Owl</p>
                                <p className="text-[10px] text-white/50 truncate">Keep learning!</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                <div className="flex-1 py-4 px-3 space-y-2 relative z-10">
                    {navItems.map((item, idx) => {
                        const isActive = location === item.href;
                        const emojis = ['🏠', '📚', '🏆', '👤'];
                        return (
                            <Link key={item.href} href={item.href}>
                                <motion.a
                                    whileHover={{ x: 5 }}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group text-sm font-medium relative overflow-hidden",
                                        isActive
                                            ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30"
                                            : "text-white/60 hover:bg-orange-500/10 hover:text-orange-400"
                                    )}>
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center gap-3">
                                        <item.icon className={cn("h-5 w-5 shrink-0")} />
                                        {isSidebarOpen && (
                                            <motion.span
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="truncate"
                                            >
                                                {item.label}
                                            </motion.span>
                                        )}
                                    </span>
                                    {isActive && isSidebarOpen && (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="relative z-10 ml-auto text-lg"
                                        >
                                            {emojis[idx]}
                                        </motion.span>
                                    )}
                                </motion.a>
                            </Link>
                        );
                    })}
                </div>

                {/* Creatures Section */}
                {isSidebarOpen && (
                    <div className="px-4 py-3 border-t border-orange-500/20">
                        <p className="text-[10px] text-white/30 uppercase tracking-wider mb-3">Your Buddies</p>
                        <div className="flex justify-around">
                            {['🦊', '🐱', '🐶'].map((creature, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ scale: 1.2, rotate: 10 }}
                                    animate={{ y: [0, -3, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: idx * 0.3 }}
                                    className="w-10 h-10 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-xl flex items-center justify-center text-xl cursor-pointer border border-orange-500/20 hover:border-orange-500/50"
                                >
                                    {creature}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Bottom Actions */}
                <div className="p-4 border-t border-orange-500/20 space-y-2 relative z-10">
                    <Link href="/student/settings">
                        <motion.a
                            whileHover={{ x: 5 }}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-xl transition-colors text-sm font-medium text-white/50 hover:bg-orange-500/10 hover:text-orange-400",
                                !isSidebarOpen && "justify-center"
                            )}>
                            <Settings className="h-5 w-5" />
                            {isSidebarOpen && <span>{t('settingsNav')}</span>}
                        </motion.a>
                    </Link>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 w-full z-40 bg-black/90 backdrop-blur-md border-b border-orange-500/20 flex items-center justify-between p-4 px-6">
                <div className="font-bold text-lg flex items-center gap-2">
                    <div className="w-8 h-8 bg-transparent">
                        <img src="/nav-logo.png" alt="Rulyn" className="w-full h-full object-cover rounded-full" />
                    </div>
                    <span className="bg-gradient-to-r from-orange-400 to-amber-400 text-transparent bg-clip-text font-black">RULYN</span>
                </div>
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <Button size="icon" variant="ghost" className="rounded-full text-orange-400 hover:bg-orange-500/10">
                        <User className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className={cn(
                "flex-1 flex flex-col min-h-screen relative transition-all duration-300",
                isSidebarOpen ? "md:ml-64" : "md:ml-20"
            )}>
                {/* Desktop Topbar */}
                <header className="hidden md:flex h-16 border-b border-orange-500/10 bg-zinc-950/80 backdrop-blur-sm px-6 items-center justify-end sticky top-0 z-20">

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 text-orange-400 rounded-full text-sm font-bold border border-orange-500/20 hover:scale-105 transition-transform cursor-help" title="Your Daily Streak">
                            <span>🔥</span> 12
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 text-amber-400 rounded-full text-sm font-bold border border-amber-500/20 hover:scale-105 transition-transform cursor-help" title="Your Experience Points">
                            <span>⭐</span> 120 XP
                        </div>

                        <div className="h-6 w-px bg-orange-500/20 mx-2" />

                        <ThemeToggle />

                        {/* Notifications Dropdown */}
                        <div className="relative" ref={notificationRef}>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="relative rounded-full text-orange-400 hover:bg-orange-500/10"
                                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                            >
                                <Bell className="h-5 w-5" />
                                {unreadCount > 0 && (
                                    <span className="absolute -top-0.5 -right-0.5 h-5 w-5 bg-orange-500 rounded-full ring-2 ring-zinc-950 flex items-center justify-center text-[10px] font-bold text-white">
                                        {unreadCount}
                                    </span>
                                )}
                            </Button>

                            <AnimatePresence>
                                {isNotificationsOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 mt-2 w-80 bg-zinc-900 border border-orange-500/20 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-50"
                                    >
                                        {/* Header */}
                                        <div className="p-4 border-b border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-amber-500/10">
                                            <div className="flex items-center justify-between">
                                                <h3 className="font-bold text-white flex items-center gap-2">
                                                    <Bell className="h-4 w-4 text-orange-400" />
                                                    Notifications
                                                </h3>
                                                {unreadCount > 0 && (
                                                    <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full border border-orange-500/30">
                                                        {unreadCount} new
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Notifications List */}
                                        <div className="max-h-80 overflow-y-auto">
                                            {notifications.map((notification, idx) => (
                                                <motion.div
                                                    key={notification.id}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: idx * 0.05 }}
                                                    className={cn(
                                                        "p-4 border-b border-zinc-800/50 hover:bg-zinc-800/50 cursor-pointer transition-colors",
                                                        !notification.read && "bg-orange-500/5"
                                                    )}
                                                >
                                                    <div className="flex gap-3">
                                                        <div className={cn(
                                                            "p-2 rounded-xl",
                                                            !notification.read ? "bg-orange-500/20" : "bg-zinc-800"
                                                        )}>
                                                            {notification.icon}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-start justify-between gap-2">
                                                                <p className={cn(
                                                                    "text-sm font-medium truncate",
                                                                    !notification.read ? "text-white" : "text-white/70"
                                                                )}>
                                                                    {notification.title}
                                                                </p>
                                                                {!notification.read && (
                                                                    <span className="h-2 w-2 bg-orange-500 rounded-full flex-shrink-0 mt-1.5" />
                                                                )}
                                                            </div>
                                                            <p className="text-xs text-white/50 mt-0.5 truncate">
                                                                {notification.message}
                                                            </p>
                                                            <p className="text-[10px] text-white/30 mt-1 flex items-center gap-1">
                                                                <Clock className="h-3 w-3" />
                                                                {notification.time}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* Footer */}
                                        <div className="p-3 border-t border-orange-500/20 bg-zinc-900/80">
                                            <Button
                                                variant="ghost"
                                                className="w-full text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 text-sm"
                                                onClick={() => setIsNotificationsOpen(false)}
                                            >
                                                <CheckCircle className="h-4 w-4 mr-2" />
                                                Mark all as read
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-transparent hover:ring-orange-500 transition-all">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback className="bg-orange-500 text-white">ST</AvatarFallback>
                        </Avatar>
                    </div>
                </header>

                <main className="flex-1 p-4 md:p-8 pt-20 md:pt-8 w-full">
                    {children}
                </main>
            </div>

            {/* Mobile Bottom Nav */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-orange-500/20 flex justify-around p-2 z-50 safe-area-bottom shadow-2xl">
                {navItems.map((item) => {
                    const isActive = location === item.href;
                    return (
                        <Link key={item.href} href={item.href}>
                            <a className={cn(
                                "flex flex-col items-center justify-center w-full p-2 rounded-2xl transition-all duration-300 active:scale-95",
                                isActive ? "text-orange-400" : "text-white/40 hover:text-white/60"
                            )}>
                                <div className={cn(
                                    "p-1.5 rounded-xl transition-all",
                                    isActive && "bg-orange-500/20"
                                )}>
                                    <item.icon className={cn("h-6 w-6", isActive && "fill-current")} />
                                </div>
                                <span className={cn(
                                    "text-[10px] font-medium mt-1 transition-all",
                                    isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 hidden"
                                )}>{item.label}</span>
                            </a>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
