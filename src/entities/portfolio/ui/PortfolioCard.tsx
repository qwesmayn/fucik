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
        "relative flex flex-col gap-[15px] md:gap-[25px] group mb-[40px] md:mb-[132px] transition-all duration-700",
        hoveredIndex === index && "md:mb-[50px]"
      )}
    >
      <Link
        href={onMouseEnter ? link ?? pageConfig.project + "/" + projectId : ""}
        className={cn(
          "cursor-pointer relative w-full transition-normal duration-700 rounded-[10px] border border-white/10",
          hoveredIndex === index
            ? "h-[479px]"
            : hoveredIndex === index - 1 ||
              (hoveredIndex === 4 && index === 3) ||
              (hoveredIndex === 8 && index === 7)
            ? "h-[228px]"
            : "h-[321px]",
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
        className={cn(
          "relative md:absolute flex flex-wrap items-center gap-[10px] transition-all duration-700",
          "md:bottom-0 md:left-0 md:translate-y-[75px]",
          hoveredIndex === index &&
            "md:bottom-[25px] md:left-[25px] md:translate-y-0"
        )}
      >
        <ToolsList tools={tools} />
        <div>
          <p className="font-outfit font-light text-lg">{title}</p>
        </div>
      </div>
    </div>
  );
};
