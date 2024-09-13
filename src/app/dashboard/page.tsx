"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Heading from "@tiptap/extension-heading";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import "@/styles/editor.css";

const Editor = () => {
  const titleEditor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Heading.extend({
        addKeyboardShortcuts() {
          return {
            Enter: () => true,
          };
        },
      }).configure({
        levels: [1],
      }),
      Placeholder.configure({
        placeholder: "Untitled Page",
      }),
    ],
    immediatelyRender: false,
    content: "<h1></h1>",
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();

      if (content == "<p></p>") {
        editor.commands.setNode("heading", { level: 1 });
      }
    },
  });

  const pageEditor = useEditor({
    extensions: [
      StarterKit,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Placeholder.configure({
        placeholder: "Start writing here...",
      }),
    ],
    immediatelyRender: false,
  });

  return (
    <>
      <EditorContent className="mt-16" editor={titleEditor} />
      <EditorContent editor={pageEditor} />
    </>
  );
};

export default Editor;
