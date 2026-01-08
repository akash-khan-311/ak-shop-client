// "use client";
// import React, { use, useEffect, useState } from "react";
// import Breadcrumb from "../Common/Breadcrumb";
// import Image from "next/image";
// import Newsletter from "../Common/Newsletter";
// import RecentlyViewdItems from "./RecentlyViewd";
// import { usePreviewSlider } from "@/app/context/PreviewSliderContext";
// import { useAppSelector } from "@/redux/store";gallery
// import { CircleCheck, Fullscreen } from "lucide-react";

// const ShopDetails = () => {
//   const [activeColor, setActiveColor] = useState("blue");
//   const { openPreviewModal } = usePreviewSlider();
//   const [previewImg, setPreviewImg] = useState(0);

//   const [storage, setStorage] = useState("gb128");
//   const [type, setType] = useState("active");
//   const [sim, setSim] = useState("dual");
//   const [quantity, setQuantity] = useState(1);

//   const [activeTab, setActiveTab] = useState("tabOne");

//   const storages = [
//     {
//       id: "gb128",
//       title: "128 GB",
//     },
//     {
//       id: "gb256",
//       title: "256 GB",
//     },
//     {
//       id: "gb512",
//       title: "521 GB",
//     },
//   ];

//   const types = [
//     {
//       id: "active",
//       title: "Active",
//     },

//     {
//       id: "inactive",
//       title: "Inactive",
//     },
//   ];

//   const sims = [
//     {
//       id: "dual",
//       title: "Dual",
//     },

//     {
//       id: "e-sim",
//       title: "E Sim",
//     },
//   ];

//   const tabs = [
//     {
//       id: "tabOne",
//       title: "Description",
//     },
//     {
//       id: "tabTwo",
//       title: "Additional Information",
//     },
//     {
//       id: "tabThree",
//       title: "Reviews",
//     },
//   ];

//   const colors = ["red", "blue", "orange", "pink", "purple"];

//   const alreadyExist = localStorage.getItem("productDetails");
//   const productFromStorage = useAppSelector(
//     (state) => state.productDetailsReducer.value
//   );

//   const product = alreadyExist ? JSON.parse(alreadyExist) : productFromStorage;

//   useEffect(() => {
//     localStorage.setItem("productDetails", JSON.stringify(product));
//   }, [product]);

//   // pass the product here when you get the real data.
//   const handlePreviewSlider = () => {
//     openPreviewModal();
//   };

//   return (
//     <>
//       <Breadcrumb title={"Shop Details"} pages={["shop details"]} />

//       <>
//         <section className="overflow-hidden relative pb-20 pt-5 lg:pt-20 xl:pt-28 dark:bg-dark">
//           <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
//             <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-17.5">
//               <div className="lg:max-w-[570px] w-full">
//                 <div className="lg:min-h-[512px] rounded-lg shadow-1 bg-gray-2 dark:bg-dark-2 p-4 sm:p-7.5 relative flex items-center justify-center">
//                   <div>
//                     <button
//                       onClick={handlePreviewSlider}
//                       aria-label="button for zoom"
//                       className="gallery__Image w-11 h-11 rounded-[5px] bg-gray-1 shadow-1 flex items-center justify-center ease-out duration-200 text-dark hover:text-pink absolute top-4 lg:top-6 right-4 lg:right-6 z-50"
//                     >
//                       <Fullscreen size={20} />
//                     </button>

//                     {product.imgs?.previews?.[previewImg] && (
//                       <Image
//                         src={product.imgs.previews[previewImg]}
//                         alt="products-details"
//                         width={400}
//                         height={400}
//                       />
//                     )}
//                   </div>
//                 </div>

//                 {/* ?  &apos;border-blue &apos; :  &apos;border-transparent&apos; */}
//                 <div className="flex flex-wrap sm:flex-nowrap gap-4.5 mt-6">
//                   {product.imgs?.thumbnails.map((item, key) => (
//                     <button
//                       onClick={() => setPreviewImg(key)}
//                       key={key}
//                       className={`flex items-center justify-center w-15 sm:w-25 h-15 sm:h-25 overflow-hidden rounded-lg bg-gray-2 shadow-1 ease-out duration-200 border-2 hover:border-pink ${
//                         key === previewImg
//                           ? "border-blue"
//                           : "border-transparent"
//                       }`}
//                     >
//                       <Image
//                         width={50}
//                         height={50}
//                         src={item}
//                         alt="thumbnail"
//                       />
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* <!-- product content --> */}
//               <div className="max-w-[539px] w-full">
//                 <div className="flex items-center justify-between mb-3">
//                   <h2 className="font-semibold text-xl sm:text-2xl xl:text-custom-3 ">
//                     {product.title} Title will be here
//                   </h2>

//                   <div className="inline-flex font-medium text-custom-sm text-white bg-pink rounded py-0.5 px-2.5">
//                     30% OFF
//                   </div>
//                 </div>

//                 <div className="flex flex-wrap items-center gap-5.5 mb-4.5">
//                   <div className="flex items-center gap-2.5">
//                     {/* <!-- stars --> */}
//                     <div className="flex items-center gap-1">
//                       <svg
//                         className="fill-[#FFA645]"
//                         width="18"
//                         height="18"
//                         viewBox="0 0 18 18"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <g clipPath="url(#clip0_375_9172)">
//                           <path
//                             d="M16.7906 6.72187L11.7 5.93438L9.39377 1.09688C9.22502 0.759375 8.77502 0.759375 8.60627 1.09688L6.30002 5.9625L1.23752 6.72187C0.871891 6.77812 0.731266 7.25625 1.01252 7.50938L4.69689 11.3063L3.82502 16.6219C3.76877 16.9875 4.13439 17.2969 4.47189 17.0719L9.05627 14.5687L13.6125 17.0719C13.9219 17.2406 14.3156 16.9594 14.2313 16.6219L13.3594 11.3063L17.0438 7.50938C17.2688 7.25625 17.1563 6.77812 16.7906 6.72187Z"
//                             fill=""
//                           />
//                         </g>
//                         <defs>
//                           <clipPath id="clip0_375_9172">
//                             <rect width="18" height="18" fill="white" />
//                           </clipPath>
//                         </defs>
//                       </svg>

