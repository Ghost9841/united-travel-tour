import Image from "next/image";


export default function Navbar() {
  return (
    <nav className="flex flex-row justify-between items-center w-[1920px] h-32 px-[182px] py-8  bg-black">
      <div className=" flex justify-center items-center">
        <Image
          src="/Logo.svg" 
          alt="Logo" 
          width={234} 
          height={45.61}
        />

      </div>
      <div className="flex flex-row items-center w-[417px] h-[28px] gap-8">
        <a href="#" className="text-white hover:opacity-80 transistion-opacity">
            Home
        </a>
        <a href="#" className="text-white hover:opacity-80 transistion-opacity">
            Explore
        </a>
        <a href="#" className="text-white hover:opacity-80 transistion-opacity">
            Travel
        </a>
        <a href="#" className="text-white hover:opacity-80 transistion-opacity">
            Blog
        </a>
        <a href="#" className="text-white hover:opacity-80 transistion-opacity">
            Pricing
        </a>

      </div>
      <div className="flex flex-row items-center w-[222px] h-16 gap-9">
        <button className="w-52px h-6 text-white hover:opacity-80 transition-opacity ">
            Login
        </button>
        <button className="w-[134px] h-16 px-8 py-5 bg-[#FF7757] text-white rounded-xl hover:bg-[#FF5533] transition-colors">
            Sign up
        </button>

      </div>
    </nav>
  );
}