import { getRootDocument } from "@/db/documents-actions/get-document";
import permissionLayer from "./permission-layer";
import Editor from "@/app/app/workspace/[workspace_id]/editor";
import createDocument from "@/db/documents-actions/create";

const Space = ({ params }: { params: { workspace_id: string } }) => {
  return permissionLayer(params.workspace_id, async (permission) => {
    let rootDocument = await getRootDocument(params.workspace_id);

    if (!rootDocument) {
      const process = await createDocument(params.workspace_id);
      if (!process.ok) alert(process.message);
    }

    return (
      <div>
        <Editor
          isEditable={permission == "owner" || permission == "edit"}
          defaultDocumentTitle={rootDocument?.title ?? ""}
          defaultDocumentContent={rootDocument?.content ?? ""}
        />
      </div>
    );
  });
};

export default Space;
