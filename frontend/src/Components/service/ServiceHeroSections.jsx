import React from "react";

const ServiceHeroSections = () => {
  return (
    <div className="wrapper flex flex-col lg:flex-row items-center justify-center bg-[#F5F5FF] overflow-hidden p-10 gap-5">
      <div className="flex flex-col gap-3">
        <span className="signika text-purple-600 text-sm font-bold uppercase">
          Intuitive Dashboard
        </span>
        <h2 className="text-3xl font-extrabold text-gray-900 mt-4 signika">
          Smart insights, better business strategy
        </h2>
        <p className="text-[#4C4C47] text-[18px] rubik">
          Visualize data, track sales, and analyze customer behavior, empowering
          you to make informed decisions.
        </p>

        <div>
          <button
            className={`py-2 px-6 rounded-lg font-semibold transition bg-purple-600 text-white hover:bg-purple-500`}
          >
            Get started
          </button>
        </div>
      </div>
      <div className="w-full h-full">
        <img
          src="https://sierra.keydesign.xyz/wp-content/uploads/2023/10/sierra-services-1.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default ServiceHeroSections;
