import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { X, Equal } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ToggleButton";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button"
import { useTheme } from "@/context/ThemeContext";
import { useActiveSection } from "@/hooks/useActiveSection";
import logoWhite from "@/assets/logo/ds-logo-white.png";
import logoBlack from "@/assets/logo/ds-logo-black.png";

const Navbar = () => {
  const [ menuOpen, setMenuOpen ] = useState(false);
  const { theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const sectionIds = ["about", "tech-stack", "contact", "hero"];
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100); // Delay ensures element is loaded
      }
    }
  }, [location]);

  const handleScroll = (id: string) => {
    setMenuOpen(false); // Close mobile menu
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navigate to home if not on it
      if (location.pathname !== "/") {
        navigate(`/#${id}`); // Change URL to hash
        setTimeout(() => {
          const targetElement = document.getElementById(id);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
          }
        }, 300); // Delay to ensure React renders
      }
    }
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
      className="bg-neutral-50 dark:bg-neutral-950 shadow-sm dark:shadow-none fixed top-3.5 rounded-4xl 2xl:rounded-[45px] border left-1/2 transform -translate-x-1/2 w-[90%] lg:w-[75%] 2xl:w-[100%] max-w-6xl 2xl:max-w-7xl z-50"
      variants={MenuVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 lg:px-7 2xl:max-w-7xl 2xl:px-7 2xl:py-6 flex justify-between items-center">
        {/* Logo */}
        <button onClick={() => handleScroll("hero")}>
          <motion.img
            src={isDarkMode ? logoWhite : logoBlack}
            alt="Logo"
            className="h-8 lg:h-10 cursor-pointer"
            whileHover={{
              rotate: [0, 10, -10, 0], 
              transition: { repeat: Infinity, duration: 1.5 }
            }}
          />
        </button>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-6">
          {menuItems.map((item) => {
            const isHome = location.pathname === "/";
            
            const isActive = item.path.startsWith("/#")
            ? isHome && activeSection === item.path.replace("/", "")
            : location.pathname === item.path;
            return (
              <li key={item.path} className="d-flex my-auto justify-center lg:text-lg text-center">
                {item.path.startsWith("/#") ? (
                  <button
                      onClick={() => handleScroll(item.path.replace("/#", ""))}
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
                  ) : (
                    <Link
                      to={item.path}
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
                    </Link>
                )}
              </li>
            );
          })}
          <li className="d-flex justify-center text-center my-auto">
            <ThemeToggle className="hidden lg:h-11 lg:w-11 md:block rounded-4xl bg-neutral-800 text-white hover:bg-neutral-700 hover:text-white"/>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="flex justify-center text-center py-auto lg:hidden">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="mr-2 rounded-4xl bg-neutral-950 text-white hover:bg-neutral-800 hover:text-white"
          >
            {menuOpen ? <X className="w-6 h-6 dark:text-gray-300" /> : <Equal className="w-6 h-6 dark:text-gray-300 " />}
          </Button>
          <ThemeToggle className="rounded-4xl bg-neutral-900 text-white hover:bg-neutral-800 hover:text-white"/>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
      {menuOpen && (
        <motion.div 
        className="lg:hidden bg-neutral-50 dark:bg-transparent p-4 rounded-4xl"
        >
          <motion.ul 
            variants={mobileMenuVariants} 
            initial="hidden" 
            animate="visible" 
            exit="exit"
            className="space-y-4 px-2 pb-4"
          >
            {menuItems.map((item) => {
              const isHome = location.pathname === "/";
              const isActive = item.path.startsWith("/#")
              ? isHome && activeSection === item.path.replace("/", "")
              : location.pathname === item.path;
            
              return (
                <motion.li key={item.path} variants={mobileMenuItemVariants}>
                  {item.path.startsWith("/#") ? (
                    <button
                      onClick={() => {
                        handleScroll(item.path.replace("/#", ""));
                        setMenuOpen(false);
                      }}
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
                  ) : (
                    <Link
                      to={item.path}
                      className={`
                        cursor-pointer 
                        text-neutral-700 dark:text-neutral-50 
                        transition duration-300 ease-in-out 
                        transform hover:-translate-y-0.5 hover:scale-105 
                        hover:text-neutral-900 dark:hover:text-neutral-400 
                        ${isActive ? "font-semibold" : ""}
                      `}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
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
