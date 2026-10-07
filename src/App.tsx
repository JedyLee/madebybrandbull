import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import { SiteLayout } from "./components/SiteLayout";
import Index from "./pages/Index.tsx";
import Work from "./pages/Work.tsx";
import Pricing from "./pages/Pricing.tsx";
import Contact from "./pages/Contact.tsx";
import Blog from "./pages/Blog.tsx";
import BlogPost from "./pages/BlogPost.tsx";
import About from "./pages/About.tsx";
import Music from "./pages/Music.tsx";
import AdminMedia from "./pages/admin/AdminMedia.tsx";
import AdminMusic from "./pages/admin/AdminMusic.tsx";
import AdminContent from "./pages/admin/AdminContent.tsx";
import NotFound from "./pages/NotFound.tsx";
import AdminLogin from "./pages/AdminLogin.tsx";
import AdminLayout from "./pages/admin/AdminLayout.tsx";
import AdminHome from "./pages/admin/AdminHome.tsx";
import AdminWork from "./pages/admin/AdminWork.tsx";
import AdminJournal from "./pages/admin/AdminJournal.tsx";
import AdminJournalEdit from "./pages/admin/AdminJournalEdit.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<SiteLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/work" element={<Work />} />
              <Route path="/about" element={<About />} />
              <Route path="/music" element={<Music />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/journal" element={<Blog />} />
              <Route path="/journal/:slug" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminHome />} />
                <Route path="work" element={<AdminWork />} />
                <Route path="journal" element={<AdminJournal />} />
                <Route path="media" element={<AdminMedia />} />
                <Route path="music" element={<AdminMusic />} />
                <Route path="content" element={<AdminContent />} />
                <Route path="journal/:id" element={<AdminJournalEdit />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
