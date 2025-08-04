import { FC } from "react";
import Image, { StaticImageData } from "next/image";

interface GalleryProjectProps {
  firstImage: string | StaticImageData;
  secondImage: string | StaticImageData;
  mainImage: string | StaticImageData;
}

export const GalleryProject: FC<GalleryProjectProps> = ({
  firstImage,
  secondImage,
  mainImage,
}) => {
  return (
    <div className="flex items-center gap-5">
      <div className="flex flex-col gap-5">
        <div className="w-[586px] h-[684px] relative">
          <Image
            src={firstImage}
            quality={100}
            alt="firstImage"
            fill
            className="rounded-[10px]"
          />
        </div>
        <div className="w-[586px] h-[684px] relative">
          <Image
            src={secondImage}
            quality={100}
            alt="secondImage"
            fill
            className="rounded-[10px]"
          />
        </div>
      </div>
      <div className="w-[1190px] h-[1390px] relative">
        <Image
          src={mainImage}
          alt="mainImage"
          fill
          className="rounded-[10px]"
        />
      </div>
    </div>
  );
};
