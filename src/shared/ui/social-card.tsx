import { FC } from "react";
import right from "@/shared/assets/icons/right.png";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface SocialCardProps {
  title: string;
  description: string;
  icon: StaticImageData;
  href: string;
}

export const SocialCard: FC<SocialCardProps> = ({
  title,
  description,
  icon,
  href,
}) => {
  return (
    <Link className="group" href={href} target="_blank">
      <div className="flex flex-col justify-between w-[235px] h-[328px] p-[25px] border border-white/10 rounded-[10px] backdrop-blur-3xl hover:bg-[#FF3B00] transition-colors duration-500">
        <div className="flex justify-between items-center">
          <div>
            <Image src={icon} alt="icon" width={23} height={23} />
          </div>
          <div className="w-[28px] h-[28px] flex items-center justify-center border border-white/10 group-hover:border-black rounded-[5px] transition-colors duration-500">
            <Image src={right} alt="right" width={10} height={13} className="group-hover:invert group-hover:-rotate-90 transition-all duration-400"/>
          </div>
        </div>
        <div className="flex flex-col gap-[6px] max-w-[127px] w-full text-white/85 font-outfit group-hover:text-[#000000]/85 transition-colors duration-500">
          <p className="font-semibold">{title}</p>
          <p className="font-extralight">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};
