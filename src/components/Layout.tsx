import { Link, useLocation, Outlet } from "react-router";
import { useState, useEffect } from "react";
import { Search, Heart, User, ShoppingCart, Menu, X, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { cartStore } from "../store/cart";

const NAV = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Layout() {
  const { pathname } = useLocation();
  const [cartCount, setCartCount] = useState(cartStore.getCount());
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => cartStore.subscribe(() => setCartCount(cartStore.getCount())), []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20 h-[100px] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-1.5">
            <svg width="28" height="30" viewBox="0 0 30 32" fill="none">
              <path d="M15 0C15 0 3 8 3 18C3 24.627 8.373 30 15 30C21.627 30 27 24.627 27 18C27 8 15 0 15 0Z" fill="#B88E2F"/>
              <path d="M15 6C15 6 7 12 7 18C7 22.418 10.582 26 15 26C19.418 26 23 22.418 23 18C23 12 15 6 15 6Z" fill="#fff" fillOpacity="0.3"/>
            </svg>
            <span className="text-[34px] font-bold text-foreground leading-none">Furniro</span>
          </Link>

          <nav className="hidden md:flex items-center gap-10 lg:gap-16">
            {NAV.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className={`text-base font-medium transition-colors ${pathname === to ? "text-primary" : "text-foreground hover:text-primary"}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5 lg:gap-7">
            <button aria-label="Account" className="hidden md:block text-foreground hover:text-primary transition-colors"><User size={24} strokeWidth={1.5} /></button>
            <button aria-label="Search" className="hidden md:block text-foreground hover:text-primary transition-colors"><Search size={24} strokeWidth={1.5} /></button>
            <button aria-label="Wishlist" className="hidden md:block text-foreground hover:text-primary transition-colors"><Heart size={24} strokeWidth={1.5} /></button>
            <Link to="/cart" aria-label="Cart" className="relative text-foreground hover:text-primary transition-colors">
              <ShoppingCart size={24} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-white text-[10px] font-semibold rounded-full flex items-center justify-center">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>
            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-border bg-white px-6 py-6 flex flex-col gap-5">
            {NAV.map(({ label, to }) => (
              <Link key={to} to={to} onClick={() => setMenuOpen(false)}
                className={`text-base font-medium ${pathname === to ? "text-primary" : "text-foreground"}`}>
                {label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* PAGE CONTENT */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border pt-14 pb-8 px-6 lg:px-20 mt-auto">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-1.5 mb-8">
              <svg width="24" height="26" viewBox="0 0 30 32" fill="none">
                <path d="M15 0C15 0 3 8 3 18C3 24.627 8.373 30 15 30C21.627 30 27 24.627 27 18C27 8 15 0 15 0Z" fill="#B88E2F"/>
              </svg>
              <span className="text-[26px] font-bold">Furniro</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">400 University Drive Suite 200 Coral Gables,<br />FL 33134 USA</p>
          </div>
          <div>
            <h4 className="text-muted-foreground font-medium text-sm mb-8 tracking-wide">Links</h4>
            <ul className="flex flex-col gap-6">
              {NAV.map(({ label, to }) => (
                <li key={to}><Link to={to} className="text-base font-semibold text-foreground hover:text-primary transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-muted-foreground font-medium text-sm mb-8 tracking-wide">Help</h4>
            <ul className="flex flex-col gap-6">
              {["Payment Options", "Returns", "Privacy Policies"].map((item) => (
                <li key={item}><a href="#" className="text-base font-semibold text-foreground hover:text-primary transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-muted-foreground font-medium text-sm mb-8 tracking-wide">Newsletter</h4>
            <div className="flex gap-0">
              <input type="email" placeholder="Enter Your Email Address"
                className="flex-1 border-b border-foreground bg-transparent text-sm outline-none pb-2 placeholder:text-muted-foreground min-w-0" />
              <button className="border-b border-foreground pb-2 pl-4 text-xs font-semibold uppercase tracking-wide hover:text-primary transition-colors whitespace-nowrap">SUBSCRIBE</button>
            </div>
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-base text-foreground">2023 furniro. All rights reserved</p>
          <div className="flex gap-6 text-muted-foreground">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="hover:text-primary transition-colors"><Icon size={20} /></a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
