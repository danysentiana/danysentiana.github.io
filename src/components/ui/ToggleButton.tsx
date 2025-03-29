import { Moon, Sun, Cog } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/context/ThemeContext"

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({className}: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()

  const getCurrentIcon = () => {
    if (theme === "dark")
      return <Moon className="h-5 w-5 transition-all dark:rotate-0 dark:scale-100 d-flex mx-auto justify-center" />;
    if (theme === "light")
      return <Sun className="h-5 w-5 transition-all dark:-rotate-90 dark:scale-0 d-flex mx-auto justify-center" />;
    return <Cog className="h-5 w-5 d-flex mx-auto justify-center" />;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className={className}>
          {getCurrentIcon()}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
