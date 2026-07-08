import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Moon, Sun, Lock } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useAuth } from "@/hooks/use-auth";


const links = [
  { to: "/work", label: "Work" },
  { to: "/pricing", label: "Pricing" },
  { to: "/journal", label: "Journal" },
];

export const SiteHeader = () => {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-foreground/10">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" onClick={() => setOpen(false)} className="flex items-baseline gap-2 group">
          <span className="font-display text-3xl md:text-4xl leading-none tracking-tight">
            brand<span className="text-coral">bull</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-xs uppercase tracking-[0.25em] font-medium transition-colors hover:text-coral ${
                  isActive ? "text-coral" : "text-foreground/80"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 opacity-70 hover:opacity-100 transition-opacity"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link to="/contact" className="btn-coral">
            Let&apos;s Talk →
          </Link>
        </nav>

        <div className="md:hidden flex items-center gap-1">
          <button onClick={toggleTheme} aria-label="Toggle theme" className="p-2">
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button className="p-2 -mr-2" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-foreground/10 bg-background">
          <nav className="container py-6 flex flex-col gap-5">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `font-display text-5xl lowercase ${isActive ? "text-coral" : "text-foreground"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="btn-coral self-start mt-2">
              Let&apos;s Talk →
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
