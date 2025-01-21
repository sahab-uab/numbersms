import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";
import axiosInstance from "../../api/axios";
import { useTable, usePagination } from "react-table";

const UserCreditCard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { auth } = useAuth();

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axiosInstance.get("/app/transaction", {
          headers: {
            Authorization: `Bearer ${auth.token}`,
            "Content-Type": "application/json",
          },
        });

        setTransactions(response.data.data || []); // Update based on your API response structure
      } catch (err) {
        setError("Failed to fetch transactions. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (auth.token) {
      fetchTransactions();
    }
  }, [auth.token]);

  // Define table columns
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id", // Corresponds to transaction ID
      },
      {
        Header: "Name",
        accessor: "name", // Corresponds to the name field
      },
      {
        Header: "Credit",
        accessor: "amount", // Corresponds to credit amount
      },
      {
        Header: "Date",
        accessor: "date", // Corresponds to the date field
      },
    ],
    []
  );

  // Create table instance
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page, // Current page rows
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data: transactions,
      initialState: { pageIndex: 0, pageSize: 5 }, // Page size is 5 rows
    },
    usePagination
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Credit Management</h1>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
            Buy Credit
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition">
            Share Credit
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-md">
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : transactions.length > 0 ? (
          <>
            <table {...getTableProps()} className="min-w-full bg-white border">
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr
                    key={headerGroup.id}
                    {...headerGroup.getHeaderGroupProps()}
                    className="bg-gray-200 text-gray-700"
                  >
                    {headerGroup.headers.map((column) => (
                      <th
                        key={column.id}
                        {...column.getHeaderProps()}
                        className="px-4 py-2 text-left"
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr
                      key={row.id}
                      {...row.getRowProps()}
                      className="border-b hover:bg-gray-100 transition"
                    >
                      {row.cells.map((cell) => (
                        <td
                          key={cell.id}
                          {...cell.getCellProps()}
                          className="px-4 py-2"
                        >
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
              <span className="text-gray-600">
                Page {pageIndex + 1} of {pageOptions.length}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                  className={`px-4 py-2 rounded-lg border ${
                    !canPreviousPage
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                  className={`px-4 py-2 rounded-lg border ${
                    !canNextPage
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600">No transactions found.</p>
        )}
      </div>
    </div>
  );
};

export default UserCreditCard;
