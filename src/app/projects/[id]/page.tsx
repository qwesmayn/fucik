import { AboutProject } from "@/widgets/Project/ui/AboutProject";
import first from "@/shared/assets/img/first.png";
import second from "@/shared/assets/img/second.png";
import main from "@/shared/assets/img/main.png";
import { GalleryProject } from "@/widgets/Project/ui/GalleryProject";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="relative">
      <section className="pt-[72px] pb-[170px] max-w-[1800px] mx-auto">
        <div className="flex flex-col gap-15">
          <AboutProject
            title="3D Motion Designer"
            description="I'm a 3D motion designer focused on delivering isometric graphics, realistic renders, promo visuals, and UI-integrated 3D content. Whether you need visuals for your website, product launch, or digital branding— I’ll take it from idea to final delivery with clarity and purpose."
            tools={["Blender", "Photoshop"]}
          />
          <GalleryProject
            firstImage={first}
            secondImage={second}
            mainImage={main}
          />
        </div>
      </section>
    </main>
  );
}
