import React, { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Loader2, Search, BookOpen, Clock, Signal, Zap, Sparkles, Lock, CheckCircle, Trophy, Flame, Star, Play, GraduationCap, Target, Award, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

// Mock data for when API is unavailable
const mockStories = [
    {
        id: 1,
        title: "The Magic of Photosynthesis",
        description: "Discover how plants make their own food using sunlight, water, and air!",
        subject: "Science",
        topic: "Biology",
        difficulty: "Easy",
        grade: "Grade 3-5",
        readTime: "5 min",
        xp: 50,
        coverImage: "🌱",
        content: ["p1", "p2", "p3", "p4", "p5"],
        quiz: [1, 2, 3]
    },
    {
        id: 2,
        title: "Building with Code",
        description: "Learn the basics of programming and create your first fun project!",
        subject: "Technology",
        topic: "Programming",
        difficulty: "Medium",
        grade: "Grade 4-6",
        readTime: "8 min",
        xp: 75,
        coverImage: "💻",
        content: ["p1", "p2", "p3", "p4"],
        quiz: [1, 2]
    },
    {
        id: 3,
        title: "Forces and Motion",
        description: "Explore how things move and what makes them speed up or slow down!",
        subject: "Science",
        topic: "Physics",
        difficulty: "Medium",
        grade: "Grade 5-7",
        readTime: "7 min",
        xp: 60,
        coverImage: "🎢",
        content: ["p1", "p2", "p3", "p4", "p5", "p6"],
        quiz: [1, 2, 3, 4]
    },
    {
        id: 4,
        title: "Number Patterns Adventure",
        description: "Find hidden patterns in numbers and become a math detective!",
        subject: "Mathematics",
        topic: "Algebra",
        difficulty: "Easy",
        grade: "Grade 2-4",
        readTime: "4 min",
        xp: 40,
        coverImage: "🔢",
        content: ["p1", "p2", "p3"],
        quiz: [1, 2]
    },
    {
        id: 5,
        title: "Journey Through Space",
        description: "Blast off on an adventure through our solar system!",
        subject: "Science",
        topic: "Astronomy",
        difficulty: "Hard",
        grade: "Grade 6-8",
        readTime: "10 min",
        xp: 100,
        coverImage: "🚀",
        content: ["p1", "p2", "p3", "p4", "p5", "p6", "p7"],
        quiz: [1, 2, 3, 4, 5]
    },
    {
        id: 6,
        title: "Simple Machines",
        description: "Learn how levers, pulleys, and wheels make work easier!",
        subject: "Engineering",
        topic: "Mechanics",
        difficulty: "Medium",
        grade: "Grade 4-6",
        readTime: "6 min",
        xp: 55,
        coverImage: "⚙️",
        content: ["p1", "p2", "p3", "p4"],
        quiz: [1, 2, 3]
    }
];

// Mock teacher assigned tasks
const teacherAssignedTasks = [
    {
        id: 101,
        title: "Photosynthesis Quiz",
        type: "quiz",
        teacher: "Dr. Sharma",
        dueDate: "Today",
        subject: "Science",
        xp: 100,
        status: "pending",
        priority: "high"
    },
    {
        id: 102,
        title: "Simple Machines Reading",
        type: "story",
        teacher: "Dr. Sharma",
        dueDate: "Tomorrow",
        subject: "Engineering",
        xp: 75,
        status: "pending",
        priority: "medium"
    },
    {
        id: 103,
        title: "Number Patterns Practice",
        type: "practice",
        teacher: "Mrs. Gupta",
        dueDate: "Jan 15",
        subject: "Mathematics",
        xp: 50,
        status: "completed",
        priority: "low"
    }
];

export default function StoryList() {
    const { data: stories, isLoading, error } = useQuery({
        queryKey: ['stories'],
        queryFn: () => api.get('/stories'),
        retry: false
    });

    const { t } = useLanguage();
    const [search, setSearch] = useState("");
    const [filterSubject, setFilterSubject] = useState("All");
    const [hoveredCard, setHoveredCard] = useState(null);
    const [activeTab, setActiveTab] = useState("library"); // 'library' or 'assigned'

    // Use mock data if API fails
    const storyData = stories || mockStories;

    // Mock completed stories
    const completedStories = [1, 4];

    if (isLoading) {
        return (
            <div className="flex h-[60vh] items-center justify-center flex-col gap-8 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black rounded-3xl mx-4">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="p-4 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl"
                >
                    <BookOpen className="h-12 w-12 text-white" />
                </motion.div>
                <motion.p
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-orange-400/70 font-medium text-sm"
                >
                    {t('preparingAdventures')}
                </motion.p>
            </div>
        );
    }


    const filteredStories = storyData.filter(story => {
        const matchesSearch = story.title.toLowerCase().includes(search.toLowerCase()) ||
            story.topic.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filterSubject === "All" || story.subject === filterSubject;
        return matchesSearch && matchesFilter;
    });

    const subjects = ["All", ...new Set(storyData.map(s => s.subject))];

    const subjectIcons = {
        "Science": "🔬",
        "Technology": "💻",
        "Engineering": "⚙️",
        "Mathematics": "📐"
    };

    const subjectColors = {
        "Science": "from-purple-500 to-fuchsia-600",
        "Technology": "from-blue-500 to-cyan-600",
        "Engineering": "from-orange-500 to-red-600",
        "Mathematics": "from-emerald-500 to-teal-600"
    };

    const difficultyColors = {
        "Easy": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
        "Medium": "bg-amber-500/20 text-amber-400 border-amber-500/30",
        "Hard": "bg-red-500/20 text-red-400 border-red-500/30"
    };

    const container = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.08 } }
    };

    const item = {
        hidden: { y: 20, opacity: 0, scale: 0.95 },
        show: { y: 0, opacity: 1, scale: 1 }
    };

    return (
        <div className="space-y-8 pb-24">
            {/* Header */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="space-y-6"
            >
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <motion.div
                            animate={{ rotate: [0, -10, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                            className="p-3 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl shadow-lg shadow-orange-500/30"
                        >
                            <BookOpen className="h-8 w-8 text-white" />
                        </motion.div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">{t('learningLibrary')}</h1>
                            <p className="text-white/50">{t('browseStories')}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 bg-gradient-to-r from-orange-500/20 to-amber-500/20 px-4 py-2 rounded-2xl border border-orange-500/30">
                        <Trophy className="h-5 w-5 text-orange-400" />
                        <div>
                            <div className="text-sm font-bold text-orange-400">{completedStories.length}/{storyData.length} {t('completed')}</div>
                            <div className="text-xs text-orange-400/60">{t('keepGoing')}</div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2">
                    <Button
                        onClick={() => setActiveTab("library")}
                        className={`rounded-xl px-6 py-2 transition-all ${activeTab === "library"
                            ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30"
                            : "bg-zinc-800 text-white/60 hover:bg-zinc-700"
                            }`}
                    >
                        <BookOpen className="h-4 w-4 mr-2" />
                        {t('storyLibrary')}
                    </Button>
                    <Button
                        onClick={() => setActiveTab("assigned")}
                        className={`rounded-xl px-6 py-2 transition-all relative ${activeTab === "assigned"
                            ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30"
                            : "bg-zinc-800 text-white/60 hover:bg-zinc-700"
                            }`}
                    >
                        <GraduationCap className="h-4 w-4 mr-2" />
                        {t('fromTeachers')}
                        <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-[10px] font-bold flex items-center justify-center border-2 border-zinc-900">
                            {teacherAssignedTasks.filter(t => t.status === 'pending').length}
                        </span>
                    </Button>
                </div>
            </motion.div>

            {/* Teacher Assigned Tasks Section */}
            {activeTab === "assigned" && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    <div className="grid gap-4">
                        {teacherAssignedTasks.map((task, idx) => (
                            <motion.div
                                key={task.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ scale: 1.01, x: 5 }}
                                className={`relative p-5 rounded-2xl border transition-all cursor-pointer ${task.status === 'completed'
                                    ? 'bg-emerald-500/10 border-emerald-500/30'
                                    : task.priority === 'high'
                                        ? 'bg-red-500/10 border-red-500/30'
                                        : 'bg-zinc-900 border-orange-500/20 hover:border-orange-500/50'
                                    }`}
                            >
                                {/* Priority indicator */}
                                <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl ${task.priority === 'high' ? 'bg-red-500' :
                                    task.priority === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
                                    }`} />

                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-xl ${task.type === 'quiz' ? 'bg-purple-500/20' :
                                            task.type === 'story' ? 'bg-blue-500/20' : 'bg-orange-500/20'
                                            }`}>
                                            {task.type === 'quiz' ? <Target className="h-5 w-5 text-purple-400" /> :
                                                task.type === 'story' ? <BookOpen className="h-5 w-5 text-blue-400" /> :
                                                    <FileText className="h-5 w-5 text-orange-400" />}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-white">{task.title}</h3>
                                                {task.status === 'completed' && (
                                                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                                                )}
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-white/50">
                                                <span className="flex items-center gap-1">
                                                    <GraduationCap className="h-3 w-3" />
                                                    {task.teacher}
                                                </span>
                                                <span>•</span>
                                                <span>{task.subject}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <Badge className={`${task.dueDate === 'Today' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                                                task.dueDate === 'Tomorrow' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                                                    'bg-zinc-800 text-white/60'
                                                }`}>
                                                {t('due')}: {task.dueDate}
                                            </Badge>
                                            <div className="text-xs text-amber-400 mt-1 flex items-center gap-1 justify-end">
                                                <Zap className="h-3 w-3" />
                                                +{task.xp} XP
                                            </div>
                                        </div>

                                        {task.status !== 'completed' ? (
                                            <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 rounded-xl">
                                                {t('start')}
                                                <Play className="h-4 w-4 ml-1" />
                                            </Button>
                                        ) : (
                                            <Button variant="outline" className="border-emerald-500/30 text-emerald-400 rounded-xl">
                                                <CheckCircle className="h-4 w-4 mr-1" />
                                                {t('done')}
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {teacherAssignedTasks.length === 0 && (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">🎉</div>
                            <h3 className="text-xl font-bold text-white">{t('allCaughtUp')}</h3>
                            <p className="text-white/50 mt-2">{t('noPendingAssignments')}</p>
                        </div>
                    )}
                </motion.div>
            )}

            {/* Library Content */}
            {activeTab === "library" && (
                <>
                    {/* Search & Filters */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                            <Input
                                placeholder={t('searchPlaceholder')}
                                className="pl-12 h-12 rounded-2xl bg-zinc-900 border-orange-500/20 text-white placeholder:text-white/30 focus:border-orange-500"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        {/* Subject Filters */}
                        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
                            {subjects.map(subject => (
                                <motion.div key={subject} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button
                                        variant={filterSubject === subject ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setFilterSubject(subject)}
                                        className={`whitespace-nowrap rounded-full px-4 h-10 gap-2 ${filterSubject === subject
                                            ? 'bg-gradient-to-r from-orange-500 to-amber-500 border-0 shadow-lg shadow-orange-500/30'
                                            : 'bg-zinc-800 border-zinc-700 text-white/60 hover:bg-zinc-700 hover:text-white'
                                            }`}
                                    >
                                        {subject !== "All" && <span>{subjectIcons[subject]}</span>}
                                        {subject}
                                    </Button>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Featured Story Banner */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-600 via-amber-600 to-orange-700 p-1"
                    >
                        <div className="bg-gradient-to-br from-zinc-900/95 via-zinc-950/95 to-black/95 rounded-3xl p-8 relative overflow-hidden">
                            {/* Animated particles */}
                            <div className="absolute inset-0 overflow-hidden">
                                {[...Array(6)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{
                                            y: [0, -20, 0],
                                            opacity: [0.3, 0.7, 0.3]
                                        }}
                                        transition={{
                                            duration: 3 + i,
                                            repeat: Infinity,
                                            delay: i * 0.5
                                        }}
                                        className="absolute text-3xl"
                                        style={{
                                            left: `${10 + i * 15}%`,
                                            top: `${20 + (i % 3) * 25}%`,
                                        }}
                                    >
                                        {['✨', '🌟', '⭐', '💫', '🚀', '🎯'][i]}
                                    </motion.div>
                                ))}
                            </div>

                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="text-center md:text-left flex-1">
                                    <Badge className="mb-4 bg-gradient-to-r from-orange-400 to-amber-400 text-black font-bold border-0">
                                        ⭐ {t('featuredStory')}
                                    </Badge>
                                    <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                                        Journey Through Space
                                    </h2>
                                    <p className="text-orange-200/80 text-sm md:text-base max-w-md mb-4">
                                        Blast off on an adventure through our solar system! Meet the planets and learn amazing facts about space.
                                    </p>
                                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                        <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                                            <Zap className="h-3 w-3 mr-1" /> 100 XP
                                        </Badge>
                                        <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                                            <Clock className="h-3 w-3 mr-1" /> 10 min
                                        </Badge>
                                        <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                                            <BookOpen className="h-3 w-3 mr-1" /> 7 pages
                                        </Badge>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center gap-4">
                                    <motion.div
                                        animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                                        transition={{ duration: 4, repeat: Infinity }}
                                        className="text-8xl"
                                    >
                                        🚀
                                    </motion.div>
                                    <Link href="/student/stories/5">
                                        <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-orange-500/30">
                                            <Sparkles className="h-4 w-4 mr-2" />
                                            {t('explore')}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Stories Grid */}
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {filteredStories.map((story, idx) => {
                            const isCompleted = completedStories.includes(story.id);
                            const gradientColor = subjectColors[story.subject] || "from-gray-500 to-gray-600";

                            return (
                                <motion.div
                                    key={story.id}
                                    variants={item}
                                    onHoverStart={() => setHoveredCard(story.id)}
                                    onHoverEnd={() => setHoveredCard(null)}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    className="relative"
                                >
                                    {isCompleted && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute -top-3 -right-3 z-20 bg-emerald-500 text-white p-2 rounded-full shadow-lg border-4 border-zinc-900"
                                        >
                                            <CheckCircle className="h-5 w-5" />
                                        </motion.div>
                                    )}

                                    <Card className={`h-full flex flex-col overflow-hidden transition-all duration-300 bg-zinc-900 border-zinc-800 hover:border-orange-500/50 ${isCompleted
                                        ? 'ring-2 ring-emerald-500/50'
                                        : 'hover:shadow-2xl hover:shadow-orange-500/10'
                                        }`}>
                                        {/* Card Header with Gradient */}
                                        <CardHeader className="p-0">
                                            <div className={`h-40 bg-gradient-to-br ${gradientColor} p-5 flex flex-col justify-between relative overflow-hidden`}>
                                                {/* Floating Subject Icon */}
                                                <motion.div
                                                    animate={hoveredCard === story.id ? {
                                                        y: [-5, 5, -5],
                                                        rotate: [0, 5, -5, 0]
                                                    } : {}}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                    className="text-6xl opacity-30 absolute bottom-2 right-2"
                                                >
                                                    {subjectIcons[story.subject]}
                                                </motion.div>

                                                {/* Top Row */}
                                                <div className="flex justify-between items-start relative z-10">
                                                    <Badge className="bg-white/90 text-black shadow-sm backdrop-blur-sm hover:bg-white">
                                                        {story.grade || "Grade 1-3"}
                                                    </Badge>
                                                    <Badge className={`${difficultyColors[story.difficulty]} border-0`}>
                                                        {story.difficulty}
                                                    </Badge>
                                                </div>

                                                {/* Main Emoji */}
                                                <motion.div
                                                    animate={hoveredCard === story.id ? { scale: [1, 1.1, 1] } : {}}
                                                    transition={{ duration: 0.5 }}
                                                    className="text-7xl drop-shadow-xl self-center relative z-10"
                                                >
                                                    {story.coverImage}
                                                </motion.div>
                                            </div>
                                        </CardHeader>

                                        <CardContent className="flex-1 p-5 pt-6 space-y-4 bg-zinc-900">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-bold text-orange-400 tracking-wider uppercase bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/20">
                                                        {story.subject}
                                                    </span>
                                                </div>
                                                <CardTitle className="text-lg leading-tight line-clamp-2 text-white">{story.title}</CardTitle>
                                            </div>

                                            <p className="text-sm text-white/50 line-clamp-2 leading-relaxed">
                                                {story.description}
                                            </p>

                                            <div className="flex gap-4 text-xs font-medium text-white/40">
                                                <div className="flex items-center gap-1.5 bg-zinc-800 px-2 py-1 rounded-full">
                                                    <Clock className="h-3.5 w-3.5" /> {story.readTime || `5 ${t('min')}`}
                                                </div>
                                                <div className="flex items-center gap-1.5 bg-zinc-800 px-2 py-1 rounded-full">
                                                    <BookOpen className="h-3.5 w-3.5" /> {story.content?.length || 5} {t('pages')}
                                                </div>
                                            </div>
                                        </CardContent>

                                        <CardFooter className="p-5 pt-0 flex justify-between items-center bg-zinc-900">
                                            <div className="flex items-center gap-2">
                                                <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 shadow-lg shadow-orange-500/20 gap-1">
                                                    <Zap className="h-3 w-3" /> {story.xp} XP
                                                </Badge>
                                                {story.quiz && story.quiz.length > 0 && (
                                                    <Badge variant="outline" className="gap-1 border-orange-500/30 text-orange-400">
                                                        <Star className="h-3 w-3" /> {t('quiz')}
                                                    </Badge>
                                                )}
                                            </div>

                                            <Link href={`/student/stories/${story.id}`}>
                                                <Button
                                                    size="sm"
                                                    className={`rounded-full px-5 gap-2 ${isCompleted
                                                        ? 'bg-emerald-500 hover:bg-emerald-600'
                                                        : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600'
                                                        }`}
                                                >
                                                    {isCompleted ? (
                                                        <>{t('replay')} <Play className="h-3 w-3" /></>
                                                    ) : (
                                                        <>{t('start')} <Sparkles className="h-3 w-3" /></>
                                                    )}
                                                </Button>
                                            </Link>
                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* Empty State */}
                    {filteredStories.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-20"
                        >
                            <div className="text-8xl mb-4">🔍</div>
                            <h3 className="text-xl font-bold text-white">{t('noStoriesFound')}</h3>
                            <p className="text-white/50 mt-2">{t('adjustFilters')}</p>
                            <Button
                                variant="outline"
                                className="mt-4 border-orange-500/30 text-orange-400"
                                onClick={() => { setSearch(""); setFilterSubject("All"); }}
                            >
                                {t('clearFilters')}
                            </Button>
                        </motion.div>
                    )}
                </>
            )}
        </div>
    );
}
