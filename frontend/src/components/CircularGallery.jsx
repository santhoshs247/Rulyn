import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';

const CircularGallery = ({
    bend = 3,
    textColor = "#ffffff",
    borderRadius = 0.05,
    scrollEase = 0.02
}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const containerRef = useRef(null);

    // Gallery items with educational themes
    const items = [
        {
            image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=80",
            title: "Science Lab",
            emoji: "🔬",
            color: "from-purple-500 to-pink-600",
            description: "Explore chemistry, physics & biology through hands-on experiments"
        },
        {
            image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80",
            title: "Mathematics",
            emoji: "📐",
            color: "from-green-500 to-emerald-600",
            description: "Master algebra, geometry & calculus with visual learning"
        },
        {
            image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&auto=format&fit=crop&q=80",
            title: "Technology",
            emoji: "💻",
            color: "from-blue-500 to-cyan-600",
            description: "Learn coding, AI & digital skills for the future"
        },
        {
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80",
            title: "Students Learning",
            emoji: "📚",
            color: "from-orange-500 to-red-600",
            description: "Join collaborative study sessions with peers"
        },
        {
            image: "https://images.unsplash.com/photo-1581726707445-75cbe4efc586?w=800&auto=format&fit=crop&q=80",
            title: "Engineering",
            emoji: "⚙️",
            color: "from-yellow-500 to-orange-600",
            description: "Build robots, design structures & solve problems"
        },
        {
            image: "https://images.unsplash.com/photo-1596496050755-c923e73e42e1?w=800&auto=format&fit=crop&q=80",
            title: "Group Study",
            emoji: "👥",
            color: "from-pink-500 to-rose-600",
            description: "Learn together through collaborative projects"
        }
    ];

    const totalItems = items.length;

    // Auto-advance carousel
    useEffect(() => {
        const timer = setInterval(() => {
            paginate(1);
        }, 4000);
        return () => clearInterval(timer);
    }, [activeIndex]);

    // Scroll handler
    useEffect(() => {
        const handleWheel = (e) => {
            if (containerRef.current?.contains(e.target)) {
                e.preventDefault();
                if (e.deltaY > 0) {
                    paginate(1);
                } else {
                    paginate(-1);
                }
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        return () => window.removeEventListener('wheel', handleWheel);
    }, [activeIndex]);

    const paginate = (newDirection) => {
        setDirection(newDirection);
        setActiveIndex((prev) => {
            let next = prev + newDirection;
            if (next < 0) next = totalItems - 1;
            if (next >= totalItems) next = 0;
            return next;
        });
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.5,
            rotateY: direction > 0 ? 45 : -45
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.5,
            rotateY: direction < 0 ? 45 : -45
        })
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset, velocity) => {
        return Math.abs(offset) * velocity;
    };

    // Background cards (previous and next)
    const getPreviousIndex = () => (activeIndex - 1 + totalItems) % totalItems;
    const getNextIndex = () => (activeIndex + 1) % totalItems;

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full flex items-center justify-center overflow-hidden select-none"
            style={{ perspective: '2000px' }}
        >
            {/* Title removed - provided by parent component */}

            {/* Background cards container */}
            <div className="absolute inset-0 flex items-center justify-center">
                {/* Previous card (left, faded) */}
                <motion.div
                    initial={{ opacity: 0, x: -200, scale: 0.8 }}
                    animate={{ opacity: 0.3, x: -250, scale: 0.85, rotateY: 20 }}
                    className="absolute w-80 h-96 pointer-events-none"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 dark:border-zinc-800/50">
                        <img
                            src={items[getPreviousIndex()].image}
                            alt={items[getPreviousIndex()].title}
                            className="w-full h-full object-cover"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${items[getPreviousIndex()].color} opacity-40`} />
                    </div>
                </motion.div>

                {/* Next card (right, faded) */}
                <motion.div
                    initial={{ opacity: 0, x: 200, scale: 0.8 }}
                    animate={{ opacity: 0.3, x: 250, scale: 0.85, rotateY: -20 }}
                    className="absolute w-80 h-96 pointer-events-none"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 dark:border-zinc-800/50">
                        <img
                            src={items[getNextIndex()].image}
                            alt={items[getNextIndex()].title}
                            className="w-full h-full object-cover"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${items[getNextIndex()].color} opacity-40`} />
                    </div>
                </motion.div>

                {/* Main active card */}
                <div className="relative z-10 w-full max-w-md md:max-w-lg" style={{ transformStyle: 'preserve-3d' }}>
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                        <motion.div
                            key={activeIndex}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.3 },
                                scale: { duration: 0.4 },
                                rotateY: { duration: 0.4 }
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = swipePower(offset.x, velocity.x);
                                if (swipe < -swipeConfidenceThreshold) {
                                    paginate(1);
                                } else if (swipe > swipeConfidenceThreshold) {
                                    paginate(-1);
                                }
                            }}
                            className="relative cursor-grab active:cursor-grabbing"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <motion.div
                                whileHover={{ scale: 1.02, y: -10 }}
                                className="w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-zinc-800 bg-white dark:bg-zinc-900 relative"
                            >
                                {/* Image with parallax effect */}
                                <motion.div
                                    className="absolute inset-0"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <img
                                        src={items[activeIndex].image}
                                        alt={items[activeIndex].title}
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>

                                {/* Gradient overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-t ${items[activeIndex].color} opacity-60`} />

                                {/* Content overlay */}
                                <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        {/* Emoji */}
                                        <motion.div
                                            className="text-6xl mb-4"
                                            animate={{
                                                rotate: [0, 10, -10, 0],
                                                scale: [1, 1.1, 1]
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                repeatDelay: 1
                                            }}
                                        >
                                            {items[activeIndex].emoji}
                                        </motion.div>

                                        {/* Title */}
                                        <h3 className="text-4xl font-black mb-3 drop-shadow-2xl">
                                            {items[activeIndex].title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-white/90 text-base mb-6 leading-relaxed">
                                            {items[activeIndex].description}
                                        </p>

                                        {/* CTA Button */}
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-3 bg-white text-gray-900 rounded-full font-bold shadow-xl hover:shadow-2xl transition-shadow inline-flex items-center gap-2 w-fit"
                                        >
                                            Start Learning
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </motion.button>
                                    </motion.div>
                                </div>

                                {/* Shine effect on hover */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                    initial={{ x: '-100%' }}
                                    whileHover={{ x: '200%' }}
                                    transition={{ duration: 0.8 }}
                                />
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Navigation arrows */}
            <button
                onClick={() => paginate(-1)}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-transform group"
                aria-label="Previous"
            >
                <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button
                onClick={() => paginate(1)}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-transform group"
                aria-label="Next"
            >
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Progress dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-50">
                {items.map((item, index) => (
                    <motion.button
                        key={index}
                        onClick={() => {
                            setDirection(index > activeIndex ? 1 : -1);
                            setActiveIndex(index);
                        }}
                        className={`rounded-full transition-all ${activeIndex === index
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 w-10 h-3'
                            : 'bg-white/40 dark:bg-gray-600/40 w-3 h-3 hover:bg-white/60 dark:hover:bg-gray-500/60'
                            }`}
                        whileHover={{ scale: 1.3 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={`Go to ${item.title}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default CircularGallery;