//                       <svg
//                         className="fill-[#FFA645]"
//                         width="18"
//                         height="18"
//                         viewBox="0 0 18 18"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <g clipPath="url(#clip0_375_9172)">
//                           <path
//                             d="M16.7906 6.72187L11.7 5.93438L9.39377 1.09688C9.22502 0.759375 8.77502 0.759375 8.60627 1.09688L6.30002 5.9625L1.23752 6.72187C0.871891 6.77812 0.731266 7.25625 1.01252 7.50938L4.69689 11.3063L3.82502 16.6219C3.76877 16.9875 4.13439 17.2969 4.47189 17.0719L9.05627 14.5687L13.6125 17.0719C13.9219 17.2406 14.3156 16.9594 14.2313 16.6219L13.3594 11.3063L17.0438 7.50938C17.2688 7.25625 17.1563 6.77812 16.7906 6.72187Z"
//                             fill=""
//                           />
//                         </g>
//                         <defs>
//                           <clipPath id="clip0_375_9172">
//                             <rect width="18" height="18" fill="white" />
//                           </clipPath>
//                         </defs>
//                       </svg>
//                       <svg
//                         className="fill-[#FFA645]"
//                         width="18"
//                         height="18"
//                         viewBox="0 0 18 18"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <g clipPath="url(#clip0_375_9172)">
//                           <path
//                             d="M16.7906 6.72187L11.7 5.93438L9.39377 1.09688C9.22502 0.759375 8.77502 0.759375 8.60627 1.09688L6.30002 5.9625L1.23752 6.72187C0.871891 6.77812 0.731266 7.25625 1.01252 7.50938L4.69689 11.3063L3.82502 16.6219C3.76877 16.9875 4.13439 17.2969 4.47189 17.0719L9.05627 14.5687L13.6125 17.0719C13.9219 17.2406 14.3156 16.9594 14.2313 16.6219L13.3594 11.3063L17.0438 7.50938C17.2688 7.25625 17.1563 6.77812 16.7906 6.72187Z"
//                             fill=""
//                           />
//                         </g>
//                         <defs>
//                           <clipPath id="clip0_375_9172">
//                             <rect width="18" height="18" fill="white" />
//                           </clipPath>
//                         </defs>
//                       </svg>
//                       <svg
//                         className="fill-[#FFA645]"
//                         width="18"
//                         height="18"
//                         viewBox="0 0 18 18"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <g clipPath="url(#clip0_375_9172)">
//                           <path
//                             d="M16.7906 6.72187L11.7 5.93438L9.39377 1.09688C9.22502 0.759375 8.77502 0.759375 8.60627 1.09688L6.30002 5.9625L1.23752 6.72187C0.871891 6.77812 0.731266 7.25625 1.01252 7.50938L4.69689 11.3063L3.82502 16.6219C3.76877 16.9875 4.13439 17.2969 4.47189 17.0719L9.05627 14.5687L13.6125 17.0719C13.9219 17.2406 14.3156 16.9594 14.2313 16.6219L13.3594 11.3063L17.0438 7.50938C17.2688 7.25625 17.1563 6.77812 16.7906 6.72187Z"
//                             fill=""
//                           />
//                         </g>
//                         <defs>
//                           <clipPath id="clip0_375_9172">
//                             <rect width="18" height="18" fill="white" />
//                           </clipPath>
//                         </defs>
//                       </svg>
//                       <svg
//                         className="fill-[#FFA645]"
//                         width="18"
//                         height="18"
//                         viewBox="0 0 18 18"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <g clipPath="url(#clip0_375_9172)">
//                           <path
//                             d="M16.7906 6.72187L11.7 5.93438L9.39377 1.09688C9.22502 0.759375 8.77502 0.759375 8.60627 1.09688L6.30002 5.9625L1.23752 6.72187C0.871891 6.77812 0.731266 7.25625 1.01252 7.50938L4.69689 11.3063L3.82502 16.6219C3.76877 16.9875 4.13439 17.2969 4.47189 17.0719L9.05627 14.5687L13.6125 17.0719C13.9219 17.2406 14.3156 16.9594 14.2313 16.6219L13.3594 11.3063L17.0438 7.50938C17.2688 7.25625 17.1563 6.77812 16.7906 6.72187Z"
//                             fill=""
//                           />
//                         </g>
//                         <defs>
//                           <clipPath id="clip0_375_9172">
//                             <rect width="18" height="18" fill="white" />
//                           </clipPath>
//                         </defs>
//                       </svg>
//                     </div>

//                     <span> (5 customer reviews) </span>
//                   </div>

//                   <div className="flex items-center gap-1.5">
//                     <CircleCheck size={20} className="text-green" />
//                     <span className="text-green"> In Stock </span>
//                   </div>
//                 </div>

//                 <h3 className="font-medium text-custom-1 mb-4.5">
//                   <span className="text-sm sm:text-base ">
//                     Price: ${product.price}
//                   </span>
//                   <span className="line-through">
//                     {" "}
//                     ${product.discountedPrice}{" "}
//                   </span>
//                 </h3>

//                 <ul className="flex flex-col gap-2">
//                   <li className="flex items-center gap-2.5">
//                     <CircleCheck size={20} className="text-[#3C50E0]" />
//                     Free delivery available
//                   </li>

//                   <li className="flex items-center gap-2.5">
//                     <CircleCheck size={20} className="text-[#3C50E0]" />
//                     Sales 30% Off Use Code: PROMO30
//                   </li>
//                 </ul>

