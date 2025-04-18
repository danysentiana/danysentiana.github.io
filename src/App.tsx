import { HashRouter as Router } from "react-router-dom";

import AppRoutes from "@/routes/AppRoutes";
import useLenis from "@/hooks/useLenis";
import noise from "@/assets/texture/noise.gif";

function App() {
  useLenis(); // Apply smooth scrolling globally

  return (
    <div className="relative min-h-screen">
      <div
        className="fixed inset-0 w-screen h-screen pointer-events-none z-[1000]"
        style={{
          backgroundImage: `url(${noise})`,
          backgroundRepeat: "repeat",
          opacity: 0.04,
        }}
      />

      <main className="relative z-10">
        <Router>
          <AppRoutes />
        </Router>
      </main>
    </div>
  );
}

export default App;