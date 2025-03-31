import { useState } from "react";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import SearchBar from "@/components/SearchBar";
import Footer from "@/components/Footer";

const Projects = () => {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const projectPerPage = 6;

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
    <section id="projects" className="w-full px-6 lg:px-40">
      <div className="container bg-transparent py-40 mx-auto min-h-screen">
        <h1 className="text-4xl font-bold text-center mb-6">My Projects</h1>

        {/* Search Bar */}
        <div className ="mb-10 w-[80%] md:w-[50%] mx-auto">
          <SearchBar query={query} setQuery={setQuery} />
        </div>

        {/* Project List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProjects.length > 0 ? (
            paginatedProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))) : (
              <p className="text-center col-span-full text-gray-600">
                No projects found.
              </p>
            ) }
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-center mt-6 space-x-4">
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
