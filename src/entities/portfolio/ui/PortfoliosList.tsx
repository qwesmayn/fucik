"use client";

import { FC, useState } from "react";
import { PortfolioCard } from "./PortfolioCard";
import { cn } from "@/shared/lib/utils";
import { Portfolio } from "@/entities/portfolio";

interface PortfoliosListProps {
  type: "home" | "projects";
  portfolio: Portfolio[];
}

export const PortfoliosList: FC<PortfoliosListProps> = ({
  type,
  portfolio,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const portfolio1 =
    type === "home"
      ? portfolio.slice(0, 4)
      : portfolio.slice(Math.floor(portfolio.length / 2), portfolio.length);
  const portfolio2 =
    type === "home"
      ? portfolio.slice(4, 8)
      : portfolio.slice(0, Math.floor(portfolio.length / 2));

  return (
    <div className="flex items-start gap-[50px]">
      <div className={cn("grid grid-cols-1 w-full")}>
        {portfolio1.map((item) => (
          <PortfolioCard
            key={item.id}
            image={item.image}
            title={item.title}
            tools={item.tools}
            index={item.id}
            hoveredIndex={hoveredIndex}
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 w-full">
        {portfolio2.map((item) => (
          <PortfolioCard
            key={item.id}
            image={item.image}
            title={item.title}
            tools={item.tools}
            index={item.id}
            hoveredIndex={hoveredIndex}
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </div>
    </div>
  );
};
