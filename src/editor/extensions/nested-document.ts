import { Node } from "@tiptap/pm/model";
import { Decoration, DecorationSet } from "@tiptap/pm/view";

function findDocuments(doc: Node, workspaceId: string): DecorationSet {
  const decorations: Decoration[] = [];

  doc.descendants((node, position) => {
    if (!node.text) {
      return;
    }

    let documentRegex = /\[\[(.*?)\]\]/g;
    Array.from(node.text.matchAll(documentRegex)).forEach((match) => {
      const matchStart = match.index || 0;
      const from = position + matchStart;
      const to = from + match[0].length;

      // TODO: delete the brackets from the title
      const link = Decoration.inline(from + 2, to - 2, {
        nodeName: "a",
        rel: "noopener noreferrer nofollow",
        target: "_blank",
        href: `/app/workspace/${workspaceId}/${match[1]}`,
      });
      decorations.push(link);

      decorations.push(
        Decoration.inline(from, from + 2, { class: "text-blue-200" }),
        Decoration.inline(to - 2, to, { class: "text-blue-200" }),
      );
    });
  });

  return DecorationSet.create(doc, decorations);
}

interface NestedDocumentOptions {
  workspaceId: string;
}

import { Extension } from "@tiptap/core";
import { Plugin } from "@tiptap/pm/state";

const NestedDocuments = Extension.create<NestedDocumentOptions>({
  name: "nestedDocuments",

  addOptions() {
    return {
      workspaceId: "",
    };
  },

  addProseMirrorPlugins() {
    const { workspaceId } = this.options;

    return [
      new Plugin({
        state: {
          init(_, { doc }) {
            return findDocuments(doc, workspaceId);
          },
          apply(transaction, oldState) {
            return transaction.docChanged
              ? findDocuments(transaction.doc, workspaceId)
              : oldState;
          },
        },
        props: {
          decorations(state) {
            return this.getState(state);
          },
        },
      }),
    ];
  },
});

export default NestedDocuments;
