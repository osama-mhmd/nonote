"use client";

import { useEffect, useMemo, useState } from "react";
import { createYooptaEditor } from "@yoopta/editor";
import Editor from "@/components/editor";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

let timeout: NodeJS.Timeout | null = null; // timeout for debouncing :: handleChange()

const Dashboard = () => {
  const editor = useMemo(() => createYooptaEditor(), []);
  const [saving, setSavingState] = useState(false);

  function saveContent() {
    const editorValue = editor.getEditorValue();

    localStorage.setItem("yoopta-content", JSON.stringify(editorValue));

    setSavingState(false); // remove spinner
  }

  function handleChange() {
    setSavingState(true); // set spinner

    // debouncing
    const t = 5000;
    if (!timeout) saveContent();
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(saveContent, t);
  }

  useEffect(() => {
    const contentFromLocalStorage = localStorage.getItem("yoopta-content");

    if (contentFromLocalStorage)
      editor.setEditorValue(JSON.parse(contentFromLocalStorage));

    editor.on("change", handleChange);
  }, []);

  return (
    <section>
      <div className="container pt-12">
        <div className="flex justify-end">
          {!saving && (
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 100 }}
            >
              <Button
                variant={"ghost"}
                className="flex gap-1 mb-3"
                disabled={true}
              >
                {/* <FileCheck /> */}
                <Check />
                Saved to local storage
              </Button>
            </motion.div>
          )}
          {saving && (
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 100 }}
            >
              <Button
                variant={"ghost"}
                className="flex gap-2 mb-3 items-center"
                disabled={true}
              >
                <span className="spinner"></span>
                Saving to local storage
              </Button>
            </motion.div>
          )}
        </div>
        <input
          className="text-5xl font-bold pb-4 focus:outline-0"
          placeholder="Type your page title..."
        />
        <Editor editor={editor} />
      </div>
    </section>
  );
};

export default Dashboard;
