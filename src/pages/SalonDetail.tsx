import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useParams, Link } from "react-router-dom";
import { allStores } from "@/components/features/AllStores";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Star, ArrowLeft, Clock, Verified, Award } from "lucide-react";

const categoryLabel = (c: string) => {
  switch (c) {
    case "mens-hair": return "Men's Hair";
    case "womens-beauty": return "Women's Beauty";
    case "nail-studios": return "Nail Studios";
    case "makeup-artists": return "Makeup Artists";
    default: return "Salon";
  }
};

const SalonDetail = () => {
  const { id } = useParams();
  const store = allStores.find(s => s.id === Number(id));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 lg:px-6 py-8">
          <Link to={"/all-stores"} className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to stores
          </Link>

          {!store ? (
            <div className="text-center py-20">
              <h2 className="text-3xl font-bold mb-2">Store not found</h2>
              <p className="text-muted-foreground">The requested store does not exist.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="relative h-64 rounded-2xl overflow-hidden">
                  <img src={store.image} alt={store.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-white/20 text-white border-0">{categoryLabel(store.category)}</Badge>
                      {store.isTopRated && (
                        <Badge className="bg-yellow-400 text-black border-0"><Award className="w-3 h-3 mr-1" />Top Rated</Badge>
                      )}
                      {store.isVerified && (
                        <Badge className="bg-blue-500 text-white border-0"><Verified className="w-3 h-3 mr-1" />Verified</Badge>
                      )}
                    </div>
                    <h1 className="text-3xl font-bold">{store.name}</h1>
                    <div className="flex items-center gap-3 text-sm opacity-90">
                      <span className="flex items-center"><Star className="w-4 h-4 mr-1 fill-yellow-300 text-yellow-300" />{store.rating} ({store.reviews} reviews)</span>
                      <span>•</span>
                      <span className="font-medium">{store.priceRange}</span>
                      <span>•</span>
                      <span>{store.openHours}</span>
                    </div>
                  </div>
                </div>

                <Card className="mt-6">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-3">About</h2>
                    <p className="text-muted-foreground mb-4">{store.description}</p>
                    <h3 className="font-semibold mb-2">Specialties</h3>
                    <div className="flex flex-wrap gap-2">
                      {store.specialties.map((s, i) => (
                        <Badge key={i} variant="outline">{s}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center"><MapPin className="w-4 h-4 mr-2" />{store.address}</div>
                    <div className="flex items-center"><Phone className="w-4 h-4 mr-2" />{store.phone}</div>
                    <div className="flex items-center"><Clock className="w-4 h-4 mr-2" />{store.openHours}</div>
                    <Button className="w-full">Book an appointment</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SalonDetail;
