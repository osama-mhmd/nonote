"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Heading from "@tiptap/extension-heading";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import "@/styles/editor.css";
import { saveDocument } from "@/db/documents-actions/save-document";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

async function updateDocument(
  document_id: string,
  workspace_id: string,
  content: string,
  title: string,
) {
  const status = await saveDocument(document_id, workspace_id, content, title);

  return status;
}

// debouncing
let timeout: NodeJS.Timeout | null = null;
const debouncingDuration = 5000;

interface EditorSchema {
  isEditable?: boolean;
  defaultDocumentContent?: string;
  defaultDocumentTitle?: string;
  document_id: string;
  workspace_id: string;
}

const Editor = ({
  isEditable = true,
  defaultDocumentTitle = "",
  defaultDocumentContent = "",
  document_id,
  workspace_id,
}: EditorSchema) => {
  const [saving, setSavingStatus] = useState(false);
  const [title, setTitle] = useState(defaultDocumentTitle);
  const [content, setContent] = useState(defaultDocumentContent);

  function update() {
    setSavingStatus(true);

    if (timeout) clearTimeout(timeout);
    console.log(title, content);
    timeout = setTimeout(() => {
      updateDocument(document_id, workspace_id, content, title);
      setSavingStatus(false);
    }, debouncingDuration);
  }

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
        placeholder: "Untitled Document",
      }),
    ],
    immediatelyRender: false,
    content: defaultDocumentTitle ? defaultDocumentTitle : "<h1></h1>",
    onUpdate: async ({ editor }) => {
      const content = editor.getHTML();

      if (content == "<p></p>") {
        editor.commands.setNode("heading", { level: 1 });
      }

      setTitle(editor.getHTML());
      update();
    },
    editable: isEditable,
  });

  const documentEditor = useEditor({
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
    content: defaultDocumentContent,
    immediatelyRender: false,
    onUpdate: async ({ editor }) => {
      setSavingStatus(true);

      setContent(editor.getHTML());
      update();
    },
  });

  return (
    <>
      <div className="absolute top-4 right-4">
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
              <RefreshCw width={20} height={20} />
              Synced
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
              Syncing
            </Button>
          </motion.div>
        )}
      </div>
      <EditorContent className="mt-16" editor={titleEditor} />
      <EditorContent editor={documentEditor} />
    </>
  );
};

export default Editor;
