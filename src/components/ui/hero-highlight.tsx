<motion.span
  initial={{
    backgroundSize: "0% 100%",
  }}
  animate={{
    backgroundSize: ["0% 100%", "100% 100%", "100% 100%", "0% 100%"],
  }}
  transition={{
    duration: 4,
    ease: "easeInOut",
    repeat: Infinity,
    repeatDelay: 0.8,
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
</motion.span>;
