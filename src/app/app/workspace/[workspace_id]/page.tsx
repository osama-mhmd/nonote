import { getRootDocument } from "@/db/documents-actions/get-document";
import permissionLayer from "./permission-layer";
import Editor from "@/app/app/workspace/[workspace_id]/editor";

const Space = ({ params }: { params: { workspace_id: string } }) => {
  return permissionLayer(params.workspace_id, async (permission) => {
    const rootDocument = await getRootDocument(params.workspace_id);

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
