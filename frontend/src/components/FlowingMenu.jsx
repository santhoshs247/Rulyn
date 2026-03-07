import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FlowingMenu = ({ items = [] }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (!isHovered) {
            timeoutRef.current = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % items.length);
            }, 3000);
        }

        return () => {
            if (timeoutRef.current) {
                clearInterval(timeoutRef.current);
            }
        };
    }, [isHovered, items.length]);

    const handleMouseEnter = (index) => {
        setIsHovered(true);
        setActiveIndex(index);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-white dark:from-zinc-950 dark:to-zinc-900 relative overflow-hidden">
            {/* Background animated shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [0, -90, 0],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl"
                />
            </div>

            <div className="relative w-full h-full flex flex-col md:flex-row items-center justify-center gap-8 p-8">
                {/* Menu Items */}
                <div className="flex flex-col gap-3 z-10 w-full md:w-auto">
                    {items.map((item, index) => {
                        const isActive = activeIndex === index;

                        return (
                            <motion.a
                                key={index}
                                href={item.link}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                                className="relative group cursor-pointer"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <motion.div
                                    className={`relative px-8 py-4 rounded-2xl transition-all duration-300 ${isActive
                                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-2xl shadow-purple-500/50'
                                            : 'bg-white/50 dark:bg-zinc-900/50 hover:bg-white/80 dark:hover:bg-zinc-800/80 backdrop-blur-sm border border-gray-200 dark:border-zinc-700'
                                        }`}
                                    whileHover={{ scale: 1.05, x: 10 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {/* Icon */}
                                    <div className="flex items-center gap-4">
                                        <motion.div
                                            className={`text-4xl transition-transform ${isActive ? 'scale-110' : ''}`}
                                            animate={{ rotate: isActive ? [0, 10, -10, 0] : 0 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            {item.icon}
                                        </motion.div>

                                        <div>
                                            <h3 className={`text-xl md:text-2xl font-bold transition-colors ${isActive ? 'text-white' : 'text-gray-900 dark:text-white'
                                                }`}>
                                                {item.text}
                                            </h3>
                                            <p className={`text-sm transition-colors ${isActive ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'
                                                }`}>
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Active indicator */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeIndicator"
                                            className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-12 bg-white rounded-full"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}

                                    {/* Hover glow */}
                                    {isActive && (
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl blur-xl"
                                            animate={{ opacity: [0.5, 1, 0.5] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                    )}
                                </motion.div>
                            </motion.a>
                        );
                    })}
                </div>

                {/* Image Display */}
                <div className="relative w-full md:w-[500px] h-[400px] rounded-3xl overflow-hidden shadow-2xl z-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, scale: 1.1, rotateY: -15 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                            exit={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0"
                        >
                            <img
                                src={items[activeIndex]?.image}
                                alt={items[activeIndex]?.text}
                                className="w-full h-full object-cover"
                            />

                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                            {/* Info overlay */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="absolute bottom-0 left-0 right-0 p-8 text-white"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="text-5xl">{items[activeIndex]?.icon}</div>
                                    <h2 className="text-3xl font-bold">{items[activeIndex]?.text}</h2>
                                </div>
                                <p className="text-white/90 text-lg mb-4">{items[activeIndex]?.description}</p>

                                {/* Stats */}
                                <div className="flex gap-6 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                        <span>{items[activeIndex]?.stats?.lessons} Lessons</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                                        <span>{items[activeIndex]?.stats?.students} Students</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                                        <span>{items[activeIndex]?.stats?.duration}</span>
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="mt-6 px-6 py-3 bg-white text-gray-900 rounded-full font-bold shadow-xl hover:shadow-2xl transition-shadow"
                                >
                                    Start Learning →
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Image border glow */}
                    <div className="absolute inset-0 border-4 border-white/20 dark:border-zinc-700/50 rounded-3xl pointer-events-none" />
                </div>
            </div>

            {/* Progress dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {items.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`transition-all ${activeIndex === index
                                ? 'w-8 h-2 bg-gradient-to-r from-blue-600 to-purple-600'
                                : 'w-2 h-2 bg-gray-400/50 hover:bg-gray-400/80'
                            } rounded-full`}
                    />
                ))}
            </div>
        </div>
    );
};

export default FlowingMenu;
