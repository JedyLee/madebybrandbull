import { ChangeEvent, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { uploadImage } from "@/lib/upload";

type Faq = { id?: string; question: string; answer: string; sort_order: number };
type Book = { id?: string; title: string; author: string | null; cover_url: string | null; sort_order: number };

const fieldClass = "w-full border border-input bg-background px-3 py-2 text-sm";

const AdminContent = () => {
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState<number | null>(null);
  const { data: faqs = [] } = useQuery({
    queryKey: ["site_faqs"],
    queryFn: async () => (await supabase.from("site_faqs").select("*").order("sort_order")).data ?? [],
  });
  const { data: books = [] } = useQuery({
    queryKey: ["reading_books"],
    queryFn: async () => (await supabase.from("reading_books").select("*").order("sort_order")).data ?? [],
  });
  const [faqDrafts, setFaqDrafts] = useState<Faq[]>([]);
  const [bookDrafts, setBookDrafts] = useState<Book[]>([]);
  const faqItems: Faq[] = faqDrafts.length ? faqDrafts : faqs;
  const bookItems: Book[] = bookDrafts.length ? bookDrafts : books;

  const saveFaq = async (faq: Faq, index: number) => {
    if (!faq.question.trim() || !faq.answer.trim()) return toast.error("Add both a question and answer");
    const payload = { question: faq.question, answer: faq.answer, sort_order: faq.sort_order };
    const result = faq.id
      ? await supabase.from("site_faqs").update(payload).eq("id", faq.id)
      : await supabase.from("site_faqs").insert(payload).select().single();
    if (result.error) return toast.error(result.error.message);
    if (!faq.id && result.data) setFaqDrafts((items) => items.map((item, i) => i === index ? { ...item, id: result.data.id } : item));
    queryClient.invalidateQueries({ queryKey: ["site_faqs"] });
    toast.success("FAQ saved");
  };

  const saveBook = async (book: Book, index: number) => {
    if (!book.title.trim()) return toast.error("Add a book title");
    const payload = { title: book.title, author: book.author || null, cover_url: book.cover_url || null, sort_order: book.sort_order };
    const result = book.id
      ? await supabase.from("reading_books").update(payload).eq("id", book.id)
      : await supabase.from("reading_books").insert(payload).select().single();
    if (result.error) return toast.error(result.error.message);
    if (!book.id && result.data) setBookDrafts((items) => items.map((item, i) => i === index ? { ...item, id: result.data.id } : item));
    queryClient.invalidateQueries({ queryKey: ["reading_books"] });
    toast.success("Book saved");
  };

  const remove = async (table: "site_faqs" | "reading_books", id?: string) => {
    if (!id) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) return toast.error(error.message);
    queryClient.invalidateQueries({ queryKey: [table] });
    if (table === "site_faqs") setFaqDrafts([]); else setBookDrafts([]);
  };

  const uploadCover = async (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(index);
    try {
      const cover_url = await uploadImage(file, "books");
      setBookDrafts((bookItems.length ? bookItems : books).map((book, i) => i === index ? { ...book, cover_url } : book));
    } catch (error) { toast.error(error instanceof Error ? error.message : "Upload failed"); }
    finally { setUploading(null); event.target.value = ""; }
  };

  return (
    <div className="space-y-14">
      <section>
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl">Home FAQ</h2>
          <Button variant="outline" size="sm" onClick={() => setFaqDrafts([...(faqItems.length ? faqItems : faqs), { question: "", answer: "", sort_order: faqItems.length }])}><Plus /> Add question</Button>
        </div>
        <div className="space-y-4">
          {faqItems.map((faq, index) => <div key={faq.id ?? `faq-${index}`} className="border border-border p-4 space-y-3">
            <input className={fieldClass} value={faq.question} placeholder="Question" onChange={(e) => setFaqDrafts(faqItems.map((item, i) => i === index ? { ...item, question: e.target.value } : item))} />
            <textarea className={fieldClass} rows={3} value={faq.answer} placeholder="Answer" onChange={(e) => setFaqDrafts(faqItems.map((item, i) => i === index ? { ...item, answer: e.target.value } : item))} />
            <div className="flex gap-2"><Button size="sm" onClick={() => saveFaq(faq, index)}><Save /> Save</Button>{faq.id && <Button size="sm" variant="destructive" onClick={() => remove("site_faqs", faq.id)}><Trash2 /> Delete</Button>}</div>
          </div>)}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl">Books I've Read</h2>
          <Button variant="outline" size="sm" onClick={() => setBookDrafts([...(bookItems.length ? bookItems : books), { title: "", author: "", cover_url: null, sort_order: bookItems.length }])}><Plus /> Add book</Button>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {bookItems.map((book, index) => <div key={book.id ?? `book-${index}`} className="border border-border p-4 space-y-3">
            <div className="aspect-[3/2] bg-muted overflow-hidden rounded-md">{book.cover_url && <img src={book.cover_url} alt="" className="w-full h-full object-cover" />}</div>
            <input className={fieldClass} value={book.title} placeholder="Book title" onChange={(e) => setBookDrafts(bookItems.map((item, i) => i === index ? { ...item, title: e.target.value } : item))} />
            <input className={fieldClass} value={book.author ?? ""} placeholder="Author" onChange={(e) => setBookDrafts(bookItems.map((item, i) => i === index ? { ...item, author: e.target.value } : item))} />
            <label className="inline-flex cursor-pointer text-xs underline">{uploading === index ? "Uploading…" : "Upload cover"}<input hidden type="file" accept="image/*" onChange={(event) => uploadCover(index, event)} /></label>
            <div className="flex gap-2"><Button size="sm" onClick={() => saveBook(book, index)}><Save /> Save</Button>{book.id && <Button size="sm" variant="destructive" onClick={() => remove("reading_books", book.id)}><Trash2 /> Delete</Button>}</div>
          </div>)}
        </div>
      </section>
    </div>
  );
};

export default AdminContent;