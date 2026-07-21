import { createContext, useContext, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const TerminalContext = createContext(false);

interface TerminalProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function Terminal({ children, title = "danys@portfolio: ~", className }: TerminalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const started = useInView(ref, { once: true, amount: 0.3 });

  return (
    <TerminalContext.Provider value={started}>
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-neutral-800 bg-neutral-950 text-neutral-50 shadow-lg overflow-hidden font-mono",
          className
        )}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-800 bg-neutral-900/60">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-2 text-xs text-neutral-400">{title}</span>
        </div>
        <div className="p-5 md:p-7 text-sm md:text-base leading-relaxed space-y-4">
          {children}
        </div>
      </div>
    </TerminalContext.Provider>
  );
}

interface TypingAnimationProps {
  children: string;
  delay?: number;
  duration?: number;
  className?: string;
}

export function TypingAnimation({ children, delay = 0, duration = 35, className }: TypingAnimationProps) {
  const started = useContext(TerminalContext);
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!started) return;

    let i = 0;
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(children.slice(0, i));
        if (i >= children.length) clearInterval(interval);
      }, duration);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [started, children, delay, duration]);

  return <span className={className}>{displayed}</span>;
}

interface AnimatedSpanProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function AnimatedSpan({ children, delay = 0, className }: AnimatedSpanProps) {
  const started = useContext(TerminalContext);

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={started ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3, delay: delay / 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function TerminalCursor({ delay = 0, className }: { delay?: number; className?: string }) {
  const started = useContext(TerminalContext);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!started) return;
    const timeout = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timeout);
  }, [started, delay]);

  if (!show) return null;

  return (
    <motion.span
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      className={cn("inline-block w-2 h-4 bg-neutral-50 align-middle ml-1", className)}
    />
  );
}
