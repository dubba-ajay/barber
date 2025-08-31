import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MensHeroSlider from "@/components/features/MensHeroSlider";
import MensStoresModern from "@/components/features/MensStoresModern";

const MensHair = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-16 space-y-12">
        <MensHeroSlider />
        <AllStores categoryFilter="mens-hair" title="Top Men's Hair & Grooming" description="Find the best barbers and men's salons near you" />
      </main>
      <Footer />
    </div>
  );
};

export default MensHair;
