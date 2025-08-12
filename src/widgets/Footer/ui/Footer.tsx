"use client";

import { FC } from "react";
import Image from "next/image";
import { SocialCard } from "@/shared/ui/social-card";
import behance from "@/shared/assets/icons/behance.png";
import instagram from "@/shared/assets/icons/inst.png";
import youtube from "@/shared/assets/icons/youtube.png";
import linkedin from "@/shared/assets/icons/in.png";
import { usePathname } from "next/navigation";
import { pageConfig } from "@/shared/config/page.config";

export const Footer: FC = () => {
  const pathname = usePathname();

  return pathname === pageConfig.login ? null : (
    <footer className="xl:px-15 px-5 pt-10 xl:pt-15 pb-[60px] xl:pb-[100px] border-t border-white/10 overflow-hidden">
      <div className="ml-[1%] bg-[#FF3C00] text-center py-[1px] px-[5px] w-max rounded-[5px] text-[#0B0B0B] mb-10">
        <p className="font-light sm:text-xl text-sm">Contact</p>
      </div>
      <div className="relative flex flex-col-reverse sm:flex-col xl:flex-row xl:flex-wrap xl:justify-center gap-[40px] xl:gap-[90px]">
        <div className="sm:relative absolute sm:bottom-0 -bottom-52 sm:right-0 -right-22 z-30 flex flex-col items-center xl:items-start">
          <div>
            <Image
              src="/xmln.png"
              alt="xmln"
              width={324}
              height={277}
              className="w-[250px] h-auto xl:w-[324px]"
            />
          </div>
        </div>

        <div className="relative z-30 flex flex-col gap-[60px] xl:gap-[145px] xl:items-start text-left">
          <div className="space-y-8 xl:space-y-10">
            <div className="space-y-[6px] font-outfit">
              <p>Email</p>
              <p className="text-white/85 font-extralight">
                denisden2122@gmail.com
              </p>
            </div>
            <div className="space-y-[6px] font-outfit">
              <p>Telegram</p>
              <p className=" text-white/85 font-extralight">@xromosev</p>
            </div>
          </div>
          <div className="max-w-[195px]">
            <p className="font-outfit font-extralight text-white/85">
              Xromosev.net best site ever what you know, nice job
            </p>
          </div>
        </div>

        <div className="relative z-30 flex sm:gap-[50px] gap-3 flex-wrap sm:justify-center justify-between">
          <SocialCard
            title="Behance"
            description="Super cases with portfolio"
            icon={behance}
            href="https://www.behance.net/xromosev"
          />
          <SocialCard
            title="Instagram"
            description="Super cases with portfolio"
            icon={instagram}
            href="https://www.instagram.com/xromosev"
          />
          <SocialCard
            title="Youtube"
            description="Super cases with portfolio"
            icon={youtube}
            href="https://www.youtube.com/@xromosev"
          />
          <SocialCard
            title="Linkedin"
            description="Super cases with portfolio"
            icon={linkedin}
            href="https://www.linkedin.com/in/xromosev"
          />
        </div>
        <div className="noise-footer mix-blend-soft-light" />
      </div>
    </footer>
  );
};
