import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ModernHero from "@/components/features/ModernHero";
// removed ServiceCategories for modern layout
import FeaturedServices from "@/components/features/FeaturedServices";
import FeaturedStores from "@/components/features/FeaturedStores";
import TopRatedHeroStores from "@/components/features/TopRatedHeroStores";
// removed HomeAvailabilityPackages for modern layout

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-16 space-y-16">
        <ModernHero />
        <TopRatedHeroStores />
        <FeaturedServices />
        <FeaturedStores />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
