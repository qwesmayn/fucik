"use client";

import { Button } from "@/shared/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function NotFound() {
  const refCircle = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const circle = refCircle.current;
    if (!circle) return;

    const animation = gsap.to(circle, {
      rotation: 360,
      duration: 20,
      ease: "none",
      repeat: -1,
    });

    return () => {
      animation.kill();
    };
  }, []);

  return (
    <section className="relative min-h-screen px-15 pb-10 flex flex-col justify-center items-center text-center border-b border-white/10">
      <div className="relative z-30 mb-8">
        <h1 className="font-hegval text-[200px] md:text-[300px] lg:text-[400px] font-bold text-white/20 leading-none">
          404
        </h1>
      </div>
    
      <div className="relative z-30 space-y-8 max-w-[800px]">
        <h2 className="font-hegval text-4xl md:text-6xl font-bold text-white">
          Page Not Found
        </h2>
        
        <p className="font-light text-xl text-white/70 max-w-[600px]">
          Извините, страница, которую вы ищете, не существует или была перемещена. 
          Проверьте URL или вернитесь на главную страницу.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Link href="/">
            <Button className="bg-[#FF3C00] hover:bg-[#FF3C00]/[0.6] font-light text-lg">
              На главную
            </Button>
          </Link>
          <Link href="/projects">
            <Button className="bg-[#EAEAEA]/[0.06] hover:bg-[#EAEAEA]/[0.16] font-light text-lg backdrop-blur-2xl">
              Портфолио
            </Button>
          </Link>
        </div>
      </div>

      <div className="absolute top-[20%] right-[10%] opacity-30">
        <Image src="/x.webp" alt="x" width={300} height={230} className="rotate-12" />
      </div>

      <div className="absolute top-[60%] left-[5%] opacity-20">
        <Image src="/x.webp" alt="x" width={200} height={154} className="-rotate-12" />
      </div>

      <div
        ref={refCircle}
        className="absolute z-10 bg-[url('/circle.png')] bg-cover bg-center bg-no-repeat w-[300px] h-[300px] opacity-20 left-[10%] top-[30%]"
      />

      <div className="absolute bg-[#FF3C00] w-[500px] h-[500px] rounded-full left-[20%] top-[40%] blur-[100px] opacity-30" />
      <div className="absolute bg-[#EAEAEA] w-[300px] h-[300px] rounded-full right-[15%] bottom-[20%] blur-[80px] opacity-10" />
      
      <div className="noise mix-blend-soft-light" />
    </section>
  );
}