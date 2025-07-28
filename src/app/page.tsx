import { Button } from "@/shared/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <section className="relative min-h-screen px-15 pb-10 flex flex-col justify-between">
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
            <Button className="bg-[#EAEAEA]/[0.06] hover:bg-[#EAEAEA]/[0.16] font-light text-lg">
              About me
            </Button>
            <Button className="bg-[#FF3C00] hover:bg-[#FF3C00]/[0.6] font-light text-lg">
              Portfolio
            </Button>
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
        <div className="absolute z-10 bg-[#0B0B0B] w-[505px] h-[505px] rounded-full left-[22%] translate-y-[5%] blur-[20px]" />
        <div className="absolute z-20 inset-0 bg-[url('/bg.png')] bg-cover bg-cente mix-blend-soft-light" />
      </section>
    </main>
  );
}
