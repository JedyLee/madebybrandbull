import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import portrait from "@/assets/portrait.jpg";

const budgets = ["< €3k", "€3—7k", "€7—15k", "€15k+"];
const services = ["Branding", "Editorial", "Type", "Packaging", "Art Direction", "Other"];

const Contact = () => {
  const { toast } = useToast();
  const [budget, setBudget] = useState(budgets[1]);
  const [service, setService] = useState(services[0]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = (form.get("name") || "friend") as string;
    toast({
      title: `Thank you, ${name}.`,
      description: "I&apos;ll reply within two working days.",
    });
    e.currentTarget.reset();
  };

  return (
    <>
      <section className="container pt-12 md:pt-20 pb-10">
        <div className="eyebrow text-muted-foreground">Say hello</div>
        <h1 className="display-bold text-6xl md:text-[10rem] mt-4 leading-[0.85]">
          Contact.
        </h1>
      </section>

      <section className="container pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 border-t border-foreground/15 pt-10">
          {/* Left — info */}
          <aside className="lg:col-span-5 space-y-10">
            <div className="overflow-hidden bg-paper-soft max-w-sm">
              <img
                src={portrait}
                alt="Portrait of Élise Marchand"
                width={1024}
                height={1280}
                loading="lazy"
                className="w-full aspect-[4/5] object-cover"
              />
            </div>

            <div className="space-y-1">
              <div className="eyebrow text-muted-foreground">Email</div>
              <a
                href="mailto:hello@ateliernoir.studio"
                className="display-bold text-2xl md:text-3xl block hover:underline underline-offset-4"
              >
                hello@ateliernoir.studio
              </a>
            </div>

            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <div className="eyebrow text-muted-foreground mb-2">Studio</div>
                <p>14 rue de Charonne<br />75011 Paris, France</p>
              </div>
              <div>
                <div className="eyebrow text-muted-foreground mb-2">Hours</div>
                <p>Mon — Fri<br />09h00 — 18h00 CET</p>
              </div>
              <div>
                <div className="eyebrow text-muted-foreground mb-2">Social</div>
                <p>Instagram<br />Are.na · Read.cv</p>
              </div>
              <div>
                <div className="eyebrow text-muted-foreground mb-2">Availability</div>
                <p>Booking from<br />June 2026</p>
              </div>
            </div>
          </aside>

          {/* Right — form */}
          <form onSubmit={onSubmit} className="lg:col-span-7 space-y-8">
            <p className="text-base md:text-lg leading-relaxed">
              Tell me about your project. The more context, the better — but a
              short note is also a wonderful place to start.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <Field label="Your name" name="name" placeholder="Élodie Dupont" required />
              <Field label="Email" name="email" type="email" placeholder="you@studio.com" required />
            </div>
            <Field label="Company / Project" name="company" placeholder="Optional" />

            <div>
              <div className="eyebrow text-muted-foreground mb-3">Service</div>
              <div className="flex flex-wrap gap-2">
                {services.map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setService(s)}
                    className={`text-xs uppercase tracking-[0.2em] px-3 py-2 border transition-colors ${
                      service === s
                        ? "bg-foreground text-background border-foreground"
                        : "border-foreground/30 hover:border-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="eyebrow text-muted-foreground mb-3">Budget</div>
              <div className="flex flex-wrap gap-2">
                {budgets.map((b) => (
                  <button
                    type="button"
                    key={b}
                    onClick={() => setBudget(b)}
                    className={`text-xs uppercase tracking-[0.2em] px-3 py-2 border transition-colors ${
                      budget === b
                        ? "bg-foreground text-background border-foreground"
                        : "border-foreground/30 hover:border-foreground"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="eyebrow text-muted-foreground block mb-2">
                Message
              </label>
              <textarea
                name="message"
                rows={6}
                required
                placeholder="A few lines about what you&apos;re building…"
                className="w-full bg-transparent border-b border-foreground/30 focus:border-foreground outline-none py-3 text-base placeholder:text-muted-foreground/60 resize-none transition-colors"
              />
            </div>

            <button
              type="submit"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-foreground text-background text-sm tracking-[0.2em] uppercase hover:bg-ink-soft transition-colors"
            >
              Send message
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

const Field = ({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) => (
  <label className="block">
    <span className="eyebrow text-muted-foreground block mb-2">{label}</span>
    <input
      type={type}
      name={name}
      required={required}
      placeholder={placeholder}
      className="w-full bg-transparent border-b border-foreground/30 focus:border-foreground outline-none py-3 text-base placeholder:text-muted-foreground/60 transition-colors"
    />
  </label>
);

export default Contact;
