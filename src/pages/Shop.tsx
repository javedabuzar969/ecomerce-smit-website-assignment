import { useState, useMemo } from "react";
import { SlidersHorizontal, LayoutGrid, List, ChevronDown, Trophy, ShieldCheck, Truck, Headset } from "lucide-react";
import { PRODUCTS } from "../data/products";
import ProductCard from "../components/ProductCard";
import PageBanner from "../components/PageBanner";

const CATEGORIES = ["All", "Chairs", "Sofa", "Tables", "Bedroom", "Accessories"];
const SORTS = ["Default", "Price: Low to High", "Price: High to Low", "Newest"];

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sort, setSort] = useState("Default");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [showFilter, setShowFilter] = useState(false);
  const PER_PAGE = perPage;

  const filtered = useMemo(() => {
    let list = activeCategory === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeCategory);
    if (sort === "Price: Low to High") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "Price: High to Low") list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "Newest") list = [...list].filter((p) => p.badge === "New").concat(list.filter((p) => p.badge !== "New"));
    return list;
  }, [activeCategory, sort]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <PageBanner title="Shop" crumbs={[{ label: "Shop" }]} />

      {/* FILTER BAR */}
      <div className="border-b border-border bg-[#FAF0E6]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20 py-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center gap-2 text-base font-medium hover:text-primary transition-colors"
            >
              <SlidersHorizontal size={20} />
              Filter
            </button>
            <div className="w-px h-6 bg-border" />
            <LayoutGrid size={20} className="text-foreground cursor-pointer hover:text-primary" />
            <List size={20} className="text-muted-foreground cursor-pointer hover:text-primary" />
            <div className="w-px h-6 bg-border" />
            <span className="text-sm text-muted-foreground hidden sm:block">
              Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length} results
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Show</span>
              <div className="relative">
                <select
                  value={perPage}
                  onChange={(e) => { setPerPage(+e.target.value); setPage(1); }}
                  className="appearance-none border border-border bg-white px-4 py-2 pr-8 text-sm font-medium outline-none cursor-pointer"
                >
                  {[8, 12, 16].map((n) => <option key={n}>{n}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Sort by</span>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => { setSort(e.target.value); setPage(1); }}
                  className="appearance-none border border-border bg-white px-4 py-2 pr-8 text-sm font-medium outline-none cursor-pointer"
                >
                  {SORTS.map((s) => <option key={s}>{s}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>

        {/* Category filter row */}
        {showFilter && (
          <div className="max-w-[1440px] mx-auto px-6 lg:px-20 pb-4 flex flex-wrap gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setPage(1); }}
                className={`px-5 py-2 text-sm font-medium border transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-white border-primary"
                    : "border-border bg-white text-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* PRODUCTS */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20 py-14">
        {paged.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground text-lg">No products found.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
            {paged.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-3 mt-14">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`w-12 h-12 text-base font-medium transition-colors ${
                  n === page
                    ? "bg-primary text-white"
                    : "bg-[#F9F1E7] text-foreground hover:bg-primary hover:text-white"
                }`}
              >
                {n}
              </button>
            ))}
            {page < totalPages && (
              <button
                onClick={() => setPage((p) => p + 1)}
                className="px-6 h-12 bg-[#F9F1E7] text-foreground text-base font-medium hover:bg-primary hover:text-white transition-colors"
              >
                Next
              </button>
            )}
          </div>
        )}
      </div>

      {/* FEATURES STRIP */}
      <FeaturesStrip />
    </>
  );
}

export function FeaturesStrip() {
  const items = [
    { icon: <Trophy size={48} className="text-[#242424] stroke-[1.5] shrink-0" />, title: "High Quality", sub: "crafted from top materials" },
    { icon: <ShieldCheck size={48} className="text-[#242424] stroke-[1.5] shrink-0" />, title: "Warranty Protection", sub: "Over 2 years" },
    { icon: <Truck size={48} className="text-[#242424] stroke-[1.5] shrink-0" />, title: "Free Shipping", sub: "Order over $150" },
    { icon: <Headset size={48} className="text-[#242424] stroke-[1.5] shrink-0" />, title: "24 / 7 Support", sub: "Dedicated support" },
  ];
  return (
    <div className="bg-[#FAF0E6] py-16 px-6 lg:px-20 border-t border-border/40">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((item) => (
          <div key={item.title} className="flex items-center gap-4">
            <div>{item.icon}</div>
            <div>
              <div className="text-xl font-bold text-[#242424]">{item.title}</div>
              <div className="text-sm font-medium text-[#898989] mt-0.5">{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
