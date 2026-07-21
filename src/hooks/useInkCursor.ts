import { RefObject, useEffect } from "react";
import gsap from "gsap";

const TAIL_LENGTH = 60;
const LERP = 0.35;
const TIP_RADIUS = 3;
const TRAIL_TAPER = 1.5;
const TRAIL_WIDTH_RATIO = 0.55;
const IDLE_DELAY = 800;
const IDLE_IN_DURATION = 380;
const IDLE_OUT_DURATION = 280;

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function useInkCursor(canvasRef: RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    let mouse = { x: 0, y: 0 };
    let curr = { x: 0, y: 0 };
    let tail: { x: number; y: number }[] = [];
    let active = false;
    let speed = 0;
    let prevCurr = { x: 0, y: 0 };
    let scrollVelX = 0;
    let scrollVelY = 0;

    // Idle state
    let lastMoveTime = Date.now();
    let idleProgress = 0;       // 0 = dot, 1 = full amoeba
    let idleTriggered = false;
    let idleTriggerTime = 0;
    let transitioningOut = false;
    let transitionOutStart = 0;
    let idleT = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      lastMoveTime = Date.now();
      if (idleProgress > 0 && !transitioningOut) {
        transitioningOut = true;
        transitionOutStart = Date.now();
      }
      if (!active) {
        curr.x = mouse.x;
        curr.y = mouse.y;
        prevCurr.x = curr.x;
        prevCurr.y = curr.y;
        tail = Array.from({ length: TAIL_LENGTH }, () => ({ x: curr.x, y: curr.y }));
        active = true;
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (!active) return;
      lastMoveTime = Date.now();
      if (idleProgress > 0 && !transitioningOut) {
        transitioningOut = true;
        transitionOutStart = Date.now();
      }
      const atTop = window.scrollY <= 0;
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight;
      if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) return;
      scrollVelX = e.deltaX;
      scrollVelY = e.deltaY;
    };

    const rgb = () =>
      document.documentElement.classList.contains("dark")
        ? "245, 245, 245"
        : "10, 10, 10";

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (active) {
        curr.x += (mouse.x - curr.x) * LERP;
        curr.y += (mouse.y - curr.y) * LERP;

        // Track smoothed movement speed to react the trail width to it.
        const instantSpeed = Math.hypot(curr.x - prevCurr.x, curr.y - prevCurr.y);
        speed += (instantSpeed - speed) * 0.25;
        prevCurr.x = curr.x;
        prevCurr.y = curr.y;
        const widthBoost = 1 + Math.min(speed / 16, 1.3);

        if (Math.abs(scrollVelX) > 0.1 || Math.abs(scrollVelY) > 0.1) {
          const f = 0.35;
          tail.forEach(pt => {
            pt.x -= scrollVelX * f;
            pt.y -= scrollVelY * f;
          });
          scrollVelX *= 0.8;
          scrollVelY *= 0.8;
        }

        tail.unshift({ x: curr.x, y: curr.y });
        if (tail.length > TAIL_LENGTH) tail.length = TAIL_LENGTH;

        const color = rgb();
        // Trail starts at the tip's own diameter so it connects to the tip
        // seamlessly instead of stepping down to a separate fixed width.
        const baseWidth = TIP_RADIUS * 2 * TRAIL_WIDTH_RATIO * widthBoost;

        for (let i = 0; i < tail.length - 1; i++) {
          const t = i / (tail.length - 1);
          const f = 1 - Math.pow(t, TRAIL_TAPER);

          ctx.beginPath();
          ctx.strokeStyle = `rgba(${color}, ${f * 0.9})`;
          ctx.lineWidth = Math.max(0.1, baseWidth * f);
          ctx.lineCap = "round";
          ctx.moveTo(tail[i].x, tail[i].y);
          ctx.lineTo(tail[i + 1].x, tail[i + 1].y);
          ctx.stroke();
        }

        // Update idle progress
        const now = Date.now();
        if (transitioningOut) {
          const t = Math.min(1, (now - transitionOutStart) / IDLE_OUT_DURATION);
          idleProgress = 1 - easeInOutCubic(t);
          if (t >= 1) {
            idleProgress = 0;
            transitioningOut = false;
            idleTriggered = false;
          }
        } else if (now - lastMoveTime > IDLE_DELAY) {
          if (!idleTriggered) {
            idleTriggered = true;
            idleTriggerTime = now;
          }
          const t = Math.min(1, (now - idleTriggerTime) / IDLE_IN_DURATION);
          idleProgress = easeInOutCubic(t);
        }

        // Freeze the wobble shape while shrinking back to a dot, so it
        // doesn't keep morphing while also collapsing — only grow it while
        // actually idle.
        if (idleProgress > 0 && !transitioningOut) idleT += 0.018;

        // Draw tip — morph between dot and amoeba
        const POINTS = 32;
        ctx.beginPath();
        for (let j = 0; j < POINTS; j++) {
          const angle = (j / POINTS) * Math.PI * 2;
          const amoebaR =
            5 +
            Math.sin(angle * 2 + idleT * 1.1) * 2.5 +
            Math.sin(angle * 3 - idleT * 0.7) * 1.8 +
            Math.sin(angle * 1 + idleT * 1.5) * 1.2 +
            Math.sin(angle * 4 + idleT * 0.9) * 0.8;
          const r = TIP_RADIUS + (amoebaR - TIP_RADIUS) * idleProgress;
          const px = curr.x + Math.cos(angle) * r;
          const py = curr.y + Math.sin(angle) * r;
          if (j === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fillStyle = `rgba(${color}, 1)`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    // Splatter container — lives above canvas
    const splatterContainer = document.createElement("div");
    Object.assign(splatterContainer.style, {
      position: "fixed",
      inset: "0",
      pointerEvents: "none",
      zIndex: "10000",
    });
    document.body.appendChild(splatterContainer);

    const onBurst = () => {
      lastMoveTime = Date.now();
      if (idleProgress > 0 && !transitioningOut) {
        transitioningOut = true;
        transitionOutStart = Date.now();
      }
      const count = Math.floor(Math.random() * 5) + 8;
      const color = rgb();

      for (let i = 0; i < count; i++) {
        const dot = document.createElement("div");
        const size = Math.random() * 6 + 3;
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 50 + 20;

        Object.assign(dot.style, {
          position: "fixed",
          left: `${curr.x}px`,
          top: `${curr.y}px`,
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: "50%",
          backgroundColor: `rgba(${color}, 0.85)`,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        });

        splatterContainer.appendChild(dot);

        gsap.to(dot, {
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
          opacity: 0,
          scale: Math.random() * 0.4 + 0.1,
          duration: 0.35 + Math.random() * 0.25,
          ease: "power2.out",
          onComplete: () => dot.remove(),
        });
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("click", onBurst);
    window.addEventListener("wheel", onWheel, { passive: true });
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("wheel", onWheel);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("click", onBurst);
      splatterContainer.remove();
    };
  }, [canvasRef]);
}
