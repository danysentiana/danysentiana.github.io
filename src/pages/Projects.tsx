import { useEffect, useState } from "react";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import SearchBar from "@/components/SearchBar";
import Footer from "@/components/Footer";

const Projects = () => {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const projectPerPage = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [query])

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
    <section id="projects" className="w-full px-6 lg:px-40 2xl:px-64">
      <div className="container bg-transparent pt-40 pb-28 mx-auto min-h-screen">
        <h1 className="font-bebas text-7xl font-bold text-center mb-3">My Projects</h1>

        <div className="flex justify-center mb-5">
          <p className="font-roboto text-lg text-gray-600 dark:text-gray-300 max-w-3xl text-justify md:text-center">
              Here are a few projects I've worked on recently. Each project is an opportunity to learn and grow, and I'm excited to share them with you.
          </p>
        </div>

        {/* Search Bar */}
        <div className ="mb-10 w-[80%] md:w-[50%] mx-auto">
          <SearchBar query={query} setQuery={setQuery} />
        </div>

        {/* Project List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-6 min-h-96">
          {paginatedProjects.length > 0 ? (
            paginatedProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))) : (
              <div className="col-span-full flex items-center justify-center min-h-64">
                <p className="text-gray-600 dark:text-neutral-50 text-center px-4 py-2 rounded-md">
                  No projects found.
                </p>
              </div>
            ) }
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-center mt-12 space-x-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-neutral-50 bg-neutral-950 rounded-md dark:bg-neutral-50 dark:text-neutral-950 disabled:opacity-60"
            >
              Prev
            </button>
            <span className="px-4 py-2 text-neutral-950 dark:text-neutral-50">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-neutral-50 bg-neutral-950 rounded-md dark:bg-neutral-50 dark:text-neutral-950 disabled:opacity-60"
            >
              Next
            </button>
          </div>
      </div>
    </section>

    <Footer />
    </>
  );
};

export default Projects;
