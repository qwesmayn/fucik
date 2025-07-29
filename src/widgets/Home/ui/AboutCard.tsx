import { cn } from "@/shared/lib/utils";
import { FC } from "react";

interface AboutCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export const AboutCard: FC<AboutCardProps> = ({
  title,
  description,
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "space-y-[39px] pb-[39px] border-b border-white/10 max-w-[593px] w-full",
        className
      )}
    >
      <div>
        <h3 className="text-[34px] font-medium font-outfit">{title}</h3>
      </div>
      {children ? (
        <div className="flex flex-wrap gap-[5px]">{children}</div>
      ) : (
        <div>
          <p className="text-white/50 font-light text-lg">{description}</p>
        </div>
      )}
    </div>
  );
};
