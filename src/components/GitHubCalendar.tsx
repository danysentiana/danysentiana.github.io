import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

interface ContributionDay {
    date: string;
    count: number;
    level: number; // 0-4
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_LABELS = ["Mon", "", "Wed", "", "Fri", "", ""];

const DARK_COLORS = ["rgba(255,255,255,0.05)", "#854d0e", "#a16207", "#ca8a04", "#facc15"];
const LIGHT_COLORS = ["rgba(0,0,0,0.05)", "#a3a3a3", "#737373", "#404040", "#0a0a0a"];

const GitHubCalendar = ({ username }: { username: string }) => {
    const { theme } = useTheme();
    const [isDark, setIsDark] = useState(false);
    const [contributions, setContributions] = useState<Map<string, ContributionDay>>(new Map());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);

    useEffect(() => {
        if (theme === "system") {
            setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
        } else {
            setIsDark(theme === "dark");
        }
    }, [theme]);

    useEffect(() => {
        setLoading(true);
        setError(false);

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);

        fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {
            signal: controller.signal,
        })
            .then((res) => {
                if (!res.ok) throw new Error("fetch failed");
                return res.json();
            })
            .then((data: { contributions: { date: string; count: number; level: number }[] }) => {
                const map = new Map<string, ContributionDay>();
                data.contributions.forEach((d) => map.set(d.date, d));
                setContributions(map);
            })
            .catch((err: unknown) => {
                if (err instanceof Error && err.name === "AbortError") return;
                setError(true);
            })
            .finally(() => {
                clearTimeout(timeout);
                setLoading(false);
            });

        return () => {
            clearTimeout(timeout);
            controller.abort();
        };
    }, [username]);

    // Build 52-week grid ending today
    const buildGrid = (): ContributionDay[][] => {
        const today = new Date();
        const weeks: ContributionDay[][] = [];

        const start = new Date(today);
        start.setDate(start.getDate() - (51 * 7 + start.getDay()));

        for (let w = 0; w < 52; w++) {
            const week: ContributionDay[] = [];
            for (let d = 0; d < 7; d++) {
                const date = new Date(start);
                date.setDate(date.getDate() + w * 7 + d);
                const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
                week.push(contributions.get(key) ?? { date: key, count: -1, level: -1 });
            }
            weeks.push(week);
        }

        return weeks;
    };

    const grid = buildGrid();

    const totalContributions = Array.from(contributions.values()).reduce((s, d) => s + d.count, 0);
    const activeDays = Array.from(contributions.values()).filter((d) => d.count > 0).length;

    const getMonthLabels = () => {
        const labels: { month: string; index: number }[] = [];
        let last = -1;
        grid.forEach((week, i) => {
            const m = new Date(week[0].date + "T00:00:00").getMonth();
            if (m !== last) {
                labels.push({ month: MONTHS[m], index: i });
                last = m;
            }
        });
        return labels;
    };

    const colors = isDark ? DARK_COLORS : LIGHT_COLORS;

    const getColor = (level: number): string => {
        if (level < 0) return "transparent";
        return colors[Math.min(level, 4)];
    };

    const formatDate = (dateStr: string) =>
        new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
        });

    const handleMouseEnter = (day: ContributionDay, e: React.MouseEvent) => {
        if (day.level < 0) return;
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        const text =
            day.count === 0
                ? `No contributions on ${formatDate(day.date)}`
                : `${day.count} contribution${day.count !== 1 ? "s" : ""} on ${formatDate(day.date)}`;
        setTooltip({ text, x: rect.left + rect.width / 2, y: rect.top - 8 });
    };

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

    if (error) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full"
            >
                <div className="bg-neutral-100 dark:bg-neutral-900 rounded-xl border p-4 md:p-6 shadow-sm flex items-center justify-center min-h-[140px]">
                    <a
                        href={`https://github.com/${username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-roboto text-sm text-neutral-950 dark:text-yellow-400 hover:underline"
                    >
                        View @{username} on GitHub →
                    </a>
                </div>
            </motion.div>
        );
    }

    const monthLabels = getMonthLabels();

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
                        <svg className="w-5 h-5 text-neutral-700 dark:text-neutral-300" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
                        </svg>
                        <span className="font-roboto text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            {totalContributions > 0
                                ? `${totalContributions} contributions in the last year`
                                : "GitHub Contribution Activity"}
                        </span>
                    </div>
                    <a
                        href={`https://github.com/${username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-roboto text-xs text-neutral-950 dark:text-yellow-400 hover:underline"
                    >
                        @{username}
                    </a>
                </div>

                {/* Grid */}
                <div className="relative min-w-[700px]">
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
                            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-neutral-900 dark:border-t-neutral-50" />
                        </div>
                    )}

                    <div className="flex gap-1">
                        {/* Day labels */}
                        <div className="flex flex-col gap-[3px] pt-6 pr-1">
                            {DAY_LABELS.map((label, i) => (
                                <div key={i} className="h-[13px] flex items-center font-roboto text-[10px] text-neutral-400 dark:text-neutral-500">
                                    {label}
                                </div>
                            ))}
                        </div>

                        {/* Month labels + cells */}
                        <div className="flex-1">
                            <div className="relative h-5 mb-1">
                                {monthLabels.map(({ month, index }, i) => (
                                    <span
                                        key={`${month}-${i}`}
                                        className="absolute font-roboto text-[10px] text-neutral-400 dark:text-neutral-500"
                                        style={{ left: `${(index / 52) * 100}%` }}
                                    >
                                        {month}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-[3px]">
                                {grid.map((week, wi) => (
                                    <div key={wi} className="flex flex-col gap-[3px]">
                                        {week.map((day) => (
                                            <div
                                                key={day.date}
                                                className={`w-[13px] h-[13px] rounded-[2px] ${
                                                    day.level >= 0
                                                        ? "cursor-pointer transition-all duration-100 hover:ring-1 hover:ring-neutral-400 dark:hover:ring-neutral-500 hover:scale-125"
                                                        : ""
                                                }`}
                                                style={{ backgroundColor: getColor(day.level) }}
                                                onMouseEnter={(e) => handleMouseEnter(day, e)}
                                                onMouseLeave={() => setTooltip(null)}
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
                        {colors.map((color, i) => (
                            <div key={i} className="w-[10px] h-[10px] rounded-[2px]" style={{ backgroundColor: color }} />
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
