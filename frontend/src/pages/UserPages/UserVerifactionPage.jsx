import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserSmsFetching } from "../../redux/getUserSmsHistorySlice";
import { allServicFetching } from "../../redux/getServiceSlice";

const UserVerificationPage = () => {
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false); // State to handle modal visibility

  const { data } = useSelector((state) => state.service.items);

  console.log(data);

  useEffect(() => {
    dispatch(UserSmsFetching());
    dispatch(allServicFetching());
  }, [dispatch]);

  return (
    <div>
      <div className="mt-10 mx-5">
        <button
          onClick={() => setModal(true)} // Open modal when clicked
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Create Verification
        </button>
      </div>

      {/* Conditional Rendering of Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[60%]">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Verification Modal
            </h2>
            <p className="text-gray-600 mb-4">
              Create verification for the user.
            </p>

            {/* Verification Content */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setModal(false)} // Close modal when clicked
                className="px-4 py-2 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500 transition"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserVerificationPage;
