import React from "react";

const LastSection = () => {
  return (
    <section
      className="relative h-[41rem] w-full flex flex-col items-center justify-center bg-cover bg-center text-white text-center px-6"
      style={{
        backgroundImage:
          "url('https://sierra.keydesign.xyz/web-app/wp-content/uploads/sites/4/2023/10/webapp-bg-drk.jpg')",
      }}
    >
      <div className="max-w-3xl">
        <span className="text-sm uppercase tracking-wide font-semibold bg-black/30 px-4 py-1 rounded-md">
          Launch with ease
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mt-4 leading-tight">
          Take quick <span className="text-purple-300">action</span> and power
          your business today
        </h1>
        <p className="mt-4 text-lg md:text-xl font-medium opacity-90">
          Elevate sales and stay ahead in the competitive market by being among
          the first to benefit from our game-changing solutions.
        </p>
        <button className="mt-6 bg-purple-500 hover:bg-purple-400 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out">
          Get started now
        </button>
      </div>
    </section>
  );
};

export default LastSection;
