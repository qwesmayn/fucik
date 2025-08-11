"use client";

import { FC, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { PictureModal } from "@/shared/ui/picture-modal";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { videoExtensions } from "@/shared/config/video.confg";

interface GalleryProjectProps {
  title: string;
  files: string[];
}

export const GalleryProject: FC<GalleryProjectProps> = ({ title, files }) => {
  const [selectedImage, setSelectedImage] = useState<
    string | null
  >(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

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
    <div className="relative w-full max-w-full px-4 md:px-0 md:max-w-[1200px] mx-auto">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {files.map((file, index) => (
            <div key={index} className="flex-none w-full relative">
              <div
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[700px] xl:h-[800px] relative cursor-pointer group"
                onClick={() => handleImageClick(file)}
              >
                {videoExtensions.some((ext) => file.endsWith(ext)) ? (
                  <video
                    src={file}
                    autoPlay
                    muted
                    loop
                    className="absolute top-0 left-0 w-full h-full rounded-[10px] object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                ) : (
                  <Image
                    src={file}
                    alt={`${title} - изображение ${index + 1}`}
                    fill
                    className="rounded-[10px] object-contain transition-transform duration-300 group-hover:scale-[1.02]"
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
            className="hidden sm:block absolute left-[1%] xl:-left-20 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 xl:p-3 text-white transition-all duration-300 hover:scale-110"
            onClick={scrollPrev}
            aria-label="Предыдущее изображение"
          >
            <ChevronLeft className="w-5 h-5 xl:w-6 xl:h-6" />
          </button>
          <button
            className="hidden sm:block absolute right-[1%] xl:-right-20 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 xl:p-3 text-white transition-all duration-300 hover:scale-110"
            onClick={scrollNext}
            aria-label="Следующее изображение"
          >
            <ChevronRight className="w-5 h-5 xl:w-6 xl:h-6" />
          </button>
        </>
      )}

      {files.length > 1 && (
        <div className="flex justify-center gap-1.5 md:gap-2 mt-4 md:mt-6">
          {files.map((_, index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
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
        <div className="absolute top-2 right-2 md:top-4 md:right-4 z-10 bg-black/50 backdrop-blur-sm rounded-[5px] px-2 md:px-3 py-1 text-white text-xs md:text-sm font-light">
          {selectedIndex + 1} / {files.length}
        </div>
      )}

      {selectedImage && (
        <PictureModal
          file={selectedImage}
          title={title}
          onClose={handleClose}
        />
      )}
    </div>
  );
};
