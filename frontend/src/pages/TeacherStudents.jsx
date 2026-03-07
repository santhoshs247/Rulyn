import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users, Search, Filter, TrendingUp, TrendingDown, Star, BookOpen,
    Clock, Target, Zap, MoreVertical, ChevronRight, MessageCircle,
    Award, Activity, Heart, X
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "../contexts/LanguageContext";

// Student Journey Node - detailed view
const StudentJourneyCard = ({ student, onClose, t }) => {
    const journeyEvents = [
        { type: "story", title: "Completed: How Plants Make Food", xp: 50, time: "Today, 10:30 AM" },
        { type: "quiz", title: "Physics Quiz - Score: 95%", xp: 100, time: "Today, 9:15 AM" },
        { type: "milestone", title: "Reached 1000 XP!", xp: 0, time: "Yesterday" },
        { type: "story", title: "Started: Chemical Reactions", xp: 20, time: "Yesterday" },
        { type: "streak", title: "7-Day Learning Streak!", xp: 50, time: "2 days ago" }
    ];

    const getEventIcon = (type) => {
        switch (type) {
            case "story": return BookOpen;
            case "quiz": return Target;
            case "milestone": return Award;
            case "streak": return Zap;
            default: return Activity;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl overflow-hidden"
            >
                {/* Header */}
                <div className={`p-6 bg-gradient-to-r ${student.color} relative`}>
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30"
                    >
                        <X className="h-4 w-4 text-white" />
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-4xl">
                            {student.avatar}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">{student.name}</h2>
                            <p className="text-white/70">Grade {student.grade} • {student.subject}</p>
                            <div className="flex gap-2 mt-2">
                                <Badge className="bg-white/20 text-white border-0">
                                    <Zap className="h-3 w-3 mr-1" /> {student.xp} XP
                                </Badge>
                                <Badge className="bg-white/20 text-white border-0">
                                    🔥 {student.streak} {t("timeDay") || "Day"} {t("streak")}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 divide-x divide-white/10 border-b border-white/10">
                    {[
                        { label: t("stories"), value: student.storiesRead },
                        { label: t("quizzes"), value: student.quizzesTaken },
                        { label: t("score"), value: `${student.avgScore}%` }
                    ].map((stat, i) => (
                        <div key={i} className="p-4 text-center">
                            <div className="text-2xl font-bold text-white">{stat.value}</div>
                            <div className="text-xs text-white/50">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Journey Timeline */}
                <div className="p-6">
                    <h3 className="text-sm font-semibold text-white/80 mb-4">{t("studentsSubtitle") || "Learning Journey"}</h3>
                    <div className="space-y-4">
                        {journeyEvents.map((event, i) => {
                            const Icon = getEventIcon(event.type);
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-start gap-3"
                                >
                                    <div className={`p-2 rounded-lg ${event.type === 'milestone' ? 'bg-yellow-500/20' :
                                        event.type === 'streak' ? 'bg-orange-500/20' :
                                            'bg-indigo-500/20'
                                        }`}>
                                        <Icon className={`h-4 w-4 ${event.type === 'milestone' ? 'text-yellow-400' :
                                            event.type === 'streak' ? 'text-orange-400' :
                                                'text-indigo-400'
                                            }`} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-white">{event.title}</p>
                                        <p className="text-xs text-white/40">{event.time}</p>
                                    </div>
                                    {event.xp > 0 && (
                                        <span className="text-xs font-medium text-emerald-400">+{event.xp} XP</span>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Actions */}
                <div className="p-4 border-t border-white/10 flex gap-3">
                    <Button className="flex-1 rounded-xl bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        {t("sendMessage")}
                    </Button>
                    <Button className="flex-1 rounded-xl bg-white/5 text-white/70 hover:bg-white/10">
                        {t("viewProfile")}
                    </Button>
                </div>
            </motion.div>
        </motion.div>
    );
};

const TeacherStudents = () => {
    const { t } = useTranslation();
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [selectedStudent, setSelectedStudent] = useState(null);

    const students = [
        { id: 1, name: "Priya Kumar", avatar: "👧", grade: 8, subject: "Science", xp: 2450, streak: 12, storiesRead: 24, quizzesTaken: 18, avgScore: 92, status: "active", trend: "up", color: "from-pink-500 to-rose-600" },
        { id: 2, name: "Arjun Mehta", avatar: "👦", grade: 8, subject: "Science", xp: 3200, streak: 30, storiesRead: 32, quizzesTaken: 25, avgScore: 95, status: "active", trend: "up", color: "from-blue-500 to-cyan-600" },
        { id: 3, name: "Sneha Patel", avatar: "👧", grade: 8, subject: "Science", xp: 1800, streak: 5, storiesRead: 18, quizzesTaken: 12, avgScore: 78, status: "needs-support", trend: "down", color: "from-purple-500 to-pink-600" },
        { id: 4, name: "Rahul Sharma", avatar: "👦", grade: 8, subject: "Science", xp: 2100, streak: 8, storiesRead: 20, quizzesTaken: 15, avgScore: 85, status: "active", trend: "up", color: "from-emerald-500 to-green-600" },
        { id: 5, name: "Anita Devi", avatar: "👧", grade: 8, subject: "Science", xp: 2800, streak: 15, storiesRead: 28, quizzesTaken: 22, avgScore: 90, status: "rising", trend: "up", color: "from-orange-500 to-amber-600" },
        { id: 6, name: "Vikram Bose", avatar: "👦", grade: 8, subject: "Science", xp: 1200, streak: 0, storiesRead: 10, quizzesTaken: 6, avgScore: 65, status: "inactive", trend: "down", color: "from-gray-500 to-gray-600" },
        { id: 7, name: "Maya Roy", avatar: "👧", grade: 8, subject: "Science", xp: 2650, streak: 18, storiesRead: 26, quizzesTaken: 20, avgScore: 88, status: "rising", trend: "up", color: "from-violet-500 to-purple-600" },
        { id: 8, name: "Kiran Thakur", avatar: "👦", grade: 8, subject: "Science", xp: 1950, streak: 7, storiesRead: 19, quizzesTaken: 14, avgScore: 82, status: "active", trend: "up", color: "from-teal-500 to-cyan-600" }
    ];

    const getStatusBadge = (status) => {
        switch (status) {
            case "active":
                return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">{t("active")}</Badge>;
            case "rising":
                return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30"><Star className="h-3 w-3 mr-1" />{t("rising")}</Badge>;
            case "needs-support":
                return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30"><Heart className="h-3 w-3 mr-1" />{t("legendNeedsSupport") || "Needs Support"}</Badge>;
            case "inactive":
                return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">{t("inactive") || "Inactive"}</Badge>;
            default:
                return null;
        }
    };

    const filteredStudents = students.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === "all" || student.status === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">{t("studentsTitle")}</h1>
                    <p className="text-indigo-300/60">{t("studentsSubtitle")}</p>
                </div>

                {/* Summary stats */}
                <div className="flex gap-4">
                    <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                        <span className="text-emerald-400 font-bold">6</span>
                        <span className="text-emerald-400/60 text-sm ml-1">{t("active")}</span>
                    </div>
                    <div className="px-4 py-2 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                        <span className="text-yellow-400 font-bold">2</span>
                        <span className="text-yellow-400/60 text-sm ml-1">{t("rising")}</span>
                    </div>
                    <div className="px-4 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20">
                        <span className="text-orange-400 font-bold">1</span>
                        <span className="text-orange-400/60 text-sm ml-1">{t("legendNeedsSupport") || "Needs Support"}</span>
                    </div>
                </div>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <Input
                        placeholder={t("searchStudents") || "Search students..."}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-11 h-11 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl"
                    />
                </div>
                <div className="flex gap-2">
                    {["all", "active", "rising", "needs-support", "inactive"].map((f) => (
                        <Button
                            key={f}
                            variant="ghost"
                            size="sm"
                            onClick={() => setFilter(f)}
                            className={`rounded-xl capitalize ${filter === f
                                ? 'bg-indigo-500/20 text-indigo-300'
                                : 'text-white/50 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {/* Simple mapping for filter labels */}
                            {f === 'all' ? (t("viewAll") || "All") :
                                f === 'active' ? t("active") :
                                    f === 'rising' ? t("rising") :
                                        f === 'needs-support' ? (t("legendNeedsSupport") || "Needs Support") :
                                            f === 'inactive' ? (t("inactive") || "Inactive") : f}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Students Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredStudents.map((student, i) => (
                    <motion.div
                        key={student.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        onClick={() => setSelectedStudent(student)}
                        className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 cursor-pointer group"
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <motion.div
                                    animate={student.status === 'active' || student.status === 'rising' ? {
                                        boxShadow: ["0 0 0 0 rgba(99, 102, 241, 0)", "0 0 0 8px rgba(99, 102, 241, 0.2)", "0 0 0 0 rgba(99, 102, 241, 0)"]
                                    } : {}}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${student.color} flex items-center justify-center text-2xl`}
                                >
                                    {student.avatar}
                                </motion.div>
                                <div>
                                    <h3 className="font-semibold text-white group-hover:text-indigo-300 transition-colors">{student.name}</h3>
                                    <p className="text-xs text-white/50">Grade {student.grade}</p>
                                </div>
                            </div>
                            <div className={`flex items-center ${student.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                                {student.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-2 mb-4">
                            <div className="p-2 rounded-lg bg-white/5 text-center">
                                <div className="text-sm font-bold text-white">{student.storiesRead}</div>
                                <div className="text-[10px] text-white/40">{t("stories")}</div>
                            </div>
                            <div className="p-2 rounded-lg bg-white/5 text-center">
                                <div className="text-sm font-bold text-white">{student.avgScore}%</div>
                                <div className="text-[10px] text-white/40">{t("score")}</div>
                            </div>
                            <div className="p-2 rounded-lg bg-white/5 text-center">
                                <div className="text-sm font-bold text-white">{student.streak}</div>
                                <div className="text-[10px] text-white/40">{t("streak")}</div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between">
                            {getStatusBadge(student.status)}
                            <ChevronRight className="h-4 w-4 text-white/30 group-hover:text-white/60 transition-colors" />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Student Journey Modal */}
            <AnimatePresence>
                {selectedStudent && (
                    <StudentJourneyCard
                        student={selectedStudent}
                        onClose={() => setSelectedStudent(null)}
                        t={t}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default TeacherStudents;
