// "use client";
// import React, { useEffect, useState } from "react";

// import { useModalContext } from "@/app/context/QuickViewModalContext";
// import { AppDispatch, useAppSelector } from "@/redux/store";
// import { addItemToCart } from "@/redux/features/cart-slice";
// import { useDispatch } from "react-redux";
// import Image from "next/image";
// import { usePreviewSlider } from "@/app/context/PreviewSliderContext";
// import { resetQuickView } from "@/redux/features/quickView-slice";

// import { CircleCheck, CircleX, Fullscreen, Minus, Plus } from "lucide-react";

// const QuickViewModal = () => {
//   const { isModalOpen, closeModal } = useModalContext();
//   const { openPreviewModal } = usePreviewSlider();
//   const [quantity, setQuantity] = useState(1);

//   const dispatch = useDispatch<AppDispatch>();

//   // get the product data

//   const [activePreview, setActivePreview] = useState(0);

//   // preview modal
//   const handlePreviewSlider = () => {
//     openPreviewModal();
//   };

//   // add to cart
//   const handleAddToCart = () => {
//     closeModal();
//   };

//   useEffect(() => {
//     // closing modal while clicking outside
//     function handleClickOutside(event) {
//       if (!event.target.closest(".modal-content")) {
//         closeModal();
//       }
//     }

//     if (isModalOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);

//       setQuantity(1);
//     };
//   }, [isModalOpen, closeModal]);

//   return (
//     <div
//       className={`${
//         isModalOpen ? "z-99999" : "hidden"
//       } fixed top-0  left-0 overflow-y-auto no-scrollbar w-full h-screen sm:py-20 xl:py-25 2xl:py-[230px] bg-dark/80 sm:px-8 px-4 py-5`}
//     >
//       <div className="flex items-center justify-center ">
//         <div className="w-full max-w-[1100px] rounded-xl shadow-3 bg-white dark:bg-dark-2 p-7.5 relative modal-content">
//           <button
//             onClick={() => closeModal()}
//             aria-label="button for close modal"
//             className="absolute top-0 right-0 sm:top-6 sm:right-6 flex items-center justify-center hover:text-red  ease-in duration-150  "
//           >
//             <CircleX size={30} />
//           </button>

//           <div className="flex flex-wrap items-center gap-12.5">
//             <div className="max-w-[526px] w-full">
//               <div className="flex gap-5">
//                 <div className="flex flex-col gap-5">
//                   {product.imgs.thumbnails?.map((img, key) => (
//                     <button
//                       onClick={() => setActivePreview(key)}
//                       key={key}
//                       className={`flex items-center justify-center w-20 h-20 overflow-hidden rounded-lg bg-gray-1 dark:bg-dark-3 ease-out duration-200 hover:border-2 hover:border-pink ${
//                         activePreview === key && "border-2 border-blue"
//                       }`}
//                     >
//                       <Image
//                         src={img || ""}
//                         alt="thumbnail"
//                         width={61}
//                         height={61}
//                         className="aspect-square"
//                       />
//                     </button>
//                   ))}
//                 </div>

//                 <div className="relative z-1 overflow-hidden flex items-center justify-center w-full sm:min-h-[508px]  rounded-lg border border-gray-3">
//                   <div>
//                     <button
//                       onClick={handlePreviewSlider}
//                       aria-label="button for zoom"
//                       className="gallery__Image w-10 h-10 rounded-[5px] bg-white shadow-1 flex items-center justify-center ease-out duration-200 text-dark hover:text-pink absolute top-4 lg:top-8 right-4 lg:right-8 z-50"
//                     >
//                       <Fullscreen size={20} />
//                     </button>

//                     {product?.imgs?.previews?.[activePreview] && (
//                       <Image
//                         className="rounded-lg "
//                         src={product.imgs.previews[activePreview]}
//                         alt="products-details"
//                         width={400}
//                         height={400}
//                       />
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="max-w-[445px] w-full">
//               <span className="inline-block text-custom-xs font-medium text-white py-1 px-3 bg-green  mb-6.5">
//                 SALE 20% OFF
//               </span>

