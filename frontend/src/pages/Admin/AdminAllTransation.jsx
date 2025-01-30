import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchTransactions } from "../../slices/transationSlices";

const AdminAllTransaction = () => {
  const dispatch = useDispatch();
  const { transactions, totalPages, loading, error } = useSelector(
    (state) => state.transation
  );
  const data = useSelector((state) => state.transation);

  console.log(data);
  console.log(transactions.data);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchTransactions(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          All Transactions
        </h2>

        {/* ✅ Transaction Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-3 text-left border">Transaction ID</th>
                <th className="p-3 text-left border">User ID</th>
                <th className="p-3 text-left border">Amount</th>
                <th className="p-3 text-left border">Status</th>
                <th className="p-3 text-left border">Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-5">
                    <Loader2 className="animate-spin mx-auto" size={24} />
                  </td>
                </tr>
              ) : transactions?.data?.length > 0 ? (
                transactions.data.map((transaction, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="p-3 border">{transaction.id}</td>
                    <td className="p-3 border">{transaction.username}</td>
                    <td className="p-3 border text-green-600 font-bold">
                      ${transaction.amount}
                    </td>
                    <td
                      className={`p-3 border font-bold ${
                        transaction.status === "Completed"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {transaction.status}
                    </td>
                    <td className="p-3 border">
                      {new Date(transaction.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-5">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ✅ Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <ChevronLeft size={20} /> Prev
            </button>

            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage >= totalPages}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Next <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAllTransaction;
