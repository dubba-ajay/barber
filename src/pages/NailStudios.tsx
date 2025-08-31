import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NailStudiosHeroSlider from "@/components/features/NailStudiosHeroSlider";
import MensStoresModern from "@/components/features/MensStoresModern";

const NailStudios = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-16 space-y-12">
        <NailStudiosHeroSlider />
        <AllStores categoryFilter="nail-studios" title="Nail Studios" description="Creative nail art, extensions, and professional care" />
      </main>
      <Footer />
    </div>
  );
};

export default NailStudios;
