import Image, { StaticImageData } from "next/image";
import { FC } from "react";
import { CircleArrowRight } from "lucide-react";
import Link from "next/link";
import { pageConfig } from "@/shared/config/page.config";

interface PortfolioCardProps {
  image: string | StaticImageData;
  title: string;
  tools: string[];
}

export const PortfolioCard: FC<PortfolioCardProps> = ({
  image,
  title,
  tools,
}) => {
  return (
    <div className="flex flex-col gap-[25px]">
      <Link
        href={pageConfig.project + "/" + title}
        className="group cursor-pointer relative w-full h-[321px] rounded-[10px] border border-white/10 backdrop-blur-2xl"
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-left rounded-[10px] group-hover:opacity-30 transition-opacity duration-300 "
        />
        <div className="hover:opacity-100 opacity-0 transition-opacity duration-300 absolute top-0 left-0 w-full h-full flex items-center justify-center gap-5">
          <p className="font-outfit text-[35px] uppercase">View more</p>
          <CircleArrowRight size={32} />
        </div>
      </Link>
      <div className="flex items-center gap-[10px]">
        <div className="flex gap-[10px]">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="px-5 py-[5px] rounded-[5px] border border-white/10"
            >
              <p className="font-light text-lg">{tool}</p>
            </div>
          ))}
        </div>
        <div>
          <p className="font-outfit font-light text-lg">{title}</p>
        </div>
      </div>
    </div>
  );
};
