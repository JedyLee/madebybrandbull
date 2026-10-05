import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const ReadingBooks = () => {
  const { data: books = [] } = useQuery({
    queryKey: ["reading_books"],
    queryFn: async () => {
      const { data, error } = await supabase.from("reading_books").select("*").order("sort_order");
      if (error) throw error;
      return data ?? [];
    },
  });
  return (
    <section className="container max-w-5xl py-16 md:py-24">
      <h2 className="text-center text-2xl md:text-3xl mb-9">Books I've Read</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
        {books.length ? books.map((book) => (
          <article key={book.id} className="min-w-0">
            <div className="aspect-[3/4] bg-foreground overflow-hidden rounded-md">
              {book.cover_url && <img src={book.cover_url} alt={`Cover of ${book.title}`} className="w-full h-full object-cover" loading="lazy" />}
            </div>
            <h3 className="mt-3 text-sm font-medium">{book.title}</h3>
            {book.author && <p className="text-xs text-muted-foreground mt-1">{book.author}</p>}
          </article>
        )) : Array.from({ length: 4 }, (_, i) => <div key={i} className="aspect-[3/4] rounded-md bg-foreground" aria-hidden="true" />)}
      </div>
    </section>
  );
};