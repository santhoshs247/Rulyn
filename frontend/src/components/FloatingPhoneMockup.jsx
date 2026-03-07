import React from "react";
import { motion } from "framer-motion";
import { Wifi, Battery, Check, Trophy, Flame, Sparkles, Star } from "lucide-react";

const FloatingPhoneMockup = () => {
    return (
        <section className="grid place-content-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-zinc-950 dark:to-zinc-900 p-12 py-20">
            <div className="text-center mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-3"
                >
                    <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                        Experience Rulyn
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Learning made fun on any device
                    </p>
                </motion.div>
            </div>
            <FloatingPhone />
        </section>
    );
};

const FloatingPhone = () => {
    return (
        <div
            style={{
                transformStyle: "preserve-3d",
                transform: "rotateY(-20deg) rotateX(10deg)",
            }}
            className="rounded-[24px] bg-gradient-to-br from-blue-600 to-purple-600 p-2"
        >
            <motion.div
                initial={{
                    transform: "translateZ(8px) translateY(-2px)",
                }}
                animate={{
                    transform: "translateZ(32px) translateY(-8px)",
                }}
                transition={{
                    repeat: Infinity,
                    repeatType: "mirror",
                    duration: 2,
                    ease: "easeInOut",
                }}
                className="relative h-[600px] w-[320px] rounded-[24px] border-2 border-b-4 border-r-4 border-white border-l-gray-200 border-t-gray-200 bg-zinc-900 p-1 pl-[3px] pt-[3px] shadow-2xl"
            >
                <HeaderBar />
                <Screen />
            </motion.div>
        </div>
    );
};

const HeaderBar = () => {
    return (
        <>
            {/* Notch */}
            <div className="absolute left-[50%] top-2.5 z-10 h-2 w-20 -translate-x-[50%] rounded-md bg-zinc-900"></div>
            {/* Status icons */}
            <div className="absolute right-3 top-2 z-10 flex gap-2">
                <Wifi className="h-3.5 w-3.5 text-gray-600" />
                <Battery className="h-3.5 w-3.5 text-gray-600" />
            </div>
        </>
    );
};

const Screen = () => {
    return (
        <div className="relative z-0 h-full w-full overflow-hidden rounded-[20px] bg-gradient-to-br from-gray-50 to-white dark:from-zinc-900 dark:to-zinc-950">
            {/* App Header */}
            <div className="absolute top-0 inset-x-0 p-4 bg-gradient-to-r from-blue-600 to-purple-600 z-20">
                <div className="flex items-center justify-between text-white">
                    <div>
                        <div className="text-xs opacity-80">Welcome back!</div>
                        <div className="font-bold text-lg">Priya 👧</div>
                    </div>
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-bold">1,250 XP</span>
                    </div>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="pt-20 pb-16 px-3 space-y-3 overflow-y-auto h-full">
                {/* Daily Streak Card */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-zinc-800 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-zinc-700"
                >
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">Daily Streak</div>
                        <div className="text-2xl">🔥</div>
                    </div>
                    <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                        12 Days
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Keep it going!</div>
                </motion.div>

                {/* Achievement Card */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-2xl p-4 shadow-lg border border-yellow-200 dark:border-yellow-800"
                >
                    <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                            <Trophy className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Achievement</div>
                            <div className="font-bold text-gray-900 dark:text-white mb-1">First Quiz!</div>
                            <div className="text-sm font-bold text-green-600 dark:text-green-400">+50 XP Earned</div>
                            <div className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full inline-block mt-2">
                                Active
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Today's Challenge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white dark:bg-zinc-800 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-zinc-700"
                >
                    <div className="font-bold text-gray-900 dark:text-white mb-3">Today's Challenge</div>
                    <div className="space-y-2">
                        <div className="flex items-start gap-3">
                            <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check className="h-3.5 w-3.5 text-white" />
                            </div>
                            <div className="flex-1">
                                <div className="text-sm text-gray-700 dark:text-gray-300">Complete 1 Science Story</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 pl-9">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                    <div className="h-1 flex-1 bg-gray-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 w-2/3"></div>
                                    </div>
                                    <span>2/3</span>
                                </div>
                                <div className="text-sm text-gray-700 dark:text-gray-300 mt-1">Score 80% in Quiz</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="grid grid-cols-2 gap-2"
                >
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-3 text-white">
                        <div className="text-xs opacity-80 mb-1">Badges</div>
                        <div className="text-2xl font-black">5 🏆</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-3 text-white">
                        <div className="text-xs opacity-80 mb-1">Level</div>
                        <div className="text-2xl font-black">12 ⚡</div>
                    </div>
                </motion.div>
            </div>

            {/* Bottom CTA */}
            <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-white via-white dark:from-zinc-950 dark:via-zinc-950 to-transparent z-20">
                <button className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3 text-sm font-bold text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Continue Learning
                </button>
            </div>

            {/* Decorative gradient blob */}
            <div className="absolute -bottom-32 left-[50%] h-64 w-64 -translate-x-[50%] rounded-full bg-gradient-to-br from-blue-500 to-purple-500 opacity-20 blur-3xl" />
        </div>
    );
};

export default FloatingPhoneMockup;
