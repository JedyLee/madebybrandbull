import { Link } from "react-router-dom";

export const SiteFooter = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-foreground/15 mt-24">
      <div className="overflow-hidden border-b border-foreground/15">
        <div className="marquee whitespace-nowrap py-8 flex">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex shrink-0">
              {["Branding", "Editorial", "Type", "Packaging", "Art Direction", "Print"].map((w) => (
                <span key={w} className="display-bold text-6xl md:text-8xl px-8">
                  {w} —
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="container py-10 grid gap-8 md:grid-cols-4 text-sm">
        <div className="md:col-span-2">
          <div className="display-bold text-2xl">Atelier Noir</div>
          <p className="text-muted-foreground mt-2 max-w-sm">
            Independent graphic design studio working with founders, museums and
            considered brands.
          </p>
        </div>
        <div>
          <div className="eyebrow text-muted-foreground mb-3">Pages</div>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:underline">Index</Link></li>
            <li><Link to="/work" className="hover:underline">Work</Link></li>
            <li><Link to="/pricing" className="hover:underline">Pricing</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="eyebrow text-muted-foreground mb-3">Elsewhere</div>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Instagram</a></li>
            <li><a href="#" className="hover:underline">Are.na</a></li>
            <li><a href="#" className="hover:underline">Read.cv</a></li>
            <li><a href="mailto:hello@ateliernoir.studio" className="hover:underline">hello@ateliernoir.studio</a></li>
          </ul>
        </div>
      </div>
      <div className="container pb-8 flex flex-col md:flex-row md:justify-between gap-2 text-xs text-muted-foreground border-t border-foreground/10 pt-6">
        <span>© {year} Atelier Noir. All rights reserved.</span>
        <span>Designed in Paris · Printed on recycled paper.</span>
      </div>
    </footer>
  );
};
