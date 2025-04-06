import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import useLenis from "./hooks/useLenis";

function App() {
  useLenis(); // Apply smooth scrolling globally
  const navigate = useNavigate();

  useEffect(() => {
    const redirectPath = new URLSearchParams(window.location.search).get("redirect");
    if (redirectPath) {
      navigate(redirectPath, { replace: true });
    }
  }, [navigate]);

  return <AppRoutes />;
}

export default App;
