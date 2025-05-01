import { useEffect, useState } from "react";
import { HashRouter as Router } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ScrollToTop from "@/components/ScrollToTop";

import AppRoutes from "@/routes/AppRoutes";
import useLenis from "@/hooks/useLenis";
import Splash from "@/pages/Splash";
import noise from "@/assets/texture/noise.gif";

function App() {
  useLenis();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Texture */}
      <div
        className="fixed inset-0 w-screen h-screen pointer-events-none z-[1000]"
        style={{
          backgroundImage: `url(${noise})`,
          backgroundRepeat: "repeat",
          opacity: 0.04,
        }}
      />

      <AnimatePresence>
        <div className="relative z-10">
          {loading && <Splash key="splash" />}
        </div>
      </AnimatePresence>

      {/* Main app */}
      {!loading && (
        <main className="relative z-10">
          <Router>
            <ScrollToTop />
            <AppRoutes />
          </Router>
        </main>
      )}
    </div>
  );
}

export default App;
