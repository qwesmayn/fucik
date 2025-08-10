"use client";

import { FC } from "react";
import { usePathname, useRouter } from "next/navigation";
import { pageConfig } from "@/shared/config/page.config";
import { CircleChevronLeft } from "lucide-react";

export const Header: FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return pathname === pageConfig.home ||
    pathname === pageConfig.login ||
    pathname === pageConfig.admin ? null : (
    <header className="w-full bg-[#070707]/25 text-center border-b border-white/10">
      <div className="flex items-center px-[66px] min-h-[67px]">
        <button
          className="cursor-pointer flex items-center gap-2"
          onClick={handleBack}
        >
          <CircleChevronLeft size={20} />
          <p className="text-lg font-light">Back</p>
        </button>
      </div>
    </header>
  );
};
