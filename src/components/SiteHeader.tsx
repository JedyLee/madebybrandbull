import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Index", end: true },
  { to: "/work", label: "Work" },
  { to: "/pricing", label: "Pricing" },
  { to: "/contact", label: "Contact" },
];

export const SiteHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-foreground/10">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link
          to="/"
          className="flex items-baseline gap-2 group"
          onClick={() => setOpen(false)}
        >
          <span className="display-bold text-xl md:text-2xl">Atelier&nbsp;Noir</span>
          <span className="hidden md:inline text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Studio · Est. 2019
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `relative text-sm tracking-wide transition-opacity hover:opacity-100 ${
                  isActive ? "opacity-100" : "opacity-60"
                }`
              }
            >
              {({ isActive }) => (
                <span className="inline-flex items-center gap-2">
                  <span
                    className={`inline-block h-1.5 w-1.5 rounded-full bg-foreground transition-opacity ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  {l.label}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-foreground/10 bg-background">
          <nav className="container py-6 flex flex-col gap-5">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `display-bold text-3xl ${isActive ? "opacity-100" : "opacity-50"}`
                }
              >
                {l.label}.
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
