import { AboutProject } from "@/widgets/Project/ui/AboutProject";
import { GalleryProject } from "@/widgets/Project/ui/GalleryProject";
import { getProjectById } from "@/entities/portfolio/api/getProjectById";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);

  return (
    <main className="relative">
      <section className="pt-[72px] pb-[170px] max-w-[1800px] mx-auto">
        <div className="flex flex-col gap-15">
          <AboutProject
            title={project.title}
            description={project.description}
            tools={project.technologies}
          />
          <GalleryProject
            title={project.title}
            firstImage={
              project.files?.[0]
                ? process.env.NEXT_PUBLIC_API_URL + project.files[0]
                : "https://placehold.co/586x684"
            }
            secondImage={
              project.files?.[1]
                ? process.env.NEXT_PUBLIC_API_URL + project.files[1]
                : "https://placehold.co/587x685"
            }
            mainImage={
              project.files?.[2]
                ? process.env.NEXT_PUBLIC_API_URL + project.files[2]
                : "https://placehold.co/1190x1390"
            }
          />
        </div>
      </section>
    </main>
  );
}
