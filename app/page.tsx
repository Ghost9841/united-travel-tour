import Footer from "@/components/Footer";
import Blogs from "@/components/landingpage/Blogs";
import DestinationGallery from "@/components/landingpage/DestinationGallery";
import HeroCarousel from "@/components/landingpage/HeroSection";
import Newsletter from "@/components/landingpage/Newsettler";
import OnGoingFaresCarousel from "@/components/landingpage/OnGoingFares";
import PopularDestinations from "@/components/landingpage/PopularDestinations";
import SearchFlightHotelsSection from "@/components/landingpage/SearchFlightsHotelsSection";
import SpecialOffers from "@/components/landingpage/SpecialOffers";
import TopThinNavbar from "@/components/landingpage/TopThinNavbar";
import TripPlanners from "@/components/landingpage/TripPlanners";
import Navbar from "@/components/NavBar";


export default function Home() {
  return (
    <div>
      <TopThinNavbar/>
      <Navbar/>
      <HeroCarousel/>
      <div className="relative z-10 -mt-18 md:-mt-48 mb-16">
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                    <SearchFlightHotelsSection />
                </div>
                </div>
      <OnGoingFaresCarousel/>
      <PopularDestinations/>
      <SpecialOffers/>
      <Blogs/>
      <TripPlanners/>
      <DestinationGallery/>
      <Newsletter/>
      <Footer/>
    </div>  
  );
}