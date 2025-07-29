import { FC } from "react";
import { PortfolioCard } from "./PortfolioCard";
import ex1 from "@/assets/img/ex1.png";
import ex2 from "@/assets/img/ex2.png";
import ex3 from "@/assets/img/ex3.png";
import ex4 from "@/assets/img/ex4.png";
import ex5 from "@/assets/img/ex5.png";
import ex6 from "@/assets/img/ex6.png";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { pageConfig } from "@/shared/config/page.config";

export const Portfolio: FC = () => {
  return (
    <section className="relative mb-[150px] min-h-screen px-15">
      <div className="bg-[#FF3C00] relative z-30 text-center py-[1px] px-[5px] mb-[150px] w-max rounded-[5px] text-[#0B0B0B]">
        <p className="text-xl font-light">Portfolio</p>
      </div>
      <div className="relative z-30 ">
        <div className="grid xl:grid-cols-2 grid-cols-1 gap-[50px]">
          <PortfolioCard
            image={ex1}
            title="Sometric super scene"
            tools={["Blender", "After Effects"]}
          />
          <PortfolioCard
            image={ex2}
            title="Sometric super scene"
            tools={["Blender", "After Effects"]}
          />
          <PortfolioCard
            image={ex3}
            title="Sometric super scene"
            tools={["Blender", "After Effects"]}
          />
          <PortfolioCard
            image={ex4}
            title="Sometric super scene"
            tools={["Blender", "After Effects"]}
          />
          <PortfolioCard
            image={ex5}
            title="Sometric super scene"
            tools={["Blender", "After Effects"]}
          />
          <PortfolioCard
            image={ex6}
            title="Sometric super scene"
            tools={["Blender", "After Effects"]}
          />
          <PortfolioCard
            image={ex2}
            title="Sometric super scene"
            tools={["Blender", "After Effects"]}
          />
          <PortfolioCard
            image={ex3}
            title="Sometric super scene"
            tools={["Blender", "After Effects"]}
          />
        </div>
        <div className="flex justify-center mt-[50px]">
          <Link
            href={pageConfig.projects}
            className="flex items-center justify-center gap-2 border border-white/10 rounded-[10px] h-[62px] w-full hover:bg-white/10 backdrop-blur-2xl transition-colors duration-300"
          >
            <p className="text-lg font-light">View all works</p>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};
