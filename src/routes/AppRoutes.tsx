import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
// import TechStack from "../pages/TechStack";
// import Projects from "../pages/Projects";

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/tech-stack" element={<TechStack />} />
        <Route path="/projects" element={<Projects />} /> */}
      </Routes>
    </>
  );
};

export default AppRoutes;