//               <h3 className="font-semibold text-xl xl:text-heading-5 text-dark dark:text-white mb-4">
//                 {product.title}
//               </h3>

//               <div className="flex flex-wrap items-center gap-5 mb-6">
//                 <div className="flex items-center gap-1.5">
//                   {/* <!-- stars --> */}
//                   <div className="flex items-center gap-1">
//                     <svg
//                       className="fill-[#FFA645]"
//                       width="18"
//                       height="18"
//                       viewBox="0 0 18 18"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <g clipPath="url(#clip0_375_9172)">
//                         <path
//                           d="M16.7906 6.72187L11.7 5.93438L9.39377 1.09688C9.22502 0.759375 8.77502 0.759375 8.60627 1.09688L6.30002 5.9625L1.23752 6.72187C0.871891 6.77812 0.731266 7.25625 1.01252 7.50938L4.69689 11.3063L3.82502 16.6219C3.76877 16.9875 4.13439 17.2969 4.47189 17.0719L9.05627 14.5687L13.6125 17.0719C13.9219 17.2406 14.3156 16.9594 14.2313 16.6219L13.3594 11.3063L17.0438 7.50938C17.2688 7.25625 17.1563 6.77812 16.7906 6.72187Z"
//                           fill=""
//                         />
//                       </g>
//                       <defs>
//                         <clipPath id="clip0_375_9172">
//                           <rect width="18" height="18" fill="white" />
//                         </clipPath>
//                       </defs>
//                     </svg>

//                     <svg
//                       className="fill-[#FFA645]"
//                       width="18"
//                       height="18"
//                       viewBox="0 0 18 18"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <g clipPath="url(#clip0_375_9172)">
//                         <path
//                           d="M16.7906 6.72187L11.7 5.93438L9.39377 1.09688C9.22502 0.759375 8.77502 0.759375 8.60627 1.09688L6.30002 5.9625L1.23752 6.72187C0.871891 6.77812 0.731266 7.25625 1.01252 7.50938L4.69689 11.3063L3.82502 16.6219C3.76877 16.9875 4.13439 17.2969 4.47189 17.0719L9.05627 14.5687L13.6125 17.0719C13.9219 17.2406 14.3156 16.9594 14.2313 16.6219L13.3594 11.3063L17.0438 7.50938C17.2688 7.25625 17.1563 6.77812 16.7906 6.72187Z"
//                           fill=""
//                         />
//                       </g>
//                       <defs>
//                         <clipPath id="clip0_375_9172">
//                           <rect width="18" height="18" fill="white" />
//                         </clipPath>
//                       </defs>
//                     </svg>

//                     <svg
//                       className="fill-[#FFA645]"
//                       width="18"
//                       height="18"
//                       viewBox="0 0 18 18"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <g clipPath="url(#clip0_375_9172)">
//                         <path
//                           d="M16.7906 6.72187L11.7 5.93438L9.39377 1.09688C9.22502 0.759375 8.77502 0.759375 8.60627 1.09688L6.30002 5.9625L1.23752 6.72187C0.871891 6.77812 0.731266 7.25625 1.01252 7.50938L4.69689 11.3063L3.82502 16.6219C3.76877 16.9875 4.13439 17.2969 4.47189 17.0719L9.05627 14.5687L13.6125 17.0719C13.9219 17.2406 14.3156 16.9594 14.2313 16.6219L13.3594 11.3063L17.0438 7.50938C17.2688 7.25625 17.1563 6.77812 16.7906 6.72187Z"
//                           fill=""
//                         />
//                       </g>
//                       <defs>
//                         <clipPath id="clip0_375_9172">
//                           <rect width="18" height="18" fill="white" />
//                         </clipPath>
//                       </defs>
//                     </svg>

