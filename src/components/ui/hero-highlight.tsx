import React from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

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
      className={cn("group relative flex min-h-[28rem] w-full items-center justify-center overflow-hidden bg-background", containerClassName)}
      onMouseMove={handleMouseMove}
    >
      <div className="pointer-events-none absolute inset-0 opacity-35" style={dotPattern("hsl(var(--muted-foreground) / 0.32)")} />
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              380px circle at ${mouseX}px ${mouseY}px,
              hsl(var(--primary) / 0.18),
              transparent 80%
            )
          `,
        }}
      />
      <div className={cn("relative z-10 mx-auto w-full max-w-5xl px-4", className)}>{children}</div>
    </div>
  );
};

export const Highlight = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.span
      initial={{ backgroundSize: "0% 100%" }}
      animate={{ backgroundSize: "100% 100%" }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className={cn(
        "relative inline-block rounded-sm bg-gradient-to-r from-accent to-accent bg-no-repeat px-1 pb-1 text-accent-foreground",
        className,
      )}
      style={{ backgroundPosition: "left bottom" }}
    >
      {children}
    </motion.span>
  );
};