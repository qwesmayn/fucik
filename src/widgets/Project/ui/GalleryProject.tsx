"use client";

import { FC, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { PictureModal } from "@/shared/ui/picture-modal";

interface GalleryProjectProps {
  title: string;
  firstImage: string | StaticImageData;
  secondImage: string | StaticImageData;
  mainImage: string | StaticImageData;
}

export const GalleryProject: FC<GalleryProjectProps> = ({
  title,
  firstImage,
  secondImage,
  mainImage,
}) => {
  const [selectedImage, setSelectedImage] = useState<
    string | StaticImageData | null
  >(null);

  const handleClose = () => {
    setSelectedImage(null);
  };

  return (
    <div className="flex items-center gap-5">
      <div className="flex flex-col gap-5">
        <div
          className="w-[586px] h-[684px] relative"
          onClick={() => setSelectedImage(firstImage)}
        >
          <Image
            src={firstImage}
            quality={100}
            alt="firstImage"
            fill
            className="rounded-[10px]"
          />
        </div>
        <div
          className="w-[586px] h-[684px] relative"
          onClick={() => setSelectedImage(secondImage)}
        >
          <Image
            src={secondImage}
            quality={100}
            alt="secondImage"
            fill
            className="rounded-[10px]"
          />
        </div>
      </div>
      <div
        className="w-[1190px] h-[1390px] relative"
        onClick={() => setSelectedImage(mainImage)}
      >
        <Image
          src={mainImage}
          alt="mainImage"
          fill
          className="rounded-[10px]"
        />
      </div>
      {selectedImage && (
        <PictureModal
          image={selectedImage}
          title={title}
          onClose={handleClose}
        />
      )}
    </div>
  );
};
