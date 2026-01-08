import { Eye, SquarePen } from "lucide-react";
import React from "react";

const OrderActions = ({ toggleEdit, toggleDetails }: any) => {
  return (
    <>
      <button onClick={toggleDetails} className="rounded-sm p-2">
        <Eye size={20} className="" />
      </button>
      <button onClick={toggleEdit} className=" rounded-sm p-2">
        <SquarePen size={20} />
      </button>
    </>
  );
};

export default OrderActions;
