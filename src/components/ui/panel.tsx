"use client";

import { ReactNode, useState, createContext, useContext } from "react";
import BackDrop from "./backdrop";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface VisibilityContext {
  visible: boolean;
  setVisibility: (arg0: boolean) => void;
}

const VisibilityContext = createContext<VisibilityContext | undefined>(
  undefined,
);

export interface HaveChild {
  children?: ReactNode;
}

export function PanelTrigger({ children }: HaveChild) {
  const visibilityContext = useContext(VisibilityContext);

  return (
    <div onClick={() => visibilityContext?.setVisibility(true)}>{children}</div>
  );
}

export function PanelBody({ children }: HaveChild) {
  const visibilityContext = useContext(VisibilityContext);

  return (
    <AnimatePresence>
      {visibilityContext?.visible && (
        <BackDrop closePanel={() => visibilityContext?.setVisibility(false)}>
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-md p-4 w-full max-w-2xl"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col gap-3">{children}</div>
          </motion.div>
        </BackDrop>
      )}
    </AnimatePresence>
  );
}

export function PanelHeader({ children }: HaveChild) {
  const visibilityContext = useContext(VisibilityContext);

  return (
    <div className="flex justify-between">
      {children}
      <button
        onClick={() => visibilityContext?.setVisibility(false)}
        className="text-xl cursor-pointer p-1 px-2 rounded-full bg-gray-100"
      >
        <X size={20} />
      </button>
    </div>
  );
}

export function Panel({ children }: HaveChild) {
  const [visible, setVisibility] = useState(false);

  return (
    <VisibilityContext.Provider
      value={{
        visible,
        setVisibility,
      }}
    >
      {children}
    </VisibilityContext.Provider>
  );
}

/**
 * Anatomy:
 * <Panel>
 *  <PanelTrigger><Button>Show Settings</Button></PanelTrigger>
 *  <PanelBody>
 *    <PanelHeader>Settings</PanelHeader>
 *    <PanelContent>{// here is your content \\}</PanelContent>
 *  </PanelBody>
 * </Panel>
 */