//                 <form onSubmit={(e) => e.preventDefault()}>
//                   <div className="flex flex-col gap-4.5 border-y border-gray-3 mt-7.5 mb-9 py-9">
//                     {/* <!-- details item --> */}
//                     <div className="flex items-center gap-4">
//                       <div className="min-w-[65px]">
//                         <h4 className="font-medium ">Color:</h4>
//                       </div>

//                       <div className="flex items-center gap-2.5">
//                         {colors.map((color, key) => (
//                           <label
//                             key={key}
//                             htmlFor={color}
//                             className="cursor-pointer select-none flex items-center"
//                           >
//                             <div className="relative">
//                               <input
//                                 type="radio"
//                                 name="color"
//                                 id={color}
//                                 className="sr-only"
//                                 onChange={() => setActiveColor(color)}
//                               />
//                               <div
//                                 className={`flex items-center justify-center w-5.5 h-5.5 rounded-full ${
//                                   activeColor === color && "border"
//                                 }`}
//                                 style={{ borderColor: `${color}` }}
//                               >
//                                 <span
//                                   className="block w-3 h-3 rounded-full"
//                                   style={{ backgroundColor: `${color}` }}
//                                 ></span>
//                               </div>
//                             </div>
//                           </label>
//                         ))}
//                       </div>
//                     </div>

//                     {/* <!-- details item --> */}
//                     <div className="flex items-center gap-4">
//                       <div className="min-w-[65px]">
//                         <h4 className="font-medium ">Storage:</h4>
//                       </div>

//                       <div className="flex items-center gap-4">
//                         {storages.map((item, key) => (
//                           <label
//                             key={key}
//                             htmlFor={item.id}
//                             className="flex cursor-pointer select-none items-center"
//                           >
//                             <div className="relative">
//                               <input
//                                 type="checkbox"
//                                 name="storage"
//                                 id={item.id}
//                                 className="sr-only"
//                                 onChange={() => setStorage(item.id)}
//                               />

//                               {/*  */}
//                               <div
//                                 className={`mr-2 flex h-4 w-4 items-center justify-center rounded border ${
//                                   storage === item.id
//                                     ? "border-blue bg-pink"
//                                     : "border-gray-4"
//                                 } `}
//                               >
//                                 <span
//                                   className={
//                                     storage === item.id
//                                       ? "opacity-100"
//                                       : "opacity-0"
//                                   }
//                                 >
//                                   <svg
//                                     width="24"
//                                     height="24"
//                                     viewBox="0 0 24 24"
//                                     fill="none"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                   >
//                                     <rect
//                                       x="4"
//                                       y="4.00006"
//                                       width="16"
//                                       height="16"
//                                       rx="4"
//                                       fill="#3C50E0"
//                                     />
//                                     <path
//                                       fillRule="evenodd"
//                                       clipRule="evenodd"
//                                       d="M16.3103 9.25104C16.471 9.41178 16.5612 9.62978 16.5612 9.85707C16.5612 10.0844 16.471 10.3024 16.3103 10.4631L12.0243 14.7491C11.8635 14.9098 11.6455 15.0001 11.4182 15.0001C11.191 15.0001 10.973 14.9098 10.8122 14.7491L8.24062 12.1775C8.08448 12.0158 7.99808 11.7993 8.00003 11.5745C8.00199 11.3498 8.09214 11.1348 8.25107 10.9759C8.41 10.8169 8.62499 10.7268 8.84975 10.7248C9.0745 10.7229 9.29103 10.8093 9.4527 10.9654L11.4182 12.931L15.0982 9.25104C15.2589 9.09034 15.4769 9.00006 15.7042 9.00006C15.9315 9.00006 16.1495 9.09034 16.3103 9.25104Z"
//                                       fill="white"
//                                     />
//                                   </svg>
//                                 </span>
//                               </div>
//                             </div>
//                             {item.title}
//                           </label>
//                         ))}
//                       </div>
//                     </div>

//                     {/* // <!-- details item --> */}
//                     <div className="flex items-center gap-4">
//                       <div className="min-w-[65px]">
//                         <h4 className="font-medium ">Type:</h4>
//                       </div>

//                       <div className="flex items-center gap-4">
//                         {types.map((item, key) => (
//                           <label
//                             key={key}
//                             htmlFor={item.id}
//                             className="flex cursor-pointer select-none items-center"
//                           >
//                             <div className="relative">
//                               <input
//                                 type="checkbox"
//                                 name="storage"
//                                 id={item.id}
//                                 className="sr-only"
//                                 onChange={() => setType(item.id)}
//                               />

//                               {/*  */}
//                               <div
//                                 className={`mr-2 flex h-4 w-4 items-center justify-center rounded border ${
//                                   type === item.id
//                                     ? "border-blue bg-pink"
//                                     : "border-gray-4"
//                                 } `}
//                               >
//                                 <span
//                                   className={
//                                     type === item.id
//                                       ? "opacity-100"
//                                       : "opacity-0"
//                                   }
//                                 >
//                                   <svg
//                                     width="24"
//                                     height="24"
//                                     viewBox="0 0 24 24"
//                                     fill="none"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                   >
//                                     <rect
//                                       x="4"
//                                       y="4.00006"
//                                       width="16"
//                                       height="16"
//                                       rx="4"
//                                       fill="#3C50E0"
//                                     />
//                                     <path
//                                       fillRule="evenodd"
//                                       clipRule="evenodd"
//                                       d="M16.3103 9.25104C16.471 9.41178 16.5612 9.62978 16.5612 9.85707C16.5612 10.0844 16.471 10.3024 16.3103 10.4631L12.0243 14.7491C11.8635 14.9098 11.6455 15.0001 11.4182 15.0001C11.191 15.0001 10.973 14.9098 10.8122 14.7491L8.24062 12.1775C8.08448 12.0158 7.99808 11.7993 8.00003 11.5745C8.00199 11.3498 8.09214 11.1348 8.25107 10.9759C8.41 10.8169 8.62499 10.7268 8.84975 10.7248C9.0745 10.7229 9.29103 10.8093 9.4527 10.9654L11.4182 12.931L15.0982 9.25104C15.2589 9.09034 15.4769 9.00006 15.7042 9.00006C15.9315 9.00006 16.1495 9.09034 16.3103 9.25104Z"
//                                       fill="white"
//                                     />
//                                   </svg>
//                                 </span>
//                               </div>
//                             </div>
//                             {item.title}
//                           </label>
//                         ))}
//                       </div>
//                     </div>

