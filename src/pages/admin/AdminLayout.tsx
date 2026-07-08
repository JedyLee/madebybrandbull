import { NavLink, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

const AdminLayout = () => {
  const { session, isAdmin, loading, signOut } = useAuth();

  if (loading) {
    return <div className="container py-20 text-muted-foreground">Loading…</div>;
  }
  if (!session) return <Navigate to="/admin/login" replace />;
  if (!isAdmin) {
    return (
      <section className="container py-20">
        <h1 className="display-bold text-4xl">Not authorized.</h1>
        <p className="mt-4 text-muted-foreground">This account isn't the studio admin.</p>
        <button onClick={signOut} className="btn-coral mt-6">Sign out</button>
      </section>
    );
  }

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `text-xs uppercase tracking-[0.2em] px-3 py-2 border transition-colors ${
      isActive ? "bg-foreground text-background border-foreground" : "border-foreground/20 hover:border-foreground/60"
    }`;

  return (
    <section className="container py-10 md:py-14">
      <div className="flex items-center justify-between border-b border-foreground/15 pb-6 mb-8">
        <div>
          <div className="eyebrow text-muted-foreground">Studio · Admin</div>
          <h1 className="display-bold text-3xl md:text-5xl mt-1">Control room.</h1>
        </div>
        <button onClick={signOut} className="text-xs uppercase tracking-[0.2em] hover:text-coral">
          Sign out
        </button>
      </div>
      <nav className="flex flex-wrap gap-2 mb-10">
        <NavLink to="/admin" end className={linkCls}>Overview</NavLink>
        <NavLink to="/admin/work" className={linkCls}>Work</NavLink>
        <NavLink to="/admin/journal" className={linkCls}>Journal</NavLink>
      </nav>
      <Outlet />
    </section>
  );
};

export default AdminLayout;
