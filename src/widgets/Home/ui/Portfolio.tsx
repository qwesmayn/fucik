"use client";

import { FC, useState } from "react";
import { PortfolioCard } from "./PortfolioCard";
import ex1 from "@/shared/assets/img/ex1.png";
import ex2 from "@/shared/assets/img/ex2.png";
import ex3 from "@/shared/assets/img/ex3.png";
import ex4 from "@/shared/assets/img/ex4.png";
import ex5 from "@/shared/assets/img/ex5.png";
import ex6 from "@/shared/assets/img/ex6.png";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { pageConfig } from "@/shared/config/page.config";
import { cn } from "@/shared/lib/utils";

export const Portfolio: FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <section id="portfolio" className="relative mb-[150px] min-h-screen px-15 pb-[50px]">
      <div className="bg-[#FF3C00] relative z-30 text-center py-[1px] px-[5px] mb-[150px] w-max rounded-[5px] text-[#0B0B0B]">
        <p className="text-xl font-light">Portfolio</p>
      </div>
      <div className="relative z-30">
        <div className="flex items-start gap-[50px]">
          <div className={cn("grid grid-cols-1 w-full")}>
            <PortfolioCard
              image={ex1}
              title="Sometric super scene"
              tools={["Blender", "After Effects"]}
              index={0}
              hoveredIndex={hoveredIndex}
              onMouseEnter={() => handleMouseEnter(0)}
              onMouseLeave={handleMouseLeave}
            />
            <PortfolioCard
              image={ex2}
              title="Sometric super scene"
              tools={["Blender", "After Effects"]}
              index={1}
              hoveredIndex={hoveredIndex}
              onMouseEnter={() => handleMouseEnter(1)}
              onMouseLeave={handleMouseLeave}
            />
            <PortfolioCard
              image={ex3}
              title="Sometric super scene"
              tools={["Blender", "After Effects"]}
              index={2}
              hoveredIndex={hoveredIndex}
              onMouseEnter={() => handleMouseEnter(2)}
              onMouseLeave={handleMouseLeave}
            />
            <PortfolioCard
              image={ex4}
              title="Sometric super scene"
              tools={["Blender", "After Effects"]}
              index={3}
              hoveredIndex={hoveredIndex}
              onMouseEnter={() => handleMouseEnter(3)}
              onMouseLeave={handleMouseLeave}
            />
          </div>
          <div className="grid grid-cols-1 w-full">
            <PortfolioCard
              image={ex5}
              title="Sometric super scene"
              tools={["Blender", "After Effects"]}
              index={5}
              hoveredIndex={hoveredIndex}
              onMouseEnter={() => handleMouseEnter(5)}
              onMouseLeave={handleMouseLeave}
            />
            <PortfolioCard
              image={ex6}
              title="Sometric super scene"
              tools={["Blender", "After Effects"]}
              index={6}
              hoveredIndex={hoveredIndex}
              onMouseEnter={() => handleMouseEnter(6)}
              onMouseLeave={handleMouseLeave}
            />
            <PortfolioCard
              image={ex2}
              title="Sometric super scene"
              tools={["Blender", "After Effects"]}
              index={7}
              hoveredIndex={hoveredIndex}
              onMouseEnter={() => handleMouseEnter(7)}
              onMouseLeave={handleMouseLeave}
            />
            <PortfolioCard
              image={ex3}
              title="Sometric super scene"
              tools={["Blender", "After Effects"]}
              index={8}
              hoveredIndex={hoveredIndex}
              onMouseEnter={() => handleMouseEnter(8)}
              onMouseLeave={handleMouseLeave}
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full flex justify-center px-15">
        <Link
          href={pageConfig.projects}
          className="flex items-center justify-center gap-2 border border-white/10 rounded-[10px] h-[62px] w-full hover:bg-white/10 transition-colors duration-300"
        >
          <p className="text-lg font-light">View all works</p>
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
};
