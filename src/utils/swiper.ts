import { useEffect, useRef } from "react";
import type { Swiper } from "swiper/types";

export default function useSwiperKeyboardControl() {
  const containerRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<Swiper | null>(null);

  const registerSwiper = (swiper: Swiper) => {
    swiperRef.current = swiper;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const enableKeyboard = () => swiperRef.current?.keyboard?.enable();
    const disableKeyboard = () => swiperRef.current?.keyboard?.disable();

    container.addEventListener("focusin", enableKeyboard, true);
    container.addEventListener("focusout", disableKeyboard, true);

    return () => {
      container.removeEventListener("focusin", enableKeyboard, true);
      container.removeEventListener("focusout", disableKeyboard, true);
    };
  }, []);

  return { containerRef, registerSwiper };
}
