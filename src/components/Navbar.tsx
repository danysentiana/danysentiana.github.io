import { useState, useEffect, useMemo, useRef } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const { theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const sectionIds = ["about", "tech-stack", "contact", "hero"];
  const observedSection = useActiveSection(sectionIds);
  const [forcedSection, setForcedSection] = useState<string | null>(null);
  const activeSection = forcedSection ?? observedSection;

  // Scroll: track scrolled state & hide/show navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 50);
      
      // Hide on scroll down, show on scroll up
      if (currentY > lastScrollY.current && currentY > 200) {
        setHidden(true);
        setMenuOpen(false);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  const handleScroll = (id: string) => {
    setMenuOpen(false);

    // Force the active section to prevent observer from detecting
    // the wrong section during smooth scroll
    setForcedSection(`#${id}`);
    setTimeout(() => setForcedSection(null), 1500);

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      if (location.pathname !== "/") {
        navigate(`/#${id}`);
        setTimeout(() => {
          const targetElement = document.getElementById(id);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
          }
        }, 300);
      }
    }
  };

  const isDarkMode = useMemo(() =>
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches),
    [theme]
  );

  const menuItems = [
    { path: "/#about", label: "About Me" },
    { path: "/#tech-stack", label: "Tech Stack" },
    { path: "/projects", label: "Projects" },
    { path: "/#contact", label: "Contact Me" },
  ];

  const mobileMenuVariants = {
    hidden: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const mobileMenuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: index * 0.06, duration: 0.3, ease: "easeOut" },
    }),
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
  };

  return (
    <motion.header
      className="fixed top-3.5 left-1/2 transform -translate-x-1/2 w-[90%] lg:w-[75%] 2xl:w-[100%] max-w-6xl 2xl:max-w-7xl z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: hidden ? -100 : 0, 
        opacity: hidden ? 0 : 1,
      }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 30,
        opacity: { duration: 0.2 },
      }}
    >
      <motion.nav
        className={`
          rounded-4xl 2xl:rounded-[45px] border transition-all duration-500
          ${scrolled 
            ? "bg-neutral-50/80 dark:bg-neutral-950/80 backdrop-blur-xl shadow-lg dark:shadow-none border-neutral-200/50 dark:border-neutral-800/50" 
            : "bg-neutral-50 dark:bg-neutral-950 shadow-sm dark:shadow-none"
          }
        `}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 lg:px-7 2xl:max-w-7xl 2xl:px-7 2xl:py-6 flex justify-between items-center">
          {/* Logo */}
          <motion.button 
            onClick={() => handleScroll("hero")} 
            className="relative"
            whileTap={{ scale: 0.9 }}
          >
            <motion.img
              src={isDarkMode ? logoWhite : logoBlack}
              alt="Logo"
              className="h-8 lg:h-10 cursor-pointer relative z-10"
              whileHover={{
                rotate: [0, 10, -10, 0],
                transition: { repeat: Infinity, duration: 1.5 }
              }}
            />
            {/* Logo glow on hover */}
            <motion.div
              className="absolute inset-0 rounded-full bg-blue-500/20 dark:bg-yellow-400/20 blur-xl"
              initial={{ opacity: 0, scale: 0.5 }}
              whileHover={{ opacity: 1, scale: 1.5 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => {
              const isHome = location.pathname === "/";
              const isActive = item.path.startsWith("/#")
                ? isHome && activeSection === item.path.replace("/", "")
                : location.pathname === item.path;

              return (
                <li key={item.path} className="relative">
                  <motion.div
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    {item.path.startsWith("/#") ? (
                      <button
                        onClick={() => handleScroll(item.path.replace("/#", ""))}
                        className={`
                          relative cursor-pointer inline-block
                          px-4 py-2 rounded-2xl text-base font-medium
                          transition-colors duration-300
                          hover:text-neutral-950 dark:hover:text-neutral-50
                          ${isActive 
                            ? "text-blue-500 dark:text-yellow-400 font-semibold" 
                            : "text-neutral-600 dark:text-neutral-400"
                          }
                        `}
                      >
                        {item.label}
                      </button>
                    ) : (
                      <Link
                        to={item.path}
                        className={`
                          relative cursor-pointer inline-block
                          px-4 py-2 rounded-2xl text-base font-medium
                          transition-colors duration-300
                          hover:text-neutral-950 dark:hover:text-neutral-50
                          ${isActive 
                            ? "text-blue-500 dark:text-yellow-400 font-semibold" 
                            : "text-neutral-600 dark:text-neutral-400"
                          }
                        `}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                </li>
              );
            })}
            
            {/* Divider */}
            {/* <div className="w-px h-8 bg-neutral-200 dark:bg-neutral-800 mx-3" /> */}
            
            {/* Theme Toggle */}
            <motion.li 
              className="flex items-center"
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <ThemeToggle className="lg:h-10 lg:w-10 rounded-2xl bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700"/>
            </motion.li>
          </ul>

          {/* Mobile Menu Button */}
          <div className="flex justify-center text-center py-auto lg:hidden">
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setMenuOpen(!menuOpen)} 
                className="mr-2 rounded-4xl bg-neutral-950 text-white hover:bg-neutral-800 hover:text-white"
              >
                <motion.div
                  animate={{ rotate: menuOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <AnimatePresence mode="wait">
                    {menuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="w-6 h-6 dark:text-gray-300" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Equal className="w-6 h-6 dark:text-gray-300" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Button>
            </motion.div>
            <motion.div whileTap={{ scale: 0.9 }}>
              <ThemeToggle className="rounded-4xl bg-neutral-900 text-white hover:bg-neutral-800 hover:text-white"/>
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div
            className="lg:hidden bg-neutral-50/95 dark:bg-neutral-950/95 backdrop-blur-lg rounded-b-4xl overflow-hidden"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
          >
            <ul className="space-y-1 px-6 pb-4 pt-2">
              {menuItems.map((item, index) => {
                const isHome = location.pathname === "/";
                const isActive = item.path.startsWith("/#")
                  ? isHome && activeSection === item.path.replace("/", "")
                  : location.pathname === item.path;

                const activeClass = isActive
                  ? "text-neutral-950 dark:text-neutral-50 font-semibold bg-neutral-100 dark:bg-neutral-900"
                  : "";

                return (
                  <motion.li 
                    key={item.path} 
                    variants={mobileMenuItemVariants}
                    custom={index}
                  >
                    {item.path.startsWith("/#") ? (
                      <button
                        onClick={() => {
                          handleScroll(item.path.replace("/#", ""));
                        }}
                        className={`
                          w-full text-left cursor-pointer inline-block
                          px-4 py-3 rounded-2xl
                          text-neutral-600 dark:text-neutral-400
                          hover:text-neutral-950 dark:hover:text-neutral-50
                          hover:bg-neutral-100 dark:hover:bg-neutral-900
                          transition-colors duration-200
                          ${activeClass}
                        `}
                      >
                        <div className="flex items-center justify-between">
                          {item.label}
                          {isActive && (
                            <motion.div
                              className="w-2 h-2 rounded-full bg-blue-500 dark:bg-yellow-400"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500, damping: 20 }}
                            />
                          )}
                        </div>
                      </button>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={() => setMenuOpen(false)}
                        className={`
                          w-full text-left cursor-pointer inline-block
                          px-4 py-3 rounded-2xl
                          text-neutral-600 dark:text-neutral-400
                          hover:text-neutral-950 dark:hover:text-neutral-50
                          hover:bg-neutral-100 dark:hover:bg-neutral-900
                          transition-colors duration-200
                          ${activeClass}
                        `}
                      >
                        <div className="flex items-center justify-between">
                          {item.label}
                          {isActive && (
                            <motion.div
                              className="w-2 h-2 rounded-full bg-blue-500 dark:bg-yellow-400"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500, damping: 20 }}
                            />
                          )}
                        </div>
                      </Link>
                    )}
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </motion.nav>
    </motion.header>
  );
};

export default Navbar;