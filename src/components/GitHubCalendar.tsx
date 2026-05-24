import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const GitHubCalendar = ({ username }: { username: string }) => {
    const { theme } = useTheme();
    const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("light");

    useEffect(() => {
        if (theme === "system") {
            const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setResolvedTheme(isDark ? "dark" : "light");
        } else {
            setResolvedTheme(theme as "dark" | "light");
        }
    }, [theme]);

    // Use blue chart for both modes — invert on blue gives amber/yellow naturally
    const chartUrl = `https://ghchart.rshah.org/3b82f6/${username}`;

    // Dark mode: invert turns blue→amber, white→black
    const filterStyle = resolvedTheme === "dark"
        ? { filter: "invert(1) brightness(0.85)" }
        : {};

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full"
        >
            <div className="bg-neutral-100 dark:bg-neutral-900 rounded-xl border p-4 md:p-6 shadow-sm overflow-x-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <svg
                            className="w-5 h-5 text-neutral-700 dark:text-neutral-300"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                        >
                            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
                        </svg>
                        <span className="font-roboto text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            Contribution Activity
                        </span>
                    </div>
                    <a
                        href={`https://github.com/${username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-roboto text-xs text-blue-500 dark:text-yellow-400 hover:underline"
                    >
                        @{username}
                    </a>
                </div>

                {/* SVG Chart */}
                <div className="min-w-[680px]">
                    <img
                        src={chartUrl}
                        alt={`${username}'s GitHub Contribution Chart`}
                        className="w-full h-auto"
                        style={filterStyle}
                        loading="lazy"
                    />
                </div>

                {/* Legend */}
                <div className="flex items-center justify-end gap-1.5 mt-3">
                    <span className="font-roboto text-[10px] text-neutral-400 dark:text-neutral-500 mr-1">Less</span>
                    {(resolvedTheme === "dark"
                        ? ["#101010", "#854d0e", "#a16207", "#ca8a04", "#facc15"]
                        : ["#ebedf0", "#bfdbfe", "#93c5fd", "#3b82f6", "#1d4ed8"]
                    ).map((color, i) => (
                        <div
                            key={i}
                            className="w-[10px] h-[10px] rounded-[2px]"
                            style={{ backgroundColor: color }}
                        />
                    ))}
                    <span className="font-roboto text-[10px] text-neutral-400 dark:text-neutral-500 ml-1">More</span>
                </div>
            </div>
        </motion.div>
    );
};

export default GitHubCalendar;