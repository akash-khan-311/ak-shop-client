import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";

import AddToCartButton from "./AddToCartButton";
import AddToWishListButton from "./AddToWishListButton";

const SingleListItem = ({ item }: any) => {
  return (
    <div className="group rounded-lg bg-white dark:bg-dark-2 shadow-xl relative">
      <div className="flex">
        <div className="shadow-list relative overflow-hidden flex flex-col items-center justify-center max-w-[270px] w-full sm:min-h-[270px] p-4">
          <div className="flex flex-col justify-center items-center w-full h-full overflow-hidden">
            <Image
              src={item?.images[0].url}
              alt={item.productName}
              width={250}
              height={250}
              className="w-full h-full object-contain hover:scale-110 ease-in duration-300 overflow-hidden"
            />
          </div>
          <div className="flex justify-center items-center w-full  mt-10">
            <AddToCartButton product={item} />
          </div>
        </div>

        <div className="w-full flex flex-col gap-5 sm:flex-row sm:items-center justify-center sm:justify-between py-5 px-4 sm:px-7.5 lg:pl-11 lg:pr-12">
          <div>
            <h3 className="font-medium text-2xl text-dark dark:text-white ease-out duration-200 hover:text-pink mb-1.5">
              <Link href={`/shop-details/${item._id}`}>{item.productName}</Link>
            </h3>
            <p>{item.description}</p>
            <span className="flex items-center gap-2 font-medium text-lg">
              <span className="text-dark dark:text-gray-3">৳ {item.price}</span>
              <span className="text-dark-4 line-through dark:text-gray-6">
                ৳ {item.regularPrice}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2.5 mb-2">
            {/* Rating */}
            <div className="flex items-center gap-1.5 mb-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 sm:w-4 sm:h-4 ${i < item.rating ? "fill-yellow-400 text-yellow" : "text-gray-6"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-5">({0})</span>
            </div>
          </div>
        </div>
      </div>
      {/* Hover Action Buttons */}
      <div className="absolute right-5 top-3 flex flex-col gap-2 transform   transition-all duration-300">
        <AddToWishListButton product={item} />
      </div>
    </div>
  );
};

export default SingleListItem;
