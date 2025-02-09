import FormSection from "./FormSection";

const CurvedBackground = () => {
  return (
    <div
      className="relative h-[45rem] w-full flex flex-col items-center justify-center  font-bold rounded-b-[28%] bg-cover bg-center z-10"
      style={{
        backgroundImage:
          "url('https://sierra.keydesign.xyz/web-app/wp-content/uploads/sites/4/2023/10/webapp-bg-drk.jpg')",
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl font-extrabold text-center">
          <span className="relative inline-block">
            {/* Text on top */}
            <span className="relative z-10 text-white capitalize">Connect</span>
            {/* Background for the text */}
            <div className="absolute inset-0 h-8 bg-[#824DEB] rounded-lg translate-y-full z-0"></div>
          </span>
          <span className="text-white "> with us</span>
        </h1>
        {/* Subtitle */}
        <p className="my-10 text-[18px] text-center   leading-7 text-gray-200 ">
          Feel free to reach out to us using the options below, and <br /> our
          dedicated team will respond <br /> promptly.
        </p>
      </div>

      <div className="absolute -bottom-1/2">
        <FormSection />
      </div>
    </div>
  );
};

export default CurvedBackground;
