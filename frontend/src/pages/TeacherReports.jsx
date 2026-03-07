import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    BarChart3, Download, TrendingUp, TrendingDown, Users, BookOpen,
    Target, Clock, Calendar, Filter, ChevronDown, FileText, Printer
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockClassStudents, mockTeacherAnalytics } from "@/lib/mockData";
import { useTranslation } from "../contexts/LanguageContext";

const TeacherReports = () => {
    const { t } = useTranslation();
    const [selectedReport, setSelectedReport] = useState("overview");
    const [dateRange, setDateRange] = useState("month");

    const reportTypes = [
        { id: "overview", label: t("classOverview") || "Class Overview", icon: BarChart3 },
        { id: "students", label: t("studentPerformance") || "Student Performance", icon: Users },
        { id: "content", label: t("contentAnalytics") || "Content Analytics", icon: BookOpen },
        { id: "attendance", label: t("attendanceReport") || "Attendance Report", icon: Calendar }
    ];

    const classMetrics = [
        { label: t("teacherStatStudents") || "Total Students", value: "32", change: "+2", trend: "up", color: "indigo" },
        { label: t("teacherDashStatAvg") || "Avg. Score", value: "87%", change: "+5%", trend: "up", color: "emerald" },
        { label: t("teacherDashCh5") || "Completion Rate", value: "78%", change: "+12%", trend: "up", color: "purple" },
        { label: t("streak") || "Active Streak", value: "8 days", change: "-2", trend: "down", color: "orange" }
    ];

    const topPerformers = mockClassStudents.slice(0, 5).sort((a, b) => b.avgScore - a.avgScore);
    const needsSupport = mockClassStudents.filter(s => s.status === "needs-support" || s.status === "inactive");

    const getLocalizedRange = (range) => {
        const ranges = {
            week: t("timeWeek") || "Week",
            month: t("timeMonth") || "Month",
            semester: "Semester", // Assuming fallback or add key if needed
            year: "Year"
        };
        return ranges[range] || range;
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">{t("reportsTitle") || "Reports & Analytics"}</h1>
                    <p className="text-indigo-300/60">{t("reportsSubtitle") || "Comprehensive insights into class performance"}</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-xl border-white/20 text-white hover:bg-white/10">
                        <Printer className="h-4 w-4 mr-2" />
                        {t("print") || "Print"}
                    </Button>
                    <Button className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600">
                        <Download className="h-4 w-4 mr-2" />
                        {t("exportPDF") || "Export PDF"}
                    </Button>
                </div>
            </div>

            {/* Report Type Tabs */}
            <div className="flex gap-2 p-1 rounded-xl bg-white/5 w-fit">
                {reportTypes.map((report) => (
                    <Button
                        key={report.id}
                        variant="ghost"
                        onClick={() => setSelectedReport(report.id)}
                        className={`rounded-lg ${selectedReport === report.id
                            ? 'bg-indigo-500/20 text-indigo-300'
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <report.icon className="h-4 w-4 mr-2" />
                        {report.label}
                    </Button>
                ))}
            </div>

            {/* Date Range Filter */}
            <div className="flex items-center gap-4">
                <span className="text-sm text-white/50">{t("timePeriod") || "Time Period"}:</span>
                <div className="flex gap-2">
                    {["week", "month", "semester", "year"].map((range) => (
                        <Button
                            key={range}
                            variant="ghost"
                            size="sm"
                            onClick={() => setDateRange(range)}
                            className={`rounded-lg capitalize ${dateRange === range
                                ? 'bg-white/10 text-white'
                                : 'text-white/50 hover:text-white'
                                }`}
                        >
                            {getLocalizedRange(range)}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {classMetrics.map((metric, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-5 rounded-2xl bg-white/5 border border-white/10"
                    >
                        <div className="flex items-start justify-between mb-2">
                            <span className="text-sm text-white/50">{metric.label}</span>
                            <div className={`flex items-center gap-1 text-xs ${metric.trend === 'up' ? 'text-emerald-400' : 'text-red-400'
                                }`}>
                                {metric.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                                {metric.change}
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-white">{metric.value}</div>
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Top Performers */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-6 rounded-3xl bg-white/5 border border-white/10"
                >
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Target className="h-5 w-5 text-emerald-400" />
                        {t("topPerformers") || "Top Performers"}
                    </h3>
                    <div className="space-y-3">
                        {topPerformers.map((student, i) => (
                            <div
                                key={student.id}
                                className="flex items-center gap-4 p-3 rounded-xl bg-white/5"
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-sm font-bold text-white">
                                    {i + 1}
                                </div>
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-lg">
                                    {student.avatar}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-white">{student.name}</p>
                                    <p className="text-xs text-white/40">{student.storiesRead} {t("stories") || "stories"} • {student.quizzesTaken} {t("quizzes") || "quizzes"}</p>
                                </div>
                                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                                    {student.avgScore}%
                                </Badge>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Students Needing Support */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-6 rounded-3xl bg-white/5 border border-white/10"
                >
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Users className="h-5 w-5 text-orange-400" />
                        {t("studentsNeedingSupport") || "Students Needing Support"}
                    </h3>
                    {needsSupport.length > 0 ? (
                        <div className="space-y-3">
                            {needsSupport.map((student) => (
                                <div
                                    key={student.id}
                                    className="flex items-center gap-4 p-3 rounded-xl bg-orange-500/10 border border-orange-500/20"
                                >
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-lg">
                                        {student.avatar}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-white">{student.name}</p>
                                        <p className="text-xs text-orange-300/60">{t("lastActive") || "Last active"}: {student.lastActive}</p>
                                    </div>
                                    <div className="text-right">
                                        <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                                            {student.avgScore}%
                                        </Badge>
                                        <p className="text-xs text-white/40 mt-1">{student.streak} {t("streak") || "day streak"}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <div className="text-4xl mb-2">🎉</div>
                            <p className="text-white/50">{t("allStudentsWell") || "All students are doing well!"}</p>
                        </div>
                    )}
                </motion.div>

                {/* Content Performance */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="p-6 rounded-3xl bg-white/5 border border-white/10"
                >
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-purple-400" />
                        {t("contentPerformance") || "Content Performance"}
                    </h3>
                    <div className="space-y-4">
                        {mockTeacherAnalytics.conceptMastery.map((concept, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-white">{concept.name}</span>
                                    <span className="text-white/60">{concept.understanding}%</span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${concept.understanding}%` }}
                                        transition={{ duration: 1, delay: i * 0.1 }}
                                        className={`h-full rounded-full ${concept.understanding >= 80 ? 'bg-emerald-500' :
                                            concept.understanding >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                            }`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Activity Timeline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="p-6 rounded-3xl bg-white/5 border border-white/10"
                >
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Clock className="h-5 w-5 text-blue-400" />
                        {t("recentActivity") || "Recent Activity"}
                    </h3>
                    <div className="space-y-4">
                        {mockTeacherAnalytics.recentActivity.map((activity, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2" />
                                <div className="flex-1">
                                    <p className="text-sm text-white">{activity.student}</p>
                                    <p className="text-xs text-white/50">{activity.detail}</p>
                                    <p className="text-xs text-white/30 mt-0.5">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default TeacherReports;
