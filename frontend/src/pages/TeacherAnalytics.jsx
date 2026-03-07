import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    TrendingUp, TrendingDown, Activity, Users, BookOpen, Brain,
    Clock, Target, Zap, BarChart3, PieChart, Calendar, ChevronDown
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslation } from "../contexts/LanguageContext";

// Learning Energy Stream Component
const EnergyStream = ({ data, label }) => {
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-sm">
                <span className="text-white/60">{label}</span>
                <span className="text-white font-medium">{data.value}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${data.value}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full ${data.color}`}
                />
            </div>
        </div>
    );
};

// Concept Heat Zone Component
const ConceptHeatZone = ({ concept, t }) => {
    const getHeatColor = (value) => {
        if (value >= 80) return "bg-emerald-500";
        if (value >= 60) return "bg-yellow-500";
        if (value >= 40) return "bg-orange-500";
        return "bg-red-500";
    };

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 rounded-2xl bg-white/5 border border-white/10 cursor-pointer"
        >
            <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-white">{concept.name}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${getHeatColor(concept.understanding)} text-white`}>
                    {concept.understanding}%
                </span>
            </div>
            <div className="grid grid-cols-5 gap-1">
                {concept.zones.map((zone, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className={`h-8 rounded ${getHeatColor(zone)} opacity-${Math.round(zone / 10) * 10}`}
                        style={{ opacity: zone / 100 }}
                    />
                ))}
            </div>
            <p className="text-xs text-white/40 mt-2">{concept.students} {t("studentsEngaged") || "students engaged"}</p>
        </motion.div>
    );
};

