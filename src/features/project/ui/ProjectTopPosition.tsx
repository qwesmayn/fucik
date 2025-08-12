import { PortfolioCard } from "@/entities/portfolio";
import { IProject } from "@/entities/portfolio/model/IProject.interface";
import { FC, useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useQuery } from "@tanstack/react-query";
import { getLatestProjects } from "@/entities/portfolio/api/getLatestProjects";

interface SortableProjectCardProps {
  project: IProject;
  index: number;
}

const SortableProjectCard: FC<SortableProjectCardProps> = ({
  project,
  index,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing"
    >
      <PortfolioCard
        key={project.id}
        projectId={project.id}
        image={
          project.coverImage
            ? process.env.NEXT_PUBLIC_IMG + project.coverImage
            : "https://placehold.co/875x321"
        }
        title={project.title}
        tools={project.technologies}
        index={index}
      />
    </div>
  );
};

interface ProjectTopPositionProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateOrder: (projects: IProject[]) => void;
}

export const ProjectTopPosition: FC<ProjectTopPositionProps> = ({
  isOpen,
  onClose,
  onUpdateOrder,
}) => {
  const topProjects = useQuery({
    queryKey: ["topProjects"],
    queryFn: getLatestProjects,
  });

  const [localProjects, setLocalProjects] = useState<IProject[]>(
    topProjects.data || []
  );

  useEffect(() => {
    if (!isOpen) {
      setLocalProjects(topProjects.data || []);
    }
  }, [topProjects.data, isOpen]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setLocalProjects((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        const newOrder = arrayMove(items, oldIndex, newIndex);

        const updatedProjects = newOrder.map((project, index) => ({
          ...project,
          position: index + 1,
        }));

        return updatedProjects;
      });
    }
  };

  const handleSaveOrder = () => {
    onUpdateOrder(localProjects);
    onClose();
  };

  const column1 = localProjects.slice(0, Math.ceil(localProjects.length / 2));
  const column2 = localProjects.slice(Math.ceil(localProjects.length / 2));

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex justify-center py-10">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={localProjects.map((p) => p.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex items-start gap-[50px] max-w-[1280px] mx-auto w-full p-4 bg-white/10 backdrop-blur-xl border border-white/10 rounded-lg overflow-y-auto">
            <div className="grid grid-cols-1 w-full">
              {column1.map((item, index) => (
                <SortableProjectCard
                  key={item.id}
                  project={item}
                  index={index + 1}
                />
              ))}
            </div>
            <div className="grid grid-cols-1 w-full">
              {column2.map((item, index) => (
                <SortableProjectCard
                  key={item.id}
                  project={item}
                  index={column1.length + index + 1}
                />
              ))}
            </div>
          </div>
        </SortableContext>
      </DndContext>
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex mb-4 gap-2">
        <button
          onClick={handleSaveOrder}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
        >
          Сохранить порядок
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
        >
          Отменить
        </button>
      </div>
    </div>
  );
};
