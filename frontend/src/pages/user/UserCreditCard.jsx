import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  buyCredit,
  clearMessages,
  fetchTransactions,
} from "../../slices/creditSlice";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("your-stripe-public-key"); // Replace with your Stripe public key

const UserCreditCard = () => {
  const dispatch = useDispatch();
  const { transactions, loading, error, successMessage } = useSelector(
    (state) => state.credit
  );

  const [modal, setModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [getway, setGetway] = useState("PayPal");
  const [status, setStatus] = useState(true);
  const [showPayPal, setShowPayPal] = useState(false);
  const [showStripe, setShowStripe] = useState(false);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage || error) {
      setTimeout(() => dispatch(clearMessages()), 3000);
    }
  }, [successMessage, error, dispatch]);

  const handleBuyCredit = async (e) => {
    e.preventDefault();

    if (getway === "PayPal") {
      setShowPayPal(true);
      setShowStripe(false);
    } else if (getway === "Stripe") {
      setShowStripe(true);
      setShowPayPal(false);
      handleStripePayment();
    } else {
      dispatch(buyCredit({ amount, getway, status }));
      setModal(false);
      setAmount("");
    }
  };

  // Stripe Payment
  const handleStripePayment = async () => {
    const stripe = await stripePromise;
    const response = await fetch("/api/stripe/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    const session = await response.json();
    if (session.url) {
      window.location.href = session.url; // Redirect to Stripe checkout
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
          <button className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition">
            Share Credit
          </button>
        </div>
      </div>

      {/* Success/Error Messages */}
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
        ) : transactions.length > 0 ? (
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
                {transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="px-4 py-2">{transaction.id}</td>
                    <td className="px-4 py-2">{transaction.name}</td>
                    <td className="px-4 py-2 font-semibold text-blue-600">
                      ${transaction.amount}
                    </td>
                    <td className="px-4 py-2">{transaction.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                <select
                  value={getway}
                  onChange={(e) => setGetway(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-blue-400"
                >
                  <option value="PayPal">PayPal</option>
                  <option value="Stripe">Stripe</option>
                  <option value="Bank">Bank Transfer</option>
                </select>
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
                  Confirm Purchase
                </button>
              </div>
            </form>

            {/* PayPal Button */}
            {showPayPal && (
              <PayPalScriptProvider
                options={{ "client-id": "your-paypal-client-id" }}
              >
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [{ amount: { value: amount } }],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then(() => {
                      dispatch(buyCredit({ amount, getway, status }));
                      setModal(false);
                    });
                  }}
                />
              </PayPalScriptProvider>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCreditCard;
