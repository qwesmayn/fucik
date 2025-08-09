import { getAllProjects } from "@/entities/portfolio/api/getAllProjects";
import { PortfoliosList } from "@/entities/portfolio";
import { ButtonUpDown } from "@/shared/ui/button-up-down";

export default async function ProjectsPage() {
  const projects = await getAllProjects();
  return (
    <main className="relative">
      <section className="relative pt-[90px] pb-[170px] max-w-[1800px] min-h-screen mx-auto">
        <PortfoliosList type="projects" portfolio={projects} />
        <ButtonUpDown />
      </section>
    </main>
  );
}
