import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Settings, User, Bell, Lock, Palette, Globe, Moon, Sun,
    Shield, HelpCircle, LogOut, ChevronRight, Check, Camera, Mail, Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockTeacherData } from "@/lib/mockData";
import { useLanguage, useTranslation } from "../contexts/LanguageContext";

const TeacherSettings = () => {
    const { language, setLanguage, languages } = useLanguage();
    const { t } = useTranslation();
    const [activeSection, setActiveSection] = useState("profile");
    const [notifications, setNotifications] = useState({
        studentActivity: true,
        quizCompletions: true,
        dailyDigest: false,
        parentMessages: true,
        systemUpdates: true
    });
    const [liteMode, setLiteMode] = useState(false);

    const sections = [
        { id: "profile", label: t("profile"), icon: User },
        { id: "notifications", label: t("notifications"), icon: Bell },
        { id: "appearance", label: t("appearance"), icon: Palette },
        { id: "language", label: t("language"), icon: Globe },
        { id: "privacy", label: t("privacy"), icon: Shield },
        { id: "help", label: t("helpSupport"), icon: HelpCircle }
    ];

    const toggleNotification = (key) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white">{t("settings")}</h1>
                <p className="text-indigo-300/60">{t("customizeExperience")}</p>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
                {/* Sidebar Navigation */}
                <div className="lg:col-span-1">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${activeSection === section.id
                                    ? 'bg-indigo-500/20 text-indigo-300'
                                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <section.icon className="h-5 w-5" />
                                <span className="text-sm font-medium">{section.label}</span>
                            </button>
                        ))}
                        <hr className="border-white/10 my-2" />
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-red-400 hover:bg-red-500/10">
                            <LogOut className="h-5 w-5" />
                            <span className="text-sm font-medium">{t("signOut")}</span>
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="lg:col-span-3">
                    <motion.div
                        key={activeSection}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 rounded-3xl bg-white/5 border border-white/10"
                    >
                        {/* Profile Section */}
                        {activeSection === "profile" && (
                            <div className="space-y-6">
                                <h2 className="text-lg font-semibold text-white">{t("teacherProfileSettings")}</h2>

                                {/* Profile Photo */}
                                <div className="flex items-center gap-6">
                                    <div className="relative">
                                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-4xl">
                                            👨‍🏫
                                        </div>
                                        <button className="absolute bottom-0 right-0 p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700">
                                            <Camera className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">{mockTeacherData.name}</p>
                                        <p className="text-sm text-white/50">{mockTeacherData.subject} {t("teacher")}</p>
                                        <Badge className="mt-2 bg-emerald-500/20 text-emerald-400 border-0">{t("verified")}</Badge>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm text-white/60 mb-2 block">{t("fullName")}</label>
                                        <Input
                                            defaultValue={mockTeacherData.name}
                                            className="bg-white/5 border-white/10 text-white rounded-xl"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-white/60 mb-2 block">{t("email")}</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                                            <Input
                                                defaultValue={mockTeacherData.email}
                                                className="pl-10 bg-white/5 border-white/10 text-white rounded-xl"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm text-white/60 mb-2 block">{t("phoneNumber")}</label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                                            <Input
                                                defaultValue="+91 98765 43210"
                                                className="pl-10 bg-white/5 border-white/10 text-white rounded-xl"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm text-white/60 mb-2 block">{t("school")}</label>
                                        <Input
                                            defaultValue={mockTeacherData.school}
                                            className="bg-white/5 border-white/10 text-white rounded-xl"
                                        />
                                    </div>
                                </div>

                                <Button className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600">
                                    <Check className="h-4 w-4 mr-2" />
                                    {t("saveChanges")}
                                </Button>
                            </div>
                        )}

                        {/* Notifications Section */}
                        {activeSection === "notifications" && (
                            <div className="space-y-6">
                                <h2 className="text-lg font-semibold text-white">{t("notificationPreferences")}</h2>
                                <p className="text-sm text-white/50">{t("notificationDesc")}</p>

                                <div className="space-y-4">
                                    {[
                                        { key: "studentActivity", label: t("studentActivity"), desc: t("studentActivityDesc") },
                                        { key: "quizCompletions", label: t("quizCompletions"), desc: t("quizCompletionsDesc") },
                                        { key: "dailyDigest", label: t("dailyDigest"), desc: t("dailyDigestDesc") },
                                        { key: "parentMessages", label: t("parentMessages"), desc: t("parentMessagesDesc") },
                                        { key: "systemUpdates", label: t("systemUpdates"), desc: t("systemUpdatesDesc") }
                                    ].map((item) => (
                                        <div
                                            key={item.key}
                                            className="flex items-center justify-between p-4 rounded-xl bg-white/5"
                                        >
                                            <div>
                                                <p className="text-sm font-medium text-white">{item.label}</p>
                                                <p className="text-xs text-white/40">{item.desc}</p>
                                            </div>
                                            <button
                                                onClick={() => toggleNotification(item.key)}
                                                className={`w-12 h-6 rounded-full transition-colors ${notifications[item.key] ? 'bg-indigo-600' : 'bg-white/20'
                                                    }`}
                                            >
                                                <motion.div
                                                    animate={{ x: notifications[item.key] ? 24 : 2 }}
                                                    className="w-5 h-5 rounded-full bg-white shadow"
                                                />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Appearance Section */}
                        {activeSection === "appearance" && (
                            <div className="space-y-6">
                                <h2 className="text-lg font-semibold text-white">{t("appearance")}</h2>

                                {/* Theme Selection */}
                                <div>
                                    <label className="text-sm text-white/60 mb-3 block">{t("theme")}</label>
                                    <div className="grid grid-cols-3 gap-4">
                                        {[
                                            { id: "dark", label: t("dark"), icon: Moon },
                                            { id: "light", label: t("light"), icon: Sun },
                                            { id: "auto", label: t("system"), icon: Settings }
                                        ].map((theme) => (
                                            <button
                                                key={theme.id}
                                                className="p-4 rounded-xl bg-white/5 border-2 border-indigo-500 text-center"
                                            >
                                                <theme.icon className="h-6 w-6 mx-auto text-indigo-400 mb-2" />
                                                <span className="text-sm text-white">{theme.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Lite Mode */}
                                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                                    <div>
                                        <p className="text-sm font-medium text-white">{t("liteMode")}</p>
                                        <p className="text-xs text-white/40">{t("liteModeDesc")}</p>
                                    </div>
                                    <button
                                        onClick={() => setLiteMode(!liteMode)}
                                        className={`w-12 h-6 rounded-full transition-colors ${liteMode ? 'bg-indigo-600' : 'bg-white/20'
                                            }`}
                                    >
                                        <motion.div
                                            animate={{ x: liteMode ? 24 : 2 }}
                                            className="w-5 h-5 rounded-full bg-white shadow"
                                        />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Language Section */}
                        {activeSection === "language" && (
                            <div className="space-y-6">
                                <h2 className="text-lg font-semibold text-white">{t("languageRegion")}</h2>

                                <div>
                                    <label className="text-sm text-white/60 mb-3 block">{t("displayLanguage")}</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        {Object.entries(languages).map(([key, lang]) => (
                                            <button
                                                key={key}
                                                onClick={() => setLanguage(key)}
                                                className={`p-4 rounded-xl border-2 flex items-center gap-3 ${language === key
                                                    ? 'bg-indigo-500/20 border-indigo-500'
                                                    : 'bg-white/5 border-white/10 hover:border-white/20'
                                                    }`}
                                            >
                                                <span className="text-2xl">{lang.flag}</span>
                                                <div className="text-left">
                                                    <span className="text-sm text-white block">{lang.name}</span>
                                                    <span className="text-xs text-white/50">{lang.nativeName}</span>
                                                </div>
                                                {language === key && (
                                                    <Check className="h-4 w-4 text-indigo-400 ml-auto" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Privacy Section */}
                        {activeSection === "privacy" && (
                            <div className="space-y-6">
                                <h2 className="text-lg font-semibold text-white">{t("privacySecurity")}</h2>

                                <div className="space-y-4">
                                    <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10">
                                        <div className="flex items-center gap-3">
                                            <Lock className="h-5 w-5 text-white/60" />
                                            <div className="text-left">
                                                <p className="text-sm font-medium text-white">{t("changePassword")}</p>
                                                <p className="text-xs text-white/40">{t("changePasswordDesc")}</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="h-5 w-5 text-white/30" />
                                    </button>

                                    <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10">
                                        <div className="flex items-center gap-3">
                                            <Shield className="h-5 w-5 text-white/60" />
                                            <div className="text-left">
                                                <p className="text-sm font-medium text-white">{t("twoFactor")}</p>
                                                <p className="text-xs text-white/40">{t("twoFactorDesc")}</p>
                                            </div>
                                        </div>
                                        <Badge className="bg-yellow-500/20 text-yellow-400 border-0">{t("recommended")}</Badge>
                                    </button>

                                    <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10">
                                        <div className="flex items-center gap-3">
                                            <User className="h-5 w-5 text-white/60" />
                                            <div className="text-left">
                                                <p className="text-sm font-medium text-white">{t("activeSessions")}</p>
                                                <p className="text-xs text-white/40">{t("activeSessionsDesc")}</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="h-5 w-5 text-white/30" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Help Section */}
                        {activeSection === "help" && (
                            <div className="space-y-6">
                                <h2 className="text-lg font-semibold text-white">{t("helpSupport")}</h2>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
                                        <div className="text-3xl mb-3">📚</div>
                                        <h3 className="text-white font-medium mb-1">{t("documentation")}</h3>
                                        <p className="text-xs text-white/50 mb-3">{t("documentationDesc")}</p>
                                        <Button variant="outline" size="sm" className="rounded-lg border-white/20 text-white">
                                            {t("readDocs")}
                                        </Button>
                                    </div>
                                    <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                                        <div className="text-3xl mb-3">💬</div>
                                        <h3 className="text-white font-medium mb-1">{t("contactSupport")}</h3>
                                        <p className="text-xs text-white/50 mb-3">{t("contactSupportDesc")}</p>
                                        <Button variant="outline" size="sm" className="rounded-lg border-white/20 text-white">
                                            {t("sendMessage")}
                                        </Button>
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-white/5 text-center">
                                    <p className="text-sm text-white/60">{t("version")}</p>
                                    <p className="text-xs text-white/30 mt-1">{t("copyright")}</p>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default TeacherSettings;
