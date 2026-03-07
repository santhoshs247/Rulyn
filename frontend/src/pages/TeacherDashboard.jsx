import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users, TrendingUp, BookOpen, Brain, Target, Sparkles,
    ChevronRight, Activity, Zap, Star, Heart, Clock, BarChart3,
    MessageCircle, Calendar, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "../contexts/LanguageContext";

// Floating Insight Card Component
const InsightCard = ({ insight, index, onClick }) => {
    const colors = {
        positive: "from-emerald-900/40 to-[#01030A] border-emerald-500/30 text-emerald-400",
        warning: "from-amber-900/40 to-[#01030A] border-amber-500/30 text-amber-400",
        info: "from-[#7A5C1D]/20 to-[#01030A] border-[#7A5C1D]/30 text-[#eec170]",
        celebration: "from-purple-900/40 to-[#01030A] border-purple-500/30 text-purple-400"
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: index * 0.15, type: "spring" }}
            whileHover={{ scale: 1.02, y: -5 }}
            onClick={onClick}
            className={`p-4 rounded-2xl backdrop-blur-xl bg-gradient-to-br ${colors[insight.type]} border cursor-pointer transition-all hover:bg-white/5`}
        >
            <div className="flex items-start gap-3">
                <div className="text-2xl">{insight.icon}</div>
                <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium leading-snug ${insight.type === 'info' ? 'text-[#eec170]' : 'text-white/90'}`}>{insight.message}</p>
                    <p className="text-xs text-white/40 mt-1">{insight.time}</p>
                </div>
            </div>
        </motion.div>
    );
};

// Energy Ring Component (visual analytics)
const EnergyRing = ({ value, label, color, size = 100 }) => {
    const circumference = 2 * Math.PI * 40;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
        <div className="flex flex-col items-center">
            <div className="relative" style={{ width: size, height: size }}>
                {/* Background ring */}
                <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-[#7A5C1D]/10"
                    />
                    <motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke={color}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                </svg>
                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-xl font-bold text-white"
                    >
                        {value}%
                    </motion.span>
                </div>
                {/* Glow effect */}
                <motion.div
                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full blur-xl"
                    style={{ backgroundColor: color, opacity: 0.15 }}
                />
            </div>
            <span className="text-xs text-[#7A5C1D] mt-2 text-center font-medium uppercase tracking-wide">{label}</span>
        </div>
    );
};

// Student Growth Node
const StudentNode = ({ student, onClick }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.15, zIndex: 10 }}
            onClick={onClick}
            className="relative cursor-pointer group"
        >
            <motion.div
                animate={student.active ? {
                    boxShadow: ["0 0 15px rgba(122, 92, 29, 0.4)", "0 0 30px rgba(122, 92, 29, 0.2)", "0 0 15px rgba(122, 92, 29, 0.4)"]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-xl border-2 ${student.active
                    ? 'bg-gradient-to-br from-[#7A5C1D] to-amber-800 border-[#eec170]'
                    : 'bg-white/5 border-white/10'
                    }`}
            >
                {student.avatar}
            </motion.div>
            {/* Tooltip */}
            <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                <span className="text-[10px] bg-[#1a1205] border border-[#7A5C1D]/30 px-2 py-1 rounded text-[#eec170]">{student.name}</span>
            </div>
            {/* Growth indicator */}
            {student.growth > 0 && (
                <div className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-500 border border-[#01030A] flex items-center justify-center">
                    <TrendingUp className="w-2.5 h-2.5 text-white" />
                </div>
            )}
        </motion.div>
    );
};

