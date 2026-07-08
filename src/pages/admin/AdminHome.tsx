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
  </div>
);

export default AdminHome;
