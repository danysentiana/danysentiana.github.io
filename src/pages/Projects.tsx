import { useEffect, useState } from "react";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import SearchBar from "@/components/SearchBar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

const Projects = () => {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const projectPerPage = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [query])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Filter projects based on search query
  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(query.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / projectPerPage);
  const startIndex = (currentPage - 1) * projectPerPage; 
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + projectPerPage);

  return (
    <>
    <motion.section 
      id="projects" 
      className="w-full px-6 lg:px-40 2xl:px-64"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container bg-transparent pt-40 pb-28 mx-auto min-h-screen">
        {/* Title */}
        <motion.h1 
          className="font-bebas text-4xl md:text-7xl font-bold text-center mb-3"
          initial={{ opacity: 0, y: -30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          My Projects
        </motion.h1>

        {/* Description */}
        <motion.div 
          className="flex justify-center mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        >
          <p className="font-roboto text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl text-justify md:text-center">
              Here are a few projects I've worked on recently. Each project is an opportunity to learn and grow, and I'm excited to share them with you.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          className="mb-10 w-[80%] md:w-[50%] mx-auto"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
        >
          <SearchBar query={query} setQuery={setQuery} />
        </motion.div>

        {/* Project List */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-6 min-h-96"
          layout
        >
          <AnimatePresence mode="popLayout">
            {paginatedProjects.length > 0 ? (
              paginatedProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: { 
                      duration: 0.4, 
                      delay: index * 0.08,
                      ease: "easeOut",
                    }
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.9,
                    transition: { duration: 0.2 }
                  }}
                >
                  <ProjectCard key={project.id} {...project} />
                </motion.div>
              ))
            ) : (
              <motion.div 
                className="col-span-full flex items-center justify-center min-h-64"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-gray-600 dark:text-neutral-50 text-center px-4 py-2 rounded-md">
                  No projects found.
                </p>
              </motion.div>
            ) }
          </AnimatePresence>
        </motion.div>

        {/* Pagination Buttons */}
        <motion.div 
          className="flex justify-center mt-12 space-x-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
        >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-5 py-2.5 text-neutral-50 bg-neutral-950 rounded-xl dark:bg-neutral-50 dark:text-neutral-950 disabled:opacity-40 transition-colors duration-200 font-medium"
            >
              Prev
            </motion.button>
            <motion.span 
              className="px-4 py-2 text-neutral-950 dark:text-neutral-50 font-medium"
              key={currentPage}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Page {currentPage} of {totalPages}
            </motion.span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-5 py-2.5 text-neutral-50 bg-neutral-950 rounded-xl dark:bg-neutral-50 dark:text-neutral-950 disabled:opacity-40 transition-colors duration-200 font-medium"
            >
              Next
            </motion.button>
        </motion.div>
      </div>
    </motion.section>

    <Footer />
    </>
  );
};

export default Projects;