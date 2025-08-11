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
    <main className="relative xl:px-15 px-5">
      <section className="pt-[72px] pb-[170px] max-w-[1800px] mx-auto">
        <div className="flex flex-col gap-15">
          <AboutProject
            title={project.title}
            description={project.description}
            tools={project.technologies}
          />
          <GalleryProject
            title={project.title}
            files={
              project.files?.map(
                (file: string) => process.env.NEXT_PUBLIC_IMG + file
              ) || []
            }
          />
        </div>
      </section>
    </main>
  );
}
