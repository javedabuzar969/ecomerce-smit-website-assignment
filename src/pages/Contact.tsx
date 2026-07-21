import { useState } from "react";
import { MapPin, Phone, Clock, CheckCircle } from "lucide-react";
import PageBanner from "../components/PageBanner";
import { FeaturesStrip } from "./Shop";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <PageBanner title="Contact" crumbs={[{ label: "Contact" }]} />

      {/* INTRO */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-20 pt-20 text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Get In Touch With Us</h2>
        <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
          For More Information About Our Product & Services. Please Feel Free To Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!
        </p>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-20 pb-20 grid lg:grid-cols-[340px_1fr] gap-12 lg:gap-20">
        {/* LEFT: contact info */}
        <div className="space-y-10">
          <div className="flex gap-5">
            <div className="text-primary mt-1"><MapPin size={26} /></div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Address</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">236 5th SE Avenue, New York NY10000, United States</p>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="text-primary mt-1"><Phone size={26} /></div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Phone</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Mobile: +(84) 546-6789<br />Hotline: +(84) 456-6789</p>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="text-primary mt-1"><Clock size={26} /></div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Working Time</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Monday–Friday: 9:00 – 22:00<br />Saturday–Sunday: 9:00 – 21:00</p>
            </div>
          </div>
        </div>

        {/* RIGHT: form */}
        <div>
          {sent ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 text-center">
              <CheckCircle size={56} className="text-primary" />
              <h3 className="text-2xl font-bold text-foreground">Message Sent!</h3>
              <p className="text-muted-foreground">Thank you for reaching out. We will get back to you within 24 hours.</p>
              <button onClick={() => setSent(false)} className="mt-4 px-8 py-3 border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors">
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-7">
              {[
                { key: "name", label: "Your name", type: "text", placeholder: "Abc" },
                { key: "email", label: "Email address", type: "email", placeholder: "Abc@def.com" },
                { key: "subject", label: "Subject", type: "text", placeholder: "This is optional" },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key}>
                  <label className="block text-base font-medium text-foreground mb-3">{label}</label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full border border-border rounded px-5 py-4 text-sm outline-none focus:border-primary transition-colors bg-white placeholder:text-muted-foreground"
                    required={key !== "subject"}
                  />
                </div>
              ))}
              <div>
                <label className="block text-base font-medium text-foreground mb-3">Message</label>
                <textarea
                  placeholder="Hi! I'd like to ask about..."
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full border border-border rounded px-5 py-4 text-sm outline-none focus:border-primary transition-colors bg-white placeholder:text-muted-foreground resize-none"
                  required
                />
              </div>
              <button type="submit" className="px-14 py-4 bg-primary text-white font-semibold hover:bg-[#9a7728] transition-colors">
                Submit
              </button>
            </form>
          )}
        </div>
      </div>

      <FeaturesStrip />
    </>
  );
}
