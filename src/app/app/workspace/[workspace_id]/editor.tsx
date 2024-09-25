"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Heading from "@tiptap/extension-heading";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Hightlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import "@/styles/editor.css";
import { saveDocument } from "@/db/documents-actions/save-document";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Comments, {
  CommentInterface,
  CustomCommentInterface,
} from "@/editor/extensions/comment";
import { User } from "lucia";

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
  user: User;
}

const Editor = ({
  isEditable = true,
  defaultDocumentTitle = "",
  defaultDocumentContent = "",
  document_id,
  workspace_id,
  user,
}: EditorSchema) => {
  const [saving, setSavingStatus] = useState(false);
  const [title, setTitle] = useState(defaultDocumentTitle);
  const [content, setContent] = useState(defaultDocumentContent);
  const [comments, setComments] = useState<string[]>([]);

  function update(changeType: "title" | "content", change: string) {
    setSavingStatus(true);

    // the next following lines are written because when modifying title state
    // the last change in the title is not made to update, so we should get the change
    let contentToBe = content;
    let titleToBe = title;

    if (changeType == "title") titleToBe = change;
    if (changeType == "content") contentToBe = change;

    if (timeout) clearTimeout(timeout);
    console.log(title, content);
    timeout = setTimeout(() => {
      updateDocument(document_id, workspace_id, contentToBe, titleToBe);
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
      Typography,
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
      update("title", editor.getHTML());
    },
    editable: isEditable,
  });

  const documentEditor = useEditor({
    extensions: [
      StarterKit,
      TaskList,
      TaskItem,
      Hightlight,
      Typography,
      Comments.configure({
        user: {
          name: user.fullname,
        },
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
      update("content", editor.getHTML());
    },
    onSelectionUpdate: ({ editor }) => {
      setComments([]);

      const commentId = editor.getAttributes("comment").comment_id;

      if (commentId) {
        const threadComments = editor.storage.comment.comments.filter(
          (thread: CustomCommentInterface) => thread.threadId === commentId,
        )[0].comments;

        console.log(threadComments);

        const commentsContext = threadComments.map(
          (comment: CommentInterface) => comment.comment,
        );

        if (commentsContext.length) {
          setComments(commentsContext);
        }
      }
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
      <Button
        onClick={() => {
          documentEditor!.commands.addComments({
            comment: "This is a comment",
            parent_id: null,
          });
        }}
      >
        Add Comment
      </Button>
      <aside>
        {comments.map((comment, index) => (
          <div key={index}>{comment}</div>
        ))}
      </aside>
    </>
  );
};

export default Editor;
