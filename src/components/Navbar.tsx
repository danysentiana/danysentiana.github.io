import { useState } from "react";
import { Link } from "react-router-dom";
// import { useTheme } from "../context/ThemeContextDel";
import { Sun, Moon, Menu, X } from "lucide-react";
import { ModeToggle } from "@/components/ui/ToogleButton";

const Navbar = () => {
  // const { darkMode, toggleDarkMode } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-100 dark:bg-gray-900 shadow-md fixed w-full z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">My Portfolio</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
              About Me
            </Link>
          </li>
          <li>
            <Link to="/tech-stack" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
              Tech Stack
            </Link>
          </li>
          <li>
            <Link to="/projects" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
              Projects
            </Link>
          </li>
        </ul>

        {/* Dark Mode Toggle */}
        {/* <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 ml-4"
        >
          {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-500" />}
        </button> */}
        <ModeToggle />

        {/* Mobile Menu Button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden ml-4">
          {menuOpen ? <X className="w-6 h-6 text-gray-700 dark:text-gray-300" /> : <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-100 dark:bg-gray-900 p-4">
          <ul className="space-y-4">
            <li>
              <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-500" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-500" onClick={() => setMenuOpen(false)}>
                About Me
              </Link>
            </li>
            <li>
              <Link to="/tech-stack" className="text-gray-700 dark:text-gray-300 hover:text-blue-500" onClick={() => setMenuOpen(false)}>
                Tech Stack
              </Link>
            </li>
            <li>
              <Link to="/projects" className="text-gray-700 dark:text-gray-300 hover:text-blue-500" onClick={() => setMenuOpen(false)}>
                Projects
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
