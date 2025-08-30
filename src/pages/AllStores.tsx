import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AllStores from "@/components/features/AllStores";

const AllStoresPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-16">
        <AllStores />
      </main>
      <Footer />
    </div>
  );
};

export default AllStoresPage;
