"use client";

import { useState, useEffect } from "react";
import { Plus, Search, ArrowUpDown } from "lucide-react";
import { IProject } from "@/entities/portfolio/model/IProject.interface";
import { ProjectCard } from "@/widgets/Admin/ui/ProjectCard";
import { ProjectForm } from "@/features/project/ui/ProjectForm";
import { ProjectTopPosition } from "@/features/project/ui/ProjectTopPosition";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllProjects } from "@/entities/portfolio/api/getAllProjects";
import { createNewProject } from "@/entities/portfolio/api/createNewProject";
import { updateProject } from "@/entities/portfolio/api/updateProject";
import { deleteProject } from "@/entities/portfolio/api/deleteProject";
import { toast } from "react-toastify";

export default function Admin() {
  const queryClient = useQueryClient();
  const { data: projects, isLoading } = useQuery({
    queryKey: ["projectsAll"],
    queryFn: getAllProjects,
    initialData: [],
  });

  const [filteredProjects, setFilteredProjects] =
    useState<IProject[]>(projects);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditPosition, setIsEditPosition] = useState(false);
  const [editingProject, setEditingProject] = useState<IProject | null>(null);

  useEffect(() => {
    let filtered = projects;

    if (searchQuery) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          project.technologies.some((tech) =>
            tech.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    setFilteredProjects(filtered);
  }, [projects, searchQuery]);

  const handleCreateProject = async (data: IProject, files?: File[]) => {
    await createNewProject(data, files);
    await queryClient.refetchQueries({ queryKey: ["projectsAll"] });
    await queryClient.refetchQueries({ queryKey: ["topProjects"] });
    toast.success("Проект создан");
  };

  const handleUpdateProject = async (data: IProject, files?: File[]) => {
    if (!editingProject) return;

    const updatedProject: IProject = {
      ...editingProject,
      ...data,
    };

    await updateProject(editingProject.id, updatedProject, files);
    await queryClient.refetchQueries({ queryKey: ["projectsAll"] });
    await queryClient.refetchQueries({ queryKey: ["topProjects"] });
    toast.success("Проект обновлен");
    setEditingProject(null);
  };

  const handleDeleteProject = async (id: number) => {
    await deleteProject(id);
    await queryClient.refetchQueries({ queryKey: ["projectsAll"] });
    await queryClient.refetchQueries({ queryKey: ["topProjects"] });
    toast.success("Проект удален");
  };

  const handleUpdateProjectsOrder = async (updatedProjects: IProject[]) => {
    await Promise.all(
      updatedProjects.map(async (project, index) => {
        if (project.position !== index) {
          await updateProject(project.id, {
            ...project,
            position: index + 1,
          });
        }
      })
    );

    await queryClient.refetchQueries({ queryKey: ["projectsAll"] });
    await queryClient.refetchQueries({ queryKey: ["topProjects"] });
    toast.success("Порядок проектов обновлен");
  };

  const openCreateForm = () => {
    setEditingProject(null);
    setIsFormOpen(true);
  };

  const openEditPosition = () => {
    setIsEditPosition(true);
  };

  const openEditForm = (project: IProject) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-950">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Управление проектами
              </h1>
              <p className="text-gray-400">
                Всего проектов: {projects.length} | Отображается:{" "}
                {filteredProjects.length}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={openCreateForm}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <Plus size={20} />
                Добавить проект
              </button>
              <button
                onClick={openEditPosition}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <ArrowUpDown size={20} />
                Изменить порядок проектов
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Поиск по названию, описанию или технологиям..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-white/30 focus:outline-none"
              />
            </div>
          </div>
          <div className="space-y-4">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onEdit={openEditForm}
                  onDelete={handleDeleteProject}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">
                  {searchQuery ? "Проекты не найдены" : "Пока нет проектов"}
                </p>
                {!searchQuery && (
                  <button
                    onClick={openCreateForm}
                    className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    Создать первый проект
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <ProjectForm
        project={editingProject}
        onSubmit={editingProject ? handleUpdateProject : handleCreateProject}
        onClose={() => setIsFormOpen(false)}
        isOpen={isFormOpen}
      />
      <ProjectTopPosition
        isOpen={isEditPosition}
        onClose={() => setIsEditPosition(false)}
        onUpdateOrder={handleUpdateProjectsOrder}
      />
    </>
  );
}
