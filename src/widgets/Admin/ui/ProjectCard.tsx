"use client";

import { FC } from "react";
import Image from "next/image";
import { Edit3, Trash2, ExternalLink } from "lucide-react";
import { IProject } from "@/entities/portfolio/model/IProject.interface";

interface ProjectCardProps {
  project: IProject;
  onEdit: (project: IProject) => void;
  onDelete: (id: number) => void;
}

export const ProjectCard: FC<ProjectCardProps> = ({
  project,
  onEdit,
  onDelete,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ru-RU");
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all duration-300">
      <div className="flex gap-6">
        <div className="relative w-32 h-38 ">
          <Image
            src={
              project.coverImage
                ? process.env.NEXT_PUBLIC_IMG + project.coverImage
                : "https://placehold.co/875x321"
            }
            alt={project.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-semibold text-white truncate pr-4">
              {project.title}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(project)}
                className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 rounded-lg transition-colors"
                title="Редактировать"
              >
                <Edit3 size={18} />
              </button>
              <button
                onClick={() => onDelete(project.id)}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                title="Удалить"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          <p className="text-gray-300 text-sm mb-3 line-clamp-2">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-3">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-white/10 text-white text-xs rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center gap-4">
              <span
                className={`px-2 py-1 rounded-md text-xs bg-white/10 text-white`}
              >
                {project.position || "Не указано"}
              </span>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-400 hover:text-blue-300"
                >
                  <ExternalLink size={14} />
                  Ссылка
                </a>
              )}
            </div>
            <p className="text-gray-400 text-sm">
              Создан: {formatDate(project.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
