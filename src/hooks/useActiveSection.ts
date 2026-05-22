import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useActiveSection = (ids: string[]) => {
  const [activeSection, setActiveSection] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    // Only observe on home page
    if (location.pathname !== "/") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: "-40% 0px -50% 0px", // triggers when section is around center
        threshold: 0.1,
      }
    );

    // Small delay to ensure DOM elements are rendered after navigation
    const timeoutId = setTimeout(() => {
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [JSON.stringify(ids), location.pathname]);

  return activeSection;
};
