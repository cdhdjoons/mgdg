
import { Lilita_One, El_Messiri } from "next/font/google";
import "./globals.css";
import Script from 'next/script';
import Footer from "./components/footer";
import ClientOnlyWrapper from "./components/clientOnlyWarpper";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"

const lilita = Lilita_One({
  variable: "--font-lilita",
  subsets: ["latin"],
  weight: '400',
});

const elMessiri = El_Messiri({
  subsets: ["latin"],
  weight: ["400", "700"], // Regular (400) & Bold (700)
  display: "swap",
});

export const metadata = {
  title: "Mystic The Gathering",
  description: "MGDG_Game",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-black flex justify-center min-h-dvh m-0 p-0 ${elMessiri.className}`} >
        <div className=" w-full max-w-[500px] max-h-[1080px] bg-cover bg-no-repeat relative flex flex-col justify-between overflow-hidden"
          style={{ backgroundImage: `url(/image/bg_mdgd.png)` }}>
            {children}
          <Analytics />
          <SpeedInsights />
          <ClientOnlyWrapper />
        </div>
      </body>
    </html>
  );
}
