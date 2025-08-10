import { Outfit } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Metadata } from "next";
import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";
import { QueryProvider } from "./_providers/query-provide/QueryProvide";
import { ToastContainer } from 'react-toastify';

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const hegval = localFont({
  src: "../shared/assets/fonts/HegvalDisplay.otf",
  variable: "--font-hegval",
});

export const metadata: Metadata = {
  title: "Fucik",
  description: "Fucik",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${hegval.variable} antialiased`}
    >
      <body>
        <QueryProvider>
          <Header />
          <main className="overflow-hidden">{children}</main>
          <Footer />
          <ToastContainer />
        </QueryProvider>
      </body>
    </html>
  );
}
