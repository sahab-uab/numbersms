import { useEffect, useState } from "react";
import axiosInstance from "../../Api/axios";
import { toast } from "react-toastify";

const AdminDiscountPage = () => {
  const [discounts, setDiscounts] = useState({});

  const [discountValue, setDiscountValue] = useState(0);

  useEffect(() => {
    axiosInstance
      .get("/admin/discount-manegar/get")
      .then((res) => {
        if (res.data?.data?.discount) {
          setDiscountValue(res?.data?.data?.discount);
        }
        setDiscounts(res.data);
      })
      .catch((error) => {
        console.error("Error fetching discount data:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = axiosInstance
      .post("/admin/discount-manegar", {
        discount: discountValue,
      })
      .then((res) => {
        toast.success(res.data.message, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Add Discount
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="discountValue"
            className="block text-sm font-medium text-gray-700"
          >
            Discount Value
          </label>
          <input
            type="number"
            id="discountValue"
            value={discountValue}
            onChange={(e) => setDiscountValue(e.target.value)}
            required
            placeholder="Enter discount value"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add Discount
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminDiscountPage;
