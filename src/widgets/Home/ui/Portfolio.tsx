import { FC } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { pageConfig } from "@/shared/config/page.config";
import { PortfoliosList } from "@/entities/portfolio";
import { IProject } from "@/entities/portfolio/model/IProject.interface";

interface PortfolioProps {
  projects: IProject[];
}

export const Portfolio: FC<PortfolioProps> = ({ projects }) => {
  return (
    <section
      id="portfolio"
      className="relative sm:mb-[150px] mb-[37px] sm:min-h-screen xl:px-15 px-5 sm:pb-[50px] "
    >
      <div className="bg-[#FF3C00] relative z-30 text-center py-[1px] px-[5px] sm:mb-[150px] mb-[37px] w-max rounded-[5px] text-[#0B0B0B]">
        <p className="font-light sm:text-xl text-sm">Portfolio</p>
      </div>
      <div className="relative z-30">
        <PortfoliosList type="home" portfolio={projects} />
      </div>
      <div className="absolute z-50 bottom-0 left-0 w-full flex justify-center sm:px-15 px-5">
        <Link
          href={pageConfig.projects}
          className="flex items-center justify-center gap-2 border border-white/10 rounded-[10px] sm:h-[62px] h-9 w-full sm:w-full hover:bg-white/10 transition-colors duration-300"
        >
          <p className="sm:text-lg text-xs font-light">View all works</p>
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
};
