import FeaturedProducts from "@/components/FeaturedProducts";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <FeaturedProducts/>
    </div>
  );
}
