import { Outfit } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const hegval = localFont({
  src: "../assets/fonts/HegvalDisplay.otf",
  variable: "--font-hegval",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${hegval.variable} antialiased`}>
        <main className="overflow-hidden">{children}</main>
      </body>
    </html>
  );
}
