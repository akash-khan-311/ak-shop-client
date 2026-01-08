import React, { useRef, useEffect } from "react";
import OrderDetails from "./OrderDetails";
import EditOrder from "./EditOrder";
import { CircleX } from "lucide-react";

const OrderModal = ({ showDetails, showEdit, toggleModal, order }: any) => {
  if (!showDetails && !showEdit) {
    return null;
  }

  return (
    <>
      <div
        className={`backdrop-filter-sm visible fixed left-0 top-0 z-[99999] flex min-h-screen w-full justify-center items-center bg-[#000]/70 px-4 py-8 sm:px-8`}
      >
        <div className="shadow-7 relative w-full max-w-[600px] h-[242px] scale-100 transform rounded-[15px] bg-white dark:bg-dark transition-all flex flex-col justify-center items-center">
          <button
            onClick={() => toggleModal(false)}
            className="text-gray-5 absolute -right-6 -top-6 z-[9999] flex h-11.5 w-11.5 items-center justify-center rounded-full border-2 border-stroke bg-pink hover:text-white"
          >
            <CircleX size={40} strokeWidth={1} />
          </button>

          <>
            {showDetails && <OrderDetails orderItem={order} />}

            {showEdit && <EditOrder order={order} toggleModal={toggleModal} />}
          </>
        </div>
      </div>
    </>
  );
};

export default OrderModal;
