import { FC } from "react";

interface ToolsListProps {
  tools: string[];
}

export const ToolsList: FC<ToolsListProps> = ({ tools }) => {
  return (
    <div className="flex flex-wrap gap-[10px]">
      {tools.map((tool, index) => (
        <div
          key={index}
          className="px-5 py-[5px] rounded-[5px] border border-white/10"
        >
          <p className="font-light text-lg">{tool}</p>
        </div>
      ))}
    </div>
  );
};
