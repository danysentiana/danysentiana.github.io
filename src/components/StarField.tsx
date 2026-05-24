import { motion } from "framer-motion";
import { useMemo } from "react";

interface StarFieldProps {
    count?: number;
}

const StarField = ({ count = 50 }: StarFieldProps) => {
    const stars = useMemo(() => {
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            twinkle: Math.random() > 0.5,
            delay: Math.random() * 3,
            duration: Math.random() * 2 + 1.5,
        }));
    }, [count]);

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