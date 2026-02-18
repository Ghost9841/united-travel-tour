import { CTA } from "./CargoCTAComp";
import { Details } from "./CargoDetailsComp";
import { FAQ } from "./CargoFAQComp";
import { Hero } from "./CargoHeroComp";
import { ScrollGallery } from "./ScrollGallery";


export const metadata = {
  title: 'Ship from London to Nepal | United Travel and Tours',
  description:
    'Send personal parcels, household items, documents, and business cargo from London to Nepal. Special rates, insurance protection, and reliable delivery support.',
};

export default function CargoPage() {
  return (
    <main className="w-full">
      <div className="bg-gradient-to-b from-blue-200 via-orange-200 to-purple-200">
        <Hero />
        {/* <ScrollGallery /> */}
        <Details />
        <CTA />
        <FAQ />
      </div>
    </main>
  );
}
