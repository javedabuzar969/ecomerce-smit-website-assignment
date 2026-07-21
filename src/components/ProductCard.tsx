import { Link } from "react-router";
import { Share2, BarChart2, Heart } from "lucide-react";
import { useState } from "react";
import type { Product } from "../data/products";
import { fmt } from "../data/products";
import { cartStore } from "../store/cart";

export default function ProductCard({ product: p }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <div
      className="group relative bg-card overflow-hidden cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/product/${p.id}`} className="block">
        <div className="relative h-[200px] sm:h-[250px] lg:h-[300px] bg-muted overflow-hidden">
          <img src={p.img} alt={p.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {p.discount && (
              <span className="bg-[#E97171] text-white text-xs font-medium px-3 py-1 rounded-full">{p.discount}</span>
            )}
            {p.badge && (
              <span className="bg-[#2EC1AC] text-white text-xs font-medium px-3 py-1 rounded-full">{p.badge}</span>
            )}
          </div>
        </div>
      </Link>

      {/* Hover overlay */}
      <div className={`absolute inset-0 bg-foreground/40 flex flex-col items-center justify-center gap-4 transition-opacity duration-300 pointer-events-none ${hovered ? "opacity-100 pointer-events-auto" : "opacity-0"}`}>
        <button
          className="bg-white text-primary font-semibold text-sm px-8 py-3 hover:bg-primary hover:text-white transition-colors z-10"
          onClick={(e) => { e.stopPropagation(); cartStore.add(p); }}
        >
          Add to cart
        </button>
        <div className="flex items-center gap-4 text-white text-xs font-semibold">
          <button className="flex items-center gap-1.5 hover:text-primary transition-colors"><Share2 size={13} /> Share</button>
          <button className="flex items-center gap-1.5 hover:text-primary transition-colors"><BarChart2 size={13} /> Compare</button>
          <button
            className="flex items-center gap-1.5 hover:text-primary transition-colors"
            onClick={(e) => { e.stopPropagation(); setWishlisted(!wishlisted); }}
          >
            <Heart size={13} className={wishlisted ? "fill-white" : ""} /> Like
          </button>
        </div>
      </div>

      {/* Info */}
      <Link to={`/product/${p.id}`} className="block p-4">
        <h3 className="text-xl font-semibold text-foreground">{p.name}</h3>
        <p className="text-sm text-muted-foreground mt-1 mb-3">{p.desc}</p>
        <div className="flex items-center gap-4">
          <span className="text-lg font-semibold text-foreground">{fmt(p.price)}</span>
          {p.oldPrice && <span className="text-base text-muted-foreground line-through">{fmt(p.oldPrice)}</span>}
        </div>
      </Link>
    </div>
  );
}
