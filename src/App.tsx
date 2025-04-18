import { HashRouter as Router } from "react-router-dom";

import AppRoutes from "@/routes/AppRoutes";
import useLenis from "@/hooks/useLenis";
import noise from "@/assets/texture/noise.gif";

function App() {
  useLenis(); // Apply smooth scrolling globally

  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 bg-repeat opacity-10 pointer-events-none z-[1]"
        style={{ backgroundImage: `url(${noise})` }}
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