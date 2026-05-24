import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

interface StarFieldProps {
    count?: number;
    mobileCount?: number;
}

const StarField = ({ count = 50, mobileCount = 25 }: StarFieldProps) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");
        setIsMobile(mediaQuery.matches);

        const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mediaQuery.addEventListener("change", listener);
        return () => mediaQuery.removeEventListener("change", listener);
    }, []);

    const stars = useMemo(() => {
        const starCount = isMobile ? mobileCount : count;
        return Array.from({ length: starCount }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            twinkle: Math.random() > 0.5,
            delay: Math.random() * 3,
            duration: Math.random() * 2 + 1.5,
        }));
    }, [count, mobileCount, isMobile]);

    return (
        <>
            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    className={`absolute rounded-full pointer-events-none bg-black dark:bg-white ${star.twinkle ? "" : "opacity-40"}`}
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: star.size,
                        height: star.size,
                    }}
                    {...(star.twinkle ? {
                        animate: { opacity: [0.2, 0.8, 0.2] },
                        transition: {
                            duration: star.duration,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: star.delay,
                        },
                    } : {})}
                />
            ))}
        </>
    );
};

export default StarField;