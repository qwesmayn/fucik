"use client";

import { FC, useState, useCallback, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { PictureModal } from "@/shared/ui/picture-modal";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

interface GalleryProjectProps {
  title: string;
  files: string[];
}

export const GalleryProject: FC<GalleryProjectProps> = ({ title, files }) => {
  const [selectedImage, setSelectedImage] = useState<
    string | StaticImageData | null
  >(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  const videoExtensions = [
    '.mp4', '.webm', '.mov', '.avi', '.mkv', '.flv', 
    '.wmv', '.m4v', '.3gp', '.ogv', '.ogg', '.qt',
    '.asf', '.rm', '.rmvb', '.vob', '.ts', '.mts'
  ];

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const handleClose = () => {
    setSelectedImage(null);
  };

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <div className="relative w-full max-w-[1200px] mx-auto">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {files.map((file, index) => (
            <div key={index} className="flex-none w-full relative">
              <div
                className="w-full h-[600px] md:h-[800px] lg:h-[1000px] relative cursor-pointer group"
                onClick={() => handleImageClick(file)}
              >
                {videoExtensions.some(ext => file.endsWith(ext)) ? (
                  <video
                    src={file}
                    autoPlay
                    muted
                    loop
                    className="rounded-[10px] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                ) : (
                  <Image
                    src={file}
                    alt={`${title} - изображение ${index + 1}`}
                    fill
                    className="rounded-[10px] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                  />
                )}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[10px] flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {files.length > 1 && (
        <>
          <button
            className="absolute -left-20 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-300 hover:scale-110"
            onClick={scrollPrev}
            aria-label="Предыдущее изображение"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute -right-20 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-300 hover:scale-110"
            onClick={scrollNext}
            aria-label="Следующее изображение"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {files.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {files.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? "bg-[#FF3C00] scale-110"
                  : "bg-white/30 hover:bg-white/50"
              }`}
              onClick={() => scrollTo(index)}
              aria-label={`Перейти к изображению ${index + 1}`}
            />
          ))}
        </div>
      )}

      {files.length > 1 && (
        <div className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-sm rounded-[5px] px-3 py-1 text-white text-sm font-light">
          {selectedIndex + 1} / {files.length}
        </div>
      )}

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
