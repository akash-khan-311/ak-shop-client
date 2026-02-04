import React, { useEffect, useState } from "react";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import {
  useRemoveCartItemMutation,
  useUpdateCartItemMutation,
} from "@/redux/features/cart/cartApi";
import toast from "react-hot-toast";

const SingleItem = ({ item }) => {
  const { product, quantity, variantId } = item;

  const dispatch = useDispatch<AppDispatch>();
  const [updateCartItem, { isLoading: updating }] = useUpdateCartItemMutation();
  const [removeCartItem, { isLoading: removing }] = useRemoveCartItemMutation();

  const busy = updating || removing;
  const [localQty, setLocalQty] = useState(quantity);
  useEffect(() => {
    setLocalQty(quantity);
  }, [quantity]);

  const doUpdate = async (nextQty: number) => {
    try {
      await updateCartItem({
        productId: product?._id,
        quantity: nextQty,
        variantId: variantId ?? null,
      }).unwrap();
    } catch (e: any) {
      toast.error(e?.data?.message || "Failed to update quantity");
      setLocalQty(quantity); // rollback
    }
  };
  const handleMinus = async () => {
    if (busy) return;

    // qty 1 হলে minus এ remove করে দাও (Amazon style)
    if (quantity <= 1) {
      try {
        await removeCartItem({
          productId: product?._id,
          variantId: variantId ?? null,
        }).unwrap();
      } catch (e: any) {
        toast.error(e?.data?.message || "Failed to remove item");
      }
      return;
    }

    await doUpdate(quantity - 1);
  };
  const handlePlus = async () => {
    if (busy) return;
    await doUpdate(quantity + 1);
  };

  const handleRemove = async () => {
    if (busy) return;
    try {
      await removeCartItem({
        productId: product?._id,
        variantId: variantId ?? null,
      }).unwrap();
    } catch (e: any) {
      toast.error(e?.data?.message || "Failed to remove item");
    }
  };
  const handleInputChange = (val: string) => {
    // allow empty while typing
    if (val.trim() === "") {
      setLocalQty(NaN as any);
      return;
    }
    const n = parseInt(val, 10);
    setLocalQty(n);
  };

  const handleBlur = async () => {
    if (busy) return;

    if (!Number.isFinite(localQty)) {
      setLocalQty(quantity);
      return;
    }

    if (localQty <= 0) {
      await handleRemove();
      return;
    }

    const safeQty = Math.max(1, localQty);

    if (safeQty === quantity) return;

    await doUpdate(safeQty);
  };

  return (
    <div className="flex items-center border-t border-gray-3 dark:border-gray-6 py-5 px-7.5">
      <div className="min-w-[400px]">
        <div className="flex items-center justify-between gap-5">
          <div className="w-full flex items-center gap-5.5">
            <div className="flex p-3 items-center justify-center rounded-[5px] bg-gray-2 dark:bg-dark-3 max-w-[80px] w-full h-17.5">
              <Image
                width={200}
                height={200}
                src={product?.images?.[0]?.url || "/placeholder.png"}
                alt={product?.name || "product"}
              />
            </div>

            <div>
              <h3 className=" ease-out duration-200 hover:text-pink">
                <a href={`/shop/${product._id}`}> {product.name} </a>
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="min-w-[180px]">
        <p className="">৳ {product.price}</p>
      </div>

      <div className="min-w-[275px]">
        <div className="w-max flex items-center rounded-md border border-gray-3">
          <button
            onClick={handleMinus}
            disabled={busy}
            aria-label="button for remove product"
            className="flex items-center justify-center w-11.5 h-11.5 ease-out duration-200 hover:text-pink"
          >
            <Minus size={20} />
          </button>

          <input
            readOnly
            inputMode="numeric"
            value={Number.isFinite(localQty) ? String(localQty) : ""}
            onChange={(e) => handleInputChange(e.target.value)}
            onBlur={handleBlur}
            disabled={busy}
            className="flex items-center text-center justify-center w-16 h-11.5 border-x border-gray-4 dark:bg-dark-2"
          />

          <button
            onClick={handlePlus}
            disabled={busy}
            aria-label="button for add product"
            className="flex items-center justify-center w-11.5 h-11.5 ease-out duration-200 hover:text-pink"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      <div className="min-w-[200px]">
        <p className="">৳ {product.price * quantity}</p>
      </div>

      <div className="min-w-[50px] flex justify-end">
        <TooltipProvider delayDuration={1}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleRemove}
                disabled={busy}
                className="flex items-center justify-center rounded-lg max-w-[38px] w-full h-9.5 bg-gray-2 dark:bg-gray-7 border border-gray-3 ease-out duration-200 hover:bg-red-light-6 hover:border-red-light-4 hover:text-red disabled:opacity-50"
              >
                <Trash2 size={20} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Remove From Cart</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default SingleItem;
