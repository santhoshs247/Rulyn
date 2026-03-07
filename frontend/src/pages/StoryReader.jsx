import { useState, useEffect } from "react";
import { useRoute, Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, CheckCircle, Loader2, Zap, Clock, BookOpen, Sparkles, Volume2, VolumeX, Star } from "lucide-react";
import CoolMode from "@/components/CoolMode";

export default function StoryReader() {
    const [, params] = useRoute("/student/stories/:id");
    const [, setLocation] = useLocation();
    const storyId = parseInt(params.id);

    const { data: story, isLoading } = useQuery({
        queryKey: ['story', storyId],
        queryFn: () => api.get(`/stories/${storyId}`)
    });

    const [page, setPage] = useState(0);
    const [xpEarned, setXpEarned] = useState(0);
    const [showXpPopup, setShowXpPopup] = useState(false);
    const [readingTime, setReadingTime] = useState(0);
    const [isReading, setIsReading] = useState(false);
    const [completedPages, setCompletedPages] = useState(new Set());
    const [showCompletion, setShowCompletion] = useState(false);

    // Reading timer
    useEffect(() => {
        if (!isLoading && story) {
            setIsReading(true);
            const timer = setInterval(() => {
                setReadingTime(t => t + 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [isLoading, story]);

    // Track page completion
    useEffect(() => {
        if (!completedPages.has(page)) {
            const timer = setTimeout(() => {
                setCompletedPages(prev => new Set([...prev, page]));
                // Award XP for reading each page
                const earnedXP = 5;
                setXpEarned(prev => prev + earnedXP);
                setShowXpPopup(true);
                setTimeout(() => setShowXpPopup(false), 1500);
            }, 2000); // Must stay on page for 2 seconds
            return () => clearTimeout(timer);
        }
    }, [page, completedPages]);

    if (isLoading) {
        return (
            <div className="flex h-[70vh] items-center justify-center flex-col gap-4">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                    <BookOpen className="h-12 w-12 text-primary" />
                </motion.div>
                <p className="text-muted-foreground animate-pulse">Loading your adventure...</p>
            </div>
        );
    }

    if (!story) return <div className="p-4">Story not found. Try syncing or checking connectivity.</div>;

    const totalPages = story.content.length;
    const isLastPage = page === totalPages - 1;
    const progress = ((page + 1) / totalPages) * 100;

    const nextPage = () => {
        if (page < totalPages - 1) setPage(page + 1);
    };

    const prevPage = () => {
        if (page > 0) setPage(page - 1);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleComplete = () => {
        setShowCompletion(true);
    };

    // Completion celebration screen
    if (showCompletion) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-[80vh] flex flex-col items-center justify-center p-4"
            >
                {/* Confetti Effect */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden">
                    {[...Array(30)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: -20, x: Math.random() * window.innerWidth, rotate: 0 }}
                            animate={{ y: window.innerHeight + 20, rotate: Math.random() * 720 }}
                            transition={{ duration: 2 + Math.random() * 2, ease: "linear", delay: Math.random() * 0.5 }}
                            className="absolute text-2xl"
                        >
                            {['🌟', '✨', '🎉', '⭐', '🎊'][Math.floor(Math.random() * 5)]}
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.3 }}
                    className="text-8xl mb-6"
                >
                    🎉
                </motion.div>

                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-3xl md:text-4xl font-black text-center mb-2"
                >
                    Story Complete!
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-muted-foreground text-center mb-8"
                >
                    Amazing work finishing "{story.title}"
                </motion.p>

                {/* Stats Cards */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="grid grid-cols-3 gap-4 mb-8 w-full max-w-md"
                >
                    <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl p-4 text-center">
                        <Zap className="h-6 w-6 text-yellow-600 mx-auto mb-1" />
                        <div className="text-2xl font-black text-yellow-600">{xpEarned + story.xp}</div>
                        <div className="text-xs text-yellow-700">XP Earned</div>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900/30 rounded-2xl p-4 text-center">
                        <Clock className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                        <div className="text-2xl font-black text-blue-600">{formatTime(readingTime)}</div>
                        <div className="text-xs text-blue-700">Reading Time</div>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/30 rounded-2xl p-4 text-center">
                        <BookOpen className="h-6 w-6 text-green-600 mx-auto mb-1" />
                        <div className="text-2xl font-black text-green-600">{totalPages}</div>
                        <div className="text-xs text-green-700">Pages Read</div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="flex gap-4 w-full max-w-md"
                >
                    <Link href={`/student/quiz/${storyId}`} className="flex-1">
                        <CoolMode>
                            <Button className="w-full h-14 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-2xl shadow-lg">
                                Take Quiz! <Sparkles className="ml-2 h-5 w-5" />
                            </Button>
                        </CoolMode>
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="mt-4"
                >
                    <Link href="/student/learn">
                        <Button variant="ghost">Back to Library</Button>
                    </Link>
                </motion.div>
            </motion.div>
        );
    }

    return (
        <div className="h-[calc(100vh-140px)] flex flex-col relative">
            {/* XP Popup */}
            <AnimatePresence>
                {showXpPopup && (
                    <motion.div
                        initial={{ y: -50, opacity: 0, scale: 0.5 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: -50, opacity: 0, scale: 0.5 }}
                        className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full shadow-2xl font-bold flex items-center gap-2"
                    >
                        <Zap className="h-5 w-5" /> +5 XP
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mb-4 flex items-center justify-between"
            >
                <Link href="/student/learn">
                    <Button variant="ghost" size="sm" className="gap-2">
                        <ChevronLeft className="h-4 w-4" /> Back
                    </Button>
                </Link>
                <div className="flex items-center gap-4">
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-0 gap-1">
                        <Zap className="h-3 w-3" /> {xpEarned} XP
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-0 gap-1">
                        <Clock className="h-3 w-3" /> {formatTime(readingTime)}
                    </Badge>
                </div>
            </motion.div>

            {/* Progress Bar */}
            <div className="mb-4 space-y-2">
                <div className="flex justify-between text-xs font-medium text-muted-foreground">
                    <span>Page {page + 1} of {totalPages}</span>
                    <span>{Math.round(progress)}% Complete</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
                {/* Page dots */}
                <div className="flex justify-center gap-1.5 pt-2">
                    {story.content.map((_, idx) => (
                        <motion.button
                            key={idx}
                            onClick={() => setPage(idx)}
                            whileHover={{ scale: 1.3 }}
                            whileTap={{ scale: 0.9 }}
                            className={`w-2.5 h-2.5 rounded-full transition-all ${idx === page
                                    ? 'bg-primary w-6'
                                    : completedPages.has(idx)
                                        ? 'bg-green-500'
                                        : 'bg-gray-300 dark:bg-zinc-700'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Content Card */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={page}
                    initial={{ x: 100, opacity: 0, rotateY: -15 }}
                    animate={{ x: 0, opacity: 1, rotateY: 0 }}
                    exit={{ x: -100, opacity: 0, rotateY: 15 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="flex-1"
                    style={{ perspective: 1000 }}
                >
                    <Card className="h-full flex flex-col justify-center items-center p-8 text-center border-2 border-primary/10 shadow-2xl relative overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-zinc-800 dark:to-zinc-900 rounded-3xl">
                        {/* Floating particles */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            {[...Array(5)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        y: [0, -20, 0],
                                        opacity: [0.3, 0.6, 0.3],
                                    }}
                                    transition={{
                                        duration: 3 + i,
                                        repeat: Infinity,
                                        delay: i * 0.5,
                                    }}
                                    className="absolute text-4xl"
                                    style={{
                                        left: `${10 + i * 20}%`,
                                        top: `${60 + (i % 3) * 10}%`,
                                        opacity: 0.2,
                                    }}
                                >
                                    {['✨', '🌟', '💫', '⭐', '🔮'][i]}
                                </motion.div>
                            ))}
                        </div>

                        {/* Main Image/Emoji */}
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", delay: 0.2 }}
                            className="text-8xl md:text-9xl mb-8 drop-shadow-2xl relative"
                        >
                            <motion.div
                                animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                {story.content[page].image}
                            </motion.div>
                            {/* Glow effect */}
                            <div className="absolute inset-0 blur-3xl opacity-30 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
                        </motion.div>

                        {/* Text Content */}
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed dark:text-gray-100 max-w-2xl relative z-10"
                        >
                            {story.content[page].text}
                        </motion.p>

                        {/* Page completion indicator */}
                        {completedPages.has(page) && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded-full"
                            >
                                <CheckCircle className="h-4 w-4" />
                            </motion.div>
                        )}
                    </Card>
                </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-6 flex gap-4"
            >
                <Button
                    variant="outline"
                    className="flex-1 h-14 rounded-2xl text-base"
                    onClick={prevPage}
                    disabled={page === 0}
                >
                    <ChevronLeft className="mr-2 h-5 w-5" /> Previous
                </Button>

                {isLastPage ? (
                    <CoolMode>
                        <Button
                            className="flex-1 h-14 rounded-2xl text-base bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                            onClick={handleComplete}
                        >
                            Complete Story! <CheckCircle className="ml-2 h-5 w-5" />
                        </Button>
                    </CoolMode>
                ) : (
                    <Button
                        className="flex-1 h-14 rounded-2xl text-base"
                        onClick={nextPage}
                    >
                        Next <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                )}
            </motion.div>
        </div>
    );
}
