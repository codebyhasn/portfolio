"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import { useAnimations } from "./animation-provider";
import {
  SPRING_PUNCH,
  VIEWPORT_DEFAULT,
  VIEWPORT_CARD,
  perspective3DVariants,
  makeStaggerContainer,
  wordMaskContainerVariants,
  wordSlideVariants,
} from "@/lib/animations";

/* =========================================================================
   1. ScrollReveal: Bi-directional spring upward reveal
   ========================================================================= */
interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  yOffset?: number;
  scaleOffset?: number;
  className?: string;
  amount?: number;
}

export function ScrollReveal({
  children,
  delay = 0,
  yOffset = 28,
  scaleOffset = 0.98,
  className = "",
  amount = 0.2,
  ...props
}: ScrollRevealProps) {
  const { animationsEnabled } = useAnimations();

  if (!animationsEnabled) {
    return <div className={className}>{children}</div>;
  }

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: yOffset,
      scale: scaleOffset,
      transition: SPRING_PUNCH,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        ...SPRING_PUNCH,
        delay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount, margin: "-40px" }}
      variants={variants}
      className={`will-change-[transform,opacity] ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* =========================================================================
   2. PerspectiveReveal: 3D X-Axis Tilt for Bento Cells and Feature Cards
   ========================================================================= */
export function PerspectiveReveal({
  children,
  className = "",
  amount = 0.18,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  amount?: number;
} & HTMLMotionProps<"div">) {
  const { animationsEnabled } = useAnimations();

  if (!animationsEnabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div style={{ perspective: "1200px" }} className="w-full">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount, margin: "-30px" }}
        variants={perspective3DVariants}
        style={{ transformStyle: "preserve-3d" }}
        className={`will-change-[transform,opacity] ${className}`}
        {...props}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* =========================================================================
   3. StaggerContainer & StaggerItem: Cascading waves with reset logic
   ========================================================================= */
export function StaggerContainer({
  children,
  stagger = 0.06,
  delayChildren = 0.08,
  className = "",
  amount = 0.15,
  ...props
}: {
  children: React.ReactNode;
  stagger?: number;
  delayChildren?: number;
  className?: string;
  amount?: number;
} & HTMLMotionProps<"div">) {
  const { animationsEnabled } = useAnimations();

  if (!animationsEnabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount, margin: "-40px" }}
      variants={makeStaggerContainer(stagger, delayChildren)}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  yOffset = 20,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
} & HTMLMotionProps<"div">) {
  const { animationsEnabled } = useAnimations();

  if (!animationsEnabled) {
    return <div className={className}>{children}</div>;
  }

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: yOffset,
      scale: 0.96,
      transition: SPRING_PUNCH,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: SPRING_PUNCH,
    },
  };

  return (
    <motion.div
      variants={variants}
      className={`will-change-[transform,opacity] ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* =========================================================================
   4. TextReveal: Split-word slide up from overflow-hidden mask
   ========================================================================= */
export function TextReveal({
  text,
  className = "",
  wordClassName = "",
  as = "h1",
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}) {
  const { animationsEnabled } = useAnimations();
  const words = text.split(" ");

  if (!animationsEnabled) {
    const Tag = as;
    return <Tag className={className}>{text}</Tag>;
  }

  const MotionTag = motion[as];

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.25, margin: "-30px" }}
      variants={wordMaskContainerVariants}
      className={`flex flex-wrap items-baseline gap-x-[0.28em] ${className}`}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-1 -mb-1">
          <motion.span
            variants={wordSlideVariants}
            className={`inline-block ${wordClassName}`}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/* =========================================================================
   5. SpotlightCard: Interactive mouse-following radial spotlight border
   ========================================================================= */
interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
  className?: string;
}

export function SpotlightCard({
  children,
  spotlightColor = "rgba(107, 31, 173, 0.18)",
  className = "",
  ...props
}: SpotlightCardProps) {
  const { animationsEnabled } = useAnimations();
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || !animationsEnabled) return;
      const rect = cardRef.current.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setOpacity(1);
    },
    [animationsEnabled]
  );

  const handleMouseLeave = useCallback(() => {
    setOpacity(0);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-2xl ${className}`}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Overlay */}
      {animationsEnabled && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-2xl z-10"
          style={{
            opacity,
            background: `radial-gradient(550px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 75%)`,
          }}
        />
      )}
      {children}
    </div>
  );
}
