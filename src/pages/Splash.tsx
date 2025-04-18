import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import logoWhite from "@/assets/logo/ds-logo-white.png";
import logoBlack from "@/assets/logo/ds-logo-black.png";

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

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 z-[9999]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 3, ease: "easeInOut" }}
    >
        <div className="flex flex-col items-center gap-4">
            <motion.img
                src={resolvedTheme === "dark" ? logoWhite : logoBlack}
                alt="Logo"
                className="w-16 h-16"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{
                    duration: 3,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop",
                }}
            />
            <h1 className="text-2xl md:text-3xl font-bold font-bebas text-neutral-950 dark:text-neutral-50">
                Welcome to my Portfolio
            </h1>
        </div>
    </motion.div>
  );
};

export default Splash;