//                     {/* // <!-- details item --> */}
//                     <div className="flex items-center gap-4">
//                       <div className="min-w-[65px]">
//                         <h4 className="font-medium ">Sim:</h4>
//                       </div>

//                       <div className="flex items-center gap-4">
//                         {sims.map((item, key) => (
//                           <label
//                             key={key}
//                             htmlFor={item.id}
//                             className="flex cursor-pointer select-none items-center"
//                           >
//                             <div className="relative">
//                               <input
//                                 type="checkbox"
//                                 name="storage"
//                                 id={item.id}
//                                 className="sr-only"
//                                 onChange={() => setSim(item.id)}
//                               />

//                               {/*  */}
//                               <div
//                                 className={`mr-2 flex h-4 w-4 items-center justify-center rounded border ${
//                                   sim === item.id
//                                     ? "border-blue bg-pink"
//                                     : "border-gray-4"
//                                 } `}
//                               >
//                                 <span
//                                   className={
//                                     sim === item.id
//                                       ? "opacity-100"
//                                       : "opacity-0"
//                                   }
//                                 >
//                                   <svg
//                                     width="24"
//                                     height="24"
//                                     viewBox="0 0 24 24"
//                                     fill="none"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                   >
//                                     <rect
//                                       x="4"
//                                       y="4.00006"
//                                       width="16"
//                                       height="16"
//                                       rx="4"
//                                       fill="#3C50E0"
//                                     />
//                                     <path
//                                       fillRule="evenodd"
//                                       clipRule="evenodd"
//                                       d="M16.3103 9.25104C16.471 9.41178 16.5612 9.62978 16.5612 9.85707C16.5612 10.0844 16.471 10.3024 16.3103 10.4631L12.0243 14.7491C11.8635 14.9098 11.6455 15.0001 11.4182 15.0001C11.191 15.0001 10.973 14.9098 10.8122 14.7491L8.24062 12.1775C8.08448 12.0158 7.99808 11.7993 8.00003 11.5745C8.00199 11.3498 8.09214 11.1348 8.25107 10.9759C8.41 10.8169 8.62499 10.7268 8.84975 10.7248C9.0745 10.7229 9.29103 10.8093 9.4527 10.9654L11.4182 12.931L15.0982 9.25104C15.2589 9.09034 15.4769 9.00006 15.7042 9.00006C15.9315 9.00006 16.1495 9.09034 16.3103 9.25104Z"
//                                       fill="white"
//                                     />
//                                   </svg>
//                                 </span>
//                               </div>
//                             </div>
//                             {item.title}
//                           </label>
//                         ))}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex flex-wrap items-center gap-4.5">
//                     <div className="flex items-center rounded-md border border-gray-3">
//                       <button
//                         aria-label="button for remove product"
//                         className="flex items-center justify-center w-12 h-12 ease-out duration-200 hover:text-pink"
//                         onClick={() =>
//                           quantity > 1 && setQuantity(quantity - 1)
//                         }
//                       >
//                         <svg
//                           className="fill-current"
//                           width="20"
//                           height="20"
//                           viewBox="0 0 20 20"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             d="M3.33301 10.0001C3.33301 9.53984 3.7061 9.16675 4.16634 9.16675H15.833C16.2932 9.16675 16.6663 9.53984 16.6663 10.0001C16.6663 10.4603 16.2932 10.8334 15.833 10.8334H4.16634C3.7061 10.8334 3.33301 10.4603 3.33301 10.0001Z"
//                             fill=""
//                           />
//                         </svg>
//                       </button>

//                       <span className="flex items-center justify-center w-16 h-12 border-x border-gray-4">
//                         {quantity}
//                       </span>

//                       <button
//                         onClick={() => setQuantity(quantity + 1)}
//                         aria-label="button for add product"
//                         className="flex items-center justify-center w-12 h-12 ease-out duration-200 hover:text-pink"
//                       >
//                         <svg
//                           className="fill-current"
//                           width="20"
//                           height="20"
//                           viewBox="0 0 20 20"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             d="M3.33301 10C3.33301 9.5398 3.7061 9.16671 4.16634 9.16671H15.833C16.2932 9.16671 16.6663 9.5398 16.6663 10C16.6663 10.4603 16.2932 10.8334 15.833 10.8334H4.16634C3.7061 10.8334 3.33301 10.4603 3.33301 10Z"
//                             fill=""
//                           />
//                           <path
//                             d="M9.99967 16.6667C9.53944 16.6667 9.16634 16.2936 9.16634 15.8334L9.16634 4.16671C9.16634 3.70647 9.53944 3.33337 9.99967 3.33337C10.4599 3.33337 10.833 3.70647 10.833 4.16671L10.833 15.8334C10.833 16.2936 10.4599 16.6667 9.99967 16.6667Z"
//                             fill=""
//                           />
//                         </svg>
//                       </button>
//                     </div>

//                     <a
//                       href="#"
//                       className="inline-flex font-medium text-white bg-pink py-3 px-7 rounded-md ease-out duration-200 hover:bg-pink-dark"
//                     >
//                       Purchase Now
//                     </a>

