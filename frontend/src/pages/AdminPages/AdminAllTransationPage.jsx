import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allTransationsFetching } from "../../redux/getAllTransation";
import ReactPaginate from "react-paginate";
import moment from "moment";

const AdminAllTransactionPage = () => {
  const dispatch = useDispatch();
  const { transations, status } = useSelector((state) => state.transations);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const mainData = transations?.data || [];

  console.log(mainData);

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
      <h2 className="text-3xl font-bold text-center mb-6">All Transactions</h2>

      <table className="min-w-full border-collapse table-auto">
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
          {currentTransactions.length > 0 ? (
            currentTransactions.map((transaction) => (
              <tr key={transaction.id} className="border-b hover:bg-gray-100 dark:hover:bg-gray-800">
                <td className="py-3 px-6">#{transaction.id}</td>
                <td className="py-3 px-6">{transaction.username}</td>
                <td className="py-3 px-6">$.{transaction.amount}</td>
                <td className="py-3 px-6 capitalize">{transaction.getway}</td>
                <td className="py-3 px-6">
                  {moment(transaction?.created_at).format("MMMM Do YYYY")}
                </td>
                <td className="py-1 px-3">{transaction.status ==  true ? 'Success' : 'Faild'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-3 px-6 text-center">
                No transactions found
              </td>
            </tr>
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
