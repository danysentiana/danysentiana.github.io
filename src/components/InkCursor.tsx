import { useRef } from "react";
import { useInkCursor } from "@/hooks/useInkCursor";

const InkCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useInkCursor(canvasRef);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
    />
  );
};

export default InkCursor;
