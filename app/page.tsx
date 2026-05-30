import FeaturedProducts from "@/components/FeaturedProducts";
import DiscoverySection from "@/components/DiscoverySection";
import HeroBanner from "@/components/HeroBanner";
import OurPicks from "@/components/OurPicks";
import Promotions from "@/components/Promotions";
import Features from "@/components/Features";
import Marquee from "@/components/Marquee";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <OurPicks />
      <Promotions />
      <Features />
      <FeaturedProducts/>
      <DiscoverySection/>
      <Marquee />
    </>
  );
}
