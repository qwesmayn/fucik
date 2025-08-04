"use client";

import { Button } from "@/shared/ui/button";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";

export const MainBlock = () => {
  const refCircle = useRef<HTMLDivElement>(null);
  const mainAnimation = useRef<gsap.core.Tween | null>(null);
  const mouseTimeout = useRef<NodeJS.Timeout | null>(null);
  const translate = 20;
  const rotate = 60;

  function getRandomInt(val: number) {
    return (
      Math.ceil(Math.random() * val) * (Math.round(Math.random()) ? 1 : -1)
    );
  }

  const startMainAnimation = () => {
    const circle = refCircle.current;
    if (!circle) return;

    mainAnimation.current = gsap.to(circle, {
      xPercent: getRandomInt(translate),
      yPercent: getRandomInt(translate),
      rotation: getRandomInt(rotate),
      duration: 3,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
    });
  };

  useEffect(() => {
    const circle = refCircle.current;
    if (!circle) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (mainAnimation.current) {
        mainAnimation.current.kill();
      }

      if (mouseTimeout.current) {
        clearTimeout(mouseTimeout.current);
      }

      const circleRect = circle.getBoundingClientRect();
      const centerX = circleRect.left + circleRect.width / 2;
      const centerY = circleRect.top + circleRect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;

      const strength = 0.01;

      gsap.to(circle, {
        xPercent: distX * strength,
        yPercent: distY * strength,
        duration: 3,
        ease: "expo.out",
      });

      mouseTimeout.current = setTimeout(() => {
        startMainAnimation();
      }, 2000);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (mouseTimeout.current) {
        clearTimeout(mouseTimeout.current);
      }
    };
  }, []);

  return (
    <section className="relative min-h-screen px-15 pb-10 flex flex-col justify-between border-b border-white/10">
      <div className="flex flex-col relative z-30">
        <div className="pt-[157px]">
          <Image
            src="/xromosev.png"
            alt="xromosev"
            priority
            width={1726}
            height={198}
          />
        </div>
      </div>

      <div className="relative z-30 space-y-[47px]">
        <div className="flex items-center gap-4">
          <Link href="#about-me">
            <Button className="bg-[#EAEAEA]/[0.06] hover:bg-[#EAEAEA]/[0.16] font-light text-lg backdrop-blur-2xl">
              About me
            </Button>
          </Link>
          <Link href="#portfolio">
            <Button className="bg-[#FF3C00] hover:bg-[#FF3C00]/[0.6] font-light text-lg">
              Portfolio
            </Button>
          </Link>
        </div>
        <div className="max-w-[1178px] w-full grid grid-cols-2 gap-10 font-light text-xl text-white/50 *:border-l-2 *:border-white *:pl-[15px]">
          <div>
            <p>
              Xromosev came from constantly digging through old projects
              wondering, ‘How did I build that again?’ It is basically our
              personal toolbox
            </p>
          </div>
          <div>
            <p>
              Built by two award-winning creative developers, our vault gives
              you access to the techniques, components, code, and tools behind
              our projects
            </p>
          </div>
        </div>
      </div>

      <div className="absolute top-[28%] right-[0] translate-x-[50%]">
        <Image src="/x.webp" alt="x" priority width={942} height={725} />
      </div>

      <div className="absolute bg-[#FF3C00] w-[761px] h-[761px] rounded-full left-[15%] translate-y-[-30%] blur-[50px]" />
      <div
        ref={refCircle}
        className="absolute z-10 bg-[url('/circle.png')] bg-cover bg-center bg-no-repeat w-[605px] h-[605px] left-[20%] translate-y-[5%]"
      />
      <div className="absolute z-20 inset-0 noise bg-cover bg-center mix-blend-soft-light" />
    </section>
  );
};