// Engagement Pulse Component
const EngagementPulse = ({ data }) => {
    return (
        <div className="relative h-32 flex items-end justify-between gap-1">
            {data.map((value, i) => (
                <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${value}%` }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    className="flex-1 bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-sm relative group"
                >
                    <motion.div
                        animate={{ opacity: [0.3, 0.7, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                        className="absolute inset-0 bg-white/20 rounded-t-sm"
                    />
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs bg-white/10 px-1.5 py-0.5 rounded text-white whitespace-nowrap">
                            {value}%
                        </span>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

const TeacherAnalytics = () => {
    const { t } = useTranslation();
    const [timeRange, setTimeRange] = useState("week");

    // Mock data
    const energyStreams = [
        { label: "Science Understanding", value: 87, color: "bg-gradient-to-r from-emerald-500 to-green-500" },
        { label: "Math Engagement", value: 92, color: "bg-gradient-to-r from-blue-500 to-indigo-500" },
        { label: "Reading Completion", value: 78, color: "bg-gradient-to-r from-purple-500 to-pink-500" },
        { label: "Quiz Performance", value: 85, color: "bg-gradient-to-r from-orange-500 to-red-500" }
    ];

    const concepts = [
        { name: "Photosynthesis", understanding: 92, zones: [95, 88, 92, 90, 94], students: 32 },
        { name: "Cell Division", understanding: 78, zones: [80, 75, 82, 70, 85], students: 28 },
        { name: "Newton's Laws", understanding: 65, zones: [60, 70, 55, 75, 68], students: 30 },
        { name: "Chemical Reactions", understanding: 45, zones: [50, 40, 48, 35, 52], students: 25 }
    ];

    const weeklyEngagement = [65, 72, 58, 85, 92, 78, 88, 95, 82, 76, 90, 85, 70, 88];

    const stats = [
        { label: t("statActiveStudents"), value: "156", change: "+12", trend: "up", icon: Users },
        { label: t("statLessons"), value: "348", change: "+28", trend: "up", icon: BookOpen },
        { label: t("statAvgUnderstand"), value: "87%", change: "+5%", trend: "up", icon: Brain },
        { label: t("statLearningTime"), value: "4.2h", change: "-0.3h", trend: "down", icon: Clock }
    ];

    const timeRanges = {
        day: t("timeDay"),
        week: t("timeWeek"),
        month: t("timeMonth")
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">{t("analyticsTitle")}</h1>
                    <p className="text-indigo-300/60">{t("analyticsSubtitle")}</p>
                </div>

                {/* Time Range Selector */}
                <div className="flex items-center gap-2 p-1 rounded-xl bg-white/5">
                    {["day", "week", "month"].map((range) => (
                        <Button
                            key={range}
                            variant="ghost"
                            size="sm"
                            onClick={() => setTimeRange(range)}
                            className={`rounded-lg capitalize ${timeRange === range
                                ? 'bg-indigo-500/20 text-indigo-300'
                                : 'text-white/50 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {timeRanges[range]}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="p-2 rounded-xl bg-indigo-500/20">
                                <stat.icon className="h-5 w-5 text-indigo-400" />
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-medium ${stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400'
                                }`}>
                                {stat.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                                {stat.change}
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                        <div className="text-sm text-white/50">{stat.label}</div>
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Learning Energy Streams */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <Activity className="h-5 w-5 text-indigo-400" />
                        <h3 className="text-lg font-semibold text-white">{t("energyStreams")}</h3>
                    </div>
                    <div className="space-y-5">
                        {energyStreams.map((stream, i) => (
                            <EnergyStream key={i} data={stream} label={stream.label} />
                        ))}
                    </div>
                </motion.div>

                {/* Engagement Pulse */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-purple-400" />
                            <h3 className="text-lg font-semibold text-white">{t("engagementPulse")}</h3>
                        </div>
                        <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                            Live
                        </Badge>
                    </div>
                    <EngagementPulse data={weeklyEngagement} />
                    <div className="flex justify-between text-xs text-white/40 mt-4">
                        <span>2 weeks ago</span>
                        <span>Today</span>
                    </div>
                </motion.div>
            </div>

            {/* Concept Heat Zones */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10"
            >
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-orange-400" />
                        <h3 className="text-lg font-semibold text-white">{t("heatZones")}</h3>
                    </div>
                    <p className="text-sm text-white/50">{t("heatZoneSubtitle")}</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {concepts.map((concept, i) => (
                        <ConceptHeatZone key={i} concept={concept} t={t} />
                    ))}
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-xs text-white/50">
                        <div className="w-3 h-3 rounded bg-emerald-500" />
                        {t("legendMastered") || "Mastered (80-100%)"}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/50">
                        <div className="w-3 h-3 rounded bg-yellow-500" />
                        {t("legendLearning") || "Learning (60-79%)"}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/50">
                        <div className="w-3 h-3 rounded bg-orange-500" />
                        {t("legendNeedsSupport") || "Needs Support (40-59%)"}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/50">
                        <div className="w-3 h-3 rounded bg-red-500" />
                        {t("legendCritical") || "Critical (0-39%)"}
                    </div>
                </div>
            </motion.div>

            {/* AI Insight */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="p-6 rounded-3xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20"
            >
                <div className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-purple-500/20">
                        <Brain className="h-6 w-6 text-purple-400" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2">{t("teachingIntel")}</h3>
                        <p className="text-white/70 leading-relaxed">
                            Based on this week's data, <span className="text-purple-300 font-medium">Newton's Laws</span> and{" "}
                            <span className="text-purple-300 font-medium">Chemical Reactions</span> need reinforcement.
                            Consider using interactive simulations - students show 40% higher engagement with visual learning tools.
                            <span className="text-emerald-400 font-medium"> Midweek sessions perform best.</span>
                        </p>
                        <div className="flex gap-3 mt-4">
                            <Button size="sm" className="rounded-full bg-purple-500/20 text-purple-300 hover:bg-purple-500/30">
                                {t("createRevision")}
                            </Button>
                            <Button size="sm" variant="ghost" className="rounded-full text-white/60 hover:text-white">
                                {t("exploreSims")}
                            </Button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default TeacherAnalytics;
