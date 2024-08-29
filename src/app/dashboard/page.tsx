"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createYooptaEditor } from "@yoopta/editor";
import Editor from "@/components/editor";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

let timeout: NodeJS.Timeout | null = null; // timeout for debouncing :: handleChange()

const Dashboard = () => {
  const editor = useMemo(() => createYooptaEditor(), []);
  const [saving, setSavingState] = useState(false);
  const [title, setTitle] = useState(localStorage.getItem("title") ?? "");
  const titleRef = useRef(null);

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

  const changeTitle = (newTitle: string) => {
    localStorage.setItem("title", newTitle);
    setTitle(newTitle);
  };

  useEffect(() => {
    const contentFromLocalStorage = localStorage.getItem("yoopta-content");

    if (contentFromLocalStorage)
      editor.setEditorValue(JSON.parse(contentFromLocalStorage));

    editor.on("change", handleChange);

    if (titleRef.current)
      (titleRef.current as HTMLHeadingElement).innerHTML = title;
  }, []);

  return (
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
              <Check />
              Saved locally
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
              Saving locally
            </Button>
          </motion.div>
        )}
      </div>
      <h1
        contentEditable={true}
        ref={titleRef}
        onInput={(e) => changeTitle(e.currentTarget.innerHTML)}
        className={cn(
          "text-5xl text-wrap focus:outline-0 after:text-gray-400 after:cursor-text",
          title === "" ? 'after:content-["Page_title"]' : "after:content-none"
        )}
      ></h1>
      <Editor editor={editor} />
    </div>
  );
};

export default Dashboard;
