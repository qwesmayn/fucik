import { FC } from "react";
import { cn } from "@/shared/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  asChild?: boolean;
}

export const Button: FC<ButtonProps> = ({ className, children, asChild, ...props }) => {
  return (
    <button 
      {...props}
      className={cn("flex items-center justify-center gap-2 h-[30px] sm:h-[52px] w-[111px] sm:w-[189px] rounded-[5px] text-white cursor-pointer transition-colors duration-300", className)}
    >
      {children}
    </button>
  );
};
