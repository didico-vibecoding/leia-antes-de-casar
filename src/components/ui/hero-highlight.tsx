"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import React from "react";

export const HeroHighlight = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const dotPattern = (color: string) => ({
    backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
    backgroundSize: "16px 16px",
  });

  return (
    <div
      className={cn(
        "relative flex min-h-[calc(100vh-5rem)] w-full items-center justify-center overflow-hidden bg-background",
        containerClassName,
      )}
      onMouseMove={handleMouseMove}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={dotPattern("hsl(var(--foreground) / 0.22)")}
      />

      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          ...dotPattern("hsl(var(--primary))"),
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              220px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
          maskImage: useMotionTemplate`
            radial-gradient(
              220px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
        }}
      />

      <div className={cn("relative z-20 w-full", className)}>{children}</div>
    </div>
  );
};

export const Highlight = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.span
      initial={{
        backgroundSize: "0% 100%",
      }}
      animate={{
        backgroundSize: "100% 100%",
      }}
      transition={{
        duration: 1.4,
        ease: "linear",
        delay: 0.4,
      }}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline",
      }}
      className={cn(
        "relative inline-block rounded-lg bg-gradient-to-r from-primary/25 to-accent/40 px-2 pb-1 text-foreground",
        className,
      )}
    >
      {children}
    </motion.span>
  );
};
