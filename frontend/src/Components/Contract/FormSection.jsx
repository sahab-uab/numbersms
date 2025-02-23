const FormSection = () => {
  return (
    <div className="wrapper flex flex-col lg:flex-row items-center justify-center bg-[#F5F5FF] overflow-hidden rounded-lg">
      {/* Left Section - Contact Form */}
      <div className=" rounded-lg shadow-md p-8 lg:w-1/2 w-full">
        <span className="text-purple-600 text-sm font-bold uppercase">
          Contact Us
        </span>
        <h2 className="text-3xl font-extrabold text-gray-900 mt-4">
          How can we help?
        </h2>
        <p className="text-[#AFADBE] text-[18px]">
          Have a question or feedback? Fill out the form below, and we'll get
          back to you as soon as possible.
        </p>

        <form className="mt-6 space-y-6">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-800"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none sm:text-sm"
              placeholder="Your Name"
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none sm:text-sm"
              placeholder="Your Email"
            />
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-gray-800"
            >
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none sm:text-sm"
              placeholder="Your Message"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 font-semibold transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Right Section - Image with Text */}
      <div className="lg:w-1/2 w-96 h-[38rem] mt-8 lg:mt-0 relative">
        <img
          src="../../../../close-up-person-working-call-center.jpg"
          alt="Person"
          className="rounded-lg object-cover w-full h-full"
        />
        {/* <div className="absolute bottom-4 left-4 bg-white bg-opacity-75 p-4 rounded-lg shadow-md">
          <p className="text-gray-700">
            This software simplifies the website building process, making it a
            breeze to manage our online presence.
          </p>
          <p className="mt-2 font-bold text-gray-900">Claire Olson</p>
          <p className="text-sm text-gray-600">Founder & CEO</p>
        </div> */}
      </div>
    </div>
  );
};

export default FormSection;
