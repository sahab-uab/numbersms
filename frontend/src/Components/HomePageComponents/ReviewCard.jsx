import React from "react";

const ReviewCard = () => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-6">
      <p className="text-gray-600 text-base">
        I just had to take a moment to express my gratitude for the outstanding
        service they provided. Their complete assistance and efforts were truly
        remarkable.
      </p>
      <div className="flex items-center mt-4">
        <div className="flex-shrink-0">
          <img
            className="h-10 w-10 rounded-full"
            src="https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Frederic Hill"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm font-semibold text-gray-900 leading-none">
            Frederic Hill
          </p>
          <p className="text-sm text-gray-600">Founder & CEO</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
