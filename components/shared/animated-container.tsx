"use client";

import { motion } from "motion/react";
import { pageVariants } from "@/lib/animations";

export function AnimatedContainer({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
