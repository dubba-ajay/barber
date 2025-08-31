import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MakeupArtistsHeroSlider from "@/components/features/MakeupArtistsHeroSlider";
import MensStoresModern from "@/components/features/MensStoresModern";

const MakeupArtists = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-16 space-y-12">
        <MakeupArtistsHeroSlider />
        <AllStores categoryFilter="makeup-artists" title="Makeup Artists" description="Professional makeup for weddings, parties, and events" />
      </main>
      <Footer />
    </div>
  );
};

export default MakeupArtists;
