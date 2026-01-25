import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";

export default function OutPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<div className="">

        <Navbar/>
        {children}
        <Footer/>
</div>

  );
}