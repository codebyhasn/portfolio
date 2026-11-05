import type { Transition, Variants } from "framer-motion";

/**
 * High-performance physics-based spring transitions
 * Dampened to prevent jarring oscillation while maintaining responsive punch
 */
export const SPRING_PUNCH: Transition = {
  type: "spring",
  damping: 24,
  stiffness: 260,
  mass: 0.8,
};

export const SPRING_SMOOTH: Transition = {
  type: "spring",
  damping: 28,
  stiffness: 200,
  mass: 1,
};

export const SPRING_GENTLE: Transition = {
  type: "spring",
  damping: 32,
  stiffness: 160,
  mass: 1.1,
};

/**
 * Re-trigger viewport configuration for bi-directional scroll mechanics.
 * Elements animate IN when reaching 20-25% threshold and cleanly reset when scrolling OUT.
 */
export const VIEWPORT_DEFAULT = {
  once: false,
  amount: 0.22,
  margin: "-40px",
} as const;

export const VIEWPORT_SECTION = {
  once: false,
  amount: 0.15,
  margin: "-60px",
} as const;

export const VIEWPORT_CARD = {
  once: false,
  amount: 0.2,
  margin: "-30px",
} as const;

/**
 * Standard upward reveal with spring physics
 */
export const revealUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
    scale: 0.98,
    transition: SPRING_PUNCH,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: SPRING_PUNCH,
  },
};

/**
 * 3D Perspective tilt variant for cards and bento cells
 */
export const perspective3DVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 36,
    rotateX: 12,
    scale: 0.94,
    transition: SPRING_PUNCH,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: SPRING_PUNCH,
  },
};

/**
 * Expanding scale reveal for cards and featured media
 */
export const scaleInVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
    y: 20,
    transition: SPRING_PUNCH,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: SPRING_PUNCH,
  },
};

/**
 * Staggered container for cascading child chips and items
 */
export const makeStaggerContainer = (
  stagger = 0.05,
  delayChildren = 0.08
): Variants => ({
  hidden: {
    opacity: 0,
    transition: {
      staggerChildren: stagger * 0.5,
      staggerDirection: -1,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

/**
 * Headline word-slide reveal variants
 */
export const wordMaskContainerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
};

export const wordSlideVariants: Variants = {
  hidden: {
    y: "115%",
    opacity: 0,
    rotateZ: 2,
  },
  visible: {
    y: "0%",
    opacity: 1,
    rotateZ: 0,
    transition: SPRING_PUNCH,
  },
};

