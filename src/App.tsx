import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
// import NotFound from "@/pages/NotFound";
import useLenis from "@/hooks/useLenis";

function App() {
  useLenis();

  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
  };

  useEffect(() => {
    const redirectPath = new URLSearchParams(window.location.search).get("redirect");
    if (redirectPath) {
      navigate(redirectPath);
    }
  }, []);

  const renderRoute = () => {
    switch (currentPath) {
      case "/":
        // return <Home navigate={navigate} />;
        return <Home  />;
      case "/projects":
        return <Projects  />;
      default:
        // return <NotFound  />;
    }
  };

  return (
    <>
      <Navbar />
      {renderRoute()}
    </>
  );
}

export default App;
