"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Heading from "@tiptap/extension-heading";

import "@/styles/editor.css";

const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
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

  return <EditorContent className="mt-16" editor={editor} />;
};

export default Editor;
