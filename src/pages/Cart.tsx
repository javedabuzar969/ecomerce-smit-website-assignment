import { Link } from "react-router";
import { Trash2 } from "lucide-react";
import { useCart } from "../store/cart";
import { fmt } from "../data/products";
import PageBanner from "../components/PageBanner";
import { FeaturesStrip } from "./Shop";

export default function Cart() {
  const { items, total, remove, updateQty } = useCart();

  return (
    <>
      <PageBanner title="Cart" crumbs={[{ label: "Cart" }]} />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-20 py-14">
        {items.length === 0 ? (
          <div className="text-center py-24 flex flex-col items-center gap-6">
            <div className="text-8xl">🛒</div>
            <h2 className="text-3xl font-bold text-foreground">Your cart is empty</h2>
            <p className="text-muted-foreground">Looks like you haven't added any items yet.</p>
            <Link to="/shop" className="px-12 py-4 bg-primary text-white font-semibold hover:bg-[#9a7728] transition-colors">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_360px] gap-8">
            {/* CART TABLE */}
            <div>
              {/* Header */}
              <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr_40px] gap-4 bg-[#F9F1E7] px-6 py-5 font-semibold text-base text-foreground mb-4">
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Subtotal</span>
                <span />
              </div>

              {/* Items */}
              <div className="space-y-4">
                {items.map(({ product: p, qty }) => (
                  <div key={p.id} className="grid grid-cols-[auto_1fr] sm:grid-cols-[2fr_1fr_1fr_1fr_40px] gap-4 items-center px-4 sm:px-6 py-5 border border-border">
                    {/* Product */}
                    <div className="flex items-center gap-4 col-span-1">
                      <div className="w-16 h-16 sm:w-24 sm:h-24 bg-muted rounded overflow-hidden flex-shrink-0">
                        <img src={p.img} alt={p.alt} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <Link to={`/product/${p.id}`} className="font-semibold text-foreground hover:text-primary transition-colors text-sm sm:text-base">
                          {p.name}
                        </Link>
                        <p className="text-xs text-muted-foreground mt-1">{p.desc}</p>
                      </div>
                    </div>

                    {/* Mobile: price/qty/subtotal stacked */}
                    <div className="sm:hidden flex flex-col gap-2 text-sm">
                      <div className="flex justify-between"><span className="text-muted-foreground">Price:</span><span>{fmt(p.price)}</span></div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Qty:</span>
                        <div className="flex items-center border border-border rounded overflow-hidden">
                          <button onClick={() => updateQty(p.id, qty - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-muted text-lg">−</button>
                          <span className="w-8 text-center text-sm">{qty}</span>
                          <button onClick={() => updateQty(p.id, qty + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-muted text-lg">+</button>
                        </div>
                      </div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Subtotal:</span><span className="font-semibold text-primary">{fmt(p.price * qty)}</span></div>
                      <div className="flex justify-end">
                        <button onClick={() => remove(p.id)} className="text-destructive hover:text-red-700 transition-colors"><Trash2 size={16} /></button>
                      </div>
                    </div>

                    {/* Desktop columns */}
                    <span className="hidden sm:block text-muted-foreground text-base">{fmt(p.price)}</span>
                    <div className="hidden sm:flex items-center border border-border rounded overflow-hidden w-fit">
                      <button onClick={() => updateQty(p.id, qty - 1)} className="w-10 h-10 flex items-center justify-center hover:bg-muted text-xl leading-none">−</button>
                      <span className="w-10 text-center text-sm font-medium">{qty}</span>
                      <button onClick={() => updateQty(p.id, qty + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-muted text-xl leading-none">+</button>
                    </div>
                    <span className="hidden sm:block font-semibold text-primary text-base">{fmt(p.price * qty)}</span>
                    <button onClick={() => remove(p.id)} className="hidden sm:flex text-destructive hover:text-red-700 transition-colors justify-center">
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* ORDER SUMMARY */}
            <div className="bg-[#F9F1E7] p-8 h-fit">
              <h2 className="text-3xl font-bold mb-8 text-center">Cart Totals</h2>
              <div className="space-y-5 mb-8">
                <div className="flex justify-between text-base">
                  <span className="font-medium">Subtotal</span>
                  <span className="text-muted-foreground">{fmt(total)}</span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="font-medium">Shipping</span>
                  <span className="text-muted-foreground">Free</span>
                </div>
                <div className="border-t border-border pt-5 flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-primary">{fmt(total)}</span>
                </div>
              </div>
              <button className="w-full py-4 border-2 border-foreground text-foreground font-semibold text-base hover:bg-foreground hover:text-white transition-colors">
                Check Out
              </button>
              <Link to="/shop" className="block text-center mt-4 text-sm text-muted-foreground hover:text-primary transition-colors underline">
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>

      <FeaturesStrip />
    </>
  );
}
