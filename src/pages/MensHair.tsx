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
        <MensStoresModern />
      </main>
      <Footer />
    </div>
  );
};

export default MensHair;
