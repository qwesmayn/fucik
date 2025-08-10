"use client";

import { FC, useEffect, useState } from "react";
import { X } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IProject } from "@/entities/portfolio/model/IProject.interface";

const projectSchema = z.object({
  title: z
    .string()
    .min(1, "Название проекта обязательно")
    .max(100, "Максимум 100 символов"),
  description: z
    .string()
    .min(10, "Описание должно содержать минимум 10 символов")
    .max(1000, "Максимум 1000 символов"),
  url: z
    .string()
    .refine((val) => !val || /^https?:\/\//.test(val), "Некорректный URL"),
  position: z.number(),
  technologies: z.array(z.string()).min(1, "Добавьте хотя бы одну технологию"),
  files: z.array(z.instanceof(File)),
  coverImage: z.instanceof(File),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  project?: IProject | null;
  onSubmit: (data: IProject, coverImage?: File, files?: File[]) => void;
  onClose: () => void;
  isOpen: boolean;
}

export const ProjectForm: FC<ProjectFormProps> = ({
  project,
  onSubmit,
  onClose,
  isOpen,
}) => {
  const [techInput, setTechInput] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [coverImage, setCoverImage] = useState<File | undefined>(undefined);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      url: "",
      position: 0,
      technologies: [],
      files: [],
      coverImage: undefined,
    },
  });

  const technologies = watch("technologies");

  useEffect(() => {
    if (project) {
      reset({
        title: project.title,
        description: project.description,
        url: project.url || "",
        position: project.position || 0,
        technologies: project.technologies,
        files: [],
        coverImage: undefined,
      });
      setFiles([]);
    } else {
      reset({
        title: "",
        description: "",
        url: "",
        position: 0,
        technologies: [],
        files: [],
        coverImage: undefined,
      });
      setFiles([]);
      setCoverImage(undefined);
    }
    setTechInput("");
  }, [project, isOpen, reset]);

  const onFormSubmit = (data: ProjectFormData) => {
    const projectData: IProject = {
      id: project?.id || Date.now(),
      title: data.title,
      description: data.description,
      url: data.url.trim() || null,
      position: data.position,
      technologies: data.technologies,
      files: data.files.map((file) => file.name),
      createdAt: project?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSubmit(projectData, data.coverImage, data.files);
    // onClose();  
  };

  const addTechnology = () => {
    const trimmedTech = techInput.trim();
    if (trimmedTech && !technologies.includes(trimmedTech)) {
      setValue("technologies", [...technologies, trimmedTech]);
      setTechInput("");
    }
  };

  const removeTechnology = (tech: string) => {
    setValue(
      "technologies",
      technologies.filter((t) => t !== tech)
    );
  };

  const handleTechKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTechnology();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white/10 backdrop-blur-xl border border-white/10 rounded-lg z-50">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white">
              {project ? "Редактировать проект" : "Добавить проект"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Название проекта
              </label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className={`w-full px-3 py-2 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors ${
                      errors.title
                        ? "border-red-400 focus:border-red-300"
                        : "border-white/10 focus:border-white/30"
                    }`}
                    placeholder="Введите название проекта"
                  />
                )}
              />
              {errors.title && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Описание
              </label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    className={`w-full px-3 py-2 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none resize-none transition-colors ${
                      errors.description
                        ? "border-red-400 focus:border-red-300"
                        : "border-white/10 focus:border-white/30"
                    }`}
                    placeholder="Введите описание проекта"
                    rows={4}
                  />
                )}
              />
              {errors.description && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                URL проекта (необязательно)
              </label>
              <Controller
                name="url"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="url"
                    className={`w-full px-3 py-2 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors ${
                      errors.url
                        ? "border-red-400 focus:border-red-300"
                        : "border-white/10 focus:border-white/30"
                    }`}
                    placeholder="https://example.com"
                  />
                )}
              />
              {errors.url && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.url.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Приоритет
              </label>
              <Controller
                name="position"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value, 10))
                    }
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-white/30 focus:outline-none"
                  >
                    <option value="0" className="text-white bg-black">
                      Не указан
                    </option>
                    <option value="1" className="text-white bg-black">
                      Первый в списке
                    </option>
                    <option value="2" className="text-white bg-black">
                      Второй в списке
                    </option>
                    <option value="3" className="text-white bg-black">
                      Третий в списке
                    </option>
                    <option value="4" className="text-white bg-black">
                      Четвертый в списке
                    </option>
                    <option value="5" className="text-white bg-black">
                      Пятый в списке
                    </option>
                    <option value="6" className="text-white bg-black">
                      Шестой в списке
                    </option>
                    <option value="7" className="text-white bg-black">
                      Седьмой в списке
                    </option>
                    <option value="8" className="text-white bg-black">
                      Восьмой в списке
                    </option>
                  </select>
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Технологии
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyPress={handleTechKeyPress}
                  className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-white/30 focus:outline-none"
                  placeholder="Введите технологию"
                />
                <button
                  type="button"
                  onClick={addTechnology}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Добавить
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-white/10 text-white text-sm rounded-md"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTechnology(tech)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
              {errors.technologies && (
                <p className="text-red-400 text-sm">
                  {errors.technologies.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Обложка проекта
              </label>
              <Controller
                name="coverImage"
                control={control}
                render={({ field }) => (
                  <input
                    type="file"
                    onChange={(e) => {
                      const selectedFile = e.target.files?.[0];
                      if (selectedFile) {
                        setCoverImage(selectedFile);
                        field.onChange(selectedFile);
                      }
                    }}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-white/30 focus:outline-none"
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Файлы проекта
              </label>
              <Controller
                name="files"
                control={control}
                render={({ field }) => (
                  <div>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        const selectedFiles = Array.from(e.target.files || []);
                        if (selectedFiles.length > 0) {
                          setFiles(selectedFiles);
                          field.onChange(selectedFiles);
                        } else {
                          setFiles([]);
                          field.onChange([]);
                        }
                      }}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-white/30 focus:outline-none"
                    />
                    {files.length > 0 && (
                      <p className="text-sm text-gray-400 mt-1">
                        Выбрано файлов: {files.length} (
                        {files.map((f) => f.name).join(", ")})
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                {isSubmitting
                  ? "Сохранение..."
                  : project
                  ? "Сохранить"
                  : "Создать"}
              </button>
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                Отмена
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
