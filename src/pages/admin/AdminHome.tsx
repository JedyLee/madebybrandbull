import { Link } from "react-router-dom";

const AdminHome = () => (
  <div className="grid md:grid-cols-2 gap-6">
    <Link to="/admin/work" className="border border-foreground/20 p-8 hover:border-coral transition-colors block">
      <div className="eyebrow text-muted-foreground">01</div>
      <h2 className="display-bold text-3xl mt-3">Work</h2>
      <p className="mt-3 text-muted-foreground">Change the intro copy for each category and add new brand entries with image galleries.</p>
    </Link>
    <Link to="/admin/journal" className="border border-foreground/20 p-8 hover:border-coral transition-colors block">
      <div className="eyebrow text-muted-foreground">02</div>
      <h2 className="display-bold text-3xl mt-3">Journal</h2>
      <p className="mt-3 text-muted-foreground">Write stories composed of paragraphs, single images, image galleries and pull quotes.</p>
    </Link>
    <Link to="/admin/media" className="border border-foreground/20 p-8 hover:border-coral transition-colors block">
      <div className="eyebrow text-muted-foreground">03</div>
      <h2 className="display-bold text-3xl mt-3">Site images</h2>
      <p className="mt-3 text-muted-foreground">Swap the rounded picture spots on Home, About, Work and Music.</p>
    </Link>
    <Link to="/admin/music" className="border border-foreground/20 p-8 hover:border-coral transition-colors block">
      <div className="eyebrow text-muted-foreground">04</div>
      <h2 className="display-bold text-3xl mt-3">Music</h2>
      <p className="mt-3 text-muted-foreground">Upload songs and covers to the Listen list on the Music page.</p>
    </Link>
  </div>
);

export default AdminHome;
