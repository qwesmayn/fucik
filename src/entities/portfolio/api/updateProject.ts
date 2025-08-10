import { fetchBase } from "@/shared/lib/api";
import { IProject } from "../model/IProject.interface";

export const updateProject = async (id: number, project: IProject, coverImage?: File, files?: File[]) => {

  const formData = new FormData();
  formData.append("title", project.title);
  formData.append("description", project.description);
  formData.append("technologies", JSON.stringify(project.technologies));
  formData.append("url", project.url || "");
  formData.append("position", project.position?.toString() || "0");
  
  if (coverImage) {
    formData.append("coverImage", coverImage);
  }

  if (files && files.length > 0) {
    files.forEach((file) => {
      formData.append("files", file);
    });
  }

  const response = await fetchBase(`projects/${id}`, {
    method: "PUT",
    body: formData,
  });
  return response.json();
};