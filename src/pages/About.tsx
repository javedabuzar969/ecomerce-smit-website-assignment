import { Link } from "react-router";
import { Award, Users, Home, Smile } from "lucide-react";
import PageBanner from "../components/PageBanner";
import { FeaturesStrip } from "./Shop";

const TEAM = [
  { name: "Aliah Sultan", role: "CEO & Founder", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&auto=format" },
  { name: "Marco Renzo", role: "Head of Design", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&auto=format" },
  { name: "Sophie Laurent", role: "Lead Architect", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&auto=format" },
];

const STATS = [
  { icon: <Award size={32} />, value: "400+", label: "Designers" },
  { icon: <Home size={32} />, value: "12,000+", label: "Products" },
  { icon: <Users size={32} />, value: "50,000+", label: "Happy Clients" },
  { icon: <Smile size={32} />, value: "98%", label: "Satisfaction" },
];

export default function About() {
  return (
    <>
      <PageBanner title="About" crumbs={[{ label: "About" }]} />

      {/* INTRO */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-20 py-20 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4 block">Our Story</span>
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
            Crafting Spaces,<br />Creating Memories
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-5">
            Founded in 2010, Furniro started as a small workshop with a big dream — to make beautiful, quality furniture accessible to everyone. Over the years, we have grown into one of the most trusted furniture brands, serving over 50,000 happy customers across the globe.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-10">
            Every piece we craft is a story of meticulous craftsmanship, sustainable sourcing, and timeless design. We believe your home is your sanctuary, and we are here to help you make it perfect.
          </p>
          <Link to="/shop" className="inline-block px-10 py-4 border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors">
            Explore Our Products
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-[280px] lg:h-[340px] bg-muted rounded overflow-hidden">
            <img src="https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&h=400&fit=crop&auto=format" alt="Our showroom" className="w-full h-full object-cover" />
          </div>
          <div className="h-[280px] lg:h-[340px] bg-muted rounded overflow-hidden mt-8">
            <img src="https://images.unsplash.com/photo-1740759546813-6b58d44f5dce?w=400&h=400&fit=crop&auto=format" alt="Workshop" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#FAF0E6] py-16 px-6 lg:px-20">
        <div className="max-w-[1440px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center gap-3 py-6 bg-white rounded shadow-sm">
              <div className="text-primary">{s.icon}</div>
              <div className="text-3xl font-bold text-foreground">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-20 py-20 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4 block">The People</span>
        <h2 className="text-4xl font-bold mb-14">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {TEAM.map((m) => (
            <div key={m.name} className="group">
              <div className="overflow-hidden bg-muted rounded-lg mb-5 aspect-square max-w-[280px] mx-auto">
                <img src={m.img} alt={m.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">{m.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative h-[320px] overflow-hidden flex items-center justify-center text-center">
        <img src="https://images.unsplash.com/photo-1648881806148-e5c51179c826?w=1600&h=400&fit=crop&auto=format" alt="Furniture showroom" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/55" />
        <div className="relative z-10 text-white px-6">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to transform your space?</h2>
          <p className="text-white/70 mb-8 text-base">Explore our full collection and find your perfect match.</p>
          <Link to="/shop" className="inline-block bg-primary text-white px-12 py-4 font-semibold hover:bg-[#9a7728] transition-colors">
            Shop Now
          </Link>
        </div>
      </section>

      <FeaturesStrip />
    </>
  );
}
