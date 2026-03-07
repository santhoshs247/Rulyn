import { useState, useEffect, useRef } from "react";
import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Trophy, ArrowRight, RotateCcw, Loader2, Zap, Clock, Flame, Star, Target, Sparkles, Share2, Home } from "lucide-react";
import CoolMode from "@/components/CoolMode";
import ElectricBorder from "@/components/ElectricBorder";
import FuturisticButton from "@/components/FuturisticButton";


export default function QuizEngine() {
    const [, params] = useRoute("/student/quiz/:id");
    const storyId = parseInt(params.id);

    const { data: story, isLoading } = useQuery({
        queryKey: ['story', storyId],
        queryFn: () => api.get(`/stories/${storyId}`)
    });

    const [currentQ, setCurrentQ] = useState(0);
    const [selectedOpt, setSelectedOpt] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [maxStreak, setMaxStreak] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);
    const [totalTime, setTotalTime] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [showStreakBonus, setShowStreakBonus] = useState(false);
    const [perfectStreak, setPerfectStreak] = useState(true);
    const timerRef = useRef(null);

    // Timer
    useEffect(() => {
        if (!isLoading && story && story.quiz && !showResult && !isPaused && isCorrect === null) {
            timerRef.current = setInterval(() => {
                setTimeLeft(t => {
                    if (t <= 1) {
                        handleTimeout();
                        return 30;
                    }
                    return t - 1;
                });
                setTotalTime(t => t + 1);
            }, 1000);
            return () => clearInterval(timerRef.current);
        }
    }, [isLoading, story, currentQ, showResult, isPaused, isCorrect]);

    const handleTimeout = () => {
        setIsCorrect(false);
        setStreak(0);
        setPerfectStreak(false);
    };

    if (isLoading) {
        return (
            <div className="flex h-[50vh] items-center justify-center flex-col gap-4">
                <motion.div
                    animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                    transition={{ rotate: { duration: 2, repeat: Infinity }, scale: { duration: 1, repeat: Infinity } }}
                >
                    <Target className="h-12 w-12 text-primary" />
                </motion.div>
                <p className="text-muted-foreground animate-pulse">Preparing your quiz...</p>
            </div>
        );
    }

    if (!story || !story.quiz || story.quiz.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center p-4">
                <div className="text-6xl mb-4">📝</div>
                <h2 className="text-xl font-bold">No Quiz Available yet!</h2>
                <p className="text-muted-foreground mt-2">This story doesn't have a quiz. Try another!</p>
                <Link href="/student/learn">
                    <Button className="mt-4">Back to Learning</Button>
                </Link>
            </div>
        );
    }

    const question = story.quiz[currentQ];

    const handleOptionClick = (index) => {
        if (isCorrect !== null) return;
        clearInterval(timerRef.current);

        setSelectedOpt(index);
        const correct = index === question.correct;
        setIsCorrect(correct);

        if (correct) {
            const baseXP = 10;
            const timeBonus = Math.floor(timeLeft / 3);
            const streakBonus = streak >= 2 ? Math.min(streak * 5, 25) : 0;
            const totalXP = baseXP + timeBonus + streakBonus;

            setScore(s => s + totalXP);
            setStreak(s => {
                const newStreak = s + 1;
                if (newStreak > maxStreak) setMaxStreak(newStreak);
                if (newStreak >= 3) {
                    setShowStreakBonus(true);
                    setTimeout(() => setShowStreakBonus(false), 2000);
                }
                return newStreak;
            });
        } else {
            setStreak(0);
            setPerfectStreak(false);
        }
    };

    const nextQuestion = () => {
        setSelectedOpt(null);
        setIsCorrect(null);
        setTimeLeft(30);
        if (currentQ < story.quiz.length - 1) {
            setCurrentQ(c => c + 1);
        } else {
            setShowResult(true);
        }
    };

    const getGrade = () => {
        const percentage = (score / (story.quiz.length * 35)) * 100;
        if (percentage >= 90) return { grade: "A+", color: "from-yellow-400 to-orange-500", emoji: "🏆" };
        if (percentage >= 80) return { grade: "A", color: "from-green-400 to-emerald-500", emoji: "⭐" };
        if (percentage >= 70) return { grade: "B", color: "from-blue-400 to-cyan-500", emoji: "👍" };
        if (percentage >= 60) return { grade: "C", color: "from-purple-400 to-pink-500", emoji: "📚" };
        return { grade: "D", color: "from-gray-400 to-gray-500", emoji: "💪" };
    };

    // Result Screen
    if (showResult) {
        const gradeInfo = getGrade();
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-[80vh] flex flex-col items-center justify-center p-4"
            >
                {/* Confetti */}
                {perfectStreak && (
                    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
                        {[...Array(50)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ y: -20, x: Math.random() * window.innerWidth }}
                                animate={{ y: window.innerHeight + 20, rotate: Math.random() * 720 }}
                                transition={{ duration: 3 + Math.random() * 2, ease: "linear" }}
                                className="absolute"
                                style={{ left: Math.random() * 100 + '%' }}
                            >
                                {['🎉', '⭐', '✨', '🎊', '🌟'][Math.floor(Math.random() * 5)]}
                            </motion.div>
                        ))}
                    </div>
                )}

                <ElectricBorder color="#fbbf24">
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 max-w-md w-full text-center space-y-6">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1, rotate: [0, -10, 10, 0] }}
                            transition={{ type: "spring", delay: 0.2 }}
                            className="relative"
                        >
                            <div className={`text-8xl mx-auto w-32 h-32 flex items-center justify-center rounded-full bg-gradient-to-br ${gradeInfo.color}`}>
                                {gradeInfo.emoji}
                            </div>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5 }}
                                className={`absolute -top-2 -right-2 text-3xl font-black text-white px-4 py-2 rounded-2xl bg-gradient-to-r ${gradeInfo.color} shadow-lg`}
                            >
                                {gradeInfo.grade}
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h1 className="text-3xl font-black mb-2">
                                {perfectStreak ? "🔥 Perfect Score!" : "Quiz Complete!"}
                            </h1>
                            <p className="text-muted-foreground">
                                {perfectStreak ? "You're on fire! Amazing work!" : "Great effort! Keep learning!"}
                            </p>
                        </motion.div>

                        {/* Stats Grid */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="grid grid-cols-2 gap-4"
                        >
                            <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl p-4">
                                <Zap className="h-6 w-6 text-yellow-600 mx-auto mb-1" />
                                <div className="text-2xl font-black text-yellow-600">{score}</div>
                                <div className="text-xs text-yellow-700">XP Earned</div>
                            </div>
                            <div className="bg-orange-100 dark:bg-orange-900/30 rounded-2xl p-4">
                                <Flame className="h-6 w-6 text-orange-600 mx-auto mb-1" />
                                <div className="text-2xl font-black text-orange-600">{maxStreak}</div>
                                <div className="text-xs text-orange-700">Max Streak</div>
                            </div>
                            <div className="bg-blue-100 dark:bg-blue-900/30 rounded-2xl p-4">
                                <Clock className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                                <div className="text-2xl font-black text-blue-600">{Math.floor(totalTime / 60)}:{(totalTime % 60).toString().padStart(2, '0')}</div>
                                <div className="text-xs text-blue-700">Total Time</div>
                            </div>
                            <div className="bg-green-100 dark:bg-green-900/30 rounded-2xl p-4">
                                <Target className="h-6 w-6 text-green-600 mx-auto mb-1" />
                                <div className="text-2xl font-black text-green-600">{story.quiz.length}</div>
                                <div className="text-xs text-green-700">Questions</div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="space-y-3"
                        >
                            <Link href="/student/learn">
                                <CoolMode>
                                    <Button className="w-full h-14 text-lg bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl">
                                        <Sparkles className="mr-2 h-5 w-5" /> Continue Learning
                                    </Button>
                                </CoolMode>
                            </Link>
                            <div className="flex gap-3">
                                <Button variant="outline" className="flex-1" onClick={() => window.location.reload()}>
                                    <RotateCcw className="mr-2 h-4 w-4" /> Retry
                                </Button>
                                <Link href="/student" className="flex-1">
                                    <Button variant="outline" className="w-full">
                                        <Home className="mr-2 h-4 w-4" /> Home
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </ElectricBorder>
            </motion.div>
        );
    }

    return (
        <div className="max-w-lg mx-auto py-6 px-4 h-full flex flex-col">
            {/* Streak Bonus Popup */}
            <AnimatePresence>
                {showStreakBonus && (
                    <motion.div
                        initial={{ scale: 0, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0, y: -50 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-3xl shadow-2xl font-bold text-2xl flex items-center gap-3"
                    >
                        <Flame className="h-8 w-8" /> {streak}x Streak! 🔥
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Top Stats Bar */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <Badge className="bg-yellow-100 text-yellow-700 border-0 gap-1 px-3 py-1">
                        <Zap className="h-3 w-3" /> {score} XP
                    </Badge>
                    {streak >= 2 && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex items-center gap-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 px-3 py-1 rounded-full text-sm font-bold"
                        >
                            <Flame className="h-3 w-3" /> {streak}x
                        </motion.div>
                    )}
                </div>

                {/* Timer */}
                <motion.div
                    animate={{ scale: timeLeft <= 10 ? [1, 1.1, 1] : 1 }}
                    transition={{ duration: 0.5, repeat: timeLeft <= 10 ? Infinity : 0 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold ${timeLeft <= 10
                        ? 'bg-red-100 text-red-600 dark:bg-red-900/30'
                        : timeLeft <= 20
                            ? 'bg-yellow-100 text-yellow-600'
                            : 'bg-blue-100 text-blue-600'
                        }`}
                >
                    <Clock className="h-4 w-4" />
                    {timeLeft}s
                </motion.div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6 space-y-2">
                <div className="flex justify-between text-xs font-medium text-muted-foreground">
                    <span>Question {currentQ + 1} of {story.quiz.length}</span>
                </div>
                <div className="h-3 w-full bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentQ + 1) / story.quiz.length) * 100}%` }}
                        transition={{ type: "spring", stiffness: 50 }}
                    />
                </div>
                {/* Question dots */}
                <div className="flex justify-center gap-2 pt-2">
                    {story.quiz.map((_, idx) => (
                        <div
                            key={idx}
                            className={`w-3 h-3 rounded-full transition-all ${idx < currentQ
                                ? 'bg-green-500'
                                : idx === currentQ
                                    ? 'bg-primary w-6'
                                    : 'bg-gray-300 dark:bg-zinc-700'
                                }`}
                        />
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQ}
                    initial={{ x: 50, opacity: 0, scale: 0.95 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    exit={{ x: -50, opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", bounce: 0.2 }}
                    className="flex-1 flex flex-col"
                >
                    <Card className="border-2 shadow-xl dark:bg-zinc-800/80 rounded-3xl overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-zinc-800 dark:to-zinc-900 pb-6">
                            <CardTitle className="text-xl leading-relaxed text-center">{question.question}</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-3 p-6">
                            {question.options.map((opt, idx) => {
                                let bgColor = "bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800";
                                let borderColor = "border-gray-200 dark:border-zinc-700";
                                let textColor = "";

                                if (isCorrect !== null) {
                                    if (idx === question.correct) {
                                        bgColor = "bg-green-100 dark:bg-green-900/30";
                                        borderColor = "border-green-500";
                                        textColor = "text-green-700 dark:text-green-400";
                                    } else if (idx === selectedOpt && !isCorrect) {
                                        bgColor = "bg-red-100 dark:bg-red-900/30";
                                        borderColor = "border-red-500";
                                        textColor = "text-red-700 dark:text-red-400";
                                    }
                                } else if (idx === selectedOpt) {
                                    borderColor = "border-primary";
                                    bgColor = "bg-primary/5";
                                }

                                return (
                                    <motion.button
                                        key={idx}
                                        whileHover={isCorrect === null ? { scale: 1.02 } : {}}
                                        whileTap={isCorrect === null ? { scale: 0.98 } : {}}
                                        onClick={() => handleOptionClick(idx)}
                                        disabled={isCorrect !== null}
                                        className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${bgColor} ${borderColor} ${textColor} flex items-center gap-3`}
                                    >
                                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isCorrect !== null && idx === question.correct
                                            ? 'bg-green-500 text-white'
                                            : isCorrect !== null && idx === selectedOpt && !isCorrect
                                                ? 'bg-red-500 text-white'
                                                : 'bg-gray-100 dark:bg-zinc-800 text-gray-600'
                                            }`}>
                                            {String.fromCharCode(65 + idx)}
                                        </span>
                                        <span className="flex-1 font-medium">{opt}</span>
                                        {isCorrect !== null && idx === question.correct && <CheckCircle className="h-5 w-5 text-green-500" />}
                                        {isCorrect !== null && idx === selectedOpt && !isCorrect && <XCircle className="h-5 w-5 text-red-500" />}
                                    </motion.button>
                                );
                            })}
                        </CardContent>
                        <CardFooter className="p-6 pt-0">
                            {isCorrect !== null && (
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="w-full space-y-3"
                                >
                                    <div className={`text-center p-3 rounded-xl ${isCorrect
                                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                        : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                                        }`}>
                                        {isCorrect ? (
                                            <span className="font-bold flex items-center justify-center gap-2">
                                                <CheckCircle className="h-4 w-4" /> Correct! +{10 + Math.floor(timeLeft / 3) + (streak >= 2 ? Math.min(streak * 5, 25) : 0)} XP
                                            </span>
                                        ) : (
                                            <span className="font-bold flex items-center justify-center gap-2">
                                                <XCircle className="h-4 w-4" /> {timeLeft === 0 ? "Time's up!" : "Not quite!"} The answer was: {question.options[question.correct]}
                                            </span>
                                        )}
                                    </div>
                                    <CoolMode>
                                        <Button className="w-full h-14 rounded-2xl text-lg" onClick={nextQuestion}>
                                            {currentQ < story.quiz.length - 1 ? "Next Question" : "See Results!"}
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </CoolMode>
                                </motion.div>
                            )}
                        </CardFooter>
                    </Card>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
