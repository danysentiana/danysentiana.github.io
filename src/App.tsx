import { HashRouter as Router } from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";
import useLenis from "./hooks/useLenis";

function App() {
  useLenis(); // Apply smooth scrolling globally

  return (
    
    <div className="relative min-h-screen">
    {/* Background noise layer */}
    <div className="absolute inset-0 bg-[url('noise.gif')] bg-repeat opacity-10 pointer-events-none z-[1]" />

    {/* Your main content */}
    <main className="relative z-10">
      <Router>
        <AppRoutes />
      </Router>
    </main>
  </div>
  );
}

export default App;