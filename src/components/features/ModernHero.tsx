import { Link } from "react-router-dom";
import { Calendar, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchFiltersBar from "@/components/features/SearchFiltersBar";
import mensHero from "@/assets/mens-hair-hero.jpg";
import womensHero from "@/assets/womens-beauty-hero.jpg";
import nailsHero from "@/assets/nail-studio-hero.jpg";
import makeupHero from "@/assets/makeup-artist-hero.jpg";

const categories = [
  { key: "mens-hair", label: "Men's Hair", image: mensHero, href: "/mens-hair" },
  { key: "womens-beauty", label: "Women's Beauty", image: womensHero, href: "/womens-beauty" },
  { key: "nail-studios", label: "Nail Studios", image: nailsHero, href: "/nail-studios" },
  { key: "makeup-artists", label: "Makeup Artists", image: makeupHero, href: "/makeup-artists" },
] as const;

export default function ModernHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-purple-50" />
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-purple-200/30 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-6 py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Left copy */}
          <div>
            <div className="inline-flex items-center rounded-full border bg-white/70 px-3 py-1 text-sm text-muted-foreground shadow-sm backdrop-blur">
              <Sparkles className="mr-2 h-4 w-4 text-emerald-600" /> Book in minutes • INR pricing
            </div>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Look great. Feel amazing.
            </h1>
            <p className="mt-3 text-lg text-muted-foreground md:text-xl">
              Find top‑rated pros for hair, beauty, nails and makeup — near you.
            </p>

            {/* Filters card */}
            <div className="mt-6 rounded-2xl border bg-white/80 p-4 shadow-xl backdrop-blur">
              <SearchFiltersBar />
              <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center"><Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" /> 4.8 avg rating</span>
                <span>•</span>
                <span>Trusted by 1M+ users</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button size="lg" className="px-6">
                <Calendar className="mr-2 h-5 w-5" /> Book now
              </Button>
              <span className="text-sm text-muted-foreground">No hidden fees • Instant confirmation</span>
            </div>
          </div>

          {/* Right: category gallery */}
          <div className="grid grid-cols-2 gap-4">
            {categories.map((c, i) => (
              <Link key={c.key} to={c.href} className="group relative overflow-hidden rounded-2xl border bg-white shadow hover:shadow-lg transition-shadow">
                <img src={c.image} alt={c.label} className="h-36 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white">
                  <div className="text-sm font-semibold drop-shadow">{c.label}</div>
                  <div className="rounded-full bg-white/20 px-2 py-0.5 text-xs backdrop-blur">Explore</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
