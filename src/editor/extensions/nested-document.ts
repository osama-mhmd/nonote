import { Node } from "@tiptap/pm/model";
import { Decoration, DecorationSet } from "@tiptap/pm/view";

function findDocuments(doc: Node): DecorationSet {
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
      const link = Decoration.inline(from, to, {
        nodeName: "a",
        rel: "noopener noreferrer nofollow",
        target: "_blank",
        href: "/api/documents/" + match[1],
      });
      decorations.push(link);
    });
  });

  return DecorationSet.create(doc, decorations);
}

import { Extension } from "@tiptap/core";
import { Plugin } from "@tiptap/pm/state";

const NestedDocuments = Extension.create({
  name: "nestedDocuments",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        state: {
          init(_, { doc }) {
            return findDocuments(doc);
          },
          apply(transaction, oldState) {
            return transaction.docChanged
              ? findDocuments(transaction.doc)
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
