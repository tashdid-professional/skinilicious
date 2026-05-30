import FeaturedProducts from "@/components/FeaturedProducts";
import DiscoverySection from "@/components/DiscoverySection";
import Marquee from "@/components/Marquee";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <FeaturedProducts/>
      <Marquee />
      <DiscoverySection/>
      <Footer />
    </div>
  );
}
