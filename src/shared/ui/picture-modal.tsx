import { FC, useState } from "react";
import Image from "next/image";
import { XCircle } from "lucide-react";
import { videoExtensions } from "../config/video.confg";

interface PictureModalProps {
  title: string;
  file: string;
  onClose: () => void;
}

export const PictureModal: FC<PictureModalProps> = ({
  title,
  file,
  onClose,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const isVideo = videoExtensions.some((ext) => file.endsWith(ext));

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isVideo) {
      setIsZoomed(!isZoomed);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-50 max-w-[90vw] max-h-[90vh]">
        <div className="bg-[#FF3B00] rounded-t-[10px] relative py-[5px] flex justify-center items-center min-w-[300px]">
          <h2 className="text-white font-medium px-8">{title}</h2>
          <XCircle
            size={22}
            className="cursor-pointer absolute top-[7px] right-[11px] text-white hover:text-gray-200 transition-colors"
            onClick={onClose}
          />
        </div>
        <div className="relative rounded-b-[10px] bg-black overflow-hidden">
          {isVideo ? (
            <video
              src={file}
              autoPlay
              muted
              loop
              className="rounded-b-[10px] max-w-full max-h-[80vh] w-auto h-auto"
            />
          ) : (
            <div 
              className={`relative transition-transform duration-300 ${!isVideo ? 'cursor-zoom-' + (isZoomed ? 'out' : 'in') : ''}`}
              onClick={handleImageClick}
            >
              <Image
                src={file}
                alt="picture"
                width={0}
                height={0}
                sizes="90vw"
                quality={100}
                className={`w-auto h-auto rounded-b-[10px] transition-transform duration-300 ${
                  isZoomed 
                    ? 'transform scale-[1.5]' 
                    : ''
                } max-w-full max-h-[80vh]`}
              />
              {!isVideo && (
                <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm rounded px-2 py-1 text-white text-xs">
                  {isZoomed ? 'Кликните для уменьшения' : 'Кликните для увеличения'}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
