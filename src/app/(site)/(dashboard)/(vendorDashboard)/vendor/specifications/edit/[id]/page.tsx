import EditTemplateForm from "./_components/EditTemplateForm";

export default async function EditTemplatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return (
    <>
      <EditTemplateForm id={id} />
    </>
  );
}
