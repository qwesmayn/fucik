import { FC } from "react";
import { ToolsList } from "@/entities/portfolio";

interface AboutProjectProps {
  title: string;
  description: string;
  tools: string[];
}

export const AboutProject: FC<AboutProjectProps> = ({
  title,
  description,
  tools,
}) => {
  return (
    <div className="flex flex-col gap-[39px] max-w-[593px]">
      <h2 className="font-outfit text-[32px] font-medium">{title}</h2>
      <p className="text-lg font-light text-white/50">{description}</p>
      <ToolsList tools={tools} />
    </div>
  );
};
