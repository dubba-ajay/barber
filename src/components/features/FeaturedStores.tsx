import { Link } from "react-router-dom";
import { Star, MapPin, Clock, Award, Verified, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLocation } from "@/contexts/LocationContext";
import salon1 from "@/assets/salon-1.jpg";
import salon2 from "@/assets/salon-2.jpg";
import salon3 from "@/assets/salon-3.jpg";

const featuredStores = [
  {
    id: 101,
    name: "Elite Men's Salon",
    category: "mens-hair",
    categoryLabel: "Men's Hair",
    rating: 4.9,
    reviews: 2450,
    distance: "0.5 km",
    address: "Connaught Place, Delhi",
    image: salon1,
    priceRange: "₹₹",
    specialties: ["Premium Cuts", "Beard Styling"],
    isTopRated: true,
    isVerified: true,
    link: "/mens-hair",
    startingPrice: "₹200",
    emoji: "💈"
  },
  {
    id: 201,
    name: "Elegance Beauty Studio",
    category: "womens-beauty",
    categoryLabel: "Women's Beauty",
    rating: 4.9,
    reviews: 3120,
    distance: "0.8 km",
    address: "Bandra, Mumbai",
    image: salon2,
    priceRange: "₹₹₹",
    specialties: ["Hair Styling", "Facials"],
    isTopRated: true,
    isVerified: true,
    link: "/womens-beauty",
    startingPrice: "₹300",
    emoji: "💄"
  },
  {
    id: 301,
    name: "Nail Art Studio",
    category: "nail-studios",
    categoryLabel: "Nail Studios",
    rating: 4.8,
    reviews: 2340,
    distance: "0.6 km",
    address: "Koramangala, Bangalore",
    image: salon3,
    priceRange: "₹₹",
    specialties: ["Nail Art", "Gel Extensions"],
    isTopRated: true,
    isVerified: true,
    link: "/nail-studios",
    startingPrice: "₹150",
    emoji: "💅"
  },
  {
    id: 401,
    name: "Glamour Makeup Studio",
    category: "makeup-artists",
    categoryLabel: "Makeup Artists",
    rating: 4.9,
    reviews: 2980,
    distance: "0.7 km",
    address: "Hi-Tech City, Hyderabad",
    image: salon1,
    priceRange: "₹₹₹",
    specialties: ["Bridal Makeup", "Events"],
    isTopRated: true,
    isVerified: true,
    link: "/makeup-artists",
    startingPrice: "₹500",
    emoji: "✨"
  },
  {
    id: 102,
    name: "Classic Barbershop",
    category: "mens-hair",
    categoryLabel: "Men's Hair",
    rating: 4.7,
    reviews: 1890,
    distance: "1.2 km",
    address: "Park Street, Kolkata",
    image: salon2,
    priceRange: "₹",
    specialties: ["Traditional Cuts", "Shaves"],
    isVerified: true,
    link: "/mens-hair",
    startingPrice: "₹150",
    emoji: "✂️"
  },
  {
    id: 202,
    name: "Divine Beauty Lounge",
    category: "womens-beauty",
    categoryLabel: "Women's Beauty",
    rating: 4.8,
    reviews: 1890,
    distance: "2.2 km",
    address: "Jaipur, Rajasthan",
    image: salon3,
    priceRange: "₹₹₹",
    specialties: ["Luxury Treatments", "Wellness"],
    isVerified: true,
    link: "/womens-beauty",
    startingPrice: "₹400",
    emoji: "🌸"
  }
];

const FeaturedStores = () => {
  const { location } = useLocation();

  const getCategoryColor = (category: string) => {
    switch(category) {
      case "mens-hair": return "bg-orange-100 text-orange-700 border-orange-300";
      case "womens-beauty": return "bg-pink-100 text-pink-700 border-pink-300";
      case "nail-studios": return "bg-purple-100 text-purple-700 border-purple-300";
      case "makeup-artists": return "bg-green-100 text-green-700 border-green-300";
      default: return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-lg">
              <Award className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Featured Stores ⭐
          </h2>
          <p className="text-xl text-gray-700 max-w-xl mx-auto">
            India's top-rated beauty and grooming stores
            {location && (
              <span className="block mt-3 text-orange-600 font-semibold">
                <MapPin className="w-4 h-4 inline mr-2" />
                📍 Available in {location.city || "Your Area"}
              </span>
            )}
          </p>
        </div>

        {/* Stores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredStores.map((store) => (
            <Link key={store.id} to={store.link}>
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group h-full border-2 border-orange-200 hover:border-orange-400 bg-white">
                <div className="relative h-48">
                  <img 
                    src={store.image} 
                    alt={store.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Indian-style overlay pattern */}
                  <div className="absolute top-2 left-2 w-12 h-12 opacity-20">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-yellow-300">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="4"/>
                      <circle cx="50" cy="50" r="20" fill="currentColor"/>
                    </svg>
                  </div>
                  
                  {/* Top Badges */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 font-bold text-xs border-0 shadow-lg">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      {store.rating}⭐
                    </Badge>
                    {store.isTopRated && (
                      <Badge className="bg-gradient-to-r from-green-400 to-emerald-400 text-white text-xs border-0 font-bold shadow-lg">
                        <Award className="w-3 h-3 mr-1" />
                        Top
                      </Badge>
                    )}
                  </div>

                  {/* Store Info */}
                  <div className="absolute bottom-3 left-3 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{store.emoji}</span>
                      <h3 className="text-lg font-bold">{store.name}</h3>
                    </div>
                    <div className="flex items-center gap-2 text-sm opacity-90 mt-1">
                      <span className="font-semibold text-yellow-300">{store.priceRange}</span>
                      <span>•</span>
                      <span>{store.distance}</span>
                      {store.isVerified && (
                        <>
                          <span>•</span>
                          <Verified className="w-4 h-4 text-blue-400" />
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge 
                      variant="outline" 
                      className={`text-xs font-semibold ${getCategoryColor(store.category)}`}
                    >
                      {store.categoryLabel}
                    </Badge>
                    <div className="flex items-center space-x-1 text-xs text-gray-600">
                      <span className="font-medium">{store.reviews.toLocaleString('en-IN')} reviews</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-3 text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                    <span className="font-medium">{store.address}</span>
                  </div>

                  <div className="flex items-center mb-4 text-gray-600 text-sm">
                    <Clock className="w-4 h-4 mr-2 text-green-500" />
                    <span className="font-medium text-green-600">Open Today</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {store.specialties.slice(0, 2).map((specialty, index) => (
                      <Badge key={index} className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 border-0 font-medium text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="text-lg font-bold text-green-600">
                      Starting {store.startingPrice}
                    </div>
                  </div>
                  
                  <Button 
                    size="sm"
                    className="w-full text-sm group-hover:scale-105 transition-transform bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold border-0 rounded-xl shadow-lg"
                  >
                    🎯 View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/all-stores">
            <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg border-0">
              <Award className="w-5 h-5 mr-2" />
              🏪 View All Stores
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedStores;
