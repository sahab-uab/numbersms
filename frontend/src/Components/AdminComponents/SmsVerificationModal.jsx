import { X } from "lucide-react";
import { useState, useEffect } from "react";
import axiosInstance from "../../Api/axios";

const SmsVerificationModal = ({ verifactionData, setNewModal }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [smsNumber, setSmsNumber] = useState(
    `+1 ${verifactionData?.data?.number}`
  );

  const [otp, setOtp] = useState(null);
  // Function to calculate time left
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const endTime = new Date(verifactionData?.data?.endsAt).getTime(); // endAt should be in the correct format (ISO 8601)

    // If endAt is not available, use createdAt + a 5-minute limit as fallback
    if (!endTime) {
      const createdAtTime = new Date(
        verifactionData?.data?.createdAt
      ).getTime();
      const fallbackEndTime = createdAtTime + 5 * 60 * 1000; // Add 5 minutes to createdAt
      return fallbackEndTime - now;
    }

    return endTime - now;
  };

  const closeModal = () => {
    setNewModal(false);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(smsNumber);
  };

  useEffect(() => {
    const initialTimeLeft = calculateTimeLeft();
    setTimeLeft(initialTimeLeft > 0 ? initialTimeLeft : 0);
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0 || otp) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1000;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [verifactionData, otp]);

  //
  useEffect(() => {
    // Set up the interval
    const intervalId = setInterval(async () => {
      try {
        // Make the API call
        const response = await axiosInstance.post("/getotp", {
          href: verifactionData?.data?.sms?.href,
          methods: verifactionData?.data?.sms?.method,
        });

        const data = response?.data?.data?.data;

        // Check if data exists and is not empty
        if (data && data.length > 0) {
          let smsContent = data[0];

          // Ensure smsContent is available before trying to access its properties
          if (smsContent) {
            setOtp(smsContent?.smsContent); // Safely access smsContent
          }
        }

        // Stop the interval once the OTP is fetched
        if (response?.data?.data?.count === 1) {
          clearInterval(intervalId);
        }
      } catch (error) {
        console.error("Error fetching OTP:", error);
      }
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [verifactionData]);
  const formatTimeLeft = () => {
    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center border-b border-gray-200 pb-4 justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            <span className="uppercase">
              {verifactionData?.data?.serviceName}
            </span>
            - SMS Verification
          </h2>

          <button
            onClick={() => closeModal()}
            className="font-semibold text-2xl w-[40px] h-[40px] flex items-center justify-center bg-gray-100 text-gray-400"
          >
            <span>
              <X />
            </span>
          </button>
        </div>

        {/* Phone number display */}
        <div className="flex flex-col items-start space-y-2 mb-4">
          <span className="text-gray-800">Use This Number:</span>
          <div className="flex justify-between bg-gray-100 rounded-lg py-2 px-4 w-full max-w-full">
            {!otp ? (
              <>
                <span className="text-gray-800">{smsNumber}</span>
                <button
                  onClick={handleCopyClick}
                  className="ml-2 text-blue-500 border-l border-gray-400 pl-3"
                >
                  Copy
                </button>
              </>
            ) : (
              <p className="text-center w-full">complet</p>
            )}
          </div>
        </div>

        {/* Price and time left */}
        <div className="flex justify-between mb-4">
          <div className="text-gray-700">
            <p>
              Time Left:{" "}
              <span className="font-semibold">{formatTimeLeft()}</span>
            </p>
          </div>
        </div>

        {/* Warning Message */}

        <div className="bg-yellow-100 p-3 rounded-lg mb-4 text-yellow-700">
          {!otp ? (
            <p>
              Please request only one code. Multiple requests may result in
              issues with your code.
            </p>
          ) : (
            <p>{otp}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmsVerificationModal;
