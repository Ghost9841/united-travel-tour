import Footer from "@/components/Footer";
import TopThinNavbar from "@/components/landingpage/TopThinNavbar";
import Navbar from "@/components/NavBar";

export default function OutPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-black">
      <TopThinNavbar/>
      <Navbar />
      {children}
      <Footer />
    </div>

  );
}