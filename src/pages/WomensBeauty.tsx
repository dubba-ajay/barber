import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WomensBeautyHeroSlider from "@/components/features/WomensBeautyHeroSlider";
import MensStoresModern from "@/components/features/MensStoresModern";

const WomensBeauty = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-16 space-y-12">
        <WomensBeautyHeroSlider />
        <MensStoresModern category="womens-beauty" />
      </main>
      <Footer />
    </div>
  );
};

export default WomensBeauty;
