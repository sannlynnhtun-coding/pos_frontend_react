import { useEffect } from "react";
import { useGetProductsQuery } from "../../redux/api/AuthApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductTable = () => {
  const { data, isSuccess } = useGetProductsQuery();
  const { pageNum, bgColor } = useSelector((state) => state.animateSlice);

  const navigate = useNavigate();
  const productLists = data?.data?.products;

  const productList = productLists?.slice(0, pageNum);

  useEffect(() => {
    window.focus();
    window.print();
    window.location.replace("/products");
  }, []);

  return (
    <div
      style={{
        backgroundColor: bgColor,
      }}
      className="flex absolute top-[0px] z-[99999] h-screen right-0 mt-[70px] w-full justify-start items-start"
    >
      <div id="catListTable" className="w-full text-sm text-gray-500">
        <table className="w-full text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <thead>
            <tr>
              <th scope="col" className="p-4">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Product Code
              </th>
              <th scope="col" className="px-6 py-3">
                Product Name
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Product Category Code
              </th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product) => (
              <tr key={product.productId} className="border-b border-gray-200">
                <td className="pl-5">{product.productId}</td>
                <td className="pl-14">{product.productCode}</td>
                <td className="pl-14">{product.productName}</td>
                <td className="pl-10">{product.price}</td>
                <td className="pl-16">{product.categoryCode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
