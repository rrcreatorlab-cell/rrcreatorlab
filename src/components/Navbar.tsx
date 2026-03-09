import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import rrLogo from "@/assets/rr-creator-lab-logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const navLinks = [
    { name: "Home", href: "/", isPage: true },
    { name: "Services", href: isHomePage ? "#services" : "/#services" },
    { name: "Pricing", href: "/pricing", isPage: true },
    { name: "Success Stories", href: "/success-stories", isPage: true },
    { name: "Portfolio", href: "/portfolio", isPage: true },
    { name: "Blog", href: "/blog", isPage: true },
    { name: "Contact", href: isHomePage ? "#contact" : "/#contact" },
    { name: "Let's Connect", href: "/lets-connect", isPage: true },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
      <div className="container px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold gradient-text">
            <img src={rrLogo} alt="RR Creator Lab Logo" className="w-8 h-8 rounded-full object-cover" />
            RR Creator Lab
          </Link>

          {/* Right side: Theme Toggle + Menu Button */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Slide-down Navigation Menu */}
        <div
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: isOpen ? "600px" : "0", opacity: isOpen ? 1 : 0 }}
        >
          <div className="py-4 border-t border-border/50">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) =>
                link.isPage ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                )
              )}
              <div className="pt-3 pb-2">
                <Button variant="hero" size="sm" className="w-full" asChild>
                  <Link to="/lets-connect" onClick={() => setIsOpen(false)}>Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
