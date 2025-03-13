import ChooseUs from "@/components/ChooseUs";
import FeaturedSection from "@/components/FeaturedSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Reach from "@/components/Reach";


export default function Home() {
  return (
   <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.2]">
    
    <HeroSection />
    <FeaturedSection />
    <ChooseUs />
    <Reach />
    <Footer />
   </main>
  );
}
