import { useState, useEffect } from "react";
import { X, Equal } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ToggleButton";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import logoWhite from "@/assets/logo/ds-logo-white.png";
import logoBlack from "@/assets/logo/ds-logo-black.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme } = useTheme();
  const [currentPath, setCurrentPath] = useState(window.location.pathname + window.location.hash);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname + window.location.hash);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleNavigation = (path: string) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
    setMenuOpen(false);

    const id = path.startsWith("/#") ? path.split("#")[1] : null;
    if (id) {
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }

    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const isDarkMode =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const menuItems = [
    { path: "/#about", label: "About Me" },
    { path: "/#tech-stack", label: "Tech Stack" },
    { path: "/projects", label: "Projects" },
    { path: "/#contact", label: "Contact" },
  ];

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      transition: {
        staggerChildren: 0.15,
        staggerDirection: -1,
      },
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        staggerDirection: 1,
      },
    },
  };

  const mobileMenuItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.1 },
    }),
    exit: (index: number) => ({
      opacity: 0,
      y: 10,
      transition: { delay: (menuItems.length - index - 1) * 0.1 },
    }),
  };

  const MenuVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.nav
      className="bg-neutral-100 dark:bg-neutral-950 shadow-sm dark:shadow-none fixed top-3.5 rounded-4xl 2xl:rounded-[45px] border left-1/2 transform -translate-x-1/2 w-[90%] 2xl:w-[100%] max-w-6xl 2xl:max-w-7xl z-50"
      variants={MenuVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 2xl:max-w-7xl 2xl:px-7 2xl:py-6 flex justify-between items-center">
        <button onClick={() => handleNavigation("/#hero")}> 
          <motion.img
            src={isDarkMode ? logoWhite : logoBlack}
            alt="Logo"
            className="h-8 lg:h-10 cursor-pointer"
            whileHover={{
              rotate: [0, 10, -10, 0],
              transition: { repeat: Infinity, duration: 1.5 },
            }}
          />
        </button>

        <ul className="hidden lg:flex space-x-6">
          {menuItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <li key={item.path} className="d-flex my-auto justify-center lg:text-lg text-center">
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    cursor-pointer 
                    text-neutral-700 dark:text-neutral-50 
                    transition duration-300 ease-in-out 
                    transform hover:-translate-y-0.5 hover:scale-105 
                    hover:text-neutral-900 dark:hover:text-neutral-400 
                    ${isActive ? "font-semibold" : ""}
                  `}
                  
                >
                  {item.label}
                </button>
              </li>
            );
          })}
          <li className="d-flex justify-center text-center my-auto">
            <ThemeToggle className="hidden lg:h-11 lg:w-11 md:block rounded-4xl bg-neutral-800 text-white hover:bg-neutral-700 hover:text-white" />
          </li>
        </ul>

        {/* Mobile Menu */}
        <div className="flex justify-center text-center py-auto lg:hidden">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setMenuOpen(!menuOpen)}
            className="mr-2 rounded-4xl bg-neutral-950 text-white hover:bg-neutral-800 hover:text-white"
          >
            {menuOpen ? <X className="w-6 h-6 dark:text-gray-300" /> : <Equal className="w-6 h-6 dark:text-gray-300" />}
          </Button>
          <ThemeToggle className="rounded-4xl bg-neutral-900 text-white hover:bg-neutral-800 hover:text-white" />
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="lg:hidden bg-neutral-50 dark:bg-neutral-950 p-4 rounded-4xl">
            <motion.ul
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-4 px-2 pb-4"
            >
              {menuItems.map((item, index) => {
                const isActive = currentPath === item.path;
                return (
                  <motion.li key={item.path} variants={mobileMenuItemVariants} custom={index}>
                    <button
                      onClick={() => handleNavigation(item.path)}
                      className={`
                        cursor-pointer 
                        text-neutral-700 dark:text-neutral-50 
                        transition duration-300 ease-in-out 
                        transform hover:-translate-y-0.5 hover:scale-105 
                        hover:text-neutral-900 dark:hover:text-neutral-400 
                        ${isActive ? "font-semibold" : ""}
                      `}
                    >
                      {item.label}
                    </button>
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
