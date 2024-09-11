export default async function Workspace({
  params,
}: {
  params: { workspace_id: string };
}) {
  return (
    <section className="mt-6 sm:mt-12">
      <div className="container">{params.workspace_id}</div>
    </section>
  );
}
