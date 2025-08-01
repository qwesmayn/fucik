import { FC } from "react";
import Image from "next/image";
import { SocialCard } from "@/shared/ui/social-card";
import behance from "@/shared/assets/icons/behance.png";
import instagram from "@/shared/assets/icons/inst.png";
import youtube from "@/shared/assets/icons/youtube.png";
import linkedin from "@/shared/assets/icons/in.png";

export const Footer: FC = () => {
  return (
    <footer className="relative px-15 pt-15 pb-[130px] flex flex-wrap justify-center gap-[90px]">
      <div className="relative z-30 flex flex-col">
        <div className="bg-[#FF3C00] text-center py-[1px] px-[5px] w-max rounded-[5px] text-[#0B0B0B]">
          <p className="text-xl font-light">Contact</p>
        </div>
        <div>
          <Image src="/xmln.png" alt="xmln" width={324} height={277} />
        </div>
      </div>

      <div className="relative z-30 flex flex-col gap-[145px]">
        <div className="space-y-10">
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

      <div className="relative z-30 flex gap-[50px] flex-wrap justify-center">
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

      <div className="absolute z-20 inset-0 bg-[url('/bgfooter.png')] bg-cover bg-center mix-blend-soft-light" />
    </footer>
  );
};
