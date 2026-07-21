import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";
import { techStackIconMap } from "@/data/techIcons";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import StarField from "@/components/StarField";

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === Number(id));
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id]);

  if (!project) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center gap-4 px-6">
        <h1 className="font-bebas text-4xl md:text-6xl">Project not found</h1>
        <Link
          to="/projects"
          className="font-roboto text-neutral-950 dark:text-yellow-400 hover:underline flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>
      </section>
    );
  }

  const { title, description, techStack, link, details } = project;

  return (
    <>
      <motion.section
        className="w-full px-6 lg:px-40 2xl:px-64 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <StarField count={30} />
        </div>

        <motion.div
          className="absolute top-40 -left-32 w-96 h-96 rounded-full opacity-15 dark:opacity-10 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #3f4c6b, transparent)" }}
          animate={{ y: [0, 40, 0], x: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 -right-32 w-80 h-80 rounded-full opacity-10 dark:opacity-10 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #606c88, transparent)" }}
          animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-20 sm:pb-24 md:pb-28 mx-auto max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Link
              to="/projects"
              className="font-roboto text-sm text-gray-600 dark:text-gray-300 hover:text-neutral-950 dark:hover:text-neutral-50 inline-flex items-center gap-1 mb-8 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Projects
            </Link>
          </motion.div>

          <motion.h1
            className="font-bebas text-4xl md:text-6xl font-bold mb-3"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {title}
          </motion.h1>

          <motion.div
            className="w-20 h-1 bg-neutral-950 dark:bg-yellow-400 mb-6 rounded-full origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          />

          <motion.div
            className="rounded-2xl overflow-hidden shadow-md dark:shadow-neutral-800/50 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            <img
              src={details.images[activeImage]}
              alt={`${title} screenshot ${activeImage + 1}`}
              className="w-full h-64 md:h-96 object-cover"
            />
          </motion.div>

          {details.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto mb-8">
              {details.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`shrink-0 rounded-md overflow-hidden border-2 transition-colors cursor-pointer ${
                    index === activeImage
                      ? "border-neutral-950 dark:border-neutral-50"
                      : "border-transparent"
                  }`}
                >
                  <img src={img} alt="" className="w-20 h-14 object-cover" />
                </button>
              ))}
            </div>
          )}

          <motion.div
            className="mt-3 flex flex-wrap gap-2 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            {techStack.map((tech) => {
              const icon = techStackIconMap[tech];
              return (
                <span
                  key={tech}
                  className="flex items-center gap-1.5 px-2.5 py-1 text-sm bg-neutral-100 dark:bg-neutral-800 rounded-md font-roboto text-gray-600 dark:text-gray-300"
                >
                  {icon && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d={icon.path} />
                    </svg>
                  )}
                  {tech}
                </span>
              );
            })}
          </motion.div>

          <motion.p
            className="font-roboto text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
          >
            {description}
          </motion.p>

          <motion.p
            className="font-roboto text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          >
            {details.description}
          </motion.p>

          {link && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
            >
              <Button
                asChild
                className="font-roboto rounded-full px-8 py-1 bg-neutral-950 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-950 hover:bg-neutral-700 dark:hover:bg-neutral-100"
                size="xl"
              >
                <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  Visit Live Site <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </motion.div>
          )}
        </div>
      </motion.section>

      <Footer />
    </>
  );
};

export default ProjectDetail;
