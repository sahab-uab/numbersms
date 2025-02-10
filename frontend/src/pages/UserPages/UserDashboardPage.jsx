import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../redux/singleUserProfileSlice";
import { Link } from "react-router-dom";
import axiosInstance from "../../Api/axios";

import { HashLoader } from "react-spinners";
import { X } from "lucide-react";
const UserDashboardPage = () => {
  const { token, user } = useSelector((state) => state.auth);
  const { userData, loading } = useSelector((state) => state.userInfo);

  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [gateway, setGateway] = useState("paypal");
  const [email, setEmail] = useState("");

  const [loadingPayment, setLoadingPayment] = useState(false);
  const [loadingShare, setLoadingShare] = useState(false);

  useEffect(() => {
    dispatch(fetchUserProfile(token));
  }, [dispatch, token]);

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

      if (response.data.status === true) {
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
        dispatch(fetchUserProfile(token));
        setShareModal(false);
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
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen w-full">
          <HashLoader size={50} color="#4F46E5" loading={true} />
        </div>
      ) : (
        <div className="p-6 bg-gray-50 min-h-screen">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-semibold text-gray-800">
              User Dashboard
            </h1>
          </div>

          {/* User Info Section */}

          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Welcome, {userData?.data?.name}
            </h2>
            <p className="text-gray-600 mb-4">Email: {userData?.data?.email}</p>

            {/* Total Credit Section */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  Total Credit
                </h3>
                <p className="text-3xl font-bold text-green-600">
                  ${userData?.data?.coin}
                </p>
              </div>
              <button
                onClick={() => setModal(true)}
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
              >
                Add Credit
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Action 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <i className="fas fa-credit-card text-blue-500 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Manage Credit
              </h3>
              <p className="text-gray-600 mb-4">
                View and manage your available credit balance.
              </p>
              <Link
                to={"/user/credit"}
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
              >
                Go to Credit Management
              </Link>
            </div>

            {/* Action 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <i className="fas fa-share-alt text-green-500 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Share Credit
              </h3>
              <p className="text-gray-600 mb-4">
                Share your credit with others easily.
              </p>
              <button
                onClick={() => setShareModal(true)}
                className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
              >
                Share Credit
              </button>
            </div>

            {/* Action 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <i className="fas fa-history text-purple-500 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Transaction History
              </h3>
              <p className="text-gray-600 mb-4">
                Track your past transactions and payments.
              </p>
              <Link
                to={"/user/verification"}
                className="px-4 py-2 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition"
              >
                View History
              </Link>
            </div>
          </div>

          {modal && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Buy Credit
                  </h2>
                  <button
                    onClick={() => setModal(false)}
                    className="w-[30px] h-[30px] group flex items-center justify-center bg-gray-100 rounded-lg"
                  >
                    <X className="w-[15px] duration-700 group-hover:scale-[1.3]" />
                  </button>
                </div>
                <form onSubmit={handleBuyCredit}>
                  <label className="block text-gray-700 font-medium">
                    Amount:
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(parseFloat(e.target.value))}
                      required
                      min="2.50"
                      step="2.50"
                      readOnly
                      className="w-full outline-none px-3 py-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-blue-400"
                    />
                    {amount < 2.5 && (
                      <p className="text-red-500 text-sm mt-1">
                        Minimum purchase amount is $2.50
                      </p>
                    )}
                  </label>

                  {/* Fixed Amount Options */}
                  <div className="mt-2">
                    <p className="text-gray-700 font-medium">Quick Select:</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {[2.5, 5.0, 7.5, 10.0, 12.5, 20, 50, 100].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setAmount(amt)}
                          className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-300"
                        >
                          ${amt.toFixed(2)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Payment Gateway Options */}
                  <label className="block text-gray-700 font-medium mt-4">
                    Payment Gateway:
                    <div className="mt-2 flex items-center gap-x-2 justify-between">
                      <label className="inline-flex duration-300 hover:bg-gray-200 items-center mr-4 bg-gray-100 rounded-md px-3 py-2 w-full">
                        <input
                          type="radio"
                          value="paypal"
                          checked={gateway === "paypal"}
                          onChange={(e) => setGateway(e.target.value)}
                          className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-400"
                        />
                        <span className="ml-2">PayPal</span>
                      </label>
                      <label className="inline-flex duration-300 hover:bg-gray-200 items-center mr-4 bg-gray-100 rounded-md px-3 py-2 w-full">
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

                  {/* Buttons */}
                  <div className="flex justify-between mt-6">
                    <button
                      type="submit"
                      disabled={amount < 2.5}
                      className={`px-4 py-2 text-white font-semibold rounded-lg transition duration-300 w-full ${
                        amount < 2.5
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-600"
                      }`}
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
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-blue-400"
                  />
                  <label className="block text-gray-700 font-medium mt-4">
                    Email:
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-blue-400"
                  />
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
      )}
    </>
  );
};

export default UserDashboardPage;
