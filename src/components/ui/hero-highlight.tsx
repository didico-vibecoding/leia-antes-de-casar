"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
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
    >
      {/* background dots */}
      <div className="absolute inset-0 opacity-40" style={dotPattern("hsl(var(--foreground) / 0.2)")} />

      {/* animated gradient light */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at center, hsl(var(--primary) / 0.35), transparent 60%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* animated floating gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 30% 30%, hsl(var(--accent) / 0.25), transparent 60%)",
        }}
        animate={{
          x: [-40, 40, -40],
          y: [-30, 30, -30],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
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
        duration: 1.6,
        ease: "linear",
        delay: 0.4,
      }}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline",
      }}
      className={cn(
        "relative inline-block rounded-lg bg-gradient-to-r from-primary/30 to-accent/40 px-2 pb-1 text-foreground",
        className,
      )}
    >
      {children}
    </motion.span>
  );
};
