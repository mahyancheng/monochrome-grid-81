import { useState } from "react";
import { ArrowUpRight, MapPin, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { z } from "zod";

import contactImg1 from "@/Archive/Contact/2030.png";
import contactImg2 from "@/Archive/Contact/2031.png";
import contactImg3 from "@/Archive/Contact/2032.png";

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

      {/* Hero */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="flex items-center gap-3 mb-8">
            <div
              className="h-px bg-foreground transition-all duration-700"
              style={{ width: isHovered ? "3rem" : "1.5rem" }}
            />
            <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              Get In Touch
            </span>
          </div>
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight leading-[1.1]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className="block">Let's Build</span>
            <span className="block italic font-light text-muted-foreground">
              Together
            </span>
          </h1>
        </div>
      </section>

      {/* Form + Info */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left: Form */}
          <div className="px-6 py-16 lg:border-r border-border">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-6 h-px bg-foreground" />
              <span className="text-[10px] tracking-[0.3em] uppercase">
                Send Us A Message
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
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
                  <p className="text-[10px] text-destructive mt-1">{errors.name}</p>
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
                  <p className="text-[10px] text-destructive mt-1">{errors.phone}</p>
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
                  <p className="text-[10px] text-destructive mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground block mb-2">
                  Message
                </label>
                <Textarea
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  className="bg-transparent border-border rounded-none text-sm focus-visible:ring-foreground min-h-[120px]"
                  placeholder="Tell us about your project"
                />
                {errors.message && (
                  <p className="text-[10px] text-destructive mt-1">{errors.message}</p>
                )}
              </div>

              <Button
                type="submit"
                variant="outline"
                className="rounded-none border-foreground text-foreground hover:bg-foreground hover:text-background text-[10px] tracking-[0.3em] uppercase px-8 py-5 transition-colors duration-300"
              >
                Send Message
                <ArrowUpRight size={12} className="ml-2" />
              </Button>
            </form>
          </div>

          {/* Right: Contact Info */}
          <div className="px-6 py-16">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-6 h-px bg-foreground" />
              <span className="text-[10px] tracking-[0.3em] uppercase">
                Contact Information
              </span>
            </div>

            <div className="space-y-8 mb-16">
              {[
                {
                  icon: MapPin,
                  label: "Address",
                  value: "1, Jalan Biru 2, Taman Pelangi,\n80400 Johor Bahru, Johor, Malaysia.",
                },
                {
                  icon: Phone,
                  label: "Telephone",
                  value: "+607-339 1199",
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: "admin@tectonedesign.com",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-8 h-8 border border-border flex items-center justify-center flex-shrink-0 mt-0.5">
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

            {/* Image grid */}
            <div className="grid grid-cols-3 gap-3">
              {[contactImg1, contactImg2, contactImg3].map((img, i) => (
                <div key={i} className="relative aspect-square overflow-hidden group">
                  <img
                    src={img}
                    alt={`Office ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Corner accents */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-foreground/30" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-foreground/30" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
