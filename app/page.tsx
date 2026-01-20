import Footer from "@/components/Footer";
import Blogs from "@/components/landingpage/Blogs";
import DestinationGallery from "@/components/landingpage/DestinationGallery";
import HeroCarousel from "@/components/landingpage/HeroSection";
import Newsletter from "@/components/landingpage/Newsettler";
import PopularDestinations from "@/components/landingpage/PopularDestinations";
import SpecialOffers from "@/components/landingpage/SpecialOffers";


export default function Home() {
  return (
    <div>
      {/* <Navbar/> */}
      <HeroCarousel/>
      <PopularDestinations/>
      <SpecialOffers/>
      <Blogs/>
      <div className="h-screen"></div>
      <DestinationGallery/>
      <Newsletter/>
      <Footer/>
    </div>  
  );
}