//                     <a
//                       href="#"
//                       className="flex items-center justify-center w-12 h-12 rounded-md border border-gray-3 ease-out duration-200 hover:text-white hover:bg-dark hover:border-transparent"
//                     >
//                       <svg
//                         className="fill-current"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           clipRule="evenodd"
//                           d="M5.62436 4.42423C3.96537 5.18256 2.75 6.98626 2.75 9.13713C2.75 11.3345 3.64922 13.0283 4.93829 14.4798C6.00072 15.6761 7.28684 16.6677 8.54113 17.6346C8.83904 17.8643 9.13515 18.0926 9.42605 18.3219C9.95208 18.7366 10.4213 19.1006 10.8736 19.3649C11.3261 19.6293 11.6904 19.75 12 19.75C12.3096 19.75 12.6739 19.6293 13.1264 19.3649C13.5787 19.1006 14.0479 18.7366 14.574 18.3219C14.8649 18.0926 15.161 17.8643 15.4589 17.6346C16.7132 16.6677 17.9993 15.6761 19.0617 14.4798C20.3508 13.0283 21.25 11.3345 21.25 9.13713C21.25 6.98626 20.0346 5.18256 18.3756 4.42423C16.7639 3.68751 14.5983 3.88261 12.5404 6.02077C12.399 6.16766 12.2039 6.25067 12 6.25067C11.7961 6.25067 11.601 6.16766 11.4596 6.02077C9.40166 3.88261 7.23607 3.68751 5.62436 4.42423ZM12 4.45885C9.68795 2.39027 7.09896 2.1009 5.00076 3.05999C2.78471 4.07296 1.25 6.42506 1.25 9.13713C1.25 11.8027 2.3605 13.8361 3.81672 15.4758C4.98287 16.789 6.41022 17.888 7.67083 18.8586C7.95659 19.0786 8.23378 19.2921 8.49742 19.4999C9.00965 19.9037 9.55954 20.3343 10.1168 20.66C10.6739 20.9855 11.3096 21.25 12 21.25C12.6904 21.25 13.3261 20.9855 13.8832 20.66C14.4405 20.3343 14.9903 19.9037 15.5026 19.4999C15.7662 19.2921 16.0434 19.0786 16.3292 18.8586C17.5898 17.888 19.0171 16.789 20.1833 15.4758C21.6395 13.8361 22.75 11.8027 22.75 9.13713C22.75 6.42506 21.2153 4.07296 18.9992 3.05999C16.901 2.1009 14.3121 2.39027 12 4.45885Z"
//                           fill=""
//                         />
//                       </svg>
//                     </a>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section className="overflow-hidden bg-gray-2 dark:bg-dark-2 py-20">
//           <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
//             {/* <!--== tab header start ==--> */}
//             <div className="flex flex-wrap items-center bg-white dark:bg-dark rounded-[10px] shadow-1 gap-5 xl:gap-12.5 py-4.5 px-4 sm:px-6">
//               {tabs.map((item, key) => (
//                 <button
//                   key={key}
//                   onClick={() => setActiveTab(item.id)}
//                   className={`font-medium lg:text-lg ease-out duration-200 hover:text-pink relative before:h-0.5 before:bg-pink before:absolute before:left-0 before:bottom-0 before:ease-out before:duration-200 hover:before:w-full ${
//                     activeTab === item.id
//                       ? "text-pink before:w-full"
//                       : " before:w-0"
//                   }`}
//                 >
//                   {item.title}
//                 </button>
//               ))}
//             </div>
//             {/* <!--== tab header end ==--> */}

//             {/* <!--== tab content start ==--> */}
//             {/* <!-- tab content one start --> */}
//             <div>
//               <div
//                 className={`flex-col sm:flex-row gap-7.5 xl:gap-12.5 mt-12.5 ${
//                   activeTab === "tabOne" ? "flex" : "hidden"
//                 }`}
//               >
//                 <div className="max-w-[670px] w-full">
//                   <h2 className="font-medium text-2xl mb-7">Specifications:</h2>

//                   <p className="mb-6">
//                     Lorem Ipsum is simply dummy text of the printing and
//                     typesetting industry. Lorem Ipsum has been the
//                     industry&apos;s standard dummy text ever since the 1500s,
//                     when an unknown printer took a galley of type and scrambled
//                     it to make a type specimen book.
//                   </p>
//                   <p className="mb-6">
//                     It has survived not only five centuries, but also the leap
//                     into electronic typesetting, remaining essentially
//                     unchanged. It was popularised in the 1960s.
//                   </p>
//                   <p>
//                     with the release of Letraset sheets containing Lorem Ipsum
//                     passages, and more recently with desktop publishing software
//                     like Aldus PageMaker including versions.
//                   </p>
//                 </div>

//                 <div className="max-w-[447px] w-full">
//                   <h2 className="font-medium text-2xl  mb-7">
//                     Care & Maintenance:
//                   </h2>

//                   <p className="mb-6">
//                     Lorem Ipsum is simply dummy text of the printing and
//                     typesetting industry. Lorem Ipsum has been the
//                     industry&apos;s standard dummy text ever since the 1500s,
//                     when an unknown printer took a galley of type and scrambled
//                     it to make a type specimen book.
//                   </p>
//                   <p>
//                     It has survived not only five centuries, but also the leap
//                     into electronic typesetting, remaining essentially
//                     unchanged. It was popularised in the 1960s.
//                   </p>
//                 </div>
//               </div>
//             </div>
//             {/* <!-- tab content one end --> */}

//             {/* <!-- tab content two start --> */}
//             <div>
//               <div
//                 className={`rounded-xl border bg-white dark:bg-dark-2 shadow-1 p-4 sm:p-6 mt-10 ${
//                   activeTab === "tabTwo" ? "block" : "hidden"
//                 }`}
//               >
//                 {/* <!-- info item --> */}
//                 <div className="rounded-md even:bg-gray-1  flex py-4 px-4 sm:px-5">
//                   <div className="max-w-[450px] min-w-[140px] w-full">
//                     <p className="text-sm sm:text-base ">Brand</p>
//                   </div>
//                   <div className="w-full">
//                     <p className="text-sm sm:text-base ">Apple</p>
//                   </div>
//                 </div>