const TeacherDashboard = () => {
    const { t, language, setLanguage, languages } = useLanguage();
    const [selectedInsight, setSelectedInsight] = useState(null);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        teacher: null,
        messages: [],
        analytics: null
    });

    // Fetch Data from MongoDB
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/teacher/dashboard?email=teacher@rulyn.com');
                const result = await res.json();
                setData(result);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch dashboard data", err);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleLanguageChange = async (key) => {
        setLanguage(key);
        try {
            await fetch('http://localhost:3000/api/teacher/settings/language', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: 'teacher@rulyn.com', language: key })
            });
            setData(prev => ({ ...prev, teacher: { ...prev.teacher, languageProfile: { ...prev.teacher.languageProfile, primary: key } } }));
        } catch (err) {
            console.error("Failed to update language", err);
        }
    };

    // Mock data for things not yet in DB or to supplement demo
    const insights = [
        { id: 1, type: "positive", icon: "📈", message: t("insight1") || "Class understanding improved by 15% this week!", time: "2 hours ago" },
        { id: 2, type: "celebration", icon: "⭐", message: t("insight2") || "Priya Kumar reached a new milestone in Mathematics", time: "3 hours ago" },
        { id: 3, type: "info", icon: "💡", message: t("insight3") || "Math engagement peaks after interactive games", time: "5 hours ago" },
        { id: 4, type: "warning", icon: "📚", message: t("insight4") || "Biology concepts may need reinforcement", time: "Yesterday" }
    ];

    const students = [
        { id: 1, name: "Priya K.", avatar: "👧", active: true, growth: 15 },
        { id: 2, name: "Arjun M.", avatar: "👦", active: true, growth: 8 },
        { id: 3, name: "Sneha P.", avatar: "👧", active: false, growth: 0 },
        { id: 4, name: "Rahul S.", avatar: "👦", active: true, growth: 12 },
        { id: 5, name: "Anita D.", avatar: "👧", active: true, growth: 20 },
        { id: 6, name: "Vikram B.", avatar: "👦", active: false, growth: 5 },
        { id: 7, name: "Maya R.", avatar: "👧", active: true, growth: 18 },
        { id: 8, name: "Kiran T.", avatar: "👦", active: true, growth: 10 }
    ];

    const quickActions = [
        { icon: Activity, label: t("sidebarAnalytics"), href: "/teacher/analytics" },
        { icon: Users, label: t("manageStudents"), href: "/teacher/students" },
        { icon: BookOpen, label: t("createContent"), href: "/teacher/content" },
        { icon: Calendar, label: t("scheduleClass"), href: "/teacher/schedule" }
    ];

    if (loading) return <div className="text-white p-10 flex justify-center">{t("loadingTeacherPortal") || "Loading Teacher Portal..."}</div>;

    const { teacher, analytics } = data;

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-[#7A5C1D]/20 to-amber-900/20 backdrop-blur-xl border border-[#7A5C1D]/30"
            >
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <Badge className="mb-4 bg-[#7A5C1D]/20 text-[#eec170] border border-[#7A5C1D]/30">
                            <Sparkles className="h-3 w-3 mr-1" /> {t("goodMorning")}
                        </Badge>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            {t("learningHappened")}, {teacher?.name || 'Teacher'}
                        </h2>
                        <p className="text-amber-100/60 max-w-xl text-sm md:text-base">
                            {t("studentsShowedProgress")} {t("conceptsMastered") || "Concepts mastered"}: {analytics?.conceptsMastered || 0}.
                            {t("engagementIsAt") || "Engagement is at"} {analytics?.averageEngagement || 0}%.
                        </p>
                    </div>

                    {/* Language Preference Control */}
                    <div className="flex flex-col items-end gap-2">
                        <span className="text-xs text-[#eec170] font-mono tracking-widest uppercase mb-1">{t("teachingLanguage")}</span>
                        <div className="flex gap-2 bg-[#01030A]/60 p-1.5 rounded-xl border border-[#7A5C1D]/20 backdrop-blur-md">
                            {Object.entries(languages).map(([key, lang]) => (
                                <button
                                    key={key}
                                    onClick={() => handleLanguageChange(key)}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${language === key
                                        ? 'bg-[#7A5C1D] text-white shadow-[0_0_15px_rgba(122,92,29,0.3)]'
                                        : 'text-white/40 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <span className="mr-1">{lang.flag}</span>
                                    {lang.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Decorative elements */}
                <motion.div
                    animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute top-6 right-6 text-5xl opacity-20 filter grayscale sepia"
                >
                    🎓
                </motion.div>
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-[#7A5C1D]/10 to-transparent rounded-tl-full" />
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content - Left 2/3 */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Energy Rings - Learning Analytics */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-6 rounded-3xl bg-[#01030A]/40 backdrop-blur-xl border border-[#7A5C1D]/20"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <Activity className="h-5 w-5 text-[#7A5C1D]" />
                                {t("learningEnergy")}
                            </h3>
                            <Link href="/teacher/analytics">
                                <Button variant="ghost" size="sm" className="text-[#7A5C1D] hover:text-[#eec170] hover:bg-[#7A5C1D]/10">
                                    {t("viewDetails")} <ChevronRight className="h-4 w-4 ml-1" />
                                </Button>
                            </Link>
                        </div>
                        <div className="flex justify-around flex-wrap gap-4">
                            <EnergyRing value={analytics?.learningEnergy?.understanding || 80} label={t("understanding") || "Understanding"} color="#10b981" />
                            <EnergyRing value={analytics?.learningEnergy?.engagement || 90} label={t("engagement") || "Engagement"} color="#7A5C1D" />
                            <EnergyRing value={analytics?.learningEnergy?.completion || 70} label={t("completion") || "Completion"} color="#f59e0b" />
                            <EnergyRing value={analytics?.learningEnergy?.participation || 85} label={t("participation") || "Participation"} color="#ec4899" />
                        </div>
                    </motion.div>

                    {/* Student Journey Explorer */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="p-6 rounded-3xl bg-[#01030A]/40 backdrop-blur-xl border border-[#7A5C1D]/20"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <Users className="h-5 w-5 text-[#7A5C1D]" />
                                {t("classExperienceMap")}
                            </h3>
                            <Badge className="bg-emerald-900/40 text-emerald-400 border-emerald-500/30">
                                {analytics?.activeStudents || 0} {t("teacherDashStatActive")}
                            </Badge>
                        </div>

                        {/* Student nodes grid */}
                        <div className="flex flex-wrap gap-5 justify-center py-6">
                            {students.map(student => (
                                <StudentNode
                                    key={student.id}
                                    student={student}
                                    onClick={() => console.log(`Viewing ${student.name}`)}
                                />
                            ))}
                        </div>

                        {/* Legend */}
                        <div className="flex items-center justify-center gap-6 pt-4 border-t border-[#7A5C1D]/10">
                            <div className="flex items-center gap-2 text-xs text-white/50">
                                <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#7A5C1D] to-amber-600" />
                                {t("activeLearner")}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-white/50">
                                <div className="w-3 h-3 rounded-full bg-white/10 border border-white/10" />
                                {t("needsSupport")}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-white/50">
                                <TrendingUp className="w-3 h-3 text-emerald-400" />
                                {t("risingStar")}
                            </div>
                        </div>

                        <div className="mt-4 text-center">
                            <Link href="/teacher/students">
                                <Button variant="ghost" className="text-[#7A5C1D] hover:text-[#eec170] hover:bg-[#7A5C1D]/10">
                                    {t("exploreAllStudents")} <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Sidebar - Right 1/3 */}
                <div className="space-y-6">
                    {/* Teaching Insights */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <Brain className="h-5 w-5 text-[#eec170]" />
                                {t("aiInsightsTitle") || "AI Insights"}
                            </h3>
                        </div>

                        <div className="space-y-3">
                            {insights.map((insight, index) => (
                                <InsightCard
                                    key={insight.id}
                                    insight={insight}
                                    index={index}
                                    onClick={() => setSelectedInsight(insight)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="p-5 rounded-2xl bg-[#01030A]/40 backdrop-blur-xl border border-[#7A5C1D]/20">
                        <h4 className="text-sm font-medium text-white/60 mb-4 uppercase tracking-wider">{t("quickActions")}</h4>
                        <div className="space-y-2">
                            {quickActions.map((item, i) => (
                                <Link key={i} href={item.href}>
                                    <motion.div
                                        whileHover={{ x: 5 }}
                                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#7A5C1D]/10 cursor-pointer group border border-transparent hover:border-[#7A5C1D]/20 transition-all"
                                    >
                                        <div className="p-2 rounded-lg bg-[#7A5C1D]/20 group-hover:bg-[#7A5C1D]/30 transition-colors">
                                            <item.icon className="h-4 w-4 text-[#eec170]" />
                                        </div>
                                        <span className="text-sm text-white/70 group-hover:text-white flex-1">{item.label}</span>
                                        <ChevronRight className="h-4 w-4 text-white/30 group-hover:text-[#eec170]" />
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* AI Companion Hint */}
                    <motion.div
                        animate={{
                            boxShadow: ["0 0 20px rgba(122, 92, 29, 0.1)", "0 0 40px rgba(122, 92, 29, 0.2)", "0 0 20px rgba(122, 92, 29, 0.1)"]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="p-5 rounded-2xl bg-gradient-to-br from-[#7A5C1D]/10 to-amber-900/10 border border-[#7A5C1D]/30"
                    >
                        <div className="flex items-start gap-3">
                            <div className="p-2 rounded-xl bg-[#7A5C1D]/20">
                                <Sparkles className="h-5 w-5 text-[#eec170]" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-[#eec170]">{t("aiTeachingCompanion")}</p>
                                <p className="text-xs text-amber-200/60 mt-1">
                                    {t("basedOnDataReview") || "Based on today's data, consider a quick review of Newton's Laws before moving forward."}
                                </p>
                                <Button size="sm" variant="ghost" className="mt-2 text-xs text-[#7A5C1D] hover:text-[#eec170] p-0 h-auto hover:bg-transparent">
                                    {t("aiSuggestion")} →
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;
