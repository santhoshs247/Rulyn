import React, { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
    User, Trophy, Zap, Flame, Star, Target, BookOpen, Clock,
    Settings, Edit3, Camera, Share2, Award, Crown, Sparkles,
    TrendingUp, Calendar, CheckCircle, Lock, ChevronRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CoolMode from "@/components/CoolMode";
import ElectricBorder from "@/components/ElectricBorder";
import { mockStudentData } from "@/lib/mockData";
import { useLanguage } from "@/contexts/LanguageContext";

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
};

// Rank progression data


export default function StudentProfile() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState("overview");

    const ranks = [
        { name: t('rankBeginner'), minXP: 0, icon: "🌱", color: "from-gray-400 to-gray-500" },
        { name: t('rankExplorer1'), minXP: 500, icon: "🧭", color: "from-green-400 to-green-600" },
        { name: t('rankExplorer2'), minXP: 1000, icon: "🏃", color: "from-blue-400 to-blue-600" },
        { name: t('rankExplorer3'), minXP: 2000, icon: "🎯", color: "from-purple-400 to-purple-600" },
        { name: t('rankAdventurer'), minXP: 3500, icon: "⚔️", color: "from-orange-400 to-red-500" },
        { name: t('rankChampion'), minXP: 5000, icon: "🏆", color: "from-yellow-400 to-orange-500" },
        { name: t('rankMaster'), minXP: 8000, icon: "👑", color: "from-pink-400 to-rose-600" },
        { name: t('rankLegend'), minXP: 12000, icon: "🌟", color: "from-amber-400 to-yellow-500" },
    ];

    const weeklyActivity = [
        { day: t('mon'), minutes: 25, xp: 150 },
        { day: t('tue'), minutes: 40, xp: 280 },
        { day: t('wed'), minutes: 15, xp: 100 },
        { day: t('thu'), minutes: 35, xp: 220 },
        { day: t('fri'), minutes: 50, xp: 350 },
        { day: t('sat'), minutes: 20, xp: 130 },
        { day: t('sun'), minutes: 45, xp: 300 },
    ];

    const studentData = {
        ...mockStudentData,
        name: "Explorer",
        avatar: "🦊",
        joinDate: "January 2026",
        totalLearningTime: "12h 45m",
        storiesCompleted: 23,
        quizzesCompleted: 18,
        perfectQuizzes: 5,
        currentStreak: 12,
        longestStreak: 15,
    };

    // Calculate current rank
    const getCurrentRank = () => {
        for (let i = ranks.length - 1; i >= 0; i--) {
            if (studentData.xp >= ranks[i].minXP) {
                return { ...ranks[i], index: i };
            }
        }
        return { ...ranks[0], index: 0 };
    };

    const currentRank = getCurrentRank();
    const nextRank = ranks[currentRank.index + 1] || null;
    const progressToNextRank = nextRank
        ? ((studentData.xp - currentRank.minXP) / (nextRank.minXP - currentRank.minXP)) * 100
        : 100;

    const maxMinutes = Math.max(...weeklyActivity.map(d => d.minutes));

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8 pb-24 max-w-5xl mx-auto"
        >
            {/* Profile Header */}
            <motion.div variants={item}>
                <ElectricBorder color="#f97316">
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-600 via-amber-500 to-orange-500 p-1">
                        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 relative overflow-hidden">
                            {/* Background decoration */}
                            <div className="absolute inset-0 overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-full blur-3xl" />
                                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-amber-500/10 to-yellow-500/10 rounded-full blur-3xl" />
                            </div>

                            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
                                {/* Avatar Section */}
                                <div className="relative group">
                                    <motion.div
                                        whileHover={{ scale: 1.05, rotate: 5 }}
                                        className="w-32 h-32 rounded-3xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-6xl shadow-2xl shadow-orange-500/30 border-4 border-white dark:border-zinc-800"
                                    >
                                        {studentData.avatar}
                                    </motion.div>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="absolute -bottom-2 -right-2 bg-white dark:bg-zinc-800 p-2 rounded-full shadow-lg border-2 border-orange-200 dark:border-orange-800"
                                    >
                                        <Camera className="h-4 w-4 text-orange-600" />
                                    </motion.button>

                                    {/* Rank badge */}
                                    <div className={`absolute -top-3 -left-3 bg-gradient-to-r ${currentRank.color} text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1`}>
                                        {currentRank.icon} {currentRank.name}
                                    </div>
                                </div>

                                {/* Info Section */}
                                <div className="flex-1 text-center md:text-left">
                                    <h1 className="text-3xl md:text-4xl font-black mb-2">{studentData.name}</h1>
                                    <p className="text-muted-foreground mb-4">{t('learningSince') || "Learning since"} {studentData.joinDate}</p>

                                    {/* Quick Stats */}
                                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                        <Badge className="bg-yellow-100 text-yellow-700 border-0 gap-1 px-3 py-1.5 text-sm">
                                            <Zap className="h-4 w-4" /> {studentData.xp} {t('totalXP') || "Total XP"}
                                        </Badge>
                                        <Badge className="bg-orange-100 text-orange-700 border-0 gap-1 px-3 py-1.5 text-sm">
                                            <Flame className="h-4 w-4" /> {studentData.currentStreak} {t('streak') || "Streak"}
                                        </Badge>
                                        <Badge className="bg-purple-100 text-purple-700 border-0 gap-1 px-3 py-1.5 text-sm">
                                            <Trophy className="h-4 w-4" /> {t('level')} {studentData.level}
                                        </Badge>
                                    </div>

                                    {/* Rank Progress */}
                                    {nextRank && (
                                        <div className="mt-6 max-w-md">
                                            <div className="flex justify-between text-sm font-medium mb-2">
                                                <span className="flex items-center gap-1">
                                                    {currentRank.icon} {currentRank.name}
                                                </span>
                                                <span className="text-muted-foreground flex items-center gap-1">
                                                    {nextRank.icon} {nextRank.name}
                                                </span>
                                            </div>
                                            <div className="h-3 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${progressToNextRank}%` }}
                                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                                    className={`h-full bg-gradient-to-r ${currentRank.color} relative overflow-hidden`}
                                                >
                                                    <motion.div
                                                        animate={{ x: ['-100%', '200%'] }}
                                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                        className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                                                    />
                                                </motion.div>
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {nextRank.minXP - studentData.xp} XP {t('toReach') || "to reach"} {nextRank.name}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col gap-2">
                                    <Button variant="outline" size="sm" className="gap-2">
                                        <Edit3 className="h-4 w-4" /> {t('editProfile') || "Edit Profile"}
                                    </Button>
                                    <CoolMode>
                                        <Button variant="outline" size="sm" className="gap-2">
                                            <Share2 className="h-4 w-4" /> {t('shareStats') || "Share Stats"}
                                        </Button>
                                    </CoolMode>
                                </div>
                            </div>
                        </div>
                    </div>
                </ElectricBorder>
            </motion.div>


            {/* Stats Grid */}
            <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    {
                        icon: <BookOpen className="h-6 w-6" />,
                        value: studentData.storiesCompleted,
                        label: t('storiesRead') || "Stories Read",
                        gradient: "from-violet-600 via-purple-600 to-fuchsia-600",
                        border: "border-violet-500/30",
                        shadow: "shadow-violet-500/20",
                        iconBg: "bg-violet-500/20",
                        textColor: "text-violet-400"
                    },
                    {
                        icon: <Target className="h-6 w-6" />,
                        value: studentData.quizzesCompleted,
                        label: t('quizzesTaken') || "Quizzes Taken",
                        gradient: "from-blue-600 via-cyan-500 to-teal-500",
                        border: "border-cyan-500/30",
                        shadow: "shadow-cyan-500/20",
                        iconBg: "bg-cyan-500/20",
                        textColor: "text-cyan-400"
                    },
                    {
                        icon: <Star className="h-6 w-6" />,
                        value: studentData.perfectQuizzes,
                        label: t('perfectScores') || "Perfect Scores",
                        gradient: "from-amber-500 via-yellow-500 to-orange-500",
                        border: "border-yellow-500/30",
                        shadow: "shadow-yellow-500/20",
                        iconBg: "bg-yellow-500/20",
                        textColor: "text-yellow-400"
                    },
                    {
                        icon: <Clock className="h-6 w-6" />,
                        value: studentData.totalLearningTime,
                        label: t('learningTime') || "Learning Time",
                        gradient: "from-emerald-500 via-green-500 to-teal-500",
                        border: "border-emerald-500/30",
                        shadow: "shadow-emerald-500/20",
                        iconBg: "bg-emerald-500/20",
                        textColor: "text-emerald-400"
                    },
                ].map((stat, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ y: -8, scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative overflow-hidden rounded-2xl p-5 text-center border ${stat.border} bg-zinc-900/80 shadow-xl ${stat.shadow} cursor-pointer group`}
                    >
                        {/* Gradient glow effect */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                        {/* Top gradient line */}
                        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient}`} />

                        {/* Icon with background */}
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                            className={`${stat.iconBg} ${stat.textColor} p-3 rounded-xl mx-auto mb-3 w-fit border ${stat.border}`}
                        >
                            {stat.icon}
                        </motion.div>

                        {/* Value with gradient text */}
                        <motion.div
                            className={`text-3xl font-black bg-gradient-to-r ${stat.gradient} text-transparent bg-clip-text`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            {stat.value}
                        </motion.div>

                        {/* Label */}
                        <div className="text-xs text-white/50 font-medium mt-1">{stat.label}</div>

                        {/* Sparkle effect on hover */}
                        <motion.div
                            className={`absolute top-3 right-3 ${stat.textColor} opacity-0 group-hover:opacity-100 transition-opacity`}
                            animate={{ rotate: [0, 180, 360] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            <Sparkles className="h-4 w-4" />
                        </motion.div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Weekly Activity Chart */}
            <motion.div variants={item}>
                <Card className="border border-orange-500/20 rounded-3xl overflow-hidden bg-zinc-900/80 shadow-xl shadow-orange-500/5">
                    <CardHeader className="border-b border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-amber-500/10">
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2 text-white">
                                <div className="p-2 bg-orange-500/20 rounded-lg">
                                    <Calendar className="h-5 w-5 text-orange-400" />
                                </div>
                                {t('weeklyActivity') || "Weekly Activity"}
                            </CardTitle>
                            <Badge className="bg-orange-500/20 text-orange-400 border border-orange-500/30">{t('thisWeek') || "This Week"}</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="flex items-end justify-between gap-2 h-40">
                            {weeklyActivity.map((day, idx) => (
                                <motion.div
                                    key={day.day}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${(day.minutes / maxMinutes) * 100}%` }}
                                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                                    className="flex-1 flex flex-col items-center gap-2"
                                >
                                    <div className="text-xs font-bold text-orange-400">
                                        {day.minutes}m
                                    </div>
                                    <motion.div
                                        whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(249, 115, 22, 0.4)" }}
                                        className="w-full bg-gradient-to-t from-orange-600 via-orange-500 to-amber-400 rounded-t-xl cursor-pointer relative group"
                                        style={{ height: '100%', minHeight: '20px' }}
                                    >
                                        {/* Shine effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-t-xl" />
                                        {/* Tooltip */}
                                        <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-black text-orange-400 px-3 py-2 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 border border-orange-500/30">
                                            ⚡ {day.xp} XP {t('earned') || "earned"}
                                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-black border-r border-b border-orange-500/30" />
                                        </div>
                                    </motion.div>
                                    <div className="text-xs font-medium text-white/50">
                                        {day.day}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <div className="mt-6 flex justify-between items-center pt-4 border-t border-dashed border-orange-500/20">
                            <div className="text-sm">
                                <span className="font-bold text-orange-400">230 {t('minutes') || "minutes"}</span>
                                <span className="text-white/50"> {t('total') || "total"} {t('thisWeek')?.toLowerCase() || "this week"}</span>
                            </div>
                            <div className="text-sm">
                                <span className="font-bold text-amber-400">1,530 XP</span>
                                <span className="text-white/50"> {t('earned') || "earned"}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Rank Progression */}
            <motion.div variants={item}>
                <Card className="border-2 border-orange-500/30 rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900 via-black to-zinc-900">
                    <CardHeader className="border-b border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-amber-500/10">
                        <CardTitle className="flex items-center gap-2 text-orange-400">
                            <Crown className="h-5 w-5 text-orange-500" />
                            {t('rankProgression') || "Rank Progression"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {ranks.map((rank, idx) => {
                                const isUnlocked = studentData.xp >= rank.minXP;
                                const isCurrent = currentRank.name === rank.name;

                                return (
                                    <motion.div
                                        key={rank.name}
                                        whileHover={isUnlocked ? { scale: 1.05 } : {}}
                                        className={`relative p-4 rounded-2xl text-center transition-all ${isCurrent
                                            ? `bg-gradient-to-br ${rank.color} text-white shadow-lg shadow-orange-500/20`
                                            : isUnlocked
                                                ? 'bg-zinc-800/80 border border-orange-500/20'
                                                : 'bg-zinc-900/50 border border-zinc-800 opacity-50'
                                            }`}
                                    >
                                        {isCurrent && (
                                            <motion.div
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                                className="absolute -top-2 -right-2 bg-white text-yellow-500 p-1 rounded-full shadow-lg"
                                            >
                                                <Sparkles className="h-4 w-4" />
                                            </motion.div>
                                        )}
                                        <div className="text-3xl mb-2">{isUnlocked ? rank.icon : <Lock className="h-6 w-6 mx-auto text-gray-400" />}</div>
                                        <div className={`font-bold text-sm ${isCurrent ? 'text-white' : ''}`}>{rank.name}</div>
                                        <div className={`text-xs mt-1 ${isCurrent ? 'text-white/80' : 'text-muted-foreground'}`}>
                                            {rank.minXP} XP
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={item} className="grid md:grid-cols-2 gap-4">
                <Link href="/student/achievements">
                    <motion.div
                        whileHover={{ scale: 1.02, x: 5 }}
                        className="flex items-center justify-between p-5 bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20 rounded-2xl cursor-pointer border border-orange-200 dark:border-orange-800"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                                <Trophy className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold">{t('viewAllAchievements') || "View All Achievements"}</h3>
                                <p className="text-sm text-muted-foreground">3 {t('of') || "of"} 8 {t('badges') || "badges"} {t('earned') || "earned"}</p>
                            </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-orange-600" />
                    </motion.div>
                </Link>

                <Link href="/student/learn">
                    <motion.div
                        whileHover={{ scale: 1.02, x: 5 }}
                        className="flex items-center justify-between p-5 bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-2xl cursor-pointer border border-amber-200 dark:border-amber-800"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center">
                                <BookOpen className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold">{t('continueLearning') || "Continue Learning"}</h3>
                                <p className="text-sm text-muted-foreground">5 {t('newStories') || "new stories"} {t('available') || "available"}</p>
                            </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-amber-600" />
                    </motion.div>
                </Link>
            </motion.div>
        </motion.div>
    );
}
