import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
    Atom, Cpu, Wrench, Calculator,
    BookOpen, ArrowRight, Lock, CheckCircle,
    Target, Flame, Star, Swords, Zap, Trophy, Gift, Sparkles, Brain, Rocket,
    Clock, AlertCircle, ChevronRight
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CoolMode from "@/components/CoolMode";
import ElectricBorder from "@/components/ElectricBorder";
import { ScrollVelocityRow } from "@/components/ScrollVelocity";
import FuturisticButton from "@/components/FuturisticButton";
import { mockAssignments, getStoryById } from "@/lib/mockData";
import { useLanguage } from "@/contexts/LanguageContext";

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
};

const ProgressBar = ({ progress, colorClass }) => (
    <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full ${colorClass}`}
        />
    </div>
);

// Floating Mascot Component
const FloatingMascot = () => {
    const { t } = useLanguage();
    const [msgIndex, setMsgIndex] = useState(0);

    const messages = [
        t('mascotGreat'),
        t('mascotReady'),
        t('mascotExplore'),
        t('mascotBreak'),
        t('mascotFocus')
    ];

    useEffect(() => {
        // Initial random message
        setMsgIndex(Math.floor(Math.random() * messages.length));

        const interval = setInterval(() => {
            setMsgIndex(Math.floor(Math.random() * messages.length));
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-30"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", delay: 1 }}
        >
            <div className="relative group cursor-pointer">
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-4xl shadow-2xl shadow-orange-500/50 border-4 border-white dark:border-zinc-800"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                >
                    🦉
                </motion.div>

                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0, x: 20, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.8 }}
                        className="absolute bottom-full right-0 mb-4 bg-white dark:bg-zinc-800 px-4 py-2 rounded-2xl shadow-xl border border-gray-200 dark:border-zinc-700 whitespace-nowrap"
                    >
                        <div className="text-sm font-medium">{messages[msgIndex]}</div>
                        <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white dark:bg-zinc-800 border-r border-b border-gray-200 dark:border-zinc-700 rotate-45" />
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default function StudentHome() {
    const [level] = useState(12);
    const [currentXP] = useState(3420);
    const [nextLevelXP] = useState(4000);
    const { t } = useLanguage();

    const subjects = [
        {
            id: "science",
            name: t('science'),
            lessons: 16,
            total: 24,
            progress: 65,
            color: "from-fuchsia-500 to-purple-600",
            lightColor: "bg-fuchsia-500",
            shadow: "shadow-purple-200 dark:shadow-purple-900/20",
            icon: <Atom className="h-6 w-6 text-white" />,
            desc: t('scienceDesc'),
            emoji: "🔬"
        },
        {
            id: "tech",
            name: t('technology'),
            lessons: 12,
            total: 20,
            progress: 40,
            color: "from-blue-500 to-indigo-600",
            lightColor: "bg-blue-500",
            shadow: "shadow-blue-200 dark:shadow-blue-900/20",
            icon: <Cpu className="h-6 w-6 text-white" />,
            desc: t('technologyDesc'),
            emoji: "💻"
        },
        {
            id: "eng",
            name: t('engineering'),
            lessons: 5,
            total: 18,
            progress: 25,
            color: "from-orange-400 to-red-500",
            lightColor: "bg-orange-500",
            shadow: "shadow-orange-200 dark:shadow-orange-900/20",
            icon: <Wrench className="h-6 w-6 text-white" />,
            desc: t('engineeringDesc'),
            emoji: "⚙️"
        },
        {
            id: "math",
            name: t('mathematics'),
            lessons: 24,
            total: 30,
            progress: 80,
            color: "from-emerald-400 to-green-600",
            lightColor: "bg-emerald-500",
            shadow: "shadow-emerald-200 dark:shadow-emerald-900/20",
            icon: <Calculator className="h-6 w-6 text-white" />,
            desc: t('mathematicsDesc'),
            emoji: "📐"
        },
    ];

    const dailyChallenges = [
        { id: 1, title: t('challengeScience'), reward: 150, icon: "🎯", progress: 2, total: 3, color: "purple" },
        { id: 2, title: t('challengeQuiz'), reward: 200, icon: "🏆", progress: 1, total: 1, color: "yellow" },
        { id: 3, title: t('challengeLearn'), reward: 100, icon: "⏱️", progress: 12, total: 15, color: "blue" },
    ];

    const learningStories = [
        {
            id: 1,
            title: t('storyPlants'),
            subject: t('science'),
            subjectColor: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
            progress: 100,
            xp: 50,
            icon: <BookOpen className="h-5 w-5 text-purple-600" />,
            completed: true
        },
        {
            id: 2,
            title: t('storyCoding'),
            subject: t('technology'),
            subjectColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
            progress: 75,
            xp: 30,
            icon: <Cpu className="h-5 w-5 text-blue-600" />,
            completed: false
        },
        {
            id: 3,
            title: t('storyMachines'),
            subject: t('engineering'),
            subjectColor: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
            progress: 60,
            xp: 25,
            icon: <Wrench className="h-5 w-5 text-orange-600" />,
            completed: false
        }
    ];

    const achievements = [
        { id: 1, icon: <Target className="h-6 w-6 text-pink-600" />, color: "bg-pink-100", locked: false, emoji: "🎯" },
        { id: 2, icon: <Star className="h-6 w-6 text-yellow-600" />, color: "bg-yellow-100", locked: false, emoji: "⭐" },
        { id: 3, icon: <Flame className="h-6 w-6 text-orange-600" />, color: "bg-orange-100", locked: false, emoji: "🔥" },
        { id: 4, icon: <Swords className="h-6 w-6 text-blue-600" />, color: "bg-blue-100", locked: false, emoji: "⚔️" },
        { id: 5, icon: <Lock className="h-6 w-6 text-gray-400" />, color: "bg-gray-100", locked: true, emoji: "" },
        { id: 6, icon: <Lock className="h-6 w-6 text-gray-400" />, color: "bg-gray-100", locked: true, emoji: "" },
    ];

    // Mock assignments with translation
    const pendingAssignments = [
        { id: 1, title: t('storyPlants'), subject: t('science'), dueDate: t('dueTomorrow'), status: "pending" },
        { id: 2, title: t('storyFractions'), subject: t('mathematics'), dueDate: t('dueToday'), status: "pending" }
    ];

    return (
        <>
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-8 max-w-7xl mx-auto pb-24"
            >
                {/* Scroll Velocity Ticker */}
                <div className="w-full py-2 bg-gradient-to-r from-orange-50/50 to-amber-50/50 dark:from-zinc-900/50 dark:to-zinc-800/50 backdrop-blur-sm border-y border-orange-100 dark:border-orange-900/30 overflow-hidden">
                    <ScrollVelocityRow baseVelocity={-1}>
                        <span className="mx-4 text-sm font-medium text-orange-600 dark:text-orange-400 flex items-center gap-2">
                            {t('ticker1')}
                        </span>
                        <span className="mx-4 text-sm font-medium text-amber-600 dark:text-amber-400 flex items-center gap-2">
                            {t('ticker2')}
                        </span>
                        <span className="mx-4 text-sm font-medium text-orange-600 dark:text-orange-400 flex items-center gap-2">
                            {t('ticker3')}
                        </span>
                        <span className="mx-4 text-sm font-medium text-amber-600 dark:text-amber-400 flex items-center gap-2">
                            {t('ticker4')}
                        </span>
                    </ScrollVelocityRow>
                </div>

                {/* Hero Stats Banner */}
                <motion.div variants={item}>
                    <ElectricBorder color="#f97316" width="100%">
                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 p-1 h-full">
                            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 relative overflow-hidden h-full">
                                {/* Animated Background Pattern */}
                                <div className="absolute inset-0 opacity-5">
                                    <div className="absolute top-0 left-0 w-40 h-40 bg-orange-500 rounded-full blur-3xl animate-pulse" />
                                    <div className="absolute bottom-0 right-0 w-60 h-60 bg-amber-500 rounded-full blur-3xl animate-pulse delay-1000" />
                                </div>

                                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <motion.div
                                                className="text-5xl"
                                                animate={{ rotate: [0, 10, -10, 0] }}
                                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                            >
                                                👋
                                            </motion.div>
                                            <div>
                                                <h1 className="text-2xl md:text-3xl font-bold">{t('welcomeBack')}, Explorer!</h1>
                                                <p className="text-sm text-muted-foreground">{t('level')} {level} • {t('continueJourney')}</p>
                                            </div>
                                        </div>

                                        {/* XP Progress Bar */}
                                        <div className="w-full md:w-96 space-y-2">
                                            <div className="flex justify-between text-sm font-medium">
                                                <span className="flex items-center gap-1">
                                                    <Zap className="h-4 w-4 text-yellow-500" />
                                                    {currentXP} XP
                                                </span>
                                                <span className="text-muted-foreground">{nextLevelXP - currentXP} {t('toLevel') || "to Level"} {level + 1}</span>
                                            </div>
                                            <div className="h-3 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${(currentXP / nextLevelXP) * 100}%` }}
                                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                                    className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 relative"
                                                >
                                                    <motion.div
                                                        animate={{ x: ['-100%', '100%'] }}
                                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                        className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                                                    />
                                                </motion.div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quick Stats */}
                                    <div className="flex gap-4">
                                        <motion.div
                                            whileHover={{ scale: 1.05, rotate: 5 }}
                                            className="bg-orange-100 dark:bg-orange-900/30 p-4 rounded-2xl text-center min-w-[90px]"
                                        >
                                            <div className="text-3xl font-black text-orange-600 dark:text-orange-400">12</div>
                                            <div className="text-xs font-medium text-orange-700 dark:text-orange-500">{t('streak') || "Day Streak"} 🔥</div>
                                        </motion.div>
                                        <motion.div
                                            whileHover={{ scale: 1.05, rotate: -5 }}
                                            className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-2xl text-center min-w-[90px]"
                                        >
                                            <div className="text-3xl font-black text-blue-600 dark:text-blue-400">4</div>
                                            <div className="text-xs font-medium text-blue-700 dark:text-blue-500">{t('badges') || "Badges"} 🏆</div>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ElectricBorder>
                </motion.div>

                {/* Teacher Assigned Tasks Section */}
                {pendingAssignments.length > 0 && (
                    <motion.div variants={item} className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-gradient-to-br from-red-500 to-orange-500">
                                    <AlertCircle className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">{t('fromYourTeacher')}</h2>
                                    <p className="text-sm text-muted-foreground">{t('tasksAssigned')} Dr. Sharma</p>
                                </div>
                            </div>
                            <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 border-0">
                                {pendingAssignments.length} {t('pending') || "Pending"}
                            </Badge>
                        </div>

                        <div className="grid gap-4">
                            {pendingAssignments.map((assignment, index) => {
                                const story = getStoryById(assignment.storyId);
                                const dueDate = new Date(assignment.dueDate);
                                const today = new Date();
                                const daysLeft = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
                                const isUrgent = daysLeft <= 2;

                                return (
                                    <motion.div
                                        key={assignment.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ scale: 1.01, x: 5 }}
                                        className={`relative overflow-hidden rounded-2xl border-2 ${isUrgent
                                            ? 'border-red-500/50 bg-red-50 dark:bg-red-950/20'
                                            : 'border-orange-500/30 bg-orange-50 dark:bg-orange-950/20'
                                            } p-5`}
                                    >
                                        {/* Urgency indicator */}
                                        {isUrgent && (
                                            <motion.div
                                                animate={{ opacity: [0.5, 1, 0.5] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                                className="absolute top-0 right-0 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-bl-xl"
                                            >
                                                ⚡ {t('dueSoon') || "Due Soon!"}
                                            </motion.div>
                                        )}

                                        <div className="flex items-start gap-4">
                                            {/* Icon */}
                                            <div className={`p-3 rounded-2xl ${assignment.type === 'quiz'
                                                ? 'bg-purple-100 dark:bg-purple-900/30'
                                                : 'bg-blue-100 dark:bg-blue-900/30'
                                                }`}>
                                                {assignment.type === 'quiz' ? (
                                                    <Target className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                                ) : (
                                                    <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-lg">{assignment.title}</h3>
                                                <p className="text-sm text-muted-foreground mb-2">{assignment.description}</p>

                                                <div className="flex flex-wrap gap-3 text-xs">
                                                    <span className="flex items-center gap-1 text-orange-600 dark:text-orange-400">
                                                        <Clock className="h-3 w-3" />
                                                        {daysLeft > 0 ? `${daysLeft} ${t('daysLeft') || 'days left'}` : t('dueToday')}
                                                    </span>
                                                    <span className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
                                                        <Zap className="h-3 w-3" />
                                                        {assignment.points} {t('points') || "points"}
                                                    </span>
                                                    {story && (
                                                        <Badge className="bg-white/50 dark:bg-zinc-800/50 text-xs font-normal">
                                                            {story.subject}
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Action */}
                                            <Link href={assignment.type === 'quiz' ? `/student/quiz/${assignment.storyId}` : `/student/stories/${assignment.storyId}`}>
                                                <Button
                                                    className={`rounded-xl ${isUrgent
                                                        ? 'bg-red-500 hover:bg-red-600'
                                                        : 'bg-orange-500 hover:bg-orange-600'
                                                        } text-white`}
                                                >
                                                    {t('start') || "Start"} <ChevronRight className="h-4 w-4 ml-1" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}

                {/* Next Adventure CTA Section */}
                <motion.div variants={item}>
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-1">
                        <div className="bg-zinc-950 rounded-3xl p-8 relative overflow-hidden">
                            {/* Animated background elements */}
                            <div className="absolute inset-0 overflow-hidden">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"
                                />
                                <motion.div
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                    className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl"
                                />
                                {/* Grid pattern */}
                                <div className="absolute inset-0 opacity-10" style={{
                                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
                                    backgroundSize: '40px 40px'
                                }} />
                            </div>

                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="text-center md:text-left">
                                    <motion.div
                                        animate={{ y: [0, -5, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="text-6xl mb-4"
                                    >
                                        🚀
                                    </motion.div>
                                    <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
                                        {t('readyForAdventure')}
                                    </h2>
                                    <p className="text-orange-200/70 text-sm md:text-base max-w-md">
                                        {t('diveIntoStories')}
                                    </p>
                                </div>

                                <div className="flex flex-col items-center gap-4">
                                    <Link href="/student/learn">
                                        <FuturisticButton className="large">
                                            {t('start')?.toUpperCase() || "S T A R T"}
                                        </FuturisticButton>
                                    </Link>
                                    <p className="text-xs text-orange-300/50">{t('clickToExplore')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Daily Challenges */}
                <motion.div variants={item} className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Gift className="h-6 w-6 text-orange-500" />
                            <h2 className="text-2xl font-bold">{t('dailyQuests')}</h2>
                            <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-0">
                                {t('resetIn')} 3h
                            </Badge>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                        {dailyChallenges.map((challenge, idx) => {
                            const isComplete = challenge.progress >= challenge.total;
                            return (
                                <motion.div
                                    key={challenge.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className="relative"
                                >
                                    <Card className={`border-2 ${isComplete ? 'border-green-400 bg-green-50 dark:bg-green-950/20' : 'border-gray-200 dark:border-zinc-800'} overflow-hidden`}>
                                        <CardContent className="p-5 space-y-3">
                                            <div className="flex items-start justify-between">
                                                <div className="text-4xl">{challenge.icon}</div>
                                                {isComplete && (
                                                    <motion.div
                                                        initial={{ scale: 0, rotate: -180 }}
                                                        animate={{ scale: 1, rotate: 0 }}
                                                        className="bg-green-500 text-white p-1 rounded-full"
                                                    >
                                                        <CheckCircle className="h-4 w-4" />
                                                    </motion.div>
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-sm">{challenge.title}</h3>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    {challenge.progress}/{challenge.total} {t('completed') || "completed"}
                                                </p>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="h-2 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                                                        className={`h-full ${isComplete ? 'bg-green-500' : 'bg-gradient-to-r from-orange-500 to-amber-500'}`}
                                                    />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs font-bold text-yellow-600 dark:text-yellow-500">
                                                        +{challenge.reward} XP
                                                    </span>
                                                    {isComplete && (
                                                        <CoolMode>
                                                            <Button size="sm" className="h-7 rounded-full px-3 text-xs bg-green-500 hover:bg-green-600">
                                                                {t('claim') || "Claim"} <Sparkles className="ml-1 h-3 w-3" />
                                                            </Button>
                                                        </CoolMode>
                                                    )}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Subjects Section */}
                <motion.div variants={item} className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <Brain className="h-6 w-6 text-orange-500" />
                            {t('yourSubjects')}
                        </h2>
                        <Link href="/student/learn">
                            <Button variant="ghost" className="text-sm font-semibold hover:bg-transparent hover:text-primary gap-1 cursor-pointer group">
                                {t('viewAll')}
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {subjects.map((subject, idx) => (
                            <motion.div
                                key={subject.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ y: -8, rotate: 2 }}
                                className={`rounded-3xl bg-white dark:bg-card overflow-hidden shadow-xl ${subject.shadow} border border-transparent dark:border-border cursor-pointer`}
                            >
                                <div className={`h-32 bg-gradient-to-r ${subject.color} p-4 flex justify-between items-start relative overflow-hidden`}>
                                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl relative z-10">
                                        {subject.icon}
                                    </div>
                                    <span className="text-xs font-bold text-white bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full relative z-10">
                                        {subject.lessons}/{subject.total}
                                    </span>
                                    {/* Floating emoji */}
                                    <motion.div
                                        animate={{
                                            y: [0, -10, 0],
                                            rotate: [0, 5, -5, 0]
                                        }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                        className="absolute bottom-3 right-3 text-5xl opacity-20"
                                    >
                                        {subject.emoji}
                                    </motion.div>
                                </div>
                                <div className="p-5 space-y-4">
                                    <div className="space-y-1">
                                        <h3 className="font-bold text-lg">{subject.name}</h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 h-8">
                                            {subject.desc}
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs font-semibold">
                                            <span className="text-gray-400">{t('progress') || "Progress"}</span>
                                            <span>{subject.progress}%</span>
                                        </div>
                                        <ProgressBar
                                            progress={subject.progress}
                                            colorClass={subject.lightColor}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Bottom Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Continue Learning */}
                    <motion.div variants={item} className="lg:col-span-2 space-y-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Rocket className="h-5 w-5 text-orange-600" />
                                <h2 className="text-xl font-bold">{t('continueYourJourney')}</h2>
                            </div>
                            <Button variant="link" className="text-primary">{t('seeAll') || "See all"}</Button>
                        </div>

                        <div className="space-y-4">
                            {learningStories.map((story, idx) => (
                                <Link key={story.id} href={`/student/stories/${story.id}`}>
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        whileHover={{ scale: 1.02, x: 5 }}
                                        className="group relative bg-white dark:bg-card p-4 rounded-2xl shadow-sm border hover:shadow-lg transition-all flex items-center gap-4 cursor-pointer overflow-hidden"
                                    >
                                        {story.completed && (
                                            <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
                                                <CheckCircle className="h-3 w-3" />
                                            </div>
                                        )}

                                        <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                            {story.icon}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-base truncate pr-4">{story.title}</h3>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${story.subjectColor}`}>
                                                    {story.subject}
                                                </span>
                                                <div className="flex-1 h-1.5 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden max-w-[100px]">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${story.progress}%` }}
                                                        className="h-full bg-gradient-to-r from-orange-500 to-amber-500"
                                                    />
                                                </div>
                                                <span className="text-xs text-gray-400">{story.progress}%</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white border-0 px-3 py-1 rounded-full shadow-lg">
                                                +{story.xp} XP
                                            </Badge>
                                            <Button size="icon" variant="ghost" className="rounded-full h-10 w-10 text-gray-400 group-hover:text-primary group-hover:bg-primary/10">
                                                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                            </Button>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>

                    {/* Achievements */}
                    <motion.div variants={item} className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Trophy className="h-5 w-5 text-yellow-500" />
                            <h2 className="text-xl font-bold">{t('achievementsNav') || "Achievements"}</h2>
                        </div>

                        <ElectricBorder color="#eab308" width="100%">
                            <Card className="border-0 shadow-xl bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-zinc-900 dark:to-zinc-800 rounded-3xl overflow-hidden h-full">
                                <CardContent className="p-6 space-y-6">
                                    <div className="grid grid-cols-3 gap-4">
                                        {achievements.map((badge, idx) => (
                                            <CoolMode key={badge.id}>
                                                <motion.div
                                                    initial={{ scale: 0, rotate: -180 }}
                                                    animate={{ scale: 1, rotate: 0 }}
                                                    transition={{ delay: idx * 0.1, type: "spring" }}
                                                    whileHover={{ scale: 1.1, rotate: 360 }}
                                                    className="relative aspect-square cursor-pointer"
                                                >
                                                    <div className={`w-full h-full rounded-2xl flex items-center justify-center relative ${badge.locked ? 'bg-gray-200 dark:bg-zinc-800' : 'bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg'}`}>
                                                        {badge.locked ? (
                                                            <Lock className="h-6 w-6 text-gray-400" />
                                                        ) : (
                                                            <>
                                                                <div className="absolute inset-0 bg-white/20 rounded-2xl backdrop-blur-sm" />
                                                                <div className="text-3xl drop-shadow-md relative z-10">
                                                                    {badge.emoji}
                                                                </div>
                                                            </>
                                                        )}
                                                        {!badge.locked && (
                                                            <motion.div
                                                                initial={{ scale: 0 }}
                                                                animate={{ scale: 1 }}
                                                                className="absolute -top-1 -right-1 bg-green-500 rounded-full border-2 border-white dark:border-card p-0.5"
                                                            >
                                                                <CheckCircle className="h-3 w-3 text-white" />
                                                            </motion.div>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            </CoolMode>
                                        ))}
                                    </div>

                                    <div className="text-center pt-4 border-t border-dashed border-orange-200 dark:border-zinc-700">
                                        <p className="text-sm font-bold text-orange-600 dark:text-orange-500 mb-2">
                                            4/6 {t('badges') || "badges"} {t('earned') || "earned"}
                                        </p>
                                        <Link href="/student/achievements">
                                            <Button size="sm" variant="outline" className="rounded-full">
                                                {t('viewAll') || "View All"} {t('achievementsNav') || "Achievements"}
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </ElectricBorder>
                    </motion.div>

                </div>
            </motion.div>

            <FloatingMascot />
        </>
    );
}
