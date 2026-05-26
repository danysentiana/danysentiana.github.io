import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

interface ContributionDay {
    date: string;
    count: number;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Mon", "", "Wed", "", "Fri", "", ""];

const GitHubCalendar = ({ username }: { username: string }) => {
    const { theme } = useTheme();
    const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("light");
    const [contributions, setContributions] = useState<Map<string, number>>(new Map());
    const [loading, setLoading] = useState(true);
    const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);

    // Resolve theme
    useEffect(() => {
        if (theme === "system") {
            const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setResolvedTheme(isDark ? "dark" : "light");
        } else {
            setResolvedTheme(theme as "dark" | "light");
        }
    }, [theme]);

    // Fetch contribution data via CORS proxy
    const fetchContributions = useCallback(async () => {
        try {
            const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://ghchart.rshah.org/${username}`)}`;
            const res = await fetch(proxyUrl);
            const svgText = await res.text();

            const parser = new DOMParser();
            const doc = parser.parseFromString(svgText, "image/svg+xml");
            const rects = doc.querySelectorAll("rect[data-date]");

            const countMap = new Map<string, number>();
            rects.forEach((rect) => {
                const date = rect.getAttribute("data-date") || "";
                const score = parseInt(rect.getAttribute("data-score") || "0", 10);
                if (date) countMap.set(date, score);
            });

            setContributions(countMap);
        } catch (err) {
            console.error("Failed to fetch GitHub contributions:", err);
        } finally {
            setLoading(false);
        }
    }, [username]);

    useEffect(() => {
        fetchContributions();
    }, [fetchContributions]);

