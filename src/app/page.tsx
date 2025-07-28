import Image from "next/image";

export default function Home() {
  return (
    <main>
      <section className="relative min-h-screen px-15">
        <div className="pt-[157px] relative z-10">
          <Image
            src="/xromosev.png"
            alt="xromosev"
            priority
            width={1726}
            height={198}
          />
        </div>
        <div className="absolute top-[28%] right-[0] translate-x-[50%]">
          <Image
            src="/x.webp"
            alt="x"
            priority
            width={942}
            height={725}
          />
        </div>
        <div className="absolute inset-0 bg-[url('/bg.png')] bg-cover bg-cente mix-blend-soft-light" />
      </section>
    </main>
  );
}
