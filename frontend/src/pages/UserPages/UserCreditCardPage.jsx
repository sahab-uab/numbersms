import React, { useEffect, useState } from "react";
import axiosInstance from "../../Api/axios";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMessages,
  fetchTransactions,
} from "../../redux/singleUserTransation";
import ReactPaginate from "react-paginate";
import moment from "moment";

const UserCreditCardPage = () => {
  // credit
  const { token, user } = useSelector((state) => state.auth);
  const { transactions, loading, error, successMessage } = useSelector(
    (state) => state.credit
  );

  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const [shareModal, setShareModal] = useState(false); // For Share Credit Modal
  const [amount, setAmount] = useState("");
  const [gateway, setGateway] = useState("paypal");
  const [email, setEmail] = useState(""); // For email in share credit
  const [paymentLink, setPaymentLink] = useState(""); // To store the payment link
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [loadingShare, setLoadingShare] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5; // Set the number of items per page

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage || error) {
      setTimeout(() => dispatch(clearMessages()), 3000);
    }
  }, [successMessage, error, dispatch]);

  // Handle page change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Get the current page's transactions
  const currentTransactions = transactions?.data?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Handle Buy Credit
  const handleBuyCredit = async (e) => {
    e.preventDefault();
    setLoadingPayment(true);

    try {
      const response = await axiosInstance.post(
        "/payment",
        { amount: amount, gateway: gateway, user_id: user?.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const res = response.data;

      if (response.data.status === true) {
        setPaymentLink(response?.data?.payment_link);

        if (gateway === "stripe" || gateway === "paypal") {
          const link = response?.data?.payment_link;
          const paymentWindow = window.open(link, "_blank");
          paymentWindow.focus();
        }
      } else {
        alert("Error: " + response.data.message);
      }
    } catch (err) {
      console.error("Payment failed", err);
      alert("Payment failed. Please try again.");
    } finally {
      setLoadingPayment(false);
    }
  };

  // Handle Share Credit
  const handleShareCredit = async (e) => {
    e.preventDefault();
    setLoadingShare(true);

    try {
      const response = await axiosInstance.post("/app/share-token", {
        amount: amount,
        email: email,
      });

      if (response.data.status === true) {
        alert("Credit shared successfully.");
        setShareModal(false); // Close modal on success
      } else {
        alert("Error: " + response.data.message);
      }
    } catch (err) {
      console.error("Failed to share credit", err);
      alert("Failed to share credit. Please try again.");
    } finally {
      setLoadingShare(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Credit Management</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setModal(true)}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Buy Credit
          </button>
          <button
            onClick={() => setShareModal(true)}
            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition"
          >
            Share Credit
          </button>
        </div>
      </div>

      {successMessage && (
        <p className="text-green-600 text-center font-medium">
          {successMessage}
        </p>
      )}
      {error && <p className="text-red-600 text-center font-medium">{error}</p>}

      {/* Transactions Table */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        {loading ? (
          <p className="text-center text-gray-600 font-semibold">Loading...</p>
        ) : currentTransactions?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="px-4 py-2 text-left font-semibold">ID</th>
                  <th className="px-4 py-2 text-left font-semibold">Name</th>
                  <th className="px-4 py-2 text-left font-semibold">Credit</th>
                  <th className="px-4 py-2 text-left font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {currentTransactions?.map((transaction, index) => (
                  <tr
                    key={transaction.id}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="px-4 py-2">
                      {index + 1 + currentPage * itemsPerPage}
                    </td>
                    <td className="px-4 py-2">{transaction.username}</td>
                    <td className="px-4 py-2 font-semibold text-blue-600">
                      ${transaction.amount}
                    </td>
                    <td className="px-4 py-2">
                      {moment(transaction.updated_at).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-4 flex justify-center">
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={Math.ceil(transactions?.data?.length / itemsPerPage)}
                onPageChange={handlePageChange}
                containerClassName={"flex justify-center items-center"}
                pageClassName={"px-4 py-2 mx-1 cursor-pointer"}
                previousClassName={"px-4 py-2 mx-1 cursor-pointer"}
                nextClassName={"px-4 py-2 mx-1 cursor-pointer"}
                disabledClassName={"opacity-50 cursor-not-allowed"}
                activeClassName={"bg-blue-500 text-white"}
              />
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600 font-semibold">
            No transactions found.
          </p>
        )}
      </div>
      {/* Buy Credit Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Buy Credit
            </h2>

            <form onSubmit={handleBuyCredit}>
              <label className="block text-gray-700 font-medium">
                Amount:
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-blue-400"
                />
              </label>

              <label className="block text-gray-700 font-medium mt-4">
                Payment Gateway:
                <div className="mt-2">
                  <label className="inline-flex items-center mr-4">
                    <input
                      type="radio"
                      value="paypal"
                      checked={gateway === "paypal"}
                      onChange={(e) => setGateway(e.target.value)}
                      className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-400"
                    />
                    <span className="ml-2">PayPal</span>
                  </label>
                  <label className="inline-flex items-center mr-4">
                    <input
                      type="radio"
                      value="stripe"
                      checked={gateway === "stripe"}
                      onChange={(e) => setGateway(e.target.value)}
                      className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-400"
                    />
                    <span className="ml-2">Stripe</span>
                  </label>
                </div>
              </label>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setModal(false)}
                  className="px-4 py-2 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                >
                  {loadingPayment ? "Processing..." : "Confirm Purchase"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Share Credit Modal */}
      {shareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Share Credit
            </h2>

            <form onSubmit={handleShareCredit}>
              <label className="block text-gray-700 font-medium">
                Amount:
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-blue-400"
                />
              </label>

              <label className="block text-gray-700 font-medium mt-4">
                Email:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-blue-400"
                />
              </label>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setShareModal(false)}
                  className="px-4 py-2 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
                >
                  {loadingShare ? "Sharing..." : "Share Credit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCreditCardPage;
