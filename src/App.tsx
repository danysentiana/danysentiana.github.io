import { BrowserRouter as Router } from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";
import useLenis from "./hooks/useLenis";

function App() {
  useLenis(); // Apply smooth scrolling globally

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;