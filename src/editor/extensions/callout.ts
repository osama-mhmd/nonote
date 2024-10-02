import { Node, mergeAttributes } from "@tiptap/core";
import { textblockTypeInputRule } from "@tiptap/core";

const Callout = Node.create({
  name: "callout",

  group: "block",

  content: "inline*",

  addAttributes() {
    return {
      type: {
        default: "success",
        parseHTML: (element) => element.getAttribute("data-type") || "success",
        renderHTML: (attributes) => ({
          "data-type": attributes.type,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div.callout",
        getAttrs: (dom) => {
          const type = dom.getAttribute("data-type") || "success";
          return { type };
        },
        contentElement: "div.content",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const type = HTMLAttributes["data-type"];
    const className =
      type === "error"
        ? "callout error"
        : type === "info"
          ? "callout info"
          : "callout success";

    const emoji = type === "error" ? "❌" : type === "info" ? "💡" : "✅";

    // Emoji and content wrapped separately for correct parsing
    return [
      "div",
      mergeAttributes(HTMLAttributes, { class: className }),
      ["span", { class: "emoji" }, emoji], // Emoji
      ["div", { class: "content" }, 0], // Content
    ];
  },

  addInputRules() {
    return [
      // Input rule for success callout (!s followed by space)
      textblockTypeInputRule({
        find: /!s\s$/,
        type: this.type,
        getAttributes: () => ({ type: "success" }),
      }),
      // Input rule for error callout (!e followed by space)
      textblockTypeInputRule({
        find: /!e\s$/,
        type: this.type,
        getAttributes: () => ({ type: "error" }),
      }),
      // Input rule for info callout (!i followed by space)
      textblockTypeInputRule({
        find: /!i\s$/,
        type: this.type,
        getAttributes: () => ({ type: "info" }),
      }),
    ];
  },
});

export default Callout;
