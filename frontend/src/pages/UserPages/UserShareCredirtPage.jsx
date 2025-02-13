import { useState } from "react";
import axiosInstance from "../../Api/axios";

const UserShareCreditPage = () => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [loadingShare, setLoadingShare] = useState(false);

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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h1 className="text-2xl font-semibold text-center text-blue-600 mb-6">
          Share Credit
        </h1>
        <form onSubmit={handleShareCredit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount:
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loadingShare}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            {loadingShare ? "Loading" : "Share Credit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserShareCreditPage;
