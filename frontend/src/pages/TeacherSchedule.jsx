import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Calendar, Clock, Plus, ChevronLeft, ChevronRight, Users, BookOpen,
    Target, Video, Trash2, Edit3, X, Check, Bell, Repeat
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { mockClassStudents, mockStories } from "@/lib/mockData";
import { useTranslation, useLanguage } from "../contexts/LanguageContext";

const TeacherSchedule = () => {
    const { t } = useTranslation();
    const { language } = useLanguage();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showAddEvent, setShowAddEvent] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);

    // Mock scheduled events
    const [events, setEvents] = useState([
        {
            id: 1,
            title: "Photosynthesis Lesson",
            type: "lesson",
            date: "2026-01-13",
            time: "10:00 AM",
            duration: "45 min",
            class: "Grade 8 Science",
            color: "from-blue-500 to-indigo-600"
        },
        {
            id: 2,
            title: "Newton's Laws Quiz",
            type: "quiz",
            date: "2026-01-14",
            time: "11:00 AM",
            duration: "30 min",
            class: "Grade 8 Science",
            color: "from-purple-500 to-pink-600"
        },
        {
            id: 3,
            title: "Live Science Session",
            type: "live",
            date: "2026-01-15",
            time: "2:00 PM",
            duration: "60 min",
            class: "Grade 8 Science",
            color: "from-emerald-500 to-green-600"
        },
        {
            id: 4,
            title: "Assignment Due: Space Exploration",
            type: "deadline",
            date: "2026-01-18",
            time: "11:59 PM",
            duration: "-",
            class: "Grade 8 Science",
            color: "from-orange-500 to-red-600"
        }
    ]);

    // Map custom language codes to valid BCP 47 language tags
    const getValidLanguageCode = (lang) => {
        const languageMap = {
            'english': 'en-US',
            'hindi': 'hi-IN',
            'tamil': 'ta-IN',
            'telugu': 'te-IN',
            'odia': 'or-IN'  // Odia uses 'or' as the ISO 639-1 code
        };
        return languageMap[lang] || 'en-US';
    };

    // Dynamic Date Formatting
    const validLangCode = getValidLanguageCode(language);
    const getMonthName = (date) => new Intl.DateTimeFormat(validLangCode, { month: 'long' }).format(date);
    const getDayName = (dayIndex) => {
        const date = new Date(2024, 0, dayIndex + 7); // Start from a Sunday
        return new Intl.DateTimeFormat(validLangCode, { weekday: 'short' }).format(date);
    };

    const daysOfWeek = Array.from({ length: 7 }, (_, i) => getDayName(i));

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        return { firstDay, daysInMonth };
    };

    const { firstDay, daysInMonth } = getDaysInMonth(currentDate);

    const getEventsForDate = (day) => {
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return events.filter(e => e.date === dateStr);
    };

    const navigateMonth = (direction) => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
    };

    const eventTypeIcons = {
        lesson: BookOpen,
        quiz: Target,
        live: Video,
        deadline: Bell
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">{t("scheduleTitle")}</h1>
                    <p className="text-indigo-300/60">{t("scheduleSubtitle")}</p>
                </div>
                <Button
                    onClick={() => setShowAddEvent(true)}
                    className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    {t("addEvent")}
                </Button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Calendar */}
                <div className="lg:col-span-2">
                    <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">
                        {/* Month Navigation */}
                        <div className="flex items-center justify-between mb-6">
                            <button
                                onClick={() => navigateMonth(-1)}
                                className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <h2 className="text-xl font-bold text-white">
                                {getMonthName(currentDate)} {currentDate.getFullYear()}
                            </h2>
                            <button
                                onClick={() => navigateMonth(1)}
                                className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Days of Week Header */}
                        <div className="grid grid-cols-7 gap-2 mb-2">
                            {daysOfWeek.map(day => (
                                <div key={day} className="text-center text-sm font-medium text-white/50 py-2">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-2">
                            {/* Empty cells for days before first of month */}
                            {[...Array(firstDay)].map((_, i) => (
                                <div key={`empty-${i}`} className="aspect-square" />
                            ))}

                            {/* Day cells */}
                            {[...Array(daysInMonth)].map((_, i) => {
                                const day = i + 1;
                                const dayEvents = getEventsForDate(day);
                                const isToday = day === 11; // Mock today as Jan 11

                                return (
                                    <motion.div
                                        key={day}
                                        whileHover={{ scale: 1.05 }}
                                        onClick={() => setSelectedDay(day)}
                                        className={`aspect-square p-2 rounded-xl cursor-pointer transition-colors ${isToday
                                            ? 'bg-indigo-500/30 border-2 border-indigo-500'
                                            : selectedDay === day
                                                ? 'bg-white/10 border border-white/20'
                                                : 'hover:bg-white/5'
                                            }`}
                                    >
                                        <div className={`text-sm font-medium ${isToday ? 'text-indigo-300' : 'text-white/80'}`}>
                                            {day}
                                        </div>
                                        {dayEvents.length > 0 && (
                                            <div className="mt-1 space-y-1">
                                                {dayEvents.slice(0, 2).map(event => (
                                                    <div
                                                        key={event.id}
                                                        className={`h-1.5 rounded-full bg-gradient-to-r ${event.color}`}
                                                    />
                                                ))}
                                                {dayEvents.length > 2 && (
                                                    <div className="text-[10px] text-white/40">+{dayEvents.length - 2}</div>
                                                )}
                                            </div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Upcoming Events Sidebar */}
                <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-indigo-400" />
                            {t("upcomingEvents")}
                        </h3>
                        <div className="space-y-3">
                            {events.map((event, i) => {
                                const Icon = eventTypeIcons[event.type];
                                return (
                                    <motion.div
                                        key={event.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500/30 transition-colors"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`p-2 rounded-lg bg-gradient-to-br ${event.color}`}>
                                                <Icon className="h-4 w-4 text-white" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-white truncate">{event.title}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-xs text-white/40">{event.date}</span>
                                                    <span className="text-xs text-white/40">•</span>
                                                    <span className="text-xs text-white/40">{event.time}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
                            <div className="text-2xl font-bold text-white">{events.filter(e => e.type === 'lesson').length}</div>
                            <div className="text-xs text-indigo-300/60">{t("lessons")} {t("timeWeek")}</div>
                        </div>
                        <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20">
                            <div className="text-2xl font-bold text-white">{events.filter(e => e.type === 'quiz').length}</div>
                            <div className="text-xs text-purple-300/60">{t("quizzes")} {t("scheduled")}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Event Modal */}
            <AnimatePresence>
                {showAddEvent && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setShowAddEvent(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-white/10"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-white">{t("addNewEvent")}</h3>
                                <button
                                    onClick={() => setShowAddEvent(false)}
                                    className="p-2 rounded-lg hover:bg-white/10 text-white/60"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm text-white/60 mb-2 block">{t("eventTitle")}</label>
                                    <Input
                                        placeholder="e.g., Physics Live Session"
                                        className="bg-white/5 border-white/10 text-white rounded-xl"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm text-white/60 mb-2 block">{t("dueDate")}</label>
                                        <Input
                                            type="date"
                                            className="bg-white/5 border-white/10 text-white rounded-xl"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-white/60 mb-2 block">{t("time") || "Time"}</label>
                                        <Input
                                            type="time"
                                            className="bg-white/5 border-white/10 text-white rounded-xl"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm text-white/60 mb-2 block">{t("eventType") || "Event Type"}</label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {[
                                            { type: "lesson", label: "Lesson", icon: BookOpen },
                                            { type: "quiz", label: "Quiz", icon: Target },
                                            { type: "live", label: "Live", icon: Video },
                                            { type: "deadline", label: "Deadline", icon: Bell }
                                        ].map((t) => (
                                            <button
                                                key={t.type}
                                                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex flex-col items-center gap-1"
                                            >
                                                <t.icon className="h-5 w-5 text-indigo-400" />
                                                <span className="text-[10px] text-white/60">{t.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <Button className="w-full h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600">
                                    <Check className="h-4 w-4 mr-2" />
                                    {t("createEvent") || "Create Event"}
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TeacherSchedule;
