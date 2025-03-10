import React from "react";

const CurvedBackground = ({
  bgImage,
  heading,
  highlightedText,
  subtitle,
  formComponent,
}) => {
  return (
    <div
      className="relative h-96 md:h-[45rem] w-full flex flex-col items-center justify-center font-bold  lg:rounded-b-[28%] bg-cover bg-center z-10"
      style={{
        backgroundImage: `url('${bgImage}')`,
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <h1 className="signika text-5xl font-extrabold text-center ">
          <span className="relative inline-block">
            {/* Main Heading */}
            {heading && (
              <span className="relative z-10 text-white capitalize">
                {heading}
              </span>
            )}
            {/* Background Highlight */}
            <div className="absolute inset-0 h-8 bg-[#824DEB] rounded-lg translate-y-full z-0"></div>
          </span>
          <span className="text-white"> {highlightedText}</span>
        </h1>

        {/* Subtitle */}
        <p className="rubik my-10 text-[18px] text-center leading-7 text-gray-200 lg:w-1/2">
          {subtitle}
        </p>
      </div>

      {/* Form Component (Passed Dynamically) */}
      <div className="absolute -bottom-1/2 hidden lg:block">
        {formComponent}
      </div>
    </div>
  );
};

export default CurvedBackground;
