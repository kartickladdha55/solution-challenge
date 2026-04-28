import { Inter, Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Sidebar from "@/components/Sidebar";

const fraunces = Fraunces({ 
  subsets: ["latin"], 
  variable: '--font-fraunces',
  display: 'swap',
});

const dmSans = DM_Sans({ 
  subsets: ["latin"], 
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata = {
  title: "SmartResource | Community Coordination",
  description: "Data-Driven Volunteer Coordination Platform for Social Impact",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${dmSans.variable} font-sans bg-[#fdf6ee] text-stone-900`}>
        <AppProvider>
          <div className="flex">
            <Sidebar />
            <main className="flex-1 ml-64 p-8 min-h-screen">
              {children}
            </main>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
