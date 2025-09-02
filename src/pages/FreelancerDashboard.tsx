import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";

const FreelancerDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-16 container mx-auto px-4 lg:px-6 py-8 space-y-6">
        <h1 className="text-3xl font-bold">Freelancer Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card><CardContent className="p-6">Upcoming jobs</CardContent></Card>
          <Card><CardContent className="p-6">Earnings</CardContent></Card>
          <Card><CardContent className="p-6">Ratings</CardContent></Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FreelancerDashboard;
