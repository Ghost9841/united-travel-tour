import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";

export default function OutPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-black">
      <Navbar />
      {children}
      <Footer />
    </div>

  );
}