//                     <svg
//                       className="fill-gray-4"
//                       width="18"
//                       height="18"
//                       viewBox="0 0 18 18"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <g clipPath="url(#clip0_375_9172)">
//                         <path
//                           d="M16.7906 6.72187L11.7 5.93438L9.39377 1.09688C9.22502 0.759375 8.77502 0.759375 8.60627 1.09688L6.30002 5.9625L1.23752 6.72187C0.871891 6.77812 0.731266 7.25625 1.01252 7.50938L4.69689 11.3063L3.82502 16.6219C3.76877 16.9875 4.13439 17.2969 4.47189 17.0719L9.05627 14.5687L13.6125 17.0719C13.9219 17.2406 14.3156 16.9594 14.2313 16.6219L13.3594 11.3063L17.0438 7.50938C17.2688 7.25625 17.1563 6.77812 16.7906 6.72187Z"
//                           fill=""
//                         />
//                       </g>
//                       <defs>
//                         <clipPath id="clip0_375_9172">
//                           <rect width="18" height="18" fill="white" />
//                         </clipPath>
//                       </defs>
//                     </svg>

//                     <svg
//                       className="fill-gray-4"
//                       width="18"
//                       height="18"
//                       viewBox="0 0 18 18"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <g clipPath="url(#clip0_375_9172)">
//                         <path
//                           d="M16.7906 6.72187L11.7 5.93438L9.39377 1.09688C9.22502 0.759375 8.77502 0.759375 8.60627 1.09688L6.30002 5.9625L1.23752 6.72187C0.871891 6.77812 0.731266 7.25625 1.01252 7.50938L4.69689 11.3063L3.82502 16.6219C3.76877 16.9875 4.13439 17.2969 4.47189 17.0719L9.05627 14.5687L13.6125 17.0719C13.9219 17.2406 14.3156 16.9594 14.2313 16.6219L13.3594 11.3063L17.0438 7.50938C17.2688 7.25625 17.1563 6.77812 16.7906 6.72187Z"
//                           fill=""
//                         />
//                       </g>
//                       <defs>
//                         <clipPath id="clip0_375_9172">
//                           <rect width="18" height="18" fill="white" />
//                         </clipPath>
//                       </defs>
//                     </svg>
//                   </div>

//                   <span>
//                     <span className="font-medium text-dark dark:text-gray-5">
//                       {" "}
//                       4.7 Rating{" "}
//                     </span>
//                     <span className="text-dark-2 dark:text-gray-5">
//                       {" "}
//                       (5 reviews){" "}
//                     </span>
//                   </span>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <CircleCheck size={20} className="text-green" />

//                   <span className="font-medium text-dark dark:text-gray-5">
//                     In Stock{" "}
//                   </span>
//                 </div>
//               </div>

//               <p>
//                 Lorem Ipsum is simply dummy text of the printing and typesetting
//                 industry. Lorem Ipsum has.
//               </p>

//               <div className="flex flex-wrap justify-between gap-5 mt-6 mb-7.5">
//                 <div>
//                   <h4 className="font-semibold text-lg text-dark dark:text-white mb-3.5">
//                     Price
//                   </h4>

//                   <span className="flex items-center gap-2">
//                     <span className="font-semibold text-dark dark:text-gray-3 text-xl xl:text-heading-4">
//                       ${product.discountedPrice}
//                     </span>
//                     <span className="font-medium text-dark-4 dark:text-gray-6 text-lg xl:text-2xl line-through">
//                       ${product.price}
//                     </span>
//                   </span>
//                 </div>

//                 <div>
//                   <h4 className="font-semibold text-lg text-dark dark:text-white mb-3.5">
//                     Quantity
//                   </h4>

//                   <div className="flex items-center gap-3">
//                     <button
//                       onClick={() => quantity > 1 && setQuantity(quantity - 1)}
//                       aria-label="button for remove product"
//                       className="flex items-center justify-center w-10 h-10 rounded-[5px] bg-gray-2 dark:bg-dark-3 dark:text-white text-dark ease-out duration-200 hover:text-pink dark:hover:text-pink "
//                       disabled={quantity < 0 && true}
//                     >
//                       <Minus size={22} />
//                     </button>

