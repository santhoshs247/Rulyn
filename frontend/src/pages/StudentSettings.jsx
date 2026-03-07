import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Settings, User, Bell, Lock, Palette, Globe, Moon, Sun,
    Shield, HelpCircle, LogOut, ChevronRight, Check, Camera, Mail, Gamepad2,
    Volume2, VolumeX, Sparkles, Target, Trophy, Save, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSettings } from "@/contexts/SettingsContext";

const StudentSettings = () => {
    const { language, setLanguage, t } = useLanguage();
    const { settings, updateSetting, updateNotification, saveSettings, isSaving, saveMessage } = useSettings();

    const [activeSection, setActiveSection] = useState("profile");
    const [showSaveToast, setShowSaveToast] = useState(false);

    // Show toast when save message appears
    useEffect(() => {
        if (saveMessage) {
            setShowSaveToast(true);
            setTimeout(() => setShowSaveToast(false), 3000);
        }
    }, [saveMessage]);

    const sections = [
        { id: "profile", label: t('profile'), icon: User },
        { id: "notifications", label: t('notifications'), icon: Bell },
        { id: "appearance", label: t('appearance'), icon: Palette },
        { id: "sound", label: t('soundEffects'), icon: Volume2 },
        { id: "language", label: t('language'), icon: Globe },
        { id: "privacy", label: t('privacy'), icon: Shield },
        { id: "help", label: t('helpSupport'), icon: HelpCircle }
    ];

    const availableLanguages = [
        { id: "english", label: "English", flag: "🇺🇸", native: "English" },
        { id: "hindi", label: "हिंदी", flag: "🇮🇳", native: "Hindi" },
        { id: "tamil", label: "தமிழ்", flag: "🇮🇳", native: "Tamil" },
        { id: "telugu", label: "తెలుగు", flag: "🇮🇳", native: "Telugu" },
        { id: "odia", label: "ଓଡିଆ", flag: "🇮🇳", native: "Odia" }
    ];

    const handleLanguageChange = (newLang) => {
        setLanguage(newLang);
        // Auto-save when language changes
        setTimeout(() => saveSettings(), 100);
    };

    const handleSave = async () => {
        await saveSettings();
    };

    return (
        <div className="space-y-8 pb-20 relative">
            {/* Save Toast */}
            <AnimatePresence>
                {showSaveToast && (
                    <motion.div
                        initial={{ opacity: 0, y: -50, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: -50, x: "-50%" }}
                        className="fixed top-20 left-1/2 z-50 bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg shadow-emerald-500/30 flex items-center gap-2"
                    >
                        <Check className="h-5 w-5" />
                        {saveMessage}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-500/20 rounded-xl">
                        <Settings className="h-6 w-6 text-orange-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">{t('settings')}</h1>
                        <p className="text-white/50 text-sm">{t('customizeExperience')}</p>
                    </div>
                </div>
            </motion.div>

            <div className="grid lg:grid-cols-4 gap-8">
                {/* Sidebar Navigation */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-1"
                >
                    <div className="p-4 rounded-2xl bg-zinc-900 border border-orange-500/20 space-y-1">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${activeSection === section.id
                                    ? 'bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-400 border border-orange-500/30'
                                    : 'text-white/60 hover:bg-zinc-800 hover:text-white'
                                    }`}
                            >
                                <section.icon className="h-5 w-5" />
                                <span className="text-sm font-medium">{section.label}</span>
                            </button>
                        ))}
                        <hr className="border-orange-500/20 my-2" />
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-red-400 hover:bg-red-500/10 transition-colors">
                            <LogOut className="h-5 w-5" />
                            <span className="text-sm font-medium">{t('signOut')}</span>
                        </button>
                    </div>
                </motion.div>

                {/* Content Area */}
                <div className="lg:col-span-3">
                    <motion.div
                        key={activeSection}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 rounded-3xl bg-zinc-900 border border-orange-500/20"
                    >
                        {/* Profile Section */}
                        {activeSection === "profile" && (
                            <div className="space-y-6">
                                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <User className="h-5 w-5 text-orange-400" />
                                    {t('profileSettings')}
                                </h2>

                                {/* Profile Photo */}
                                <div className="flex items-center gap-6">
                                    <div className="relative">
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-5xl shadow-lg shadow-orange-500/30"
                                        >
                                            🦊
                                        </motion.div>
                                        <button className="absolute bottom-0 right-0 p-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors shadow-lg">
                                            <Camera className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-lg">{settings.displayName}</p>
                                        <p className="text-sm text-white/50">@{settings.username}</p>
                                        <div className="flex gap-2 mt-2">
                                            <Badge className="bg-orange-500/20 text-orange-400 border border-orange-500/30">
                                                {t('grade')} 7
                                            </Badge>
                                            <Badge className="bg-emerald-500/20 text-emerald-400 border-0">
                                                <Trophy className="h-3 w-3 mr-1" />
                                                {t('level')} 12
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm text-white/60 mb-2 block">{t('displayName')}</label>
                                        <Input
                                            value={settings.displayName}
                                            onChange={(e) => updateSetting('displayName', e.target.value)}
                                            className="bg-zinc-800 border-orange-500/20 text-white rounded-xl focus:border-orange-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-white/60 mb-2 block">{t('username')}</label>
                                        <Input
                                            value={settings.username}
                                            onChange={(e) => updateSetting('username', e.target.value)}
                                            className="bg-zinc-800 border-orange-500/20 text-white rounded-xl focus:border-orange-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-white/60 mb-2 block">{t('email')}</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                                            <Input
                                                value={settings.email}
                                                onChange={(e) => updateSetting('email', e.target.value)}
                                                className="pl-10 bg-zinc-800 border-orange-500/20 text-white rounded-xl focus:border-orange-500"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm text-white/60 mb-2 block">{t('school')}</label>
                                        <Input
                                            defaultValue="Rulyn Academy"
                                            disabled
                                            className="bg-zinc-800/50 border-zinc-700 text-white/50 rounded-xl"
                                        />
                                    </div>
                                </div>

                                <Button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold"
                                >
                                    {isSaving ? (
                                        <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> {t('saving')}</>
                                    ) : (
                                        <><Save className="h-4 w-4 mr-2" /> {t('saveChanges')}</>
                                    )}
                                </Button>
                            </div>
                        )}

                        {/* Notifications Section */}
                        {activeSection === "notifications" && (
                            <div className="space-y-6">
                                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <Bell className="h-5 w-5 text-orange-400" />
                                    {t('notificationPreferences')}
                                </h2>
                                <p className="text-sm text-white/50">{t('chooseNotifications')}</p>

                                <div className="space-y-3">
                                    {[
                                        { key: "achievements", label: t('achievements'), desc: t('achievementsDesc') },
                                        { key: "dailyReminder", label: t('dailyReminder'), desc: t('dailyReminderDesc') },
                                        { key: "streakAlerts", label: t('streakAlerts'), desc: t('streakAlertsDesc') },
                                        { key: "quizResults", label: t('quizResults'), desc: t('quizResultsDesc') },
                                        { key: "teacherMessages", label: t('teacherMessages'), desc: t('teacherMessagesDesc') },
                                        { key: "friendActivity", label: t('friendActivity'), desc: t('friendActivityDesc') }
                                    ].map((item) => (
                                        <motion.div
                                            key={item.key}
                                            whileHover={{ scale: 1.01 }}
                                            className="flex items-center justify-between p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50 hover:border-orange-500/30 transition-colors"
                                        >
                                            <div>
                                                <p className="text-sm font-medium text-white">{item.label}</p>
                                                <p className="text-xs text-white/40">{item.desc}</p>
                                            </div>
                                            <button
                                                onClick={() => updateNotification(item.key, !settings.notifications[item.key])}
                                                className={`w-12 h-6 rounded-full transition-colors ${settings.notifications[item.key] ? 'bg-orange-500' : 'bg-zinc-700'
                                                    }`}
                                            >
                                                <motion.div
                                                    animate={{ x: settings.notifications[item.key] ? 24 : 2 }}
                                                    className="w-5 h-5 rounded-full bg-white shadow"
                                                />
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>

                                <Button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold"
                                >
                                    {isSaving ? (
                                        <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> {t('saving')}</>
                                    ) : (
                                        <><Save className="h-4 w-4 mr-2" /> {t('saveChanges')}</>
                                    )}
                                </Button>
                            </div>
                        )}

                        {/* Appearance Section */}
                        {activeSection === "appearance" && (
                            <div className="space-y-6">
                                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <Palette className="h-5 w-5 text-orange-400" />
                                    {t('appearance')}
                                </h2>

                                {/* Theme Selection */}
                                <div>
                                    <label className="text-sm text-white/60 mb-3 block">{t('theme')}</label>
                                    <div className="grid grid-cols-3 gap-4">
                                        {[
                                            { id: "dark", label: t('dark'), icon: Moon },
                                            { id: "light", label: t('light'), icon: Sun },
                                            { id: "system", label: t('system'), icon: Settings }
                                        ].map((theme) => (
                                            <motion.button
                                                key={theme.id}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => updateSetting('theme', theme.id)}
                                                className={`p-4 rounded-xl text-center transition-all ${settings.theme === theme.id
                                                    ? 'bg-orange-500/20 border-2 border-orange-500'
                                                    : 'bg-zinc-800 border-2 border-zinc-700 hover:border-zinc-600'}`}
                                            >
                                                <theme.icon className={`h-6 w-6 mx-auto mb-2 ${settings.theme === theme.id ? 'text-orange-400' : 'text-white/60'}`} />
                                                <span className={`text-sm ${settings.theme === theme.id ? 'text-orange-400' : 'text-white'}`}>{theme.label}</span>
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                {/* Lite Mode */}
                                <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                                    <div className="flex items-center gap-3">
                                        <Sparkles className="h-5 w-5 text-orange-400" />
                                        <div>
                                            <p className="text-sm font-medium text-white">{t('liteMode')}</p>
                                            <p className="text-xs text-white/40">{t('liteModeDesc')}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => updateSetting('liteMode', !settings.liteMode)}
                                        className={`w-12 h-6 rounded-full transition-colors ${settings.liteMode ? 'bg-orange-500' : 'bg-zinc-700'
                                            }`}
                                    >
                                        <motion.div
                                            animate={{ x: settings.liteMode ? 24 : 2 }}
                                            className="w-5 h-5 rounded-full bg-white shadow"
                                        />
                                    </button>
                                </div>

                                <Button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold"
                                >
                                    {isSaving ? (
                                        <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> {t('saving')}</>
                                    ) : (
                                        <><Save className="h-4 w-4 mr-2" /> {t('saveChanges')}</>
                                    )}
                                </Button>
                            </div>
                        )}

                        {/* Sound Section */}
                        {activeSection === "sound" && (
                            <div className="space-y-6">
                                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <Volume2 className="h-5 w-5 text-orange-400" />
                                    {t('soundEffectsTitle')}
                                </h2>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                                        <div className="flex items-center gap-3">
                                            {settings.soundEffects ? <Volume2 className="h-5 w-5 text-orange-400" /> : <VolumeX className="h-5 w-5 text-white/40" />}
                                            <div>
                                                <p className="text-sm font-medium text-white">{t('soundEffectsToggle')}</p>
                                                <p className="text-xs text-white/40">{t('soundEffectsDesc')}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => updateSetting('soundEffects', !settings.soundEffects)}
                                            className={`w-12 h-6 rounded-full transition-colors ${settings.soundEffects ? 'bg-orange-500' : 'bg-zinc-700'
                                                }`}
                                        >
                                            <motion.div
                                                animate={{ x: settings.soundEffects ? 24 : 2 }}
                                                className="w-5 h-5 rounded-full bg-white shadow"
                                            />
                                        </button>
                                    </div>

                                    <div className="p-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20">
                                        <div className="flex items-center gap-3 mb-3">
                                            <Gamepad2 className="h-5 w-5 text-orange-400" />
                                            <p className="text-sm font-medium text-white">{t('gameEffects')}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            {[t('levelUp'), t('xpGain'), t('badgeUnlock'), t('streak')].map((effect) => (
                                                <button key={effect} className="p-3 rounded-lg bg-zinc-800/50 text-sm text-white/80 hover:bg-zinc-700/50 transition-colors">
                                                    {effect}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold"
                                >
                                    {isSaving ? (
                                        <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> {t('saving')}</>
                                    ) : (
                                        <><Save className="h-4 w-4 mr-2" /> {t('saveChanges')}</>
                                    )}
                                </Button>
                            </div>
                        )}

                        {/* Language Section */}
                        {activeSection === "language" && (
                            <div className="space-y-6">
                                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <Globe className="h-5 w-5 text-orange-400" />
                                    {t('languageRegion')}
                                </h2>

                                <div>
                                    <label className="text-sm text-white/60 mb-3 block">{t('displayLanguage')}</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        {availableLanguages.map((lang) => (
                                            <motion.button
                                                key={lang.id}
                                                whileHover={{ scale: 1.02 }}
                                                onClick={() => handleLanguageChange(lang.id)}
                                                className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${language === lang.id
                                                    ? 'bg-orange-500/20 border-orange-500'
                                                    : 'bg-zinc-800 border-zinc-700 hover:border-zinc-600'
                                                    }`}
                                            >
                                                <span className="text-2xl">{lang.flag}</span>
                                                <div className="text-left">
                                                    <span className="text-sm text-white block">{lang.label}</span>
                                                    <span className="text-xs text-white/40">{lang.native}</span>
                                                </div>
                                                {language === lang.id && (
                                                    <Check className="h-4 w-4 text-orange-400 ml-auto" />
                                                )}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                                    <p className="text-amber-400 text-sm">
                                        ✨ {language === 'english' ? 'Language preference saved! The entire app will now display in your selected language.' :
                                            language === 'hindi' ? 'भाषा वरीयता सहेजी गई! अब पूरा ऐप आपकी चुनी हुई भाषा में दिखाई देगा।' :
                                                language === 'tamil' ? 'மொழி விருப்பம் சேமிக்கப்பட்டது! முழு ஆப்பும் இப்போது உங்கள் தேர்ந்தெடுத்த மொழியில் காண்பிக்கும்.' :
                                                    'భాష ప్రాధాన్యత సేవ్ చేయబడింది! ఇప్పుడు మొత్తం యాప్ మీరు ఎంచుకున్న భాషలో ప్రదర్శించబడుతుంది.'}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Privacy Section */}
                        {activeSection === "privacy" && (
                            <div className="space-y-6">
                                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-orange-400" />
                                    {t('privacySecurity')}
                                </h2>

                                <div className="space-y-3">
                                    <motion.button
                                        whileHover={{ scale: 1.01 }}
                                        className="w-full flex items-center justify-between p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50 hover:border-orange-500/30 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Lock className="h-5 w-5 text-orange-400" />
                                            <div className="text-left">
                                                <p className="text-sm font-medium text-white">{t('changePassword')}</p>
                                                <p className="text-xs text-white/40">{t('changePasswordDesc')}</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="h-5 w-5 text-white/30" />
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.01 }}
                                        className="w-full flex items-center justify-between p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50 hover:border-orange-500/30 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Target className="h-5 w-5 text-orange-400" />
                                            <div className="text-left">
                                                <p className="text-sm font-medium text-white">{t('profileVisibility')}</p>
                                                <p className="text-xs text-white/40">{t('profileVisibilityDesc')}</p>
                                            </div>
                                        </div>
                                        <Badge className="bg-emerald-500/20 text-emerald-400 border-0">{t('friendsOnly')}</Badge>
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.01 }}
                                        className="w-full flex items-center justify-between p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50 hover:border-orange-500/30 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <User className="h-5 w-5 text-orange-400" />
                                            <div className="text-left">
                                                <p className="text-sm font-medium text-white">{t('leaderboardDisplay')}</p>
                                                <p className="text-xs text-white/40">{t('leaderboardDisplayDesc')}</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="h-5 w-5 text-white/30" />
                                    </motion.button>
                                </div>
                            </div>
                        )}

                        {/* Help Section */}
                        {activeSection === "help" && (
                            <div className="space-y-6">
                                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <HelpCircle className="h-5 w-5 text-orange-400" />
                                    {t('helpSupport')}
                                </h2>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/20 cursor-pointer"
                                    >
                                        <div className="text-3xl mb-3">📚</div>
                                        <h3 className="text-white font-medium mb-1">{t('tutorials')}</h3>
                                        <p className="text-xs text-white/50 mb-3">{t('tutorialsDesc')}</p>
                                        <Button variant="outline" size="sm" className="rounded-lg border-orange-500/30 text-orange-400 hover:bg-orange-500/10">
                                            {t('watchTutorials')}
                                        </Button>
                                    </motion.div>
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 cursor-pointer"
                                    >
                                        <div className="text-3xl mb-3">💬</div>
                                        <h3 className="text-white font-medium mb-1">{t('askQuestion')}</h3>
                                        <p className="text-xs text-white/50 mb-3">{t('askQuestionDesc')}</p>
                                        <Button variant="outline" size="sm" className="rounded-lg border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
                                            {t('contactSupport')}
                                        </Button>
                                    </motion.div>
                                </div>

                                <div className="p-4 rounded-xl bg-zinc-800/50 text-center border border-zinc-700/50">
                                    <p className="text-sm text-white/60">{t('version')}</p>
                                    <p className="text-xs text-white/30 mt-1">{t('copyright')}</p>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default StudentSettings;
