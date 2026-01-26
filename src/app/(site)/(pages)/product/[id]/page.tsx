import shopData from "@/components/Shop/shopData";

// export const metadata = {
//   title: "Course Details | AS Programming",
//   description:
//     "AS Programming offers a wide range of IT-related courses, including web development, data science, cybersecurity, cloud computing, and full-stack JavaScript development. Start your learning journey with us and achieve your career goals.",
//   keywords:
//     "AS Programming, IT courses, web development, data science, cybersecurity, cloud computing, full-stack development, programming courses, online learning",
//   author: "Md Akash Khan",
//   openGraph: {
//     type: "website",
//     url: "https://as-programming-next.netlify.app",
//     title: "AS Programming - Learn and Master IT Skills",
//     description:
//       "AS Programming offers a wide range of IT-related courses, including web development, data science, cybersecurity, cloud computing, and full-stack JavaScript development. Start your learning journey with us and achieve your career goals.",

//     site_name: "AS Programming",
//   },
// };
const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const product = shopData?.find((p: any) => id === p.id);
  console.log(product);
  return <main>{/* <ShopDetails /> */}</main>;
};
export default ProductDetailsPage;
