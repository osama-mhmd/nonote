import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function BackDrop({
  children,
  closePanel,
}: {
  children: ReactNode;
  closePanel: () => void;
}) {
  return (
    <motion.div
      className="absolute px-3 top-0 left-0 w-full h-full bg-black/50 z-[25] flex items-center justify-center"
      onClick={closePanel}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
