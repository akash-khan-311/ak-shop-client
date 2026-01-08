import BlogDetailsWithSidebar from "@/components/BlogDetailsPage";

const BlogDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <main>
      {/* <ShopDetails /> */}

      <BlogDetailsWithSidebar />
    </main>
  );
};
export default BlogDetailsPage;
