import { YooEditor } from "@yoopta/editor";
import YooptaEditor from "@yoopta/editor";
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

export default function Editor({ editor }: { editor: YooEditor }) {
  return (
    <YooptaEditor
      editor={editor}
      plugins={plugins}
      placeholder='Type "/" to browse options'
      tools={tools}
      marks={marks}
      width="full"
    />
  );
}
