import Lenis from "lenis";
import { useEffect } from "react";

const useLenis = () => {
    useEffect(() => {
      const lenis = new Lenis({
        duration: 1.2, // Scroll speed (higher is slower)
        smoothWheel: true,
        easing: (t: number) => 1 - Math.pow(1 - t, 3), // Smooth cubic easing
      });
  
      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
  
      requestAnimationFrame(raf);
  
      return () => {
        lenis.destroy();
      };
    }, []);
  };
  
  export default useLenis;