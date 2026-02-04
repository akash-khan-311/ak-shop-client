import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  useRemoveCartItemMutation,
  useUpdateCartItemMutation,
} from "@/redux/features/cart/cartApi";
import toast from "react-hot-toast";

const SingleItem = ({ item }) => {
  const { product, quantity, variantId } = item;
  console.log("this is item", product);
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
    <div className="flex items-center justify-between gap-5 p-3 bg-gray-5/10 rounded-md shadow-[0px_0px_12px_0px_rgba(0,_0,_0,_0.1)]">
      <div className="w-full flex items-center gap-6 ">
        <div className="flex items-center justify-center rounded-[10px] bg-gray-3 max-w-[90px] w-full h-22.5 overflow-hidden">
          <Image
            src={product?.images?.[0]?.url || "/placeholder.png"}
            alt={product?.name || "product"}
            width={90}
            height={90}
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Link href={`/product/${product?._id}`}>
            <h3 className="font-medium text-xl mb-1 ease-out duration-200 hover:text-pink">
              {product?.name}
            </h3>
          </Link>

          <p className="text-custom-sm">Price: ৳{product?.price}</p>

          {/* ✅ Quantity Control */}
          <div className="inline-flex items-center gap-2">
            <button
              type="button"
              onClick={handleMinus}
              disabled={busy}
              className="h-7 w-9 flex justify-center items-center rounded-md border border-gray-3 bg-gray-1 dark:bg-gray-7 hover:bg-gray-2 disabled:opacity-50"
            >
              <Minus size={15} />
            </button>

            <input
              readOnly
              inputMode="numeric"
              value={Number.isFinite(localQty) ? String(localQty) : ""}
              onChange={(e) => handleInputChange(e.target.value)}
              onBlur={handleBlur}
              disabled={busy}
              className="h-7 w-14 rounded-md border border-gray-3 bg-white dark:bg-gray-7 text-center disabled:opacity-50"
            />

            <button
              type="button"
              onClick={handlePlus}
              disabled={busy}
              className="h-7 w-9 flex justify-center items-center rounded-md border border-gray-3 bg-gray-1 dark:bg-gray-7 hover:bg-gray-2 disabled:opacity-50"
            >
              <Plus size={15} />
            </button>
          </div>
        </div>
      </div>
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
  );
};

export default SingleItem;
