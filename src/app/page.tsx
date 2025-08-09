import { getLatestProjects } from "@/entities/portfolio/api/getLatestProjects";
import { MainBlock, AboutMe, Portfolio } from "@/widgets/Home";

export default async function Home() {
  const projects = await getLatestProjects();

  return (
    <main className="relative">
      <MainBlock />
      <AboutMe />
      <Portfolio projects={projects} />
    </main>
  );
}
