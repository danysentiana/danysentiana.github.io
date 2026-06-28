import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";


const Splash = () => {
  const { theme } = useTheme();
  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("light");
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    if (!svgRef.current) return;
    const elements = svgRef.current.querySelectorAll<SVGGeometryElement>("circle, path");
    elements.forEach((el) => {
      const length = el.getTotalLength();
      gsap.set(el, { strokeDasharray: length, strokeDashoffset: length });
    });
    gsap.to(Array.from(elements), {
      strokeDashoffset: 0,
      duration: 1.2,
      ease: "power2.inOut",
      stagger: 0.25,
    });
  }, { scope: svgRef });

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
      transition={{ duration: 5, ease: "easeInOut" }}
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
                {/* Draw-path logo */}
                <svg
                    ref={svgRef}
                    className="w-22 h-22 md:w-28 md:h-28 relative z-10"
                    viewBox="0 0 300 300"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="150" cy="150" r="140" stroke={resolvedTheme === "dark" ? "white" : "black"} strokeWidth="20" />
                    <path d="M41.5 236.5C58.3333 176.833 126.4 61 264 75" stroke={resolvedTheme === "dark" ? "white" : "black"} strokeWidth="20" strokeLinecap="round" />
                    <path d="M41 235C114.167 229.333 262 190.8 268 82" stroke={resolvedTheme === "dark" ? "white" : "black"} strokeWidth="20" strokeLinecap="round" />
                    <path d="M106 20.5C102.5 59.6667 113.7 149.4 186.5 195" stroke={resolvedTheme === "dark" ? "white" : "black"} strokeWidth="20" strokeLinecap="round" />
                </svg>
            </div>


        </div>
    </motion.div>
  );
};

export default Splash;