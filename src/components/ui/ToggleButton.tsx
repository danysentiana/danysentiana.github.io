import { useMemo } from "react"

import { buttonVariants } from "@/components/ui/button"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { cn } from "@/lib/utils"
import { useTheme } from "@/context/ThemeContext"

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()

  const isDark = useMemo(
    () =>
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches),
    [theme]
  )

  return (
    <AnimatedThemeToggler
      theme={isDark ? "dark" : "light"}
      onThemeChange={setTheme}
      variant="circle"
      duration={500}
      className={cn(buttonVariants({ variant: "outline", size: "icon" }), className)}
    />
  )
}
