import React from "react";
import { useAnimate, motion } from "framer-motion";
import {
    GraduationCap,
    BookOpen,
    School,
    Award,
    Atom,
    Calculator,
    Code2,
    Globe,
    Lightbulb
} from "lucide-react";

const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

const ENTRANCE_KEYFRAMES = {
    left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
    bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
    top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
    right: [TOP_LEFT_CLIP, NO_CLIP],
};

const EXIT_KEYFRAMES = {
    left: [NO_CLIP, TOP_RIGHT_CLIP],
    bottom: [NO_CLIP, TOP_RIGHT_CLIP],
    top: [NO_CLIP, TOP_RIGHT_CLIP],
    right: [NO_CLIP, BOTTOM_LEFT_CLIP],
};

const LinkBox = ({ Icon, label, gradient }) => {
    const [scope, animate] = useAnimate();

    const getNearestSide = (e) => {
        const box = e.currentTarget.getBoundingClientRect();
        const proximities = [
            { proximity: Math.abs(box.left - e.clientX), side: "left" },
            { proximity: Math.abs(box.right - e.clientX), side: "right" },
            { proximity: Math.abs(box.top - e.clientY), side: "top" },
            { proximity: Math.abs(box.bottom - e.clientY), side: "bottom" },
        ];
        return proximities.sort((a, b) => a.proximity - b.proximity)[0].side;
    };

    const handleMouseEnter = (e) => {
        const side = getNearestSide(e);
        animate(scope.current, { clipPath: ENTRANCE_KEYFRAMES[side] }, { duration: 0.4, ease: "easeOut" });
    };

    const handleMouseLeave = (e) => {
        const side = getNearestSide(e);
        animate(scope.current, { clipPath: EXIT_KEYFRAMES[side] }, { duration: 0.4, ease: "easeOut" });
    };

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative grid h-24 sm:h-28 md:h-32 w-full place-content-center cursor-pointer group"
        >
            {/* Default State */}
            <div className="flex flex-col items-center gap-2 transition-all group-hover:scale-105">
                <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400 group-hover:text-slate-600 transition-colors" />
                <span className="text-[10px] sm:text-xs font-medium text-slate-400 uppercase tracking-wider">{label}</span>
            </div>

            {/* Hover Overlay with Clip Path Animation */}
            <div
                ref={scope}
                style={{ clipPath: BOTTOM_RIGHT_CLIP }}
                className={`absolute inset-0 grid place-content-center bg-gradient-to-br ${gradient}`}
            >
                <div className="flex flex-col items-center gap-2">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white drop-shadow-lg" />
                    <span className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-wider">{label}</span>
                </div>
            </div>
        </div>
    );
};

const ClipPathLinks = () => {
    return (
        <section className="py-16 md:py-20">
            <div className="container max-w-6xl mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Trusted By Leading Institutions
                    </p>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-700">
                        500+ Schools & Partners
                    </h3>
                </motion.div>

                {/* Interactive Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-2xl overflow-hidden border border-slate-200/80 bg-white/50 backdrop-blur-sm shadow-xl"
                >
                    {/* Row 1 - 2 items */}
                    <div className="grid grid-cols-2 divide-x divide-slate-200/80">
                        <LinkBox
                            Icon={School}
                            label="Schools"
                            gradient="from-purple-600 to-pink-600"
                        />
                        <LinkBox
                            Icon={GraduationCap}
                            label="Universities"
                            gradient="from-sky-600 to-cyan-600"
                        />
                    </div>

                    {/* Row 2 - 4 items */}
                    <div className="grid grid-cols-4 divide-x divide-slate-200/80 border-t border-slate-200/80">
                        <LinkBox
                            Icon={Atom}
                            label="Science"
                            gradient="from-orange-500 to-red-500"
                        />
                        <LinkBox
                            Icon={Code2}
                            label="Coding"
                            gradient="from-emerald-500 to-teal-500"
                        />
                        <LinkBox
                            Icon={Calculator}
                            label="Math"
                            gradient="from-blue-500 to-indigo-500"
                        />
                        <LinkBox
                            Icon={BookOpen}
                            label="Learning"
                            gradient="from-amber-500 to-orange-500"
                        />
                    </div>

                    {/* Row 3 - 3 items */}
                    <div className="grid grid-cols-3 divide-x divide-slate-200/80 border-t border-slate-200/80">
                        <LinkBox
                            Icon={Award}
                            label="Certified"
                            gradient="from-yellow-500 to-amber-500"
                        />
                        <LinkBox
                            Icon={Globe}
                            label="Global"
                            gradient="from-violet-500 to-purple-500"
                        />
                        <LinkBox
                            Icon={Lightbulb}
                            label="Innovation"
                            gradient="from-rose-500 to-pink-500"
                        />
                    </div>
                </motion.div>

                {/* Bottom Text */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-center text-sm text-slate-400 mt-6"
                >
                    Hover to explore our reach across different domains ✨
                </motion.p>
            </div>
        </section>
    );
};

export default ClipPathLinks;
