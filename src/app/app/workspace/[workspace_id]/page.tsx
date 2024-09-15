import { getRootDocument } from "@/db/documents-actions/get-document";
import permissionLayer from "./permission-layer";
import Editor from "@/app/app/workspace/[workspace_id]/editor";
import createDocument from "@/db/documents-actions/create";

export function generateMetadata({ params }: { params: any }) {
  return {
    title: params.workspace_id,
  };
}

const Space = ({ params }: { params: { workspace_id: string } }) => {
  return permissionLayer(params.workspace_id, async (permission) => {
    let rootDocument = await getRootDocument(params.workspace_id);

    if (!rootDocument) {
      const process = await createDocument(params.workspace_id);
      if (!process.ok) alert(process.message);

      return <p>We are so sorry, please refresh the page</p>;
    }

    return (
      <div>
        <Editor
          isEditable={permission == "owner" || permission == "edit"}
          defaultDocumentTitle={rootDocument.title ?? ""}
          defaultDocumentContent={rootDocument.content ?? ""}
          workspace_id={params.workspace_id}
          document_id={rootDocument.id}
        />
      </div>
    );
  });
};

export default Space;