//                 {/* <!-- info item --> */}
//                 <div className="rounded-md even:bg-gray-1 dark:bg-gray-7 flex py-4 px-4 sm:px-5">
//                   <div className="max-w-[450px] min-w-[140px] w-full">
//                     <p className="text-sm sm:text-base ">Model</p>
//                   </div>
//                   <div className="w-full">
//                     <p className="text-sm sm:text-base ">iPhone 14 Plus</p>
//                   </div>
//                 </div>

//                 {/* <!-- info item --> */}
//                 <div className="rounded-md even:bg-gray-1  flex py-4 px-4 sm:px-5">
//                   <div className="max-w-[450px] min-w-[140px] w-full">
//                     <p className="text-sm sm:text-base ">Display Size</p>
//                   </div>
//                   <div className="w-full">
//                     <p className="text-sm sm:text-base ">6.7 inches</p>
//                   </div>
//                 </div>

//                 {/* <!-- info item --> */}
//                 <div className="rounded-md even:bg-gray-1 dark:bg-gray-7 flex py-4 px-4 sm:px-5">
//                   <div className="max-w-[450px] min-w-[140px] w-full">
//                     <p className="text-sm sm:text-base ">Display Type</p>
//                   </div>
//                   <div className="w-full">
//                     <p className="text-sm sm:text-base ">
//                       Super Retina XDR OLED, HDR10, Dolby Vision, 800 nits
//                       (HBM), 1200 nits (peak)
//                     </p>
//                   </div>
//                 </div>

//                 {/* <!-- info item --> */}
//                 <div className="rounded-md even:bg-gray-1  flex py-4 px-4 sm:px-5">
//                   <div className="max-w-[450px] min-w-[140px] w-full">
//                     <p className="text-sm sm:text-base ">Display Resolution</p>
//                   </div>
//                   <div className="w-full">
//                     <p className="text-sm sm:text-base ">
//                       1284 x 2778 pixels, 19.5:9 ratio
//                     </p>
//                   </div>
//                 </div>

//                 {/* <!-- info item --> */}
//                 <div className="rounded-md even:bg-gray-1 dark:bg-gray-7 flex py-4 px-4 sm:px-5">
//                   <div className="max-w-[450px] min-w-[140px] w-full">
//                     <p className="text-sm sm:text-base ">Chipset</p>
//                   </div>
//                   <div className="w-full">
//                     <p className="text-sm sm:text-base ">
//                       Apple A15 Bionic (5 nm)
//                     </p>
//                   </div>
//                 </div>

//                 {/* <!-- info item --> */}
//                 <div className="rounded-md even:bg-gray-1  flex py-4 px-4 sm:px-5">
//                   <div className="max-w-[450px] min-w-[140px] w-full">
//                     <p className="text-sm sm:text-base ">Memory</p>
//                   </div>
//                   <div className="w-full">
//                     <p className="text-sm sm:text-base ">
//                       128GB 6GB RAM | 256GB 6GB RAM | 512GB 6GB RAM
//                     </p>
//                   </div>
//                 </div>

//                 {/* <!-- info item --> */}
//                 <div className="rounded-md even:bg-gray-1 dark:bg-gray-7 flex py-4 px-4 sm:px-5">
//                   <div className="max-w-[450px] min-w-[140px] w-full">
//                     <p className="text-sm sm:text-base ">Main Camera</p>
//                   </div>
//                   <div className="w-full">
//                     <p className="text-sm sm:text-base ">
//                       12MP + 12MP | 4K@24/25/30/60fps, stereo sound rec.
//                     </p>
//                   </div>
//                 </div>

//                 {/* <!-- info item --> */}
//                 <div className="rounded-md even:bg-gray-1  flex py-4 px-4 sm:px-5">
//                   <div className="max-w-[450px] min-w-[140px] w-full">
//                     <p className="text-sm sm:text-base ">Selfie Camera</p>
//                   </div>
//                   <div className="w-full">
//                     <p className="text-sm sm:text-base ">
//                       12 MP | 4K@24/25/30/60fps, 1080p@25/30/60/120fps, gyro-EIS
//                     </p>
//                   </div>
//                 </div>

//                 {/* <!-- info item --> */}
//                 <div className="rounded-md even:bg-gray-1 dark:bg-gray-7 flex py-4 px-4 sm:px-5">
//                   <div className="max-w-[450px] min-w-[140px] w-full">
//                     <p className="text-sm sm:text-base ">Battery Info</p>
//                   </div>
//                   <div className="w-full">
//                     <p className="text-sm sm:text-base ">
//                       Li-Ion 4323 mAh, non-removable | 15W wireless (MagSafe),
//                       7.5W wireless (Qi)
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             {/* <!-- tab content two end --> */}

//             {/* <!-- tab content three start --> */}
//             <div>
//               <div
//                 className={`flex-col sm:flex-row gap-7.5 xl:gap-12.5 mt-12.5 ${
//                   activeTab === "tabThree" ? "flex" : "hidden"
//                 }`}
//               >
//                 <div className="max-w-[570px] w-full">
//                   <h2 className="font-medium text-2xl  mb-9">
//                     03 Review for this product
//                   </h2>

//                   <div className="flex flex-col gap-6">
//                     {/* <!-- review item --> */}
//                     <div className="rounded-xl bg-white dark:bg-dark shadow-1 p-4 sm:p-6">
//                       <div className="flex items-center justify-between">
//                         <a href="#" className="flex items-center gap-4">
//                           <div className="w-12.5 h-12.5 rounded-full overflow-hidden">
//                             <Image
//                               src="/images/users/user-01.jpg"
//                               alt="author"
//                               className="w-12.5 h-12.5 rounded-full overflow-hidden"
//                               width={50}
//                               height={50}
//                             />
//                           </div>

