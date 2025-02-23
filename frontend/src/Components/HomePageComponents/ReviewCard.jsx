import { Star } from "lucide-react";
import { motion } from "framer-motion";

const ReviewCard = ({ review }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-lg rounded-2xl p-6 w-80 border border-gray-200"
    >
      <div className="flex items-center space-x-4">
        <img
          src={review.image || "https://via.placeholder.com/60"}
          alt={review.name}
          className="w-14 h-14 rounded-full border-2 border-gray-300"
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{review.name}</h2>
          <div className="flex items-center text-yellow-500">
            {[...Array(review.rating)].map((_, index) => (
              <Star key={index} size={18} fill="currentColor" stroke="none" />
            ))}
          </div>
        </div>
      </div>
      <p className="mt-4 text-gray-600 text-sm">{review.comment}</p>
    </motion.div>
  );
};

export default ReviewCard;
