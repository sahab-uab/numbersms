import { motion } from "framer-motion";
import { ArrowRight, Globe2, Target, User } from "lucide-react";
import { featuresData } from "../data/featuresData";
import { testimonialsData } from "../data/testimonialsData";
import { pricingData } from "../data/pricingData";
import { comparePricingData } from "../data/comparePricingData";
import OurMission from "../Components/AboutPageComponents/OurMission";
import ReviewSection from "../Components/HomePageComponents/ReviewSection";
import { FaStar } from "react-icons/fa";
const HomePage = () => {
  const makeAAlart = () => {
    alert("We are working on it! It will coming soon");
  };

  return (
    <div className={""}>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className=" px-6 py-16 text-center md:py-32 background"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Don’t want to give out your phone number?{" "}
          <span className={"text-orange-600"}>No Problem.</span> Use Ours.
        </h1>
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
        >
          Protect your privacy and stay secure with our verified US mobile
          numbers, compatible with all platforms.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`bg-orange-600 hover:bg-white text-white hover:text-orange-600 px-8 py-3 rounded-lg font-medium inline-flex items-center space-x-2 transition`}
        >
          <span>Get Started</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-12"
        >
          What we offer.
        </motion.h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
          }}
          className="grid md:grid-cols-3 gap-8"
        >
          {featuresData.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              className={`p-8 rounded-xl transition ${"bg-white hover:bg-blue-50 shadow-lg"}`}
            >
              {feature.icon}
              <h3 className="text-xl font-bold my-4">{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      {/* review Section */}

      <section className="py-24 bg-gradient-to-r from-orange-100 to-yellow-100">
        <div className="container mx-auto px-6">
          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-orange-600 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              We are grateful for the amazing feedback from our clients. Here's
              what they have to say about our work.
            </p>
          </motion.div>

          {/* Review Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Review Card 1 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center text-center p-8 bg-white shadow-xl rounded-3xl transition transform hover:bg-indigo-50"
            >
              <div className="flex justify-center mb-4">
                <img
                  src="https://cdn.pixabay.com/photo/2024/02/17/07/13/man-8578832_1280.jpg"
                  alt="Reviewer"
                  className="w-20 h-20 rounded-full object-cover"
                />
              </div>
              <div className="flex mb-2 text-yellow-500">
                {/* Star Ratings */}
                {[...Array(5)].map((_, index) => (
                  <FaStar key={index} className="text-lg" />
                ))}
              </div>
              <h3 className="text-xl font-semibold text-orange-600 mb-4">
                Jane Doe
              </h3>
              <p className="text-gray-600">
                "This company helped us elevate our business to new heights. The
                team was professional, and their service exceeded expectations.
                Highly recommend!"
              </p>
            </motion.div>

            {/* Review Card 2 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center text-center p-8 bg-white shadow-xl rounded-3xl transition transform hover:bg-blue-50"
            >
              <div className="flex justify-center mb-4">
                <img
                  src="https://cdn.pixabay.com/photo/2015/08/14/15/28/smiling-888532_960_720.jpg"
                  alt="Reviewer"
                  className="w-20 h-20 rounded-full object-cover"
                />
              </div>
              <div className="flex mb-2 text-yellow-500">
                {/* Star Ratings */}
                {[...Array(5)].map((_, index) => (
                  <FaStar key={index} className="text-lg" />
                ))}
              </div>
              <h3 className="text-xl font-semibold text-orange-600 mb-4">
                John Smith
              </h3>
              <p className="text-gray-600">
                "A remarkable experience! The team delivered exactly what we
                needed, on time, and with exceptional quality. I will definitely
                work with them again."
              </p>
            </motion.div>

            {/* Review Card 3 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center text-center p-8 bg-white shadow-xl rounded-3xl transition transform hover:bg-green-50"
            >
              <div className="flex justify-center mb-4">
                <img
                  src="https://cdn.pixabay.com/photo/2024/01/10/16/22/man-8499961_1280.jpg"
                  alt="Reviewer"
                  className="w-20 h-20 rounded-full object-cover"
                />
              </div>
              <div className="flex mb-2 text-yellow-500">
                {/* Star Ratings */}
                {[...Array(5)].map((_, index) => (
                  <FaStar key={index} className="text-lg" />
                ))}
              </div>
              <h3 className="text-xl font-semibold text-orange-600 mb-4">
                Emily Johnson
              </h3>
              <p className="text-gray-600">
                "Amazing results! The professionalism and dedication of the team
                really shine through. They were a pleasure to work with. Highly
                recommended!"
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <div className="container mx-auto px-6 py-16">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-12"
        >
          Great products, simple pricing.
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-12">
          {pricingData.map((pricing, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center p-8 bg-white shadow-xl rounded-2xl transition-all duration-300 transform hover:shadow-2xl hover:bg-blue-50"
            >
              <h3 className="text-3xl font-semibold text-orange-600 mb-4">
                {pricing.plan}
              </h3>
              <p className="text-5xl font-bold text-gray-800 mb-6">
                {pricing.price}
                <span className="text-lg text-gray-600">/month</span>
              </p>

              {/* Features List */}
              <ul className="mb-6 space-y-3 text-lg text-gray-600">
                {pricing.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="text-blue-500 mr-2">✔</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button
                onClick={() => makeAAlart()}
                className="bg-orange-600 hover:bg-transparent hover:text-orange-600 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none"
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Pricing Comparison Section */}
      <div
        className={`container mx-auto px-6 py-16 ${"bg-white text-gray-900"}`}
      >
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-4"
        >
          Price comparison
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className={`text-center mb-12 ${"text-gray-600"}`}
        >
          Competitor prices are checked manually, so if you find any
          discrepancies, please let us know - we'll adjust the prices to still
          give you a better deal.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="overflow-x-auto"
        >
          <table
            className={`w-full border-collapse shadow-lg text-left text-sm ${"bg-white text-gray-900"}`}
          >
            <thead>
              <tr className={`${"bg-gray-200 text-gray-700"}`}>
                <th className="px-4 py-3">Service</th>

                <th className="px-4 py-3">TEXTVERIFIED</th>
                <th className="px-4 py-3">ONLINESIM</th>
                <th className="px-4 py-3">SMSPVA</th>
              </tr>
            </thead>
            <tbody>
              {comparePricingData.map((row, index) => (
                <tr key={index} className={`${"bg-white"}`}>
                  <td className="px-4 py-3 font-medium">{row.service}</td>
                  <td className="px-4 py-3">{row.textverified}</td>
                  <td className="px-4 py-3">{row.onlinesim}</td>
                  <td className="px-4 py-3">{row.smspva}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
