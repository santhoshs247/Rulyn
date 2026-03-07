import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion';

// Wrap function for seamless looping
const wrap = (min, max, v) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export const ScrollVelocityRow = ({
    children,
    baseVelocity = 100,
    direction = 1,
    className = ""
}) => {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef(direction);

    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        // Add scroll velocity to movement
        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className={`flex flex-nowrap overflow-hidden whitespace-nowrap ${className}`}>
            <motion.div className="flex flex-nowrap gap-8" style={{ x }}>
                <span className="block">{children}</span>
                <span className="block">{children}</span>
                <span className="block">{children}</span>
                <span className="block">{children}</span>
            </motion.div>
        </div>
    );
};

export const ScrollVelocityContainer = ({ children, className = "" }) => {
    return (
        <div className={`w-full space-y-4 ${className}`}>
            {children}
        </div>
    );
};
