import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import logoWhite from "@/assets/logo/ds-logo-white.png";
import logoBlack from "@/assets/logo/ds-logo-black.png";

// Staggered letter animation variants
const titleContainerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.8,
        },
    },
};

const letterVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.4, ease: "easeOut" },
    },
};

const Splash = () => {
  const { theme } = useTheme();
  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setResolvedTheme(isDark ? "dark" : "light");

      const listener = (e: MediaQueryListEvent) => {
        setResolvedTheme(e.matches ? "dark" : "light");
      };

      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", listener);

      return () => mediaQuery.removeEventListener("change", listener);
    } else {
      setResolvedTheme(theme);
    }
  }, [theme]);

  const title = "Welcome to my Portfolio";

  // Generate random stars — positions are stable across renders
  const stars = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        twinkle: Math.random() > 0.5,
        delay: Math.random() * 3,
        duration: Math.random() * 2 + 1.5,
    }));
  }, []);


  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 z-[9999] overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 3, ease: "easeInOut" }}
    >
        {/* Animated gradient mesh background */}
        <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
                background: "radial-gradient(ellipse at 30% 20%, rgba(63,76,107,0.08), transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(96,108,136,0.06), transparent 50%)",
            }}
            animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
        />

        {/* Ash gradient background orbs */}
        <motion.div
            className="absolute top-1/4 -left-20 w-72 h-72 rounded-full opacity-20 dark:opacity-15 blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, #3f4c6b, transparent)" }}
            animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.35, 0.2],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
            className="absolute bottom-1/4 -right-20 w-72 h-72 rounded-full opacity-15 dark:opacity-10 blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, #606c88, transparent)" }}
            animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.15, 0.3, 0.15],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Stars in the sky */}
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

        <div className="flex flex-col items-center gap-6 relative z-10">
            {/* Logo */}
            <div className="relative flex items-center justify-center">
                {/* Ash glow behind logo */}
                <motion.div
                    className="absolute w-20 h-20 rounded-full blur-xl pointer-events-none"
                    style={{ background: "radial-gradient(circle, #3f4c6b, transparent)" }}
                    animate={{ 
                        scale: [1, 1.4, 1],
                        opacity: [0.4, 0.6, 0.4],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Spinning logo */}
                <motion.img
                    src={resolvedTheme === "dark" ? logoWhite : logoBlack}
                    alt="Logo"
                    className="w-16 h-16 relative z-10"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{
                        scale: { duration: 0.6, ease: "easeOut" },
                        rotate: { duration: 2.5, ease: "easeInOut", delay: 0.3 },
                    }}
                />
            </div>

            {/* Staggered letter reveal title */}
            <motion.h1
                className="text-2xl md:text-3xl font-bold font-bebas text-neutral-950 dark:text-neutral-50 flex"
                variants={titleContainerVariants}
                initial="hidden"
                animate="visible"
            >
                {title.split("").map((char, i) => (
                    <motion.span
                        key={i}
                        variants={letterVariants}
                        className={char === " " ? "w-2 md:w-3" : ""}
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
            </motion.h1>

        </div>
    </motion.div>
  );
};

export default Splash;