import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin } from "lucide-react";
import { allStores } from "./AllStores";

const categories: { key: "mens-hair" | "womens-beauty" | "nail-studios" | "makeup-artists"; label: string }[] = [
  { key: "mens-hair", label: "Men's Hair" },
  { key: "womens-beauty", label: "Women's Beauty" },
  { key: "nail-studios", label: "Nail Studios" },
  { key: "makeup-artists", label: "Makeup Artists" },
];

const getCategoryLink = (store: any) => {
  switch (store.category) {
    case "mens-hair":
      return `/salon/${store.id}`;
    case "womens-beauty":
      return `/womens-beauty/salon/${store.id}`;
    case "nail-studios":
      return `/nail-studios/salon/${store.id}`;
    case "makeup-artists":
      return `/makeup-artists/salon/${store.id}`;
    default:
      return `/salon/${store.id}`;
  }
};

export default function TopRatedHeroStores() {
  const picks = categories
    .map((c) => {
      const stores = allStores.filter((s) => s.category === c.key);
      const top = [...stores].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews)[0];
      return top ? { ...top, catLabel: c.label } : null;
    })
    .filter(Boolean) as (typeof allStores[number] & { catLabel: string })[];

  if (picks.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-semibold">Top rated stores</h3>
        <div className="text-sm text-muted-foreground">Across all services</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {picks.map((store) => (
          <Card key={`${store.category}-${store.id}`} className="overflow-hidden border">
            <div className="relative h-36">
              <img src={store.image} alt={store.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-2 left-2 flex gap-2">
                <Badge className="bg-white/90 text-gray-900 font-semibold">
                  <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                  {store.rating}
                </Badge>
                <Badge variant="outline" className="bg-black/30 text-white border-white/20">
                  {store.priceRange}
                </Badge>
              </div>
            </div>
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-1">
                <div className="font-medium truncate" title={store.name}>{store.name}</div>
                <Badge variant="outline" className="text-xs">{store.catLabel}</Badge>
              </div>
              <div className="flex items-center text-xs text-muted-foreground mb-2">
                <MapPin className="w-3 h-3 mr-1" />
                <span className="truncate">{store.address}</span>
              </div>
              <Link to={getCategoryLink(store)}>
                <Button size="sm" className="w-full">View & Book</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
