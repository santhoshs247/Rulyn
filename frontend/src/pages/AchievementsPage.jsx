import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, Medal, Lock, Crown, Zap, Target, Flame, Award, Sparkles, PartyPopper } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AchievementsPage() {
    const { t } = useLanguage();
    const [selectedBadge, setSelectedBadge] = useState(null);
    const [showConfetti, setShowConfetti] = useState(false);

    const allBadges = [
        {
            id: "first_steps",
            name: t('firstSteps'),
            desc: t('badgeFirstStepsDesc'),
            icon: "🌱",
            earned: true,
            rarity: "common",
            xpReward: 50,
            earnedDate: "Jan 5, 2026"
        },
        {
            id: "science_whiz",
            name: t('scienceWhiz'),
            desc: t('badgeScienceWhizDesc'),
            icon: "🧪",
            earned: true,
            rarity: "rare",
            xpReward: 150,
            earnedDate: "Jan 8, 2026"
        },
        {
            id: "streak_master",
            name: t('streakMaster'),
            desc: t('badgeStreakMasterDesc'),
            icon: "🔥",
            earned: true,
            rarity: "epic",
            xpReward: 300,
            earnedDate: "Jan 10, 2026"
        },
        {
            id: "quiz_champ",
            name: t('quizChampion'),
            desc: t('badgeQuizChampionDesc'),
            icon: "🏆",
            earned: false,
            rarity: "legendary",
            xpReward: 500,
            progress: 7,
            total: 10
        },
        {
            id: "speed_demon",
            name: t('speedDemon'),
            desc: t('badgeSpeedDemonDesc'),
            icon: "⚡",
            earned: false,
            rarity: "epic",
            xpReward: 250,
            progress: 0,
            total: 1
        },
        {
            id: "knowledge_seeker",
            name: t('knowledgeSeeker'),
            desc: t('badgeKnowledgeSeekerDesc'),
            icon: "📚",
            earned: false,
            rarity: "rare",
            xpReward: 200,
            progress: 23,
            total: 50
        },
        {
            id: "perfect_week",
            name: t('perfectWeek'),
            desc: t('badgePerfectWeekDesc'),
            icon: "⭐",
            earned: false,
            rarity: "legendary",
            xpReward: 600,
            progress: 4,
            total: 7
        },
        {
            id: "math_master",
            name: t('mathMaster'),
            desc: t('badgeMathMasterDesc'),
            icon: "🔢",
            earned: false,
            rarity: "epic",
            xpReward: 400,
            progress: 18,
            total: 30
        },
    ];

    const stats = {
        totalXP: 3420,
        level: 12,
        nextLevelXP: 4000,
        badgesEarned: allBadges.filter(b => b.earned).length,
        totalBadges: allBadges.length,
        rank: "Explorer III"
    };

    const rarityColors = {
        common: "from-gray-400 to-gray-600",
        rare: "from-blue-400 to-cyan-500",
        epic: "from-purple-400 to-pink-500",
        legendary: "from-yellow-400 to-orange-500"
    };

    const rarityBorderColors = {
        common: "border-l-gray-500",
        rare: "border-l-blue-500",
        epic: "border-l-purple-500",
        legendary: "border-l-yellow-500"
    };

    const rarityShadows = {
        common: "shadow-gray-500/30",
        rare: "shadow-blue-500/40",
        epic: "shadow-purple-500/40",
        legendary: "shadow-yellow-500/40"
    };

    const rarityGlows = {
        common: "hover:shadow-gray-500/50",
        rare: "hover:shadow-blue-500/60",
        epic: "hover:shadow-purple-500/60",
        legendary: "hover:shadow-yellow-500/60"
    };

    const container = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.05 } }
    };

    const item = {
        hidden: { scale: 0.8, opacity: 0 },
        show: { scale: 1, opacity: 1 }
    };

    const Confetti = () => (
        <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(50)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: -20,
                        rotate: 0
                    }}
                    animate={{
                        y: window.innerHeight + 20,
                        rotate: Math.random() * 720
                    }}
                    transition={{
                        duration: 2 + Math.random() * 2,
                        ease: "linear"
                    }}
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                        backgroundColor: ['#FFD700', '#FF69B4', '#00CED1', '#FF6347', '#9370DB'][Math.floor(Math.random() * 5)],
                        left: Math.random() * 100 + '%'
                    }}
                />
            ))}
        </div>
    );

    return (
        <div className="space-y-8 pb-20">
            {showConfetti && <Confetti />}

            {/* Header */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="space-y-2"
            >
                <div className="flex items-center gap-3">
                    <Trophy className="h-8 w-8 text-yellow-500" />
                    <h1 className="text-3xl font-bold">{t('trophyCabinet')}</h1>
                </div>
                <p className="text-muted-foreground">{t('collectBadges')}</p>
            </motion.div>

            {/* Stats Banner */}
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 p-1"
            >
                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />

                    <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                                {stats.level}
                            </div>
                            <div className="text-xs text-muted-foreground font-medium mt-1">{t('level')}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
                                {stats.totalXP}
                            </div>
                            <div className="text-xs text-muted-foreground font-medium mt-1">{t('totalXP')}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-orange-600">
                                {stats.badgesEarned}
                            </div>
                            <div className="text-xs text-muted-foreground font-medium mt-1">{t('badges')}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1">
                                <Crown className="h-6 w-6" /> {stats.rank}
                            </div>
                            <div className="text-xs text-muted-foreground font-medium mt-1">Current Rank</div>
                        </div>
                    </div>

                    {/* XP Progress */}
                    <div className="mt-6 space-y-2">
                        <div className="flex justify-between text-xs font-medium">
                            <span className="flex items-center gap-1">
                                <Zap className="h-3 w-3 text-yellow-500" />
                                Level {stats.level}
                            </span>
                            <span className="text-muted-foreground">{stats.nextLevelXP - stats.totalXP} XP to next level</span>
                        </div>
                        <div className="h-3 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(stats.totalXP / stats.nextLevelXP) * 100}%` }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 relative overflow-hidden"
                            >
                                <motion.div
                                    animate={{ x: ['-100%', '200%'] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                <Button size="sm" className="rounded-full">{t('allBadges')}</Button>
                <Button size="sm" variant="outline" className="rounded-full">{t('earned')}</Button>
                <Button size="sm" variant="outline" className="rounded-full">{t('locked')}</Button>
                <Button size="sm" variant="outline" className="rounded-full">{t('legendary')}</Button>
            </div>

            {/* Badges Grid */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
                {allBadges.map((badge) => (
                    <motion.div
                        variants={item}
                        key={badge.id}
                        whileHover={{ y: -8, scale: 1.02 }}
                        onClick={() => setSelectedBadge(badge)}
                        className="cursor-pointer"
                    >
                        <Card className={`relative h-full overflow-hidden transition-all duration-300 ${badge.earned
                            ? `bg-zinc-900/90 border-l-4 ${rarityBorderColors[badge.rarity]} border-t-0 border-r-0 border-b-0 shadow-xl ${rarityShadows[badge.rarity]} ${rarityGlows[badge.rarity]}`
                            : "bg-zinc-900/60 border border-zinc-800 opacity-70"
                            }`}>
                            {/* Side glow effect */}
                            {badge.earned && (
                                <>
                                    <motion.div
                                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${rarityColors[badge.rarity]}`}
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-r ${rarityColors[badge.rarity]} opacity-5`} />
                                </>
                            )}

                            <CardHeader className="pt-6 pb-3 text-center">
                                <div className="relative mx-auto w-20 h-20 mb-3">
                                    {badge.earned ? (
                                        <>
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                                className={`absolute inset-0 rounded-full bg-gradient-to-r ${rarityColors[badge.rarity]} opacity-20 blur-xl`}
                                            />
                                            <div className={`relative z-10 w-full h-full rounded-full bg-gradient-to-br ${rarityColors[badge.rarity]} flex items-center justify-center text-4xl shadow-2xl shadow-current border-4 border-zinc-800`}>
                                                {badge.icon}
                                            </div>
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="absolute -top-2 -right-2 bg-emerald-500 rounded-full p-1 border-2 border-zinc-900 z-20 shadow-lg shadow-emerald-500/50"
                                            >
                                                <Sparkles className="h-3 w-3 text-white" />
                                            </motion.div>
                                        </>
                                    ) : (
                                        <div className="w-full h-full rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
                                            <Lock className="h-8 w-8 text-gray-400" />
                                        </div>
                                    )}
                                </div>

                                <CardTitle className="text-base font-bold leading-tight text-white">
                                    {badge.name}
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="pb-6 space-y-3">
                                <CardDescription className="text-xs text-center min-h-[32px] text-white/60">
                                    {badge.desc}
                                </CardDescription>

                                {badge.earned ? (
                                    <div className="space-y-2">
                                        <Badge variant="secondary" className={`w-full justify-center text-xs uppercase tracking-wider bg-gradient-to-r ${rarityColors[badge.rarity]} text-white border-0`}>
                                            {badge.rarity}
                                        </Badge>
                                        <div className="text-center text-xs text-muted-foreground">
                                            Earned {badge.earnedDate}
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        {badge.progress !== undefined && (
                                            <div className="space-y-1">
                                                <div className="flex justify-between text-xs font-medium">
                                                    <span>Progress</span>
                                                    <span>{badge.progress}/{badge.total}</span>
                                                </div>
                                                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${(badge.progress / badge.total) * 100}%` }}
                                                        className={`h-full bg-gradient-to-r ${rarityColors[badge.rarity]}`}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        <Badge variant="outline" className="w-full justify-center text-xs">
                                            Locked
                                        </Badge>
                                    </>
                                )}

                                <div className="text-center pt-2 border-t border-dashed">
                                    <span className="text-xs font-bold text-amber-400">
                                        +{badge.xpReward} XP
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>

            {/* Badge Detail Modal */}
            <AnimatePresence>
                {selectedBadge && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedBadge(null)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.8, y: 50 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-zinc-900 rounded-3xl p-8 max-w-md w-full shadow-2xl border-2"
                            style={{ borderColor: selectedBadge.earned ? `var(--${selectedBadge.rarity})` : 'transparent' }}
                        >
                            <div className="text-center space-y-6">
                                <div className="relative mx-auto w-32 h-32">
                                    {selectedBadge.earned && (
                                        <motion.div
                                            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                                            transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity } }}
                                            className={`absolute inset-0 rounded-full bg-gradient-to-r ${rarityColors[selectedBadge.rarity]} opacity-30 blur-2xl`}
                                        />
                                    )}
                                    <div className={`relative z-10 w-full h-full rounded-full ${selectedBadge.earned ? `bg-gradient-to-br ${rarityColors[selectedBadge.rarity]}` : 'bg-gray-200 dark:bg-zinc-800'} flex items-center justify-center text-6xl shadow-2xl border-4 border-white dark:border-zinc-900`}>
                                        {selectedBadge.earned ? selectedBadge.icon : <Lock className="h-12 w-12 text-gray-400" />}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold mb-2">{selectedBadge.name}</h3>
                                    <p className="text-muted-foreground">{selectedBadge.desc}</p>
                                </div>

                                {selectedBadge.earned ? (
                                    <div className="space-y-3">
                                        <Badge className={`text-sm px-4 py-1 bg-gradient-to-r ${rarityColors[selectedBadge.rarity]} border-0 text-white`}>
                                            {selectedBadge.rarity.toUpperCase()}
                                        </Badge>
                                        <div className="text-sm text-muted-foreground">
                                            Earned on {selectedBadge.earnedDate}
                                        </div>
                                        <div className="text-lg font-bold text-yellow-600 dark:text-yellow-500">
                                            Rewarded +{selectedBadge.xpReward} XP
                                        </div>
                                        <Button
                                            onClick={() => {
                                                setShowConfetti(true);
                                                setTimeout(() => setShowConfetti(false), 3000);
                                            }}
                                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                        >
                                            <PartyPopper className="mr-2 h-4 w-4" />
                                            Celebrate!
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <div className="text-sm text-muted-foreground">
                                            Complete this challenge to unlock
                                        </div>
                                        {selectedBadge.progress !== undefined && (
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm font-medium">
                                                    <span>Your Progress</span>
                                                    <span>{selectedBadge.progress}/{selectedBadge.total}</span>
                                                </div>
                                                <div className="h-3 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full bg-gradient-to-r ${rarityColors[selectedBadge.rarity]}`}
                                                        style={{ width: `${(selectedBadge.progress / selectedBadge.total) * 100}%` }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        <div className="text-lg font-bold text-yellow-600 dark:text-yellow-500">
                                            Unlock to earn +{selectedBadge.xpReward} XP
                                        </div>
                                    </div>
                                )}

                                <Button
                                    variant="outline"
                                    onClick={() => setSelectedBadge(null)}
                                    className="w-full"
                                >
                                    Close
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
