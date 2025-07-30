import { MainBlock, AboutMe, Portfolio } from "@/widgets/Home";

export default function Home() {
  return (
    <main className="relative">
      <MainBlock />
      <AboutMe />
      <Portfolio />
    </main>
  );
}
