import { Link } from "react-router";

interface Props {
  title: string;
  crumbs?: { label: string; to?: string }[];
}

export default function PageBanner({ title, crumbs = [] }: Props) {
  return (
    <div className="relative h-[300px] flex flex-col items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?w=1400&h=400&fit=crop&auto=format"
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
      <div className="relative z-10 bg-white/85 backdrop-blur-md px-10 py-6 rounded-2xl shadow-xl flex flex-col items-center border border-white/60 max-w-md mx-4">
        <div className="flex justify-center mb-2">
          <svg width="40" height="44" viewBox="0 0 30 32" fill="none">
            <path d="M15 0C15 0 3 8 3 18C3 24.627 8.373 30 15 30C21.627 30 27 24.627 27 18C27 8 15 0 15 0Z" fill="#B88E2F"/>
          </svg>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">{title}</h1>
        <div className="flex items-center justify-center gap-3 text-sm">
          <Link to="/" className="font-semibold text-foreground hover:text-primary transition-colors">Home</Link>
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-3">
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                <path d="M1 1L5 5L1 9" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              {c.to ? (
                <Link to={c.to} className="font-semibold text-foreground hover:text-primary">{c.label}</Link>
              ) : (
                <span className="text-muted-foreground font-medium">{c.label}</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
