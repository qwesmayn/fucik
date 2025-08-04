"use client";

import { FC, useEffect, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

export const ButtonUpDown: FC = () => {
  const [showUpButton, setShowUpButton] = useState(false);
  const [showDownButton, setShowDownButton] = useState(true);

  useEffect(() => {
    const handleVisibility = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight;
      
      setShowUpButton(scrollY > windowHeight / 2);
      
      setShowDownButton(scrollY < windowHeight / 2 && scrollY + windowHeight < documentHeight - 50);
    };

    window.addEventListener("scroll", handleVisibility);
    handleVisibility();

    return () => {
      window.removeEventListener("scroll", handleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showUpButton && (
        <button
          onClick={scrollToTop}
          className="fixed cursor-pointer right-[5%] bottom-[5%] z-50 bg-white/5 hover:bg-white/10 transition-colors duration-300 border border-white/10 rounded-full p-2 backdrop-blur-3xl"
          aria-label="Scroll to top"
        >
          <ArrowUp />
        </button>
      )}
      {showDownButton && (
        <button
          onClick={scrollToBottom}
          className="fixed cursor-pointer right-[5%] bottom-[5%] z-50 bg-white/5 hover:bg-white/10 transition-colors duration-300 border border-white/10 rounded-full p-2 backdrop-blur-3xl"
          aria-label="Scroll to bottom"
        >
          <ArrowDown />
        </button>
      )}
    </>
  );
};
