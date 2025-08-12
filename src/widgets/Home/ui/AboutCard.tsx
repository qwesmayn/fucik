import { cn } from "@/shared/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FC, useRef } from "react";

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
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ref.current,
      {
        scaleX: 0,
      },
      {
        scaleX: 1,
        duration: 2,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
          toggleActions: "play complete none reset",
        },
      }
    );
  });

  return (
    <div
      className={cn(
        "relative sm:pb-[39px] pb-5 max-w-[593px] w-full",
        className
      )}
      {...props}
    >
      <div className="sm:mb-[39px] mb-5">
        <h3 className="sm:text-[34px] text-xl font-medium font-outfit">{title}</h3>
      </div>
      {children ? (
        <div className="flex flex-wrap gap-[5px]">{children}</div>
      ) : (
        <div>
          <p className="text-white/50 font-light sm:text-lg text-xs">{description}</p>
        </div>
      )}
      <div
        ref={ref}
        className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10"
      />
    </div>
  );
};
