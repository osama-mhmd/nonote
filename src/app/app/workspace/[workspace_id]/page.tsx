import { getRootDocument } from "@/db/documents-actions/get-document";
import permissionLayer from "./permission-layer";
import Editor from "@/app/app/workspace/[workspace_id]/editor";
import createDocument from "@/db/documents-actions/create";
import AppLayout from "./app-layout";
import { validateRequest } from "@/db/auth";

const Space = ({ params }: { params: { workspace_id: string } }) => {
  return permissionLayer(params.workspace_id, async (permission) => {
    let rootDocument = await getRootDocument(params.workspace_id);

    if (!rootDocument) {
      const process = await createDocument(params.workspace_id);
      // if (!process.ok) alert(process.message);

      return <p>We are so sorry, please refresh the page</p>;
    }

    const { user } = await validateRequest();

    return (
      <AppLayout permission={permission} workspace_id={params.workspace_id}>
        <Editor
          permission={permission}
          document={rootDocument}
          workspace_id={params.workspace_id}
          user={user!}
        />
      </AppLayout>
    );
  });
};

export default Space;
