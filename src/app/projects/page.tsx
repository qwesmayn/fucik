import { PortfoliosList } from "@/entities/portfolio";
import { portfolioConfig } from "@/entities/portfolio/conifg/portfolio.config";
import { ButtonUpDown } from "@/shared/ui/button-up-down";

export default function ProjectsPage() {
  return (
    <main className="relative">
      <section className="relative pt-[90px] pb-[170px] max-w-[1800px] mx-auto">
        <PortfoliosList type="projects" portfolio={portfolioConfig} />
        <ButtonUpDown />
      </section>
    </main>
  );
}
