import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserSmsFetching } from "../../redux/getUserSmsHistorySlice";
import { allServicFetching } from "../../redux/getServiceSlice";
import { X, Star, StarOff } from "lucide-react";
import { addToPin, removeTopin } from "../../redux/pinnedSlice";
import axiosInstance from "../../Api/axios";
import SmsVerificationModal from "../../Components/AdminComponents/SmsVerificationModal";
import moment from "moment";
import ReactPaginate from "react-paginate";
import { PulseLoader, BarLoader } from "react-spinners";
import { toast } from "react-toastify";
import ReOpenVerificationModal from "../../Components/AdminComponents/ReOpenVerificationModal";

const UserVerificationPage = () => {
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const [newModal, setNewModal] = useState(false);
  const [reModal, setReModal] = useState(false);

  const [dataLoading, setDataLoading] = useState(false);

  const { smsUser, status } = useSelector((state) => state.smsHistory);
  const { pinedItems } = useSelector((state) => state.pinedItems);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const mainData = smsUser?.data || [];

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const indexOfLastTransaction = (currentPage + 1) * itemsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - itemsPerPage;
  const currentTransactions = mainData.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const { service } = useSelector((state) => state.service);

  const [verifactionData, setVerifactionData] = useState(null);
  const [reVerifactionData, setReVerifactionData] = useState(null);

  useEffect(() => {
    dispatch(UserSmsFetching());
    dispatch(allServicFetching());
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredServices =
    service?.data && service.data.length > 0
      ? service.data.filter((service) =>
          service?.service?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  const addToPinFuntion = (service) => {
    dispatch(addToPin(service));
  };
  const addTodeleteFuntion = (service) => {
    dispatch(removeTopin(service));
  };

  const createVerification = async (service) => {
    try {
      setDataLoading(true);
      const formData = new FormData();

      formData.append("id", service?.id);

      const response = await axiosInstance.post("/create-verify", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setVerifactionData(response.data);
      setDataLoading(false);
      setModal(false);
      dispatch(UserSmsFetching());
      setNewModal(true);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const cancleVerfy = async (id) => {
    try {
      await axiosInstance
        .post("/cancel-services", {
          id: id,
        })
        .then((res) => {
          toast.success(res.data.message);
        });
      dispatch(UserSmsFetching());
    } catch (error) {
      toast.error("Server Error" + error);
    }
  };

  // reopen model
  const reOpen = async (id) => {
    setReModal(true);
    setReVerifactionData(id);
  };

  // calculate time
  const calculateTimeLeft = (data) => {
    let jsonParsData = {};
    if (data) {
      jsonParsData = JSON.parse(data);
    }
    const now = new Date().getTime();
    const endTime = new Date(jsonParsData.endsAt).getTime();
    let cal = endTime - now;
    if (cal > 0) {
      return true;
    }else{
      return false
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen overflow-y-auto">
      <div className="py-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-center uppercase">
            All sms history
          </h2>
          <button
            onClick={() => setModal(true)}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Create Verification
          </button>
        </div>

        {status ? (
          <div className="flex items-center justify-center py-6 mt-5">
            <BarLoader size={40} color="#4F46E5" loading={true} />
          </div>
        ) : (
          <>
            <table className="min-w-full border-collapse table-auto mt-5">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-3 px-6 text-left">ID</th>
                  <th className="py-3 px-6 text-left">Service Name</th>
                  <th className="py-3 px-6 text-left">Number</th>
                  <th className="py-3 px-6 text-left">OTP</th>
                  <th className="py-3 px-6 text-left">price</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Date</th>
                  <th className="py-3 px-6 text-left">Atcion</th>
                </tr>
              </thead>
              {
                <tbody>
                  <>
                    {currentTransactions.length > 0 ? (
                      currentTransactions.map((transaction) => (
                        <tr
                          key={transaction.id}
                          className="border-b hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          <td className="py-3 px-6">#{transaction.id}</td>
                          <td className="py-3 px-6">{transaction.service}</td>
                          <td className="py-3 px-6">{transaction.number}</td>
                          <td className="py-3 px-6">
                            {transaction.otp ? transaction.otp : <>--</>}
                          </td>
                          <td className="py-3 px-6 capitalize">
                            ${transaction.price}
                          </td>
                          <td className={`py-1 px-3`}>
                            <span
                              className={`rounded-full px-3 py-1
                                ${
                                  transaction.status == "pending" &&
                                  "text-yellow-500 bg-yellow-100"
                                }
                              ${
                                transaction.status == "complete" &&
                                "text-green-500 bg-green-100"
                              }
                              ${
                                transaction.status == "canceled" &&
                                "text-red-500 bg-red-100"
                              }
                          `}
                            >
                              {transaction.status}
                            </span>
                          </td>
                          <td className="py-3 px-6">
                            {moment(transaction?.created_at).format(
                              "MMMM Do YYYY"
                            )}
                          </td>
                          <td className="py-3 px-6">
                            <div className="flex flex-col items-center gap-y-2">
                              {transaction.status === "pending" && calculateTimeLeft(transaction.sms_data) ? (
                                <button
                                  onClick={() => reOpen(transaction.id)}
                                  className="felx items-center justify-center w-full bg-blue-100 text-blue-700 h-[35px] px-4 font-normal"
                                >
                                  Open
                                </button>
                              ) : (
                                <>--</>
                              )}
                              {transaction.status === "pending" ? (
                                <button
                                  onClick={() => cancleVerfy(transaction.id)}
                                  className="felx items-center justify-center w-full bg-red-100 text-red-700 h-[35px] px-4 font-normal"
                                >
                                  Cancle
                                </button>
                              ) : (
                                <>--</>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="py-3 px-6 text-center">
                          No transactions found
                        </td>
                      </tr>
                    )}
                  </>
                </tbody>
              }
            </table>

            {mainData.length > 0 && (
              <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                pageCount={Math.ceil(mainData.length / itemsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={"pagination"}
                activeClassName={"active"}
              />
            )}
          </>
        )}
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[450px] max-h-[80%] min-h-fit">
            {dataLoading ? (
              <>
                <div className="w-full text-center">
                  <PulseLoader />
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-semibold text-gray-800">
                    SMS Verifications
                  </h2>
                  <button
                    onClick={() => setModal(false)}
                    className="w-[30px] h-[30px] group flex items-center justify-center bg-gray-100 rounded-lg"
                  >
                    <X className="w-[15px] duration-700 group-hover:scale-[1.3]" />
                  </button>
                </div>

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

                  <div className="h-72 overflow-y-auto bg-gray-50 rounded-lg">
                    <ul>
                      {pinedItems.length > 0 &&
                        pinedItems.map((service, index) => (
                          <li
                            key={index}
                            className="grid px-4 grid-cols-[50%_25%_25%] duration-500 hover:bg-gray-100 items-center py-3 border-b border-gray-200"
                          >
                            <button
                              onClick={() => createVerification(service)}
                              className="flex gap-2"
                            >
                              {service.image ? (
                                <img
                                  src={service.image}
                                  alt=""
                                  className="w-8 h-8 object-cover rounded-full"
                                />
                              ) : (
                                <img
                                  src={
                                    "https://static.vecteezy.com/system/resources/previews/002/212/346/original/line-icon-for-demo-vector.jpg"
                                  }
                                  alt=""
                                  className="w-8 h-8 object-cover rounded-full"
                                />
                              )}

                              <span>{service.service}</span>
                            </button>
                            <div className="text-gray-600">
                              ${service.selling_price}
                            </div>
                            <button
                              onClick={() => addTodeleteFuntion(service)}
                              className="text-gray-600 flex items-center justify-end"
                            >
                              <StarOff className="text-yellow-400 w-[20px]" />
                            </button>
                          </li>
                        ))}
                      {filteredServices?.length > 0 ? (
                        filteredServices.map((service, index) => (
                          <li
                            key={index}
                            className="grid px-4 grid-cols-[50%_25%_25%] duration-500 hover:bg-gray-100 items-center py-3 border-b border-gray-200"
                          >
                            <button
                              onClick={() => createVerification(service)}
                              className="flex gap-2"
                            >
                              {service.image ? (
                                <img
                                  src={service.image}
                                  alt=""
                                  className="w-8 h-8 object-cover rounded-full"
                                />
                              ) : (
                                <img
                                  src={
                                    "https://static.vecteezy.com/system/resources/previews/002/212/346/original/line-icon-for-demo-vector.jpg"
                                  }
                                  alt=""
                                  className="w-8 h-8 object-cover rounded-full"
                                />
                              )}

                              <span>{service.service}</span>
                            </button>
                            <div className="text-gray-600">
                              ${service.selling_price}
                            </div>
                            <button
                              onClick={() => addToPinFuntion(service)}
                              className="text-gray-600 flex items-center justify-end"
                            >
                              <Star className="text-yellow-400 w-[20px]" />
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
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {newModal && (
        <SmsVerificationModal
          verifactionData={verifactionData}
          setNewModal={setNewModal}
        />
      )}

      {reModal && (
        <ReOpenVerificationModal
          verifactionData={reVerifactionData}
          setNewModal={setReModal}
        />
      )}
    </div>
  );
};

export default UserVerificationPage;