//                     <span
//                       className="flex items-center justify-center w-20 h-10 rounded-[5px] border border-gray-4 bg-white dark:bg-dark-3 dark:text-white font-medium text-dark"
//                       x-text="quantity"
//                     >
//                       {quantity}
//                     </span>

//                     <button
//                       onClick={() => setQuantity(quantity + 1)}
//                       aria-label="button for add product"
//                       className="flex items-center justify-center w-10 h-10 rounded-[5px] bg-gray-2 dark:bg-dark-3 dark:text-white text-dark ease-out duration-200 hover:text-pink dark:hover:text-pink "
//                     >
//                       <Plus size={22} />
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex flex-wrap items-center gap-4">
//                 <button
//                   disabled={quantity === 0 && true}
//                   onClick={() => handleAddToCart()}
//                   className={`inline-flex font-medium text-white bg-pink py-3 px-7 rounded-md ease-out duration-200 hover:bg-pink-dark
//                   `}
//                 >
//                   Add to Cart
//                 </button>

//                 <button
//                   className={`inline-flex items-center gap-2 font-medium text-white bg-dark py-3 px-6 rounded-md ease-out duration-200 hover:bg-opacity-95 `}
//                 >
//                   <svg
//                     className="fill-current"
//                     width="20"
//                     height="20"
//                     viewBox="0 0 20 20"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       clipRule="evenodd"
//                       d="M4.68698 3.68688C3.30449 4.31882 2.29169 5.82191 2.29169 7.6143C2.29169 9.44546 3.04103 10.8569 4.11526 12.0665C5.00062 13.0635 6.07238 13.8897 7.11763 14.6956C7.36588 14.8869 7.61265 15.0772 7.85506 15.2683C8.29342 15.6139 8.68445 15.9172 9.06136 16.1374C9.43847 16.3578 9.74202 16.4584 10 16.4584C10.258 16.4584 10.5616 16.3578 10.9387 16.1374C11.3156 15.9172 11.7066 15.6139 12.145 15.2683C12.3874 15.0772 12.6342 14.8869 12.8824 14.6956C13.9277 13.8897 14.9994 13.0635 15.8848 12.0665C16.959 10.8569 17.7084 9.44546 17.7084 7.6143C17.7084 5.82191 16.6955 4.31882 15.3131 3.68688C13.97 3.07295 12.1653 3.23553 10.4503 5.01733C10.3325 5.13974 10.1699 5.20891 10 5.20891C9.83012 5.20891 9.66754 5.13974 9.54972 5.01733C7.83474 3.23553 6.03008 3.07295 4.68698 3.68688ZM10 3.71573C8.07331 1.99192 5.91582 1.75077 4.16732 2.55002C2.32061 3.39415 1.04169 5.35424 1.04169 7.6143C1.04169 9.83557 1.9671 11.5301 3.18062 12.8966C4.15241 13.9908 5.34187 14.9067 6.39237 15.7155C6.63051 15.8989 6.8615 16.0767 7.0812 16.2499C7.50807 16.5864 7.96631 16.9453 8.43071 17.2166C8.8949 17.4879 9.42469 17.7084 10 17.7084C10.5754 17.7084 11.1051 17.4879 11.5693 17.2166C12.0337 16.9453 12.492 16.5864 12.9188 16.2499C13.1385 16.0767 13.3695 15.8989 13.6077 15.7155C14.6582 14.9067 15.8476 13.9908 16.8194 12.8966C18.0329 11.5301 18.9584 9.83557 18.9584 7.6143C18.9584 5.35424 17.6794 3.39415 15.8327 2.55002C14.0842 1.75077 11.9267 1.99192 10 3.71573Z"
//                       fill=""
//                     />
//                   </svg>
//                   Add to Wishlist
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuickViewModal;
