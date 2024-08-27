"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import YooptaEditor, {
  createYooptaEditor,
  YooptaContentValue,
} from "@yoopta/editor";
import Paragraph from "@yoopta/paragraph";
import Blockquote from "@yoopta/blockquote";
import Embed from "@yoopta/embed";
import { HeadingOne, HeadingTwo, HeadingThree } from "@yoopta/headings";
import Image from "@yoopta/image";
import Link from "@yoopta/link";
import { BulletedList, NumberedList, TodoList } from "@yoopta/lists";
import Video from "@yoopta/video";
import According from "@yoopta/accordion";
import Callout from "@yoopta/callout";
import Code from "@yoopta/code";
import File from "@yoopta/file";

import "@/styles/yoopta.override.css";

import LinkTool, { DefaultLinkToolRender } from "@yoopta/link-tool";
import ActionMenu, { DefaultActionMenuRender } from "@yoopta/action-menu-list";
import Toolbar, { DefaultToolbarRender } from "@yoopta/toolbar";

import {
  Bold,
  Italic,
  CodeMark,
  Underline,
  Strike,
  Highlight,
} from "@yoopta/marks";
import { Button } from "@/components/ui/button";
import { FileCheck } from "lucide-react";

const marks = [Bold, Italic, CodeMark, Underline, Strike, Highlight];

const tools = {
  Toolbar: {
    tool: Toolbar,
    render: DefaultToolbarRender,
  },
  ActionMenu: {
    tool: ActionMenu,
    render: DefaultActionMenuRender,
  },
  LinkTool: {
    tool: LinkTool,
    render: DefaultLinkToolRender,
  },
};

const plugins = [
  Paragraph,
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  Blockquote,
  Embed,
  Image,
  Link,
  BulletedList,
  NumberedList,
  TodoList,
  Video,
  According,
  Callout,
  Code,
  File,
];

const Editor = () => {
  const editor = useMemo(() => createYooptaEditor(), []);
  const [saving, setSavingState] = useState(false);

  function handleChange() {
    setSavingState(true); // set spinner

    const editorContent = editor.getEditorValue();

    localStorage.setItem("yoopta-content", JSON.stringify(editorContent));

    setSavingState(false); // end spinner
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
        {!saving && (
          <Button variant={"ghost"} className="flex gap-1 mb-3" disabled={true}>
            <FileCheck />
            Saved to local storage
          </Button>
        )}
        {saving && (
          <Button
            variant={"ghost"}
            className="flex gap-1 mb-3 items-center"
            disabled={true}
          >
            Saving to local storage
            <span className="spinner"></span>
          </Button>
        )}
        <input
          className="text-5xl font-bold pb-4 focus:outline-0"
          placeholder="Type your page title..."
        />
        <YooptaEditor
          editor={editor}
          plugins={plugins}
          placeholder='Type "/" to browse options'
          tools={tools}
          marks={marks}
          width="full"
        />
      </div>
    </section>
  );
};

export default Editor;
