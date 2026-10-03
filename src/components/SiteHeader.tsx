import { NavLink, Link } from "react-router-dom";
import { Home, Briefcase, Info, Music2, Moon, Sun, Lock } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useAuth } from "@/hooks/use-auth";

const icons = [
  { to: "/", label: "Home", Icon: Home, end: true },
  { to: "/work", label: "Work", Icon: Briefcase },
  { to: "/about", label: "About", Icon: Info },
  { to: "/music", label: "Music", Icon: Music2 },
];
const text = [
  { to: "/pricing", label: "Pricing" },
  { to: "/journal", label: "Journal" },
];

export const SiteHeader = () => {
  const { theme, toggleTheme } = useTheme();
  const { session, isAdmin } = useAuth();
  const adminHref = session && isAdmin ? "/admin" : "/admin/login";

  return (
    <header className="relative z-40 bg-background">
      <div className="container pt-6 pb-4 flex flex-col items-center gap-4">
        <Link to="/" className="font-script text-2xl leading-none">Jedidiah Ingram</Link>
        <nav className="flex items-center gap-6">
          {icons.map(({ to, label, Icon, end }) => (
            <NavLink key={to} to={to} end={end} aria-label={label} title={label}
              className={({ isActive }) => `p-1 transition-colors ${isActive ? "text-coral" : "text-foreground hover:text-coral"}`}>
              <Icon className="h-5 w-5" strokeWidth={1.5} />
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-5 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          {text.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => (isActive ? "text-foreground" : "hover:text-foreground")}>
              {l.label}
            </NavLink>
          ))}
          <button onClick={toggleTheme} aria-label="Toggle theme" className="hover:text-foreground">
            {theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>
          <Link to={adminHref} aria-label="Admin" className="hover:text-foreground"><Lock className="h-3.5 w-3.5" /></Link>
        </div>
      </div>
    </header>
  );
};
