import { FC } from "react";
import Image, { StaticImageData } from "next/image";
import { XCircle } from "lucide-react";

interface PictureModalProps {
  title: string;
  image: string | StaticImageData;
  onClose: () => void;
}

export const PictureModal: FC<PictureModalProps> = ({ title, image, onClose }) => {
  return (
    <>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40" onClick={onClose}/>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-50">
        <div className="bg-[#FF3B00] rounded-t-[10px] relative py-[5px] flex justify-center items-center">
          <h2>{title}</h2>
          <XCircle
            size={22}
            className="cursor-pointer absolute top-[7px] right-[11px]"
            onClick={onClose}
          />
        </div>
        <div className="w-[985px] h-[1148px] relative rounded-b-[10px]">
          <Image src={image} alt="picture" fill quality={100} className="object-cover"/>
        </div>
      </div>
    </>
  );
};
