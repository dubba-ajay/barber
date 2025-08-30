import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AdvancedHeroSection from "@/components/features/AdvancedHeroSection";
import ServiceCategories from "@/components/features/ServiceCategories";
import FeaturedServices from "@/components/features/FeaturedServices";
import FeaturedStores from "@/components/features/FeaturedStores";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-16 space-y-16">
        <AdvancedHeroSection />
        <ServiceCategories />
        <FeaturedServices />
        <FeaturedStores />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
