import { useState } from "react";
import axiosInstanceImage from "../../Api/axioxTow";
import { useLocation } from "react-router-dom";

const AdminServiceImage = () => {
  const location = useLocation();

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Get serviceId from location state
  const { serviceId } = location.state || {};

  // Handle file input change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!serviceId || !image) {
      setError("Service ID and image are required.");
      return;
    }

    const formData = new FormData();
    formData.append("id", serviceId);
    formData.append("image", image);

    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstanceImage.post(
        "/admin/services-image",
        formData
      );
      setLoading(false);
      setSuccess(true);
      console.log("Image uploaded successfully:", response.data);
    } catch (err) {
      setLoading(false);
      setError(
        err.response ? err.response.data.message : "Error uploading image"
      );
      console.error("Error uploading image:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Upload Service Image
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Service ID Display */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Service ID:
          </label>
          <input
            type="text"
            value={serviceId} // Display the serviceId
            readOnly
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Upload Image:
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Error or Success Message */}
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && (
          <p className="text-green-600 text-sm">Image uploaded successfully!</p>
        )}

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className={`w-full py-2 px-4 ${
              loading ? "bg-gray-400" : "bg-blue-600"
            } text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload Image"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminServiceImage;
