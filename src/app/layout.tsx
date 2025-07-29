import { Outfit } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Metadata } from "next";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const hegval = localFont({
  src: "../assets/fonts/HegvalDisplay.otf",
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
        <main className="overflow-hidden">{children}</main>
      </body>
    </html>
  );
}
