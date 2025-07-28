import { FC } from "react";
import { cn } from "@/shared/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: FC<ButtonProps> = ({ className, children, ...props }) => {
  return (
    <button
      {...props}
      className={cn("h-[52px] w-[189px] rounded-[5px] text-white cursor-pointer transition-colors duration-300", className)}
    >
      {children}
    </button>
  );
};
