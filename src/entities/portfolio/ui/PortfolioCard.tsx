import Image, { StaticImageData } from "next/image";
import { FC } from "react";
import { CircleArrowRight } from "lucide-react";
import Link from "next/link";
import { pageConfig } from "@/shared/config/page.config";
import { cn } from "@/shared/lib/utils";
import { ToolsList } from "./ToolsList";

interface PortfolioCardProps extends React.HTMLAttributes<HTMLDivElement> {
  projectId: number;
  image: string | StaticImageData;
  title: string;
  tools: string[];
  link?: string;
  isHovered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  index: number;
  hoveredIndex?: number | null;
}

export const PortfolioCard: FC<PortfolioCardProps> = ({
  projectId,
  image,
  title,
  tools,
  link,
  className,
  onMouseEnter,
  onMouseLeave,
  index,
  hoveredIndex,
}) => {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-[15px] md:gap-[25px] group mb-[40px] md:mb-[50px] transition-all duration-700",
      )}
    >
      <Link
        href={onMouseEnter ? link || pageConfig.project + "/" + projectId : ""}
        target={link ? "_blank" : undefined}
        className={cn(
          "cursor-pointer relative w-full transition-normal duration-900 rounded-[10px] border border-white/10",
          hoveredIndex === index
            ? "sm:h-[479px] h-[228px]"
            : (hoveredIndex === index - 1 && index !== 5) ||
              (hoveredIndex === 4 && index === 3) ||
              (hoveredIndex === 8 && index === 7)
            ? "sm:h-[228px] h-[90px]"
            : "sm:h-[321px] h-[125px]",
          className
        )}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={cn(
            "rounded-[10px] object-cover transition-opacity duration-300",
            onMouseEnter && "group-hover:opacity-30"
          )}
        />
        {onMouseEnter && (
          <div className="hover:opacity-100 opacity-0 transition-opacity duration-300 absolute top-0 left-0 w-full h-full flex items-center justify-center gap-5">
            <p className="font-outfit text-[35px] uppercase">View more</p>
            <CircleArrowRight size={32} />
          </div>
        )}
      </Link>
      <div
        className="flex sm:items-center sm:flex-row flex-col-reverse flex-wrap gap-[10px] transition-all duration-700"
      >
        <ToolsList tools={tools} />
        <div>
          <p className="font-outfit font-light sm:text-lg text-xs">{title}</p>
        </div>
      </div>
    </div>
  );
};
