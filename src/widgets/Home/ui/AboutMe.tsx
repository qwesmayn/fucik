"use client";

import Image from "next/image";
import { AboutCard } from "./AboutCard";
import { tools } from "../config/tools.config";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export const AboutMe = () => {
  const ref = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    const image = imageRef.current;
    const aboutMe = ref.current;

    if (!image) return;
    if (!aboutMe) return;

    gsap.fromTo(
      image,
      {
        autoAlpha: 0,
        xPercent: 10,
      },
      {
        autoAlpha: 1,
        xPercent: 0,
        duration: 1.7,
        ease: "power1.out",
        scrollTrigger: {
          trigger: image,
          start: "top 90%",
          toggleActions: "play complete none reset",
        },
      }
    );

    gsap.fromTo(
      aboutMe,
      {
        autoAlpha: 0,
        xPercent: -7,
      },
      {
        autoAlpha: 1,
        xPercent: 0,
        duration: 1.7,
        ease: "power1.out",
        scrollTrigger: {
          trigger: aboutMe,
          start: "top 90%",
          toggleActions: "play complete none reset",
        },
      }
    );
  });

  return (
    <section
      id="about-me"
      className="relative sm:mt-[250px] mt-[100px] sm:mb-[195px] mb-[37px] sm:min-h-screen xl:px-15 px-5 flex flex-col sm:justify-between"
    >
      <div className="bg-[#FF3C00] relative z-30 text-center py-[1px] px-[5px] sm:mb-[195px] mb-[37px] w-max rounded-[5px] text-[#0B0B0B]">
        <p className=" ont-light sm:text-xl text-sm">About me</p>
      </div>
      <div ref={ref} className="relative z-30 lg:pl-[190px] pl-0">
        <div className="flex flex-col max-w-[1156px] w-full">
          <AboutCard
            title="3D Motion Designer"
            description="I'm a 3D motion designer focused on delivering isometric graphics, realistic renders, promo visuals, and UI-integrated 3D content. Whether you need visuals for your website, product launch, or digital branding — I’ll take it from idea to final delivery with clarity and purpose."
            className="sm:mb-[100px] mb-5"
          />
          <AboutCard
            title="Core skills"
            description="3D Design & Visuals • Motion Graphics • Promo Content • Explainer Videos • Product Visualization • NFT Creation • Digital Graphics & Typography"
            className="ml-auto sm:mb-[65px] mb-5"
          />
          <AboutCard title="Tools I use">
            {tools.map((tool, index) => (
              <div
                key={index}
                className="px-5 py-2 rounded-[5px] border border-white/10"
              >
                <p className="text-[#838383] sm:text-base text-xs">{tool}</p>
              </div>
            ))}
          </AboutCard>
        </div>
      </div>
      <div
        ref={imageRef}
        className="absolute 2xl:right-[9%] right-[0] top-[251px] w-[824px] h-[1051px] hidden lg:block"
      >
        <div className="noise rounded-full overflow-hidden h-[951px] w-full absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2" />
        <Image
          src="/radiance.webp"
          alt="radiance"
          priority
          quality={100}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover" 
        />
      </div>
    </section>
  );
};
