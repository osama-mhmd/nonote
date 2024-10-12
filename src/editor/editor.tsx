"use client";

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Heading from "@tiptap/extension-heading";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Hightlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import "@/styles/editor.css";
import { saveDocument } from "@/db/actions/documents/save-document";
import { motion } from "framer-motion";
import { MessageSquareMore, RefreshCw, Reply } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import Comments, {
  CommentInterface,
  CustomCommentInterface,
} from "@/editor/extensions/comment";
import { User } from "lucia";
import { saveDocumentComments } from "@/db/actions/documents/save-comments";
import { Document } from "@/db/actions/documents/get-document";
import { Permission } from "@/db/actions/workspaces/permission";
import Loading from "@/app/loading";
import Image from "@tiptap/extension-image";
import NestedDocuments from "@/editor/extensions/nested-document";
import Link from "@tiptap/extension-link";
import { toast } from "sonner";
import Callout from "./extensions/callout";

async function updateDocument(
  document_id: string,
  workspace_id: string,
  content: string | null,
  title: string | null,
) {
  const status = await saveDocument(
    document_id,
    workspace_id,
    content ?? "",
    title ?? "",
  );

  return status;
}

// debouncing
let timeout: NodeJS.Timeout | null = null;
const debouncingDuration = 5000;

interface EditorSchema {
  document: Document;
  permission: Permission;
  workspace_id: string;
  user: User;
}

const Editor = ({
  permission,
  document: {
    content: defaultDocumentContent,
    title: defaultDocumentTitle,
    id: document_id,
    comments: editorComments,
  },
  workspace_id,
  user,
}: EditorSchema) => {
  const [saving, setSavingStatus] = useState(false);
  const [title, setTitle] = useState(defaultDocumentTitle);
  const [content, setContent] = useState(defaultDocumentContent);
  const [comments, setComments] = useState<CommentInterface[]>([]);
  const [isLoading, setLoading] = useState(true);

  // permission checks
  const canEdit = useMemo(
    () => permission == "owner" || permission == "edit",
    [permission],
  );
  const canComment = useMemo(() => {
    return (
      permission == "owner" || permission == "edit" || permission == "comment"
    );
  }, [permission]);

  useEffect(() => {
    if (content == defaultDocumentContent && title == defaultDocumentTitle) {
      return;
    }

    setSavingStatus(true);

    if (timeout) clearTimeout(timeout);

    console.log(title, content);

    timeout = setTimeout(async () => {
      const result = await updateDocument(
        document_id,
        workspace_id,
        content,
        title,
      );
      if (!result) toast.error("You cannot edit 😞");
      setSavingStatus(false);
    }, debouncingDuration);
  }, [content, title]);

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
    },
    editable: canEdit,
  });

  const documentEditor = useEditor({
    extensions: [
      StarterKit,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Hightlight,
      Typography,
      Comments.configure({
        user: {
          fullname: user.fullname,
          username: user.username,
        },
      }),
      Placeholder.configure({
        placeholder: "Start writing here...",
      }),
      Image.extend({
        addKeyboardShortcuts() {
          return {
            "Mod-o": () => {
              const url = window.prompt("URL");

              if (url) {
                this.editor.chain().focus().setImage({ src: url }).run();
              }

              return true;
            },
          };
        },
      }),
      Link.configure({
        defaultProtocol: "https",
      }),
      NestedDocuments.configure({
        workspaceId: workspace_id,
      }),
      Callout,
    ],
    content: defaultDocumentContent,
    immediatelyRender: false,
    onUpdate: async ({ editor }) => {
      setSavingStatus(true);

      setContent(editor.getHTML());
    },
    onSelectionUpdate: ({ editor }) => {
      setComments([]);

      const commentId = editor.getAttributes("comment").comment_id;

      if (commentId) {
        const threadComments = editor.storage.comment.comments.filter(
          (thread: CustomCommentInterface) => thread.threadId === commentId,
        )[0].comments;

        console.log(editor.storage.comment);

        setComments(threadComments);
      }
    },
    onCreate: ({ editor }) => {
      setLoading(false);
      if (editorComments)
        editor.storage.comment.comments = JSON.parse(editorComments);
    },
    editable: canEdit,
  });

  async function addComment(parent_id?: string, comment?: string) {
    const comment_content = comment
      ? comment
      : (prompt("What is your comment?") ?? "no-comment");

    documentEditor!.commands.addComments({
      comment: comment_content,
      parent_id: parent_id ?? null,
    });
    const result = await saveDocumentComments(
      JSON.stringify(documentEditor!.storage.comment.comments),
      workspace_id,
      document_id,
    );

    if (!result) toast.error("You cannot comment 😞");
  }

  if (isLoading) return <Loading />;

  return (
    <div className="relative max-w-4xl mx-auto px-4 mt-8">
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
      {documentEditor && canComment && (
        // TODO: fix, the bubble menu will not show when the selection is empty
        // if the user selects a text and then clicked on the text!!!
        <BubbleMenu
          shouldShow={({ state }) => !state.selection.empty}
          editor={documentEditor}
        >
          <div
            className="bg-white rounded-md px-2 py-1 border cursor-pointer"
            onClick={() => addComment()}
          >
            <MessageSquareMore size={20} />
          </div>
        </BubbleMenu>
      )}
      <EditorContent editor={titleEditor} />
      <EditorContent editor={documentEditor} />
      {comments.length > 0 && (
        <aside className="absolute flex flex-col gap-2 bg-white border rounded-md p-4 top-0 right-4 w-full max-w-sm">
          {comments.map((comment, index) => (
            <div key={index} className="rounded-md p-2 border-2">
              <div className="flex justify-between">
                <label>
                  {comment.user.fullname}{" "}
                  <span className="text-muted-foreground">
                    @{comment.user.username}
                  </span>
                </label>
                {canComment && (
                  <Reply
                    className="cursor-pointer"
                    onClick={() => addComment(comment.uuid!)}
                    size={20}
                  />
                )}
              </div>
              {comment.parent_id && (
                <p className="my-2 pl-2 border-l-2 border-gray-600 text-gray-600">
                  {comment.parent_title}
                </p>
              )}
              <p className="my-2">{comment.comment}</p>
              <div>
                <DisplayDate date={comment.date} />
              </div>
            </div>
          ))}
        </aside>
      )}
    </div>
  );
};

const DisplayDate = ({ date: _date }: { date: number | null }) => {
  if (!_date) return null;

  const $d = (d: number) => String(d).padStart(2, "0");

  const date: Date = new Date(_date);

  return (
    <div className="flex gap-2 items-center">
      {$d(date.getDate())}/{$d(date.getMonth() + 1)}/{date.getFullYear()} -{" "}
      {$d(date.getHours())}:{$d(date.getMinutes())}
    </div>
  );
};

export default Editor;
