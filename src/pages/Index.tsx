import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import HowItWorks from "@/components/HowItWorks";
import ListingsSection from "@/components/ListingsSection";
import Footer from "@/components/Footer";

const Index = () => {

  //  GET FOOD DATA FROM LOCALSTORAGE
  const foods = JSON.parse(localStorage.getItem("foods") || "[]");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <HowItWorks />

      {/*  PASS DATA HERE */}
      <ListingsSection foods={foods} />

      <Footer />
    </div>
  );
};

export default Index;
