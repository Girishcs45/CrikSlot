import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import logo from "../assets/logo.png"; // Update with your actual logo path
import { toast } from "react-toastify";
import { FcBusinessman } from "react-icons/fc";
import { HiCalendar } from "react-icons/hi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Book your slot", href: "/bookslot" },
    { name: "About us", href: "about" },
    { name: "Contact", href: "contact" },
  ];

  const [user, setUser] = useState();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("User")));
  }, []);

  const handleLogout = () => {
    toast.success("Logged out");
    localStorage.removeItem("User");
    setUser(null);
    navigate("/");
  };

  const Button = ({
    children = "",
    variant = "primary",
    size = "md",
    className = "",
    ...props
  }) => {
    const baseClasses =
      "font-semibold rounded-lg transition-all duration-300 focus:outline-none";

    const variants = {
      primary: "bg-[#326B0F] text-white hover:bg-green-800",
      secondary: "bg-[#DEFFE0] text-[#326B0F] hover:bg-green-100",
      outline:
        "border-2 border-[#326B0F] text-[#326B0F] hover:bg-[#326B0F] hover:text-white",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </motion.button>
    );
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-2 lg:px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            className="shrink-0 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center">
              <Link
                to="/"
                onClick={() => {
                  localStorage.removeItem("User");
                }}
              >
                <img src={logo} alt="CrickSlot Logo" className="h-12 w-36" />
              </Link>
              <Link to="/userhome" className="ml-2">
                <span className="text-2xl font-bold text-[#326B0F]">
                  CrickSlot
                </span>
              </Link>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <motion.a
                  key={item?.name}
                  href={item?.href}
                  className="text-gray-700 hover:text-[#326B0F] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  {item?.name}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Desktop Actions */}
          {user ? (
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => navigate("/my-bookings")}
                className="flex items-center gap-2 px-3 py-2 hover:text-green-600 transition"
              >
                <HiCalendar className="text-lg" />
                My Bookings
              </button>
              <Button size="sm" className="" onClick={handleLogout}>
                Logout
              </Button>
              <Link
                to="/userprofile"
                className="flex items-center cursor-pointer hover:scale-105 transition"
              >
                <FcBusinessman size={32} />
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigate("/signin", {
                    state: { from: location.pathname },
                  });
                }}
              >
                Sign In
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign Up
              </Button>
            </div>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#326B0F] focus:outline-none"
            >
              {isMenuOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiMenu className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-white border-t"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <motion.a
                key={item?.name}
                href={item?.href}
                className="text-gray-700 hover:text-[#326B0F] block px-3 py-2 rounded-md text-base font-medium"
                whileHover={{ x: 10 }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item?.name}
              </motion.a>
            ))}

            {user ? (
              <Button size="sm" className="w-full" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <div className="pt-4 pb-3 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mb-2"
                  onClick={() => {
                    navigate("/signin", {
                      state: { from: location.pathname },
                    });
                  }}
                >
                  Log In
                </Button>
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
