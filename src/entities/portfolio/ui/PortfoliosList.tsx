"use client";

import { FC, useState } from "react";
import { PortfolioCard } from "./PortfolioCard";
import { cn } from "@/shared/lib/utils";
import { IProject } from "../model/IProject.interface";

interface PortfoliosListProps {
  type: "home" | "projects";
  portfolio: IProject[];
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
    <div className="flex items-start gap-[50px] 2xl:flex-row flex-col">
      <div className={cn("grid grid-cols-1 w-full")}>
        {portfolio1.map((item, i) => (
          <PortfolioCard
            key={item.id}
            projectId={item.id}
            image={
              item.coverImage
                ? process.env.NEXT_PUBLIC_IMG + item.coverImage
                : "https://placehold.co/875x321"
            }
            title={item.title}
            tools={item.technologies}
            index={type === "home" ? item.position || i : i}
            hoveredIndex={hoveredIndex}
            onMouseEnter={() => handleMouseEnter(type === "home" ? item.position || i : i)}
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 w-full">
        {portfolio2.map((item, i) => (
          <PortfolioCard
            key={item.id}
            projectId={item.id}
            image={
              item.coverImage
                ? process.env.NEXT_PUBLIC_IMG + item.coverImage
                : "https://placehold.co/875x321"
            }
            title={item.title}
            tools={item.technologies}
            index={type === "home" ? item.position || i : i + 5}
            hoveredIndex={hoveredIndex}
            onMouseEnter={() =>
              handleMouseEnter(type === "home" ? item.position || i : i + 5)
            }
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </div>
    </div>
  );
};
