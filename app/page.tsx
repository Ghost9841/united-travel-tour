import Footer from "@/components/Footer";
import HeroCarousel from "@/components/landingpage/HeroSection";
import Newsletter from "@/components/landingpage/Newsettler";
import Navbar from "@/components/NavBar";
import Image from "next/image";


export default function Home() {
  return (
    <div>
      {/* <Navbar/> */}
      <HeroCarousel/>
      <div className="h-screen"></div>
      <Newsletter/>
      <Footer/>
    </div>  
  );
}