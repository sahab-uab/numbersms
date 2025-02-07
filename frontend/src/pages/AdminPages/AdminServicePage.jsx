import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allServicFetching } from "../../redux/getServiceSlice";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

const AdminServicePage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { service, loading } = useSelector((state) => state.service);
  console.log(service);

  useEffect(() => {
    dispatch(allServicFetching());
  }, [dispatch]);

  // Local state for search query and pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 10;
  const filteredServices =
    service?.data && service.data.length > 0
      ? service.data.filter((service) =>
          service?.service?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];

  console.log(filteredServices);

  // Handle page change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0); // Reset to page 1 when search query changes
  };

  // Pagination slice
  const currentItems = filteredServices?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const goToAddImagePage = (serviceId) => {
    navigate("/admin/service-image", { state: { serviceId } });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Services</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for a service"
          value={searchQuery}
          onChange={handleSearchChange}
          className="input input-bordered w-full max-w-xs"
        />
      </div>

      {/* Services Table */}
      <table className="table-auto w-full mb-6">
        <thead>
          <tr>
            <th className="border px-4 py-2">Service ID</th>
            <th className="border px-4 py-2">Service Logo</th>
            <th className="border px-4 py-2">Service Name</th>
            <th className="border px-4 py-2">price</th>
            <th className="border px-4 py-2">Selling Price</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <>
              <tr>
                <td colSpan="5">
                  <div className="flex items-center justify-center py-6">
                    <BarLoader size={40} color="#4F46E5" loading={true} />
                  </div>
                </td>
              </tr>
            </>
          ) : (
            currentItems?.map((serviceItem, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{serviceItem.id}</td>
                {serviceItem.image ? (
                  <td className="border px-4 py-2">
                    <img src={serviceItem.image} alt="" className="w-8 h-8" />
                  </td>
                ) : (
                  <>No Image</>
                )}
                <td className="border px-4 py-2">{serviceItem.service}</td>
                <td className="border px-4 py-2">{serviceItem.price}</td>
                <td className="border px-4 py-2">
                  {serviceItem.selling_price}
                </td>
                <td className="border px-4 py-2">
                  {/* Add actions here, like edit or delete */}
                  <button
                    onClick={() => goToAddImagePage(serviceItem.id)}
                    className="bg-orange-500 px-5 py-3 text-white"
                  >
                    Add Image
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {filteredServices && filteredServices.length > itemsPerPage && (
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={Math.ceil(filteredServices.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"pagination justify-center"}
          activeClassName={"active"}
          disabledClassName={"disabled"}
        />
      )}
    </div>
  );
};

export default AdminServicePage;
