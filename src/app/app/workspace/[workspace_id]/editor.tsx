"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Heading from "@tiptap/extension-heading";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import "@/styles/editor.css";
import { saveDocument } from "@/db/documents-actions/save-document";

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

      console.log(editor.getHTML());

      const status = await saveDocument(
        document_id,
        workspace_id,
        "",
        editor.getHTML(),
      );
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
      const status = await saveDocument(
        document_id,
        workspace_id,
        editor.getHTML(),
      );
    },
  });

  return (
    <>
      <EditorContent className="mt-16" editor={titleEditor} />
      <EditorContent editor={documentEditor} />
    </>
  );
};

export default Editor;
