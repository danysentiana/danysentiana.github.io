import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { X, Equal } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ToggleButton";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button"
import { useTheme } from "@/context/ThemeContext";
import logoWhite from "@/assets/logo/ds-logo-white.png";
import logoBlack from "@/assets/logo/ds-logo-black.png";

const Navbar = () => {
  const [ menuOpen, setMenuOpen ] = useState(false);
  const { theme } = useTheme();
  const location = useLocation();

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  const isDarkMode =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const menuItems = [
    { path: "/", label: "Home" },
    { path: "/#about", label: "About Me" },
    { path: "/#tech-stack", label: "Tech Stack" },
    { path: "/projects", label: "Projects" },
  ];

  // Framer Motion Mobile Variants 
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
        staggerDirection: 1
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
  }

  // Framer Motion Master Variants 
  const MenuVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9, // Starts slightly smaller
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
  };
  
  return (
    <motion.nav 
    layout="position" // Prevents shifting
      className="bg-neutral-100 dark:bg-neutral-950 shadow-sm dark:shadow-none fixed top-3.5 rounded-4xl border left-1/2 transform -translate-x-1/2 w-[90%] max-w-6xl z-50"
      variants={MenuVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img
            src={isDarkMode ? logoWhite : logoBlack}
            alt="Logo"
            className="h-8"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path} className="d-flex justify-center text-center my-auto">
                {item.path.startsWith("/#") ? (
                  <button
                    onClick={() => handleScroll(item.path.replace("/#", ""))}
                    className={`text-gray-700 dark:text-gray-300 hover:text-blue-500 ${
                      isActive ? "text-blue-500 font-semibold" : ""
                    }`}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    className={`text-gray-700 dark:text-gray-300 hover:text-blue-500 ${
                      isActive ? "text-blue-500 font-semibold" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
          <li className="d-flex justify-center text-center my-auto">
            <ThemeToggle className="hidden md:block rounded-4xl bg-neutral-800 text-white hover:bg-neutral-700 hover:text-white"/>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="flex justify-center text-center py-auto md:hidden">
          <Button variant="outline" size="icon" onClick={() => setMenuOpen(!menuOpen)} className="mr-2 rounded-4xl bg-neutral-950 text-white hover:bg-neutral-800 hover:text-white">
            {menuOpen ? <X className="w-6 h-6 dark:text-gray-300" /> : <Equal className="w-6 h-6 dark:text-gray-300 " />}
          </Button>
          <ThemeToggle className="rounded-4xl bg-neutral-900 text-white hover:bg-neutral-800 hover:text-white"/>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>

      {menuOpen && (
        <motion.div 
        className="md:hidden bg-neutral-50 dark:bg-neutral-950 p-4 rounded-4xl"
        >
          <motion.ul 
            variants={mobileMenuVariants} 
            initial="hidden" 
            animate="visible" 
            exit="exit"
            className="space-y-4 px-2 pb-4"
          >
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.li key={item.path} variants={mobileMenuItemVariants}>
                  {item.path.startsWith("/#") ? (
                    <button
                      onClick={() => {
                        handleScroll(item.path.replace("/#", ""));
                        setMenuOpen(false);
                      }}
                      className={`text-gray-700 dark:text-gray-300 hover:text-blue-500 ${
                        isActive ? "text-blue-500 font-semibold" : ""
                      }`}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className={`text-gray-700 dark:text-gray-300 hover:text-blue-500 ${
                        isActive ? "text-blue-500 font-semibold" : ""
                      }`}
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
