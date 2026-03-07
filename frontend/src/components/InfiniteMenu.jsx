import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const InfiniteMenu = ({ items }) => {
    const containerRef = useRef(null);
    const [width, setWidth] = useState(0);
    const x = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 100, damping: 30 });

    useEffect(() => {
        if (containerRef.current) {
            setWidth(containerRef.current.scrollWidth - containerRef.current.offsetWidth);
        }
    }, [items]);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
        >
            <motion.div
                drag="x"
                dragConstraints={{ left: -width, right: 0 }}
                style={{ x: springX }}
                className="flex gap-8 p-8"
            >
                {[...items, ...items, ...items].map((item, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.05, rotateY: 5 }}
                        className="flex-shrink-0 w-80 h-96 rounded-3xl overflow-hidden relative group"
                        style={{ transformPerspective: 1000 }}
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                            <p className="text-white/80">{item.description}</p>
                        </div>
                        <div className="absolute inset-0 border-2 border-white/0 group-hover:border-orange-500 rounded-3xl transition-colors" />
                    </motion.div>
                ))}
            </motion.div>

            {/* Gradient edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
        </div>
    );
};

export default InfiniteMenu;
