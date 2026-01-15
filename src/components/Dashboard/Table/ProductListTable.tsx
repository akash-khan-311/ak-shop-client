import React from "react";

type Props = {
  products: any;
  handleSelectAll: any;
  isAllSelected: any;
  isSomeSelected: any;
  handleSelectProduct: any;
  selectedProducts: any;
};

export default function ProductListTable({
  products,
  handleSelectAll,
  isAllSelected,
  isSomeSelected,
  handleSelectProduct,
  selectedProducts,
}: Props) {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-slate-700">
          <th className="text-left p-4 w-12">
            <input
              type="checkbox"
              className="w-3.5 h-3.5 rounded border-2 border-gray-5 bg-transparent cursor-pointer accent-green checked:bg-green checked:border-green"
              checked={isAllSelected}
              ref={(input) => {
                if (input) input.indeterminate = isSomeSelected;
              }}
              onChange={handleSelectAll}
            />
          </th>
          <th className="text-left p-4 text-slate-300 font-medium">Products</th>
          <th className="text-left p-4 text-slate-300 font-medium">Category</th>
          <th className="text-left p-4 text-slate-300 font-medium">Brand</th>
          <th className="text-left p-4 text-slate-300 font-medium">Price</th>
          <th className="text-left p-4 text-slate-300 font-medium">Stock</th>
          <th className="text-left p-4 text-slate-300 font-medium">
            Created At
          </th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr
            key={product.id}
            className="border-b border-slate-700/50 hover:bg-slate-700/30 transition"
          >
            <td className="p-4">
              <input
                type="checkbox"
                className="w-3.5 h-3.5 rounded border-2 border-gray-5 bg-transparent cursor-pointer accent-green checked:bg-green checked:border-green"
                checked={selectedProducts.includes(product.id)}
                onChange={() => handleSelectProduct(product.id)}
              />
            </td>
            <td className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 dark:bg-gray-7 bg-gray-2 rounded-lg flex items-center justify-center text-2xl">
                  {product.image}
                </div>
                <span className=" font-medium">{product.name}</span>
              </div>
            </td>
            <td className="p-4 text-slate-300">{product.category}</td>
            <td className="p-4 text-slate-300">{product.brand}</td>
            <td className="p-4  font-medium">
              ${product.price.toLocaleString()}
            </td>
            <td className="p-4">
              {product.stock > 0 ? (
                <>
                  <span className="px-3 py-1 bg-green/15 text-green rounded-full text-sm font-medium">
                    In stock
                  </span>
                </>
              ) : (
                <>
                  <span className="px-3 py-1 bg-red-dark/15 text-red-dark rounded-full text-sm font-medium">
                    Out of stock
                  </span>
                </>
              )}
            </td>
            <td className="p-4 text-slate-300">{product.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
