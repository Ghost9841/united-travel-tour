import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import ClickSpark from "@/components/ClickSpark";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "United Travel & Tours - A Travel Agency",
  description: "A Travel Agency for All The United Travel & Tours",
  icons: "/unitetravellogo300x300px.svg"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ClickSpark
            sparkColor='#36454F'
            sparkSize={10}
            sparkRadius={15}
            sparkCount={8}
            duration={400}
          >

            {children}
            <Script
              id="tawk-to"
              strategy="afterInteractive"
            >
              {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),
              s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/698090bf23b2011c36edddaf/1jgf3areo';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
              })();
              `}
            </Script>
          </ClickSpark>
          <Toaster/>
        </body>
      </html>
    </ClerkProvider>
  );
}
