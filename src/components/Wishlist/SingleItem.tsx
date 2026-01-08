import Image from "next/image";
import { CircleAlert, CircleX } from "lucide-react";
import { useAppDispatch } from "@/redux/hook";
import { removeFromWishlist } from "@/redux/features/wishListsSlice";

const SingleItem = ({ item }) => {
  const dispatch = useAppDispatch();
  const handleRemoveFromWishlist = () => {
    dispatch(removeFromWishlist(item.id));
  };

  const handleAddToCart = () => {
    // dispatch(
    //   addItemToCart({
    //     ...item,
    //     quantity: 1,
    //   })
    // );
  };

  return (
    <div className="flex items-center border-t border-gray-3 py-5 px-10">
      <div className="min-w-[83px]">
        <button
          onClick={() => handleRemoveFromWishlist()}
          aria-label="button for remove product from wishlist"
          className=""
        >
          <CircleX
            size={30}
            strokeWidth={1}
            className="  hover:text-red dark:hover:text-red transition-all duration-200"
          />
        </button>
      </div>

      <div className="min-w-[387px]">
        <div className="flex items-center justify-between gap-5">
          <div className="w-full flex items-center gap-5.5">
            <div className="flex items-center justify-center rounded-[5px] bg-gray-2 max-w-[80px] w-full h-17.5">
              <Image src={item.images} alt="product" width={200} height={200} />
            </div>

            <div>
              <h3 className=" ease-out duration-200 hover:text-pink">
                <a href="#"> {item.title} </a>
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="min-w-[205px]">
        <p className="">${item.price}</p>
      </div>

      <div className="min-w-[265px]">
        <div className="flex items-center gap-1.5">
          {item.inStock ? (
            <p className="text-green">In Stock</p>
          ) : (
            <div className="flex items-center gap-x-3 text-red">
              <CircleAlert size={22} />
              <span>Out of Stock</span>
            </div>
          )}
        </div>
      </div>

      <div className="min-w-[150px] flex justify-end">
        <button
          disabled={item.inStock ? false : true}
          onClick={() => handleAddToCart()}
          className="disabled:cursor-not-allowed disabled:hover:bg-gray-6 disabled:bg-gray-6 disabled:hover:text-dark inline-flex text-dark hover:text-white bg-gray-1 border border-gray-3 py-2.5 px-6 rounded-md ease-out duration-200 hover:bg-pink hover:border-gray-3"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default SingleItem;