//                           <div>
//                             <h3 className="font-medium ">Davis Dorwart</h3>
//                             <p className="text-custom-sm">
//                               Serial Entrepreneur
//                             </p>
//                           </div>
//                         </a>

//                         <div className="flex items-center gap-1">
//                           <span className="cursor-pointer text-[#FBB040]">
//                             <svg
//                               className="fill-current"
//                               width="15"
//                               height="16"
//                               viewBox="0 0 15 16"
//                               fill="none"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path
//                                 d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
//                                 fill=""
//                               />
//                             </svg>
//                           </span>

//                           <span className="cursor-pointer text-[#FBB040]">
//                             <svg
//                               className="fill-current"
//                               width="15"
//                               height="16"
//                               viewBox="0 0 15 16"
//                               fill="none"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path
//                                 d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
//                                 fill=""
//                               />
//                             </svg>
//                           </span>

//                           <span className="cursor-pointer text-[#FBB040]">
//                             <svg
//                               className="fill-current"
//                               width="15"
//                               height="16"
//                               viewBox="0 0 15 16"
//                               fill="none"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path
//                                 d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
//                                 fill=""
//                               />
//                             </svg>
//                           </span>

//                           <span className="cursor-pointer text-[#FBB040]">
//                             <svg
//                               className="fill-current"
//                               width="15"
//                               height="16"
//                               viewBox="0 0 15 16"
//                               fill="none"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path
//                                 d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
//                                 fill=""
//                               />
//                             </svg>
//                           </span>

//                           <span className="cursor-pointer text-[#FBB040]">
//                             <svg
//                               className="fill-current"
//                               width="15"
//                               height="16"
//                               viewBox="0 0 15 16"
//                               fill="none"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path
//                                 d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
//                                 fill=""
//                               />
//                             </svg>
//                           </span>
//                         </div>
//                       </div>

//                       <p className=" mt-6">
//                         “Lorem ipsum dolor sit amet, adipiscing elit. Donec
//                         malesuada justo vitaeaugue suscipit beautiful vehicula’’
//                       </p>
//                     </div>

//                     {/* <!-- review item --> */}
//                     <div className="rounded-xl bg-white dark:bg-dark shadow-1 p-4 sm:p-6">
//                       <div className="flex items-center justify-between">
//                         <a href="#" className="flex items-center gap-4">
//                           <div className="w-12.5 h-12.5 rounded-full overflow-hidden">
//                             <Image
//                               src="/images/users/user-01.jpg"
//                               alt="author"
//                               className="w-12.5 h-12.5 rounded-full overflow-hidden"
//                               width={50}
//                               height={50}
//                             />
//                           </div>

//                           <div>
//                             <h3 className="font-medium ">Davis Dorwart</h3>
//                             <p className="text-custom-sm">
//                               Serial Entrepreneur
//                             </p>
//                           </div>
//                         </a>

//                         <div className="flex items-center gap-1">
//                           <span className="cursor-pointer text-[#FBB040]">
//                             <svg
//                               className="fill-current"
//                               width="15"
//                               height="16"
//                               viewBox="0 0 15 16"
//                               fill="none"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path
//                                 d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
//                                 fill=""
//                               />
//                             </svg>
//                           </span>

//                           <span className="cursor-pointer text-[#FBB040]">
//                             <svg
//                               className="fill-current"
//                               width="15"
//                               height="16"
//                               viewBox="0 0 15 16"
//                               fill="none"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path
//                                 d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
//                                 fill=""
//                               />
//                             </svg>
//                           </span>

//                           <span className="cursor-pointer text-[#FBB040]">
//                             <svg
//                               className="fill-current"
//                               width="15"
//                               height="16"
//                               viewBox="0 0 15 16"
//                               fill="none"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path
//                                 d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
//                                 fill=""
//                               />
//                             </svg>
//                           </span>

//                           <span className="cursor-pointer text-[#FBB040]">
//                             <svg
//                               className="fill-current"
//                               width="15"
//                               height="16"
//                               viewBox="0 0 15 16"
//                               fill="none"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path
//                                 d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
//                                 fill=""
//                               />
//                             </svg>
//                           </span>

//                           <span className="cursor-pointer text-[#FBB040]">
//                             <svg
//                               className="fill-current"
//                               width="15"
//                               height="16"
//                               viewBox="0 0 15 16"
//                               fill="none"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path
//                                 d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
//                                 fill=""
//                               />
//                             </svg>
//                           </span>
//                         </div>
//                       </div>

//                       <p className=" mt-6">
//                         “Lorem ipsum dolor sit amet, adipiscing elit. Donec
//                         malesuada justo vitaeaugue suscipit beautiful vehicula’’
//                       </p>
//                     </div>

//                     {/* <!-- review item --> */}
//                     <div className="rounded-xl bg-white dark:bg-dark shadow-1 p-4 sm:p-6">
//                       <div className="flex items-center justify-between">
//                         <a href="#" className="flex items-center gap-4">
//                           <div className="w-12.5 h-12.5 rounded-full overflow-hidden">
//                             <Image
//                               src="/images/users/user-01.jpg"
//                               alt="author"
//                               className="w-12.5 h-12.5 rounded-full overflow-hidden"
//                               width={50}
//                               height={50}
//                             />
//                           </div>

//                           <div>
//                             <h3 className="font-medium ">Davis Dorwart</h3>
//                             <p className="text-custom-sm">
//                               Serial Entrepreneur
//                             </p>
//                           </div>
//                         </a>

