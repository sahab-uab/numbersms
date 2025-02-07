import { X } from "lucide-react";
import { useState, useEffect } from "react";
import axiosInstance from "../../Api/axios";
import { toast } from "react-toastify";
import { UserSmsFetching } from "../../redux/getUserSmsHistorySlice";
import { useDispatch } from "react-redux";

const SmsVerificationModal = ({ verifactionData, setNewModal }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [smsNumber, setSmsNumber] = useState(
    `+1 ${verifactionData?.data?.data?.number}`
  );

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [otp, setOtp] = useState(null);
  // Function to calculate time left
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const endTime = new Date(verifactionData?.data?.data?.endsAt).getTime(); // endAt should be in the correct format (ISO 8601)

    // If endAt is not available, use createdAt + a 5-minute limit as fallback
    if (!endTime) {
      const createdAtTime = new Date(
        verifactionData?.data?.data?.createdAt
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

  useEffect(() => {
    // Set up the interval
    const intervalId = setInterval(async () => {
      try {
        // Make the API call
        await axiosInstance
          .post("/getotp", {
            id: verifactionData?.data?.id,
          })
          .then((res) => {
            console.log(res.data.data);
            if (res.data.status) {
              let smsContent = res?.data?.data;

              if (smsContent) {
                setOtp(smsContent);
              }
            }
            if (res.data.status == true) {
              clearInterval(intervalId);
            }
          });
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

  const cancleUrl = async () => {
    setLoading(true);
    try {
      await axiosInstance
        .post("/cancel-services", {
          id: verifactionData.data.id,
        })
        .then((res) => {
          toast.success(res.data.message);
        });
      dispatch(UserSmsFetching());
      setLoading(false);
      setNewModal(false);
    } catch (error) {
      toast.error("Server Error");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center border-b border-gray-200 pb-4 justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            <span className="uppercase">
              {verifactionData?.data?.data?.serviceName}
            </span>{" "}
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

        {!otp && (
          <button
            onClick={() => cancleUrl()}
            disabled={loading}
            className="w-full h-[42px] flex items-center justify-center bg-red-100 text-red-600 px-2 mt-5 uppercase font-semibold "
          >
            {loading ? <>Processing....</> : <>cancle</>}
          </button>
        )}
      </div>
    </div>
  );
};

export default SmsVerificationModal;
