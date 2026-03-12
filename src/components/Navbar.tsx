import { Link, useLocation, useNavigate } from "react-router-dom";
import { Leaf, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getSession, onAuthStateChange, signOut } from "@/utils/auth";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Detect", path: "/detect" },
  { name: "Weather", path: "/weather" },
  { name: "Nurseries", path: "/nurseries" },
  { name: "Plant Advisor", path: "/advisor" },
  { name: "About", path: "/about" },
];

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getSession().then(({ data }) => {
      setLoggedIn(!!data.session);
    });
    const sub = onAuthStateChange((has) => setLoggedIn(has))
    return () => {
      sub?.data?.subscription?.unsubscribe?.()
    }
  }, []);

  const handleLogout = () => {
    signOut().then(() => {
      setLoggedIn(false);
      navigate("/");
    });
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border"
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-primary group">
          <motion.div whileHover={{ rotate: 20 }} transition={{ type: "spring", stiffness: 300 }}>
            <Leaf className="w-7 h-7" />
          </motion.div>
          PlantGuard
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative px-3 py-2 rounded-full text-sm font-semibold transition-colors ${
                location.pathname === link.path
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {location.pathname === link.path && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 gradient-nature rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {link.name}
            </Link>
          ))}
          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="ml-2 px-4 py-2 rounded-full text-sm font-semibold bg-destructive text-destructive-foreground hover:opacity-90 transition-opacity hover-scale"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="ml-2 px-4 py-2 rounded-full text-sm font-semibold bg-accent text-accent-foreground hover:opacity-90 transition-opacity hover-scale"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-card border-b border-border overflow-hidden"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className={`block px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      location.pathname === link.path
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                {loggedIn ? (
                  <button onClick={() => { setOpen(false); handleLogout(); }} className="block w-full px-3 py-2 rounded-lg text-sm font-semibold bg-destructive text-destructive-foreground">
                    Logout
                  </button>
                ) : (
                  <Link to="/login" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-semibold bg-accent text-accent-foreground">
                    Login
                  </Link>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
