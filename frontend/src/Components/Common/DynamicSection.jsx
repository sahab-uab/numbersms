import React from "react";

const DynamicSection = ({ title, subtitle, description, features = [] }) => {
  return (
    <div className="flex flex-col gap-3">
      {title && (
        <span className="text-purple-600 text-sm font-bold uppercase">
          {title}
        </span>
      )}

      {subtitle && (
        <h2 className="signika text-3xl font-extrabold text-gray-900 mt-4">
          {subtitle}
        </h2>
      )}

      {description && (
        <p className="text-[#4C4C47] text-[18px] rubik">{description}</p>
      )}

      {features.length > 0 ? (
        features.map((feature, index) => (
          <div key={index} className="w-full bg-[#F5F5FF] p-3 rounded-md">
            <div className="flex items-center justify-between">
              <div className="flex flex-col w-96">
                <span className="rubik text-xl text-black font-semibold">
                  {feature.title}
                </span>
                <span className="rubik text-sm">{feature.description}</span>
              </div>
              <div>
                <button className="p-4 bg-white rounded-md shadow-md">
                  <span className="text-blue-600 text-lg">→</span>
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No features available</p>
      )}
    </div>
  );
};

export default DynamicSection;
