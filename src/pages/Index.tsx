import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ModernHero from "@/components/features/ModernHero";
// removed ServiceCategories for modern layout
import FeaturedServices from "@/components/features/FeaturedServices";
import TopRatedHeroStores from "@/components/features/TopRatedHeroStores";
import MensStoresModern from "@/components/features/MensStoresModern";
// removed HomeAvailabilityPackages for modern layout

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-16 space-y-16">
        <ModernHero />
        <TopRatedHeroStores />
        <FeaturedServices />
        <MensStoresModern category="all" />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
