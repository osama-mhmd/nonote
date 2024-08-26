"use client";

import { Edit } from "lucide-react";
import {
  EditorBubble,
  EditorBubbleItem,
  EditorCommand,
  EditorCommandItem,
  EditorContent,
  EditorRoot,
} from "novel";

export default function Dashboard() {
  return (
    <main>
      <div className="fixed top-6 left-1/2 -translate-x-1/2 flex gap-6 drop-shadow-lg bg-white p-4 rounded-md border-muted border">
        <Edit />
      </div>
      <div className="container mt-14">
        <EditorRoot>
          <EditorContent>
            <EditorCommand>
              <EditorCommandItem onCommand={() => console.log("tte")} />
            </EditorCommand>
          </EditorContent>
        </EditorRoot>
      </div>
    </main>
  );
}
