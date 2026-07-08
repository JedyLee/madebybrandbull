import { useState, FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const { signIn, signUp, session, isAdmin, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  if (!loading && session && isAdmin) return <Navigate to="/admin" replace />;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    // Try sign in first; if the account doesn't exist yet, sign up (first-time admin bootstrap).
    let res = await signIn(email, password);
    if (res.error && /invalid login credentials/i.test(res.error)) {
      const up = await signUp(email, password);
      if (up.error) {
        toast({ title: "Sign in failed", description: up.error, variant: "destructive" });
        setBusy(false);
        return;
      }
      res = await signIn(email, password);
    }
    if (res.error) {
      toast({ title: "Sign in failed", description: res.error, variant: "destructive" });
      setBusy(false);
      return;
    }
    toast({ title: "Welcome back." });
    navigate("/admin");
  };

  return (
    <section className="container py-20 md:py-32 max-w-md">
      <div className="eyebrow text-muted-foreground">Studio · Admin</div>
      <h1 className="display-bold text-5xl md:text-7xl mt-3">Sign in.</h1>
      <p className="mt-4 text-muted-foreground">Private access for the studio owner.</p>
      <form onSubmit={onSubmit} className="mt-10 space-y-5">
        <div>
          <label className="eyebrow block mb-2">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-foreground/30 bg-background px-4 py-3 focus:outline-none focus:border-coral"
          />
        </div>
        <div>
          <label className="eyebrow block mb-2">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-foreground/30 bg-background px-4 py-3 focus:outline-none focus:border-coral"
          />
        </div>
        <button type="submit" disabled={busy} className="btn-coral w-full justify-center disabled:opacity-60">
          {busy ? "Signing in…" : "Sign in →"}
        </button>
      </form>
    </section>
  );
};

export default AdminLogin;
