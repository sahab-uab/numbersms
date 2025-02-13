const ServiceSecendSection = () => {
  const features = [
    {
      title: "Real-time tracking",
      description: "Monitor activities and conversions instantly.",
    },
    {
      title: "Performance analytics",
      description: "Identify top performers, and optimize.",
    },
    {
      title: "Payout automation",
      description: "Seamless and timely transactions.",
    },
  ];
  // bg-[#F5F5FF]
  return (
    <div className="wrapper grid md:grid-cols-2 items-center justify-center  overflow-hidden  gap-5">
      <div className="bg-[#F5F5FF] p-10 ">
        <div className="w-full h-full">
          <img
            src="https://sierra.keydesign.xyz/wp-content/uploads/2023/10/sierra-services-3.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-purple-600 text-sm font-bold uppercase">
          Intuitive Dashboard
        </span>
        <h2 className="signika text-3xl font-extrabold text-gray-900 mt-4">
          Maximize your affiliate marketing efforts
        </h2>
        <p className="text-[#4C4C47] text-[18px] rubik">
          Monitor activities, track conversions, and optimize performance, all
          from a user-friendly dashboard.
        </p>

        {features.map((featur, index) => (
          <div key={index} className="w-full bg-[#F5F5FF] p-3 rounded-md">
            <div className="flex items-center justify-between">
              <div className="flex flex-col w-96">
                <span className="rubik text-xl text-black font-semibold">
                  {featur.title}
                </span>
                <span className="rubik text-sm">{featur.description}</span>
              </div>
              <div>
                <button className="p-4 bg-white rounded-md shadow-md">
                  <span className="text-blue-600 text-lg">→</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSecendSection;
