import { Link } from "react-router";
import { ArrowRight, Instagram } from "lucide-react";
import { PRODUCTS } from "../data/products";
import ProductCard from "../components/ProductCard";

const RANGES = [
  { label: "Dining", image: "https://images.unsplash.com/photo-1740759546813-6b58d44f5dce?w=480&h=480&fit=crop&auto=format", alt: "Dining room" },
  { label: "Living", image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=480&h=480&fit=crop&auto=format", alt: "Living room" },
  { label: "Bedroom", image: "https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?w=480&h=480&fit=crop&auto=format", alt: "Bedroom" },
];

const INSTA = [
  "https://images.unsplash.com/photo-1724582586529-62622e50c0b3?w=300&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?w=300&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1646987916641-1f3c8992daa2?w=300&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1657524398377-567034729507?w=300&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1723750290151-164cb19ebab7?w=300&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1648881806148-e5c51179c826?w=300&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1705326701287-346fc37a2c86?w=300&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1644057501622-dfa7dd26dbfb?w=300&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1547062200-f195b1c77e30?w=300&h=300&fit=crop&auto=format",
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[calc(100vh-100px)] flex items-center overflow-hidden bg-muted">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1600&h=900&fit=crop&auto=format" alt="Modern living room" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="relative ml-auto mr-4 sm:mr-8 lg:mr-20 w-full max-w-[643px] bg-[#FFF3E3]/95 px-8 lg:px-16 py-12 lg:py-20">
          <p className="text-sm sm:text-base font-semibold tracking-[0.1em] mb-4">New Arrival</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[52px] font-bold leading-tight mb-6" style={{ color: "#B88E2F" }}>
            Discover Our<br />New Collection
          </h1>
          <p className="text-sm lg:text-base font-medium leading-relaxed mb-10 max-w-[350px] text-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
          </p>
          <Link to="/shop" className="inline-block bg-primary text-white px-12 lg:px-14 py-4 text-base font-bold tracking-wide hover:bg-[#9a7728] transition-colors">
            BUY Now
          </Link>
        </div>
      </section>

      {/* BROWSE THE RANGE */}
      <section className="py-16 px-6 lg:px-20 max-w-[1440px] mx-auto text-center">
        <h2 className="text-[32px] font-bold mb-3">Browse The Range</h2>
        <p className="text-muted-foreground mb-12">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {RANGES.map((r) => (
            <Link to="/shop" key={r.label} className="group cursor-pointer">
              <div className="overflow-hidden rounded-lg bg-muted mb-5 h-[350px] sm:h-[420px] lg:h-[480px]">
                <img src={r.image} alt={r.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h3 className="text-2xl font-semibold">{r.label}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* OUR PRODUCTS */}
      <section className="py-12 px-6 lg:px-20 max-w-[1440px] mx-auto text-center">
        <h2 className="text-[40px] font-bold mb-12">Our Products</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 text-left">
          {PRODUCTS.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <Link to="/shop" className="inline-block mt-14 px-16 py-3 border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors">
          Show More
        </Link>
      </section>

      {/* INSPIRATION BANNER */}
      <section className="relative h-[500px] sm:h-[600px] lg:h-[670px] overflow-hidden my-4">
        <img src="https://images.unsplash.com/photo-1648881806148-e5c51179c826?w=1800&h=700&fit=crop&auto=format" alt="Room inspiration" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center">
          <div className="ml-8 lg:ml-24 max-w-[420px] text-white">
            <p className="text-sm font-semibold mb-2 text-white/90">Explore New and Popular Styles</p>
            <h2 className="text-3xl lg:text-[40px] font-bold leading-tight mb-6 text-white drop-shadow-md">50+ Beautiful rooms inspiration</h2>
            <p className="text-sm text-white/80 leading-relaxed mb-9">Our designer already made a lot of beautiful prototipe of rooms that inspire you.</p>
            <Link to="/shop" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 text-sm font-semibold hover:bg-[#9a7728] transition-colors">
              Explore More <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        <div className="absolute right-4 lg:right-16 top-1/2 -translate-y-1/2 hidden sm:flex gap-4">
          <div className="flex flex-col gap-4">
            <div className="w-[200px] h-[180px] lg:w-[270px] lg:h-[230px] overflow-hidden rounded bg-muted">
              <img src="https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?w=270&h=230&fit=crop&auto=format" alt="Room 1" className="w-full h-full object-cover" />
            </div>
            <div className="w-[200px] h-[130px] lg:w-[270px] lg:h-[170px] overflow-hidden rounded bg-muted">
              <img src="https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?w=270&h=170&fit=crop&auto=format" alt="Room 2" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="hidden lg:flex flex-col gap-4 mt-16">
            <div className="w-[220px] h-[150px] overflow-hidden rounded bg-muted">
              <img src="https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?w=220&h=150&fit=crop&auto=format" alt="Room 3" className="w-full h-full object-cover" />
            </div>
            <div className="w-[220px] h-[220px] rounded bg-primary flex flex-col items-center justify-center text-white p-6">
              <span className="text-5xl font-bold leading-none">50+</span>
              <span className="text-sm font-medium mt-2 text-center leading-snug">Beautiful Rooms</span>
            </div>
          </div>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="py-16 text-center overflow-hidden">
        <p className="text-base font-medium text-muted-foreground mb-1">Share your setup with</p>
        <h2 className="text-[40px] font-bold mb-10">#FurniroFurniture</h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-0">
          {INSTA.map((src, i) => (
            <div key={i} className="relative overflow-hidden aspect-square group cursor-pointer">
              <img src={src} alt={`Setup ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/25 transition-colors flex items-center justify-center">
                <Instagram size={28} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
