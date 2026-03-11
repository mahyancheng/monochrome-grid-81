import { useState } from "react";
import { ArrowUpRight, MapPin, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { z } from "zod";

import heroImg from "@/Archive/Projects/courtyard-house_60.jpg";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(1, "Contact number is required").max(20),
  email: z.string().trim().email("Invalid email address").max(255),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

type ContactForm = z.infer<typeof contactSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState<ContactForm>({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (field: keyof ContactForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactForm, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ContactForm;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    toast({ title: "Message sent", description: "We'll get back to you shortly." });
    setForm({ name: "", phone: "", email: "", message: "" });
    setErrors({});
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      {/* Spotlight layout — image background with floating content */}
      <section
        className="relative flex-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Full background image */}
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="HIDI Lau Architect"
            className="w-full h-full object-cover transition-transform duration-700 ease-out"
            style={{ transform: isHovered ? "scale(1.02)" : "scale(1)" }}
          />
          <div className="absolute inset-0 bg-background/80" />
        </div>

        {/* Frame outline (from spotlight component) */}
        <div
          className="absolute inset-4 md:inset-8 border border-border transition-all duration-700 pointer-events-none"
          style={{
            transform: isHovered ? "scale(1.005)" : "scale(1)",
            opacity: isHovered ? 0.4 : 0.2,
          }}
        />

        {/* Corner accents */}
        <div className="absolute top-6 left-6 md:top-10 md:left-10 w-6 h-6 border-t border-l border-foreground/40 pointer-events-none" />
        <div className="absolute top-6 right-6 md:top-10 md:right-10 w-6 h-6 border-t border-r border-foreground/40 pointer-events-none" />
        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 w-6 h-6 border-b border-l border-foreground/40 pointer-events-none" />
        <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 w-6 h-6 border-b border-r border-foreground/40 pointer-events-none" />

        {/* Floating content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left: Title + Contact Info */}
            <div className="flex flex-col justify-center">
              {/* Animated label */}
              <div className="flex items-center gap-3 mb-8">
                <div
                  className="h-px bg-foreground transition-all duration-700 ease-out"
                  style={{ width: isHovered ? "3rem" : "1.5rem" }}
                />
                <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                  Get In Touch
                </span>
              </div>

              {/* Title with hover shift */}
              <div className="mb-8">
                {["Let's Build", "Together"].map((line, i) => (
                  <h1
                    key={i}
                    className={`text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] ${
                      i === 1
                        ? "italic font-light text-muted-foreground"
                        : "font-extralight"
                    }`}
                    style={{
                      transform: isHovered
                        ? `translateX(${i * 8}px)`
                        : "translateX(0)",
                      transition: `transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.05}s`,
                    }}
                  >
                    {line}
                  </h1>
                ))}
              </div>

              <p className="text-xs leading-6 text-muted-foreground font-light max-w-sm mb-12">
                Speak to us today and let our architectural and interior design
                team help you visualize your house design, transforming ideas
                into a well-crafted living space.
              </p>

              {/* Contact details */}
              <div className="space-y-6">
                {[
                  {
                    icon: MapPin,
                    label: "Address",
                    value:
                      "1, Jalan Biru 2, Taman Pelangi,\n80400 JB, Johor.",
                  },
                  { icon: Phone, label: "Telephone", value: "+6016-7442330 | +607-339 1199" },
                  {
                    icon: Mail,
                    label: "Email",
                    value: "hidilin@gmail.com",
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-8 h-8 border border-border flex items-center justify-center flex-shrink-0 mt-0.5 bg-background/50 backdrop-blur-sm">
                      <item.icon size={14} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">
                        {item.label}
                      </p>
                      <p className="text-xs leading-5 whitespace-pre-line">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Index number */}
              <span className="mt-12 text-[10px] tracking-[0.3em] text-muted-foreground">
                01
              </span>
            </div>

            {/* Right: Lead Form */}
            <div className="flex flex-col justify-center">
              <div className="bg-background/60 backdrop-blur-md border border-border p-8 md:p-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-6 h-px bg-foreground" />
                  <span className="text-[10px] tracking-[0.3em] uppercase">
                    Send Us A Message
                  </span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground block mb-2">
                      Name
                    </label>
                    <Input
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="bg-transparent border-border rounded-none text-sm focus-visible:ring-foreground"
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="text-[10px] text-destructive mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground block mb-2">
                      Contact No
                    </label>
                    <Input
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="bg-transparent border-border rounded-none text-sm focus-visible:ring-foreground"
                      placeholder="+60"
                    />
                    {errors.phone && (
                      <p className="text-[10px] text-destructive mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground block mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="bg-transparent border-border rounded-none text-sm focus-visible:ring-foreground"
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p className="text-[10px] text-destructive mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground block mb-2">
                      Message
                    </label>
                    <Textarea
                      value={form.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      className="bg-transparent border-border rounded-none text-sm focus-visible:ring-foreground min-h-[100px]"
                      placeholder="Tell us about your project"
                    />
                    {errors.message && (
                      <p className="text-[10px] text-destructive mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="outline"
                    className="rounded-none border-foreground text-foreground hover:bg-foreground hover:text-background text-[10px] tracking-[0.3em] uppercase px-8 py-5 transition-colors duration-300 w-full"
                  >
                    Send Message
                    <ArrowUpRight size={12} className="ml-2" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
