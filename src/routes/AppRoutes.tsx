import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";

const Projects = lazy(() => import("@/pages/Projects"));
const ProjectDetail = lazy(() => import("@/pages/ProjectDetail"));

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/projects"
          element={
            <Suspense fallback={
              <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin h-10 w-10 border-4 border-neutral-300 border-t-neutral-950 dark:border-neutral-700 dark:border-t-neutral-50 rounded-full" />
              </div>
            }>
              <Projects />
            </Suspense>
          }
        />
        <Route
          path="/projects/:id"
          element={
            <Suspense fallback={
              <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin h-10 w-10 border-4 border-neutral-300 border-t-neutral-950 dark:border-neutral-700 dark:border-t-neutral-50 rounded-full" />
              </div>
            }>
              <ProjectDetail />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
};

export default AppRoutes;