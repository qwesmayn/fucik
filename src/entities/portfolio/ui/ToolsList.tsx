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
          className="px-[7.6px] sm:px-5 sm:py-[2.5px] py-[3px] rounded-[5px] border border-white/10"
        >
          <p className="font-light sm:text-lg text-xs">{tool}</p>
        </div>
      ))}
    </div>
  );
};
