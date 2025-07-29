import { MainBlock, AboutMe, Portfolio } from "@/widgets/Home";

export default function Home() {
  return (
    <main className="relative">
      <MainBlock />
      <AboutMe />
      <Portfolio />
      <div className="absolute z-20 inset-0 bg-[url('/bg.png')] bg-cover bg-cente mix-blend-soft-light" />
    </main>
  );
}
