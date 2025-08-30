import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WomensBeautyHeroSlider from "@/components/features/WomensBeautyHeroSlider";
import AllStores from "@/components/features/AllStores";

const WomensBeauty = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-16 space-y-12">
        <WomensBeautyHeroSlider />
        <AllStores categoryFilter="womens-beauty" title="Women's Hair & Beauty" description="Book premium beauty services with trusted professionals" />
      </main>
      <Footer />
    </div>
  );
};

export default WomensBeauty;
