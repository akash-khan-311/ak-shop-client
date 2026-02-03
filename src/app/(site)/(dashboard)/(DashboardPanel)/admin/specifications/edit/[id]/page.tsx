import { Metadata } from "next";
import EditTemplateForm from "./_components/EditTemplateForm";
export const metadata: Metadata = {
  title: "Edit Template | Dashboard",
  description: "This is Dashboard for AK Shop",
};
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
