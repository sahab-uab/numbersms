import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allTransationsFetching } from "../../redux/getAllTransation";
import ReactPaginate from "react-paginate";
import moment from "moment";

import { BarLoader } from "react-spinners";

const AdminAllTransactionPage = () => {
  const dispatch = useDispatch();
  const { transations, status } = useSelector((state) => state.transations);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const mainData = transations?.data || [];

  useEffect(() => {
    if (mainData.length === 0 && status !== "loading...") {
      dispatch(allTransationsFetching());
    }
  }, [dispatch, mainData.length, status]);

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
          All Transactions
        </h2>
      </div>

      <table className="min-w-full border-collapse table-auto mt-5">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-3 px-6 text-left">Transaction ID</th>
            <th className="py-3 px-6 text-left">User Name</th>
            <th className="py-3 px-6 text-left">Amount</th>
            <th className="py-3 px-6 text-left">Geteway</th>
            <th className="py-3 px-6 text-left">Date</th>
            <th className="py-3 px-6 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {status === "loading..." ? (
            <tr>
              <td colSpan="5">
                <div className="flex items-center justify-center py-6">
                  <BarLoader size={40} color="#4F46E5" loading={true} />
                </div>
              </td>
            </tr>
          ) : (
            <>
              {currentTransactions.length > 0 ? (
                currentTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <td className="py-3 px-6">#{transaction.id}</td>
                    <td className="py-3 px-6">{transaction.username}</td>
                    <td className="py-3 px-6">${transaction.amount}</td>
                    <td className="py-3 px-6 capitalize">
                      {transaction.getway}
                    </td>
                    <td className="py-3 px-6">
                      {moment(transaction?.created_at).format("MMMM Do YYYY")}
                    </td>
                    <td className="py-1 px-3">
                      {transaction.status == true ? "Success" : "Faild"}
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
          )}
        </tbody>
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
    </div>
  );
};

export default AdminAllTransactionPage;