//                         <div className="flex items-center gap-1">
//                           <span className="cursor-pointer text-[#FBB040]">
//                             <svg
//                               className="fill-current"
//                               width="15"
//                               height="16"
//                               viewBox="0 0 15 16"
//                               fill="none"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path
//                                 d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
//                                 fill=""
//                               />
//                             </svg>
//                           </span>

//                           <span className="cursor-pointer text-[#FBB040]">
//                             <svg
//                               className="fill-current"
//                               width="15"
//                               height="16"
//                               viewBox="0 0 15 16"
//                               fill="none"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path
//                                 d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
//                                 fill=""
//                               />
//                             </svg>
//                           </span>

//                           <span className="cursor-pointer text-[#FBB040]">
//                             <svg
//                               className="fill-current"
//                               width="15"
//                               height="16"
//                               viewBox="0 0 15 16"
//                               fill="none"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path
//                                 d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
//                                 fill=""
//                               />
//                             </svg>
//                           </span>

//                           <span className="cursor-pointer text-[#FBB040]">
//                             <svg
//                               className="fill-current"
//                               width="15"
//                               height="16"
//                               viewBox="0 0 15 16"
//                               fill="none"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path
//                                 d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
//                                 fill=""
//                               />
//                             </svg>
//                           </span>

//                           <span className="cursor-pointer text-[#FBB040]">
//                             <svg
//                               className="fill-current"
//                               width="15"
//                               height="16"
//                               viewBox="0 0 15 16"
//                               fill="none"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path
//                                 d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
//                                 fill=""
//                               />
//                             </svg>
//                           </span>
//                         </div>
//                       </div>

//                       <p className=" mt-6">
//                         “Lorem ipsum dolor sit amet, adipiscing elit. Donec
//                         malesuada justo vitaeaugue suscipit beautiful vehicula’’
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="max-w-[550px] w-full">
//                   <form>
//                     <h2 className="font-medium text-2xl mb-3.5">
//                       Add a Review
//                     </h2>

//                     <p className="mb-6">
//                       Your email address will not be published. Required fields
//                       are marked *
//                     </p>

//                     <div className="flex items-center gap-3 mb-7.5">
//                       <span>Your Rating*</span>

//                       <div className="flex items-center gap-1">
//                         <span className="cursor-pointer text-[#FBB040]">
//                           <svg
//                             className="fill-current"
//                             width="15"
//                             height="16"
//                             viewBox="0 0 15 16"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path
//                               d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
//                               fill=""
//                             />
//                           </svg>
//                         </span>

//                         <span className="cursor-pointer text-[#FBB040]">
//                           <svg
//                             className="fill-current"
//                             width="15"
//                             height="16"
//                             viewBox="0 0 15 16"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path
//                               d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
//                               fill=""
//                             />
//                           </svg>
//                         </span>

//                         <span className="cursor-pointer text-[#FBB040]">
//                           <svg
//                             className="fill-current"
//                             width="15"
//                             height="16"
//                             viewBox="0 0 15 16"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path
//                               d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
//                               fill=""
//                             />
//                           </svg>
//                         </span>

//                         <span className="cursor-pointer text-gray-5">
//                           <svg
//                             className="fill-current"
//                             width="15"
//                             height="16"
//                             viewBox="0 0 15 16"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path
//                               d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
//                               fill=""
//                             />
//                           </svg>
//                         </span>

//                         <span className="cursor-pointer text-gray-5">
//                           <svg
//                             className="fill-current"
//                             width="15"
//                             height="16"
//                             viewBox="0 0 15 16"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path
//                               d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
//                               fill=""
//                             />
//                           </svg>
//                         </span>
//                       </div>
//                     </div>

//                     <div className="rounded-xl bg-white dark:bg-dark shadow-1 p-4 sm:p-6">
//                       <div className="mb-5">
//                         <label htmlFor="comments" className="block mb-2.5 ">
//                           Comments
//                         </label>

//                         <textarea
//                           name="comments"
//                           id="comments"
//                           rows={5}
//                           placeholder="Your comments"
//                           className="rounded-md border border-gray-3 bg-gray-1 dark:bg-dark-2 placeholder:text-dark-5 dark:placeholder:text-gray-4 w-full p-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-pink/20"
//                         ></textarea>

//                         <span className="flex items-center justify-between mt-2.5">
//                           <span className="text-custom-sm text-dark-4">
//                             Maximum
//                           </span>
//                           <span className="text-custom-sm text-dark-4">
//                             0/250
//                           </span>
//                         </span>
//                       </div>

//                       <div className="flex flex-col lg:flex-row gap-5 sm:gap-7.5 mb-5.5">
//                         <div>
//                           <label htmlFor="name" className="block mb-2.5">
//                             Name
//                           </label>

//                           <input
//                             type="text"
//                             name="name"
//                             id="name"
//                             placeholder="Your name"
//                             className="rounded-md border border-gray-3 bg-gray-1 dark:bg-dark-2 placeholder:text-dark-5 dark:placeholder:text-gray-4 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-pink/20"
//                           />
//                         </div>

//                         <div>
//                           <label htmlFor="email" className="block mb-2.5">
//                             Email
//                           </label>

//                           <input
//                             type="email"
//                             name="email"
//                             id="email"
//                             placeholder="Your email"
//                             className="rounded-md border border-gray-3 bg-gray-1 dark:bg-dark-2 placeholder:text-dark-5 dark:placeholder:text-gray-4 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-pink/20"
//                           />
//                         </div>
//                       </div>

//                       <button
//                         type="submit"
//                         className="inline-flex font-medium text-white bg-pink py-3 px-7 rounded-md ease-out duration-200 hover:bg-pink-dark"
//                       >
//                         Submit Reviews
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//             {/* <!-- tab content three end --> */}
//             {/* <!--== tab content end ==--> */}
//           </div>
//         </section>

//         <RecentlyViewdItems />

//         <Newsletter />
//       </>
//     </>
//   );
// };

// export default ShopDetails;
