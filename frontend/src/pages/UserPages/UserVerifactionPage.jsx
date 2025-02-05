import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserSmsFetching } from "../../redux/getUserSmsHistorySlice";
import { allServicFetching } from "../../redux/getServiceSlice";
import { PinIcon } from "lucide-react";
import { addToPin } from "../../redux/pinnedSlice";
import axiosInstance from "../../Api/axios";
import axios from "axios";

const UserVerificationPage = () => {
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);

  const { service, loading } = useSelector((state) => state.service);

  const data = useSelector((state) => state.pinnedService);

  const [verifactionData, setVerifactionData] = useState(null);

  console.log(service);

  useEffect(() => {
    dispatch(UserSmsFetching());
    dispatch(allServicFetching());
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState("");

  // Log the services data to inspect the structure
  console.log("Services data:", service?.data);

  const filteredServices =
    service?.data && service.data.length > 0
      ? service.data.filter((service) =>
          service?.service?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  const verifactionpoll = async (verifactionData) => {
    const href = verifactionData?.data?.data?.href;

    if (!href) {
      console.log("No href found in the verification data.");
      return;
    }
    console.log("Verification href:", href);
    try {
      const response = await axios.post(
        "https://server.sms.numbersms.com/api/start_polling",
        { verification_href: href },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Polling started:", response.data);
    } catch (error) {
      console.error("Error starting the polling:", error);
      if (error.response) {
        console.error("Response Error:", error.response.data);
      } else if (error.request) {
        console.error("Request Error:", error.request);
      } else {
        console.error("Error Message:", error.message);
      }
    }
  };

  useEffect(() => {
    if (verifactionData) {
      verifactionpoll(verifactionData);
    }
  }, [verifactionData]);

  const addToPinFuntion = (service) => {
    dispatch(addToPin(service));
  };

  const createVerification = async (service) => {
    console.log(service.id);

    try {
      const response = await axiosInstance.post("/create-verify", {
        id: service?.id,
      });

      setVerifactionData(response.data);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <div>
      <div className="mt-10 mx-5">
        <button
          onClick={() => setModal(true)}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Create Verification
        </button>
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[50%]">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              SMS Verifications
            </h2>

            {loading ? (
              <div>Loading....</div>
            ) : (
              <div>
                {/* Search Input */}
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="h-72 overflow-y-auto">
                  <ul>
                    {filteredServices?.length > 0 ? (
                      filteredServices.map((service, index) => (
                        <li
                          key={index}
                          className="grid grid-cols-3 items-center py-2 border-b border-gray-200"
                        >
                          <button
                            onClick={() => createVerification(service)}
                            className="flex gap-2"
                          >
                            {service.image ? (
                              <img
                                src={service.image}
                                alt=""
                                className="w-20 h-20 object-cover"
                              />
                            ) : (
                              <img
                                src={
                                  "https://static.vecteezy.com/system/resources/previews/002/212/346/original/line-icon-for-demo-vector.jpg"
                                }
                                alt=""
                                className="w-10 h-10 object-cover"
                              />
                            )}

                            <span>{service.service}</span>
                          </button>
                          <div className="text-gray-600">
                            ${service.selling_price}
                          </div>
                          <button
                            onClick={() => addToPinFuntion(service)}
                            className="text-gray-600"
                          >
                            <PinIcon />
                          </button>
                        </li>
                      ))
                    ) : (
                      <li className="text-center py-2 text-gray-600">
                        No services found
                      </li>
                    )}
                  </ul>
                </div>

                {/* Modal Actions */}
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
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserVerificationPage;
