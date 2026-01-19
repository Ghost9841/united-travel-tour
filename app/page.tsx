import Footer from "@/components/Footer";
import DestinationGallery from "@/components/landingpage/DestinationGallery";
import HeroCarousel from "@/components/landingpage/HeroSection";
import Newsletter from "@/components/landingpage/Newsettler";


export default function Home() {
  return (
    <div>
      {/* <Navbar/> */}
      <HeroCarousel/>
      <div className="h-screen"></div>
      <DestinationGallery/>
      <Newsletter/>
      <Footer/>
    </div>  
  );
}