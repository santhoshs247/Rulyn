import React, { useState } from "react";
import { ArrowRight, Repeat2, Trophy, Target, Zap, Star } from "lucide-react";

const StudentFlipCard = ({ student }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    if (!student) {
        return null;
    }

    const gradientColor = student.color || "from-blue-500 to-purple-600";

    return (
        <div
            className="relative w-[320px] h-[400px] cursor-pointer mx-auto"
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
            onClick={() => setIsFlipped(!isFlipped)}
        >
            {/* Front Card */}
            <div
                className={`absolute inset-0 w-full h-full rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-xl overflow-hidden transition-all duration-500 ${isFlipped ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
            >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradientColor} opacity-5`} />

                {/* Content */}
                <div className="relative h-full p-5 flex flex-col">
                    {/* Student info */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${gradientColor} flex items-center justify-center text-3xl flex-shrink-0 shadow-lg`}>
                            {student.avatar}
                        </div>
                        <div className="min-w-0">
                            <h3 className="font-bold text-lg text-zinc-900 dark:text-white truncate">
                                {student.name}
                            </h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                Age {student.age} • Student
                            </p>
                        </div>
                    </div>

                    {/* Quote */}
                    <div className="flex-1 relative overflow-hidden">
                        <div className="absolute -left-1 top-0 text-5xl text-zinc-200 dark:text-zinc-700 leading-none">"</div>
                        <p className="text-zinc-600 dark:text-zinc-300 italic leading-relaxed pl-5 pt-3 text-sm line-clamp-5">
                            {student.quote}
                        </p>
                    </div>

                    {/* Star rating */}
                    <div className="flex gap-1 my-3">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800">
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${gradientColor} text-white text-sm font-bold shadow-md`}>
                            <Trophy className="h-3.5 w-3.5" />
                            {student.score}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                            <span>Flip</span>
                            <Repeat2 className="h-4 w-4 text-blue-500 group-hover:rotate-180 transition-transform" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Back Card */}
            <div
                className={`absolute inset-0 w-full h-full rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-xl overflow-hidden transition-all duration-500 ${isFlipped ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            >
                <div className="h-full p-5 flex flex-col">
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-zinc-100 dark:border-zinc-800">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradientColor} flex items-center justify-center text-xl flex-shrink-0`}>
                            {student.avatar}
                        </div>
                        <div className="min-w-0">
                            <h3 className="font-bold text-base text-zinc-900 dark:text-white truncate">
                                {student.name}
                            </h3>
                            <p className="text-xs text-zinc-500">Achievement Report</p>
                        </div>
                    </div>

                    {/* Tests Completed */}
                    <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Target className="h-4 w-4 text-blue-500" />
                            <h4 className="font-semibold text-sm text-zinc-800 dark:text-white">Tests Completed</h4>
                        </div>
                        <div className="space-y-1.5">
                            {student.tests?.slice(0, 3).map((test, index) => (
                                <div
                                    className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-800 rounded-lg px-2.5 py-1.5"
                                    key={index}
                                >
                                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                                    <span className="truncate flex-1">{test}</span>
                                    <Zap className="h-3 w-3 text-yellow-500 flex-shrink-0" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Achievements */}
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <Trophy className="h-4 w-4 text-yellow-500" />
                            <h4 className="font-semibold text-sm text-zinc-800 dark:text-white">Achievements</h4>
                        </div>
                        <div className="space-y-1">
                            {student.achievements?.slice(0, 3).map((achievement, index) => (
                                <div
                                    className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300"
                                    key={index}
                                >
                                    <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 flex-shrink-0" />
                                    <span className="truncate">{achievement}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stats footer */}
                    <div className={`flex items-center justify-between gap-3 rounded-xl p-3 bg-gradient-to-r ${gradientColor} mt-3`}>
                        <div>
                            <div className="text-white/80 text-[10px] font-medium">Improvement</div>
                            <div className="text-white font-bold text-lg">{student.improvement}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-white/80 text-[10px] font-medium">Score</div>
                            <div className="text-white font-bold text-lg">{student.score}</div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-white" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentFlipCard;
