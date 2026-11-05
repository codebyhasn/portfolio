"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { MotionConfig, motion, useScroll, useSpring } from "framer-motion";

interface AnimationContextValue {
  animationsEnabled: boolean;
}

const AnimationContext = createContext<AnimationContextValue>({
  animationsEnabled: true,
});

export function useAnimations() {
  return useContext(AnimationContext);
}

export function AnimationProvider({
  children,
  animationsEnabled = true,
}: {
  children: React.ReactNode;
  animationsEnabled?: boolean;
}) {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const shouldAnimate = animationsEnabled && !prefersReduced;

  return (
    <AnimationContext.Provider value={{ animationsEnabled: shouldAnimate }}>
      <MotionConfig reducedMotion={shouldAnimate ? "never" : "always"}>
        {shouldAnimate && <ScrollProgressBar />}
        {children}
      </MotionConfig>
    </AnimationContext.Provider>
  );
}

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-amber-600 dark:bg-amber-400 origin-left z-[100] will-change-transform shadow-[0_0_8px_rgba(217,119,6,0.5)]"
    />
  );
}

