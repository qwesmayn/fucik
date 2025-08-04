import Image, { StaticImageData } from "next/image";
import { FC } from "react";
import { CircleArrowRight } from "lucide-react";
import Link from "next/link";
import { pageConfig } from "@/shared/config/page.config";
import { cn } from "@/shared/lib/utils";
import { ToolsList } from "./ToolsList";

interface PortfolioCardProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string | StaticImageData;
  title: string;
  tools: string[];
  isHovered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  index: number;
  hoveredIndex: number | null;
}

export const PortfolioCard: FC<PortfolioCardProps> = ({
  image,
  title,
  tools,
  className,
  onMouseEnter,
  onMouseLeave,
  index,
  hoveredIndex,
}) => {
  return (
    <div className={cn("relative flex flex-col gap-[25px] group mb-[115px] transition-al duration-700", hoveredIndex === index  && "mb-[50px]")}>
      <Link
        href={pageConfig.project + "/" + title}
        className={cn(
          "cursor-pointer relative w-full transition-normal duration-700 rounded-[10px] border border-white/10",
          hoveredIndex === index 
            ? "h-[479px]"
            : hoveredIndex === index - 1 ||
              (hoveredIndex === 3 && index === 2) ||
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
          className="object-cover rounded-[10px] group-hover:opacity-30 transition-opacity duration-300 "
        />
        <div className="hover:opacity-100 opacity-0 transition-opacity duration-300 absolute top-0 left-0 w-full h-full flex items-center justify-center gap-5">
          <p className="font-outfit text-[35px] uppercase">View more</p>
          <CircleArrowRight size={32} />
        </div>
      </Link>
      <div
        className={cn(
          "absolute bottom-0 left-0 translate-y-[75px] flex items-center gap-[10px] transition-all duration-700",
          hoveredIndex === index && "absolute bottom-[25px] left-[25px] translate-y-0"
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
