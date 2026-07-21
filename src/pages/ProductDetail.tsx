import { useParams, Link } from "react-router";
import { useState } from "react";
import { Minus, Plus, Heart, Share2, BarChart2, Star } from "lucide-react";
import { PRODUCTS, fmt } from "../data/products";
import { cartStore } from "../store/cart";
import ProductCard from "../components/ProductCard";
import PageBanner from "../components/PageBanner";
import { FeaturesStrip } from "./Shop";

export default function ProductDetail() {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id === Number(id));
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState("Description");

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-6">
        <h2 className="text-3xl font-bold">Product not found</h2>
        <Link to="/shop" className="text-primary underline">Back to Shop</Link>
      </div>
    );
  }

  const imgs = product.imgs ?? [product.img];
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) cartStore.add(product);
  };

  return (
    <>
      <PageBanner title={product.name} crumbs={[{ label: "Shop", to: "/shop" }, { label: product.name }]} />

      {/* PRODUCT SECTION */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20 py-14">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Images */}
          <div className="flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:max-h-[500px]">
              {imgs.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 overflow-hidden bg-muted rounded transition-opacity ${
                    activeImg === i ? "opacity-100 ring-2 ring-primary" : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={src} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            {/* Main image */}
            <div className="flex-1 bg-muted rounded overflow-hidden aspect-square max-h-[500px]">
              <img src={imgs[activeImg]} alt={product.alt} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Details */}
          <div>
            <h1 className="text-4xl font-semibold text-foreground mb-3">{product.name}</h1>
            <p className="text-3xl text-muted-foreground font-medium mb-5">{fmt(product.price)}</p>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className={i < product.rating ? "fill-[#FFC700] stroke-[#FFC700]" : "stroke-muted-foreground fill-none"} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">| {product.reviews} Customer Reviews</span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout
              and stylish retro-inspired wireless smart speaker with an inimitable.
            </p>

            {/* Size */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-3">Size</p>
              <div className="flex gap-3">
                {["L", "XL", "XS"].map((s) => (
                  <button key={s} className="w-10 h-10 bg-[#F9F1E7] text-sm font-medium hover:bg-primary hover:text-white transition-colors rounded">{s}</button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="mb-8">
              <p className="text-sm text-muted-foreground mb-3">Color</p>
              <div className="flex gap-3">
                {["#816DFA", "#000000", "#B88E2F"].map((c) => (
                  <button key={c} className="w-8 h-8 rounded-full ring-2 ring-offset-2 ring-transparent hover:ring-foreground transition-all" style={{ background: c }} />
                ))}
              </div>
            </div>

            {/* Qty + Add to Cart */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <div className="flex items-center border border-border rounded">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-12 h-14 flex items-center justify-center hover:bg-muted transition-colors">
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center text-base font-medium">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="w-12 h-14 flex items-center justify-center hover:bg-muted transition-colors">
                  <Plus size={16} />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 sm:flex-none px-12 py-4 border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors"
              >
                Add To Cart
              </button>
              <button className="flex-1 sm:flex-none px-10 py-4 border-2 border-foreground text-foreground font-semibold hover:bg-foreground hover:text-white transition-colors">
                + Compare
              </button>
            </div>

            {/* Meta */}
            <div className="border-t border-border pt-8 space-y-3 text-sm">
              {[
                ["SKU", product.sku],
                ["Category", product.category],
                ["Tags", product.tags.join(", ")],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-3">
                  <span className="text-muted-foreground w-20 flex-shrink-0">{k}</span>
                  <span>:</span>
                  <span className="text-muted-foreground">{v}</span>
                </div>
              ))}
              <div className="flex gap-3 items-center pt-2">
                <span className="text-muted-foreground w-20">Share</span>
                <span>:</span>
                <div className="flex gap-3 text-foreground">
                  {[Share2, Heart, BarChart2].map((Icon, i) => (
                    <button key={i} className="hover:text-primary transition-colors"><Icon size={18} /></button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="mt-16 border-t border-border">
          <div className="flex gap-8 border-b border-border">
            {["Description", "Additional Information", "Reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-5 text-base font-medium border-b-2 -mb-px transition-colors ${
                  activeTab === tab ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="py-10 max-w-3xl text-sm text-muted-foreground leading-relaxed">
            {activeTab === "Description" && (
              <p>
                Enjoy quality time with loved ones in this beautiful furniture piece. Crafted with premium materials and designed with modern aesthetics, it brings both functionality and style to your living space. Each piece undergoes rigorous quality checks ensuring durability and comfort for years to come.
              </p>
            )}
            {activeTab === "Additional Information" && (
              <table className="w-full text-left">
                <tbody>
                  {[["Weight", "12 KG"], ["Dimensions", "80 × 60 × 45 cm"], ["Color", "Black, Brown, Beige"], ["Material", "Solid Wood, Fabric"]].map(([k, v]) => (
                    <tr key={k} className="border-b border-border">
                      <td className="py-3 font-medium text-foreground w-40">{k}</td>
                      <td className="py-3">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {activeTab === "Reviews" && (
              <p className="text-muted-foreground">
                {product.reviews} customer reviews. Average rating: {product.rating}/5 stars. Our customers love the quality, craftsmanship and design of this product.
              </p>
            )}
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-[32px] font-bold text-center mb-10">Related Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
            <div className="text-center mt-10">
              <Link to="/shop" className="px-16 py-3 border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors">
                Show More
              </Link>
            </div>
          </div>
        )}
      </div>

      <FeaturesStrip />
    </>
  );
}
