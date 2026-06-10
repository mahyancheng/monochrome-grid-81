import { useState } from "react";
import { ArrowUpRight, MapPin, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import heroImg from "@/Archive/Projects/courtyard-house_60.jpg";

// 马来西亚州属列表
const MALAYSIA_STATES = [
  "Johor",
  "Kedah",
  "Kelantan",
  "Melaka",
  "Negeri Sembilan",
  "Pahang",
  "Perak",
  "Perlis",
  "Pulau Pinang",
  "Sabah",
  "Sarawak",
  "Selangor",
  "Terengganu",
  "W.P. Kuala Lumpur",
  "W.P. Labuan",
  "W.P. Putrajaya",
];

// 已经更新为最新的表单验证 Schema
const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(1, "Contact number is required").max(20),
  email: z.string().trim().email("Invalid email address").max(255),
  projectType: z.string().trim().min(1, "Please select a project type"),
  propertyLocation: z.string().trim().min(1, "Please select a location"),
  serviceCategory: z.string().trim().min(1, "Please select a category"),
  submittedAt: z.string().optional(),
});

type ContactForm = z.infer<typeof contactSchema>;

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // 更新了默认 state
  const [form, setForm] = useState<ContactForm>({
    name: "",
    phone: "",
    email: "",
    projectType: "",
    propertyLocation: "",
    serviceCategory: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  
  // Honeypot — invisible to humans, bots fill it and the server silently drops the submission.
  const [honeypot, setHoneypot] = useState("");

  const handleChange = (field: keyof Omit<ContactForm, 'submittedAt'>, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

    setIsSubmitting(true);
    const now = new Date();
    const submissionTime = now.toLocaleString('zh-CN', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false
    });

    try {
      const payload = { ...result.data, submittedAt: submissionTime, website: honeypot };
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwcKMzmjXypCo3--xJHv-mrBAIXNQ7IfwCr1JF8PgI7t9FzEEzJEnqVonCnG7m9AObd/exec",
        {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        toast({ title: "Message sent", description: `Successfully at ${submissionTime}` });
        // 成功后清空表单
        setForm({ name: "", phone: "", email: "", projectType: "", propertyLocation: "", serviceCategory: "" });
        setErrors({});
        
        // Google Ads conversion tracking
        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("event", "conversion", {
            send_to: "AW-11342839562/aySGCNSJiqAcEIr-16Aq",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please check your network.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 背景图层 */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Contact Background"
          className="w-full h-full object-cover transition-transform duration-700 ease-out"
          style={{ transform: isHovered ? "scale(1.02)" : "scale(1)" }}
        />
        <div className="absolute inset-0 bg-background/80" />
      </div>

      {/* 装饰边框 */}
      <div
        className="absolute inset-4 md:inset-8 border border-border transition-all duration-700 pointer-events-none"
        style={{
          transform: isHovered ? "scale(1.005)" : "scale(1)",
          opacity: isHovered ? 0.4 : 0.2,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* 左侧：联系信息 */}
          <div className="flex flex-col justify-center">
            <div className="space-y-6">
              {[
                {
                  icon: MapPin,
                  label: "Address",
                  value: "1, Jalan Biru 2, Taman Pelangi,\n80400 JB, Johor.",
                },
                { icon: Phone, label: "Telephone", value: "+6016-7442330 | +607-339 1199" },
                { icon: Mail, label: "Email", value: "hidilin@gmail.com" },
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
          </div>

          {/* 右侧：表单 */}
          <div className="flex flex-col justify-center">
            <div className="bg-background/60 backdrop-blur-md border border-border p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-6 h-px bg-foreground" />
                <span className="text-[10px] tracking-[0.3em] uppercase">
                  Send Us A Message
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot */}
                <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
                  <label>
                    Website
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground block mb-2">Name</label>
                    <Input
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="bg-transparent border-border rounded-none text-sm focus-visible:ring-foreground"
                      placeholder="Your name"
                    />
                    {errors.name && <p className="text-[10px] text-destructive mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground block mb-2">Contact No</label>
                    <Input
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="bg-transparent border-border rounded-none text-sm focus-visible:ring-foreground"
                      placeholder="+60"
                    />
                    {errors.phone && <p className="text-[10px] text-destructive mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground block mb-2">Email</label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="bg-transparent border-border rounded-none text-sm focus-visible:ring-foreground"
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="text-[10px] text-destructive mt-1">{errors.email}</p>}
                </div>

                {/* 更新 1：项目类型选择 */}
                <div>
                  <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground block mb-2">
                    Project Type
                  </label>
                  <select
                    value={form.projectType}
                    onChange={(e) => handleChange("projectType", e.target.value)}
                    className="flex h-10 w-full border border-border bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground rounded-none"
                  >
                    <option value="" disabled className="text-black">Select...</option>
                    <option value="Landed" className="text-black">Landed</option>
                    <option value="Hospitality" className="text-black">Hospitality</option>
                    <option value="Bungalow" className="text-black">Bungalow</option>
                  </select>
                  {errors.projectType && (
                    <p className="text-[10px] text-destructive mt-1">{errors.projectType}</p>
                  )}
                </div>

                {/* 更新 2：位置选择 */}
                <div>
                  <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground block mb-2">
                    Property Location
                  </label>
                  <select
                    value={form.propertyLocation}
                    onChange={(e) => handleChange("propertyLocation", e.target.value)}
                    className="flex h-10 w-full border border-border bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground rounded-none"
                  >
                    <option value="" disabled className="text-black">Select State...</option>
                    {MALAYSIA_STATES.map((state) => (
                      <option key={state} value={state} className="text-black">
                        {state}
                      </option>
                    ))}
                  </select>
                  {errors.propertyLocation && (
                    <p className="text-[10px] text-destructive mt-1">{errors.propertyLocation}</p>
                  )}
                </div>

                {/* 更新 3：工作范围 */}
                <div>
                  <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground block mb-2">
                    Scope of Work
                  </label>
                  <select
                    value={form.serviceCategory}
                    onChange={(e) => handleChange("serviceCategory", e.target.value)}
                    className="flex h-10 w-full border border-border bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground rounded-none"
                  >
                    <option value="" disabled className="text-black">Select...</option>
                    <option value="New Build" className="text-black">New Build</option>
                    <option value="Renovation" className="text-black">Renovation</option>
                    <option value="Interior Only" className="text-black">Interior Only</option>
                  </select>
                  {errors.serviceCategory && (
                    <p className="text-[10px] text-destructive mt-1">{errors.serviceCategory}</p>
                  )}
                </div>

                <div className="pt-2">
                  <p className="text-[11px] leading-relaxed text-muted-foreground mb-4">
                    After Submitting, Our Team will review your project detail and contact you for more information.
                  </p>
                  <Button
                    type="submit"
                    variant="outline"
                    disabled={isSubmitting}
                    className="rounded-none border-foreground text-foreground hover:bg-foreground hover:text-background text-[10px] tracking-[0.3em] uppercase px-8 py-5 transition-colors duration-300 w-full"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    {!isSubmitting && <ArrowUpRight size={12} className="ml-2" />}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;