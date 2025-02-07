import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AdminMessageUsagesFetch } from "../../redux/adminMessageUsage";
import ReactPaginate from "react-paginate";
import moment from "moment";
import { BarLoader } from "react-spinners";

const AdminMessageUsages = () => {
  const dispatch = useDispatch();
  const { smsusagesdata, status } = useSelector((state) => state.smsusagesdata);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const mainData = smsusagesdata?.data || [];

  useEffect(() => {
    dispatch(AdminMessageUsagesFetch());
  }, [dispatch]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const indexOfLastTransaction = (currentPage + 1) * itemsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - itemsPerPage;
  const currentTransactions = mainData.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-center uppercase">
          All sms history
        </h2>
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
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Status</th>
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
                        <td className="py-3 px-6">
                          {moment(transaction?.created_at).format(
                            "MMMM Do YYYY"
                          )}
                        </td>
                        <td
                          className={` py-1 px-3 ${
                            transaction.status == "pending" && "text-yellow-500"
                          }  ${
                            transaction.status == "complete" && "text-green-500"
                          }
                          ${transaction.status == "canceled" && "text-red-500"}
                          `}
                        >
                          {transaction.status}
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
  );
};

export default AdminMessageUsages;