    // Format date using LOCAL timezone (not UTC) to match ghchart dates
    const toLocalDateStr = (date: Date): string => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, "0");
        const d = String(date.getDate()).padStart(2, "0");
        return `${y}-${m}-${d}`;
    };

    // Generate 52-week grid
    const generateGrid = (): ContributionDay[][] => {
        const today = new Date();
        const weeks: ContributionDay[][] = [];

        const startDate = new Date(today);
        startDate.setDate(startDate.getDate() - (51 * 7 + startDate.getDay()));

        for (let w = 0; w < 52; w++) {
            const week: ContributionDay[] = [];
            for (let d = 0; d < 7; d++) {
                const date = new Date(startDate);
                date.setDate(date.getDate() + w * 7 + d);
                const dateStr = toLocalDateStr(date);
                week.push({
                    date: dateStr,
                    count: contributions.get(dateStr) ?? -1,
                });
            }
            weeks.push(week);
        }

        return weeks;
    };

    const grid = generateGrid();

    // Stats
    const validDays = Array.from(contributions.values());
    const totalContributions = validDays.reduce((a, b) => a + b, 0);
    const activeDays = validDays.filter((c) => c > 0).length;

    // Month labels
    const getMonthLabels = () => {
        const labels: { month: string; index: number }[] = [];
        let lastMonth = -1;
        grid.forEach((week, i) => {
            const firstDayMonth = new Date(week[0].date).getMonth();
            if (firstDayMonth !== lastMonth) {
                labels.push({ month: MONTHS[firstDayMonth], index: i });
                lastMonth = firstDayMonth;
            }
        });
        return labels;
    };

    const monthLabels = getMonthLabels();

    // Color scale — exact colors from your legend
    const getColor = (count: number): string => {
        if (count < 0) return "transparent";
        if (count === 0) {
            return resolvedTheme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
        }
        if (resolvedTheme === "dark") {
            const colors: Record<number, string> = {
                1: "#854d0e",
                2: "#a16207",
                3: "#ca8a04",
                4: "#facc15",
            };
            return colors[Math.min(count, 4)] || "#facc15";
        } else {
            const colors: Record<number, string> = {
                1: "#bfdbfe",
                2: "#93c5fd",
                3: "#3b82f6",
                4: "#1d4ed8",
            };
            return colors[Math.min(count, 4)] || "#1d4ed8";
        }
    };

    // Format date for tooltip
    const formatDate = (dateStr: string): string => {
        const date = new Date(dateStr + "T00:00:00");
        return date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const handleMouseEnter = (day: ContributionDay, e: React.MouseEvent) => {
        if (day.count < 0) return;
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        const text =
            day.count === 0
                ? `No contributions on ${formatDate(day.date)}`
                : `${day.count} contribution${day.count > 1 ? "s" : ""} on ${formatDate(day.date)}`;
        setTooltip({
            text,
            x: rect.left + rect.width / 2,
            y: rect.top - 8,
        });
    };

    const handleMouseLeave = () => {
        setTooltip(null);
    };

    // Skeleton loader
    if (loading) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full"
            >
                <div className="bg-neutral-100 dark:bg-neutral-900 rounded-xl border p-4 md:p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
                            <div className="w-40 h-4 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
                        </div>
                        <div className="w-20 h-3 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
                    </div>
                    <div className="w-full h-[100px] bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
                </div>
            </motion.div>
        );
    }

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
                            {totalContributions} contributions in the last year
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

                {/* Grid Container */}
                <div className="relative min-w-[700px]">
                    {/* Tooltip */}
                    {tooltip && (
                        <div
                            className="fixed z-50 px-2.5 py-1.5 text-xs font-roboto font-medium rounded-md shadow-lg pointer-events-none whitespace-nowrap bg-neutral-900 text-white dark:bg-neutral-50 dark:text-neutral-900"
                            style={{
                                left: tooltip.x,
                                top: tooltip.y,
                                transform: "translate(-50%, -100%)",
                            }}
                        >
                            {tooltip.text}
                            <div
                                className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-neutral-900 dark:border-t-neutral-50"
                            />
                        </div>
                    )}

                    <div className="flex gap-1">
                        {/* Day labels */}
                        <div className="flex flex-col gap-[3px] pt-6 pr-1">
                            {DAYS.map((day, i) => (
                                <div
                                    key={i}
                                    className="h-[13px] flex items-center font-roboto text-[10px] text-neutral-400 dark:text-neutral-500"
                                >
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Month labels + Grid */}
                        <div className="flex-1">
                            {/* Month labels */}
                            <div className="relative h-5 mb-1">
                                {monthLabels.map(({ month, index }, i) => (
                                    <span
                                        key={`${month}-${i}`}
                                        className="absolute font-roboto text-[10px] text-neutral-400 dark:text-neutral-500"
                                        style={{
                                            left: `${(index / 52) * 100}%`,
                                        }}
                                    >
                                        {month}
                                    </span>
                                ))}
                            </div>

                            {/* Contribution grid */}
                            <div className="flex gap-[3px]">
                                {grid.map((week, weekIndex) => (
                                    <div key={weekIndex} className="flex flex-col gap-[3px]">
                                        {week.map((day) => (
                                            <div
                                                key={day.date}
                                                className={`w-[13px] h-[13px] rounded-[2px] ${
                                                    day.count >= 0
                                                        ? "cursor-pointer transition-all duration-100 hover:ring-1 hover:ring-neutral-400 dark:hover:ring-neutral-500 hover:scale-125"
                                                        : ""
                                                }`}
                                                style={{ backgroundColor: getColor(day.count) }}
                                                onMouseEnter={(e) => handleMouseEnter(day, e)}
                                                onMouseLeave={handleMouseLeave}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-1.5">
                        <span className="font-roboto text-[10px] text-neutral-400 dark:text-neutral-500 mr-1">Less</span>
                        {(resolvedTheme === "dark"
                            ? ["rgba(255,255,255,0.05)", "#854d0e", "#a16207", "#ca8a04", "#facc15"]
                            : ["rgba(0,0,0,0.05)", "#bfdbfe", "#93c5fd", "#3b82f6", "#1d4ed8"]
                        ).map((color, i) => (
                            <div
                                key={i}
                                className="w-[10px] h-[10px] rounded-[2px]"
                                style={{ backgroundColor: color }}
                            />
                        ))}
                        <span className="font-roboto text-[10px] text-neutral-400 dark:text-neutral-500 ml-1">More</span>
                    </div>
                    <span className="font-roboto text-[10px] text-neutral-400 dark:text-neutral-500">
                        {activeDays} active days
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export default GitHubCalendar;