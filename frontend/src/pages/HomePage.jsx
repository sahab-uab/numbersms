import { ArrowRight } from "lucide-react";
import { useTheme } from "../Context/ThemeContext";
import { testimonialsData } from "../data/testimonialsData";
import { pricingData } from "../data/pricingData";
import { featuresData } from "../data/featuresData";
import { comparePricingData } from "../data/comparePricingData";

const HomePage = () => {
  const { darkMode } = useTheme();

  return (
    <div
      className={
        darkMode ? "bg-gray-900 text-white" : "bg-blue-50 text-gray-900"
      }
    >
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16 text-center md:py-32">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Don’t want to give out your phone number?{" "}
          <span className={darkMode ? "text-blue-400" : "text-blue-600"}>
            No Problem.
          </span>{" "}
          Use Ours.
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Protect your privacy and stay secure with our verified US mobile
          numbers, compatible with all platforms.
        </p>
        <button
          className={`${
            darkMode
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white px-8 py-3 rounded-lg font-medium inline-flex items-center space-x-2 transition transform hover:scale-105`}
        >
          <span>Get Started</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">What we offer.</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className={`p-8 rounded-xl transition ${
                darkMode
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-white hover:bg-blue-50 shadow-lg"
              }`}
            >
              {feature.icon}
              <h3 className="text-xl font-bold my-4">{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gradient-to-b from-blue-500 to-blue-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Loved by users worldwide.</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonialsData.map((testimonial, index) => (
              <div
                key={index}
                className="p-8 bg-white text-gray-900 rounded-lg shadow-lg transform transition hover:scale-105"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden">
                  <img
                    src={testimonial.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-bold text-blue-500">{testimonial.user}</p>
                <p className="text-lg mb-4">{testimonial.feedback}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Great products, simple pricing.
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {pricingData.map((pricing, index) => (
            <div
              key={index}
              className={`p-8 rounded-xl transition ${
                darkMode
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-white hover:bg-blue-50 shadow-lg"
              }`}
            >
              <h3 className="text-2xl font-bold mb-4">{pricing.plan}</h3>
              <p className="text-4xl font-bold mb-6">{pricing.price}</p>
              <ul className="mb-6">
                {pricing.features.map((feature, idx) => (
                  <li key={idx} className="text-gray-400">
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`${
                  darkMode
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white px-6 py-3 rounded-lg font-medium`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Comparison Section */}
      <div
        className={`container mx-auto px-6 py-16 ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        <h2 className="text-3xl font-bold text-center mb-4">
          Price comparison
        </h2>
        <p
          className={`text-center mb-12 ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Competitor prices are checked manually, so if you find any
          discrepancies, please let us know - we'll adjust the prices to still
          give you a better deal.
        </p>
        <div className="overflow-x-auto">
          <table
            className={`w-full border-collapse shadow-lg text-left text-sm ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}
          >
            <thead>
              <tr
                className={`${
                  darkMode
                    ? "bg-gray-700 text-gray-200"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">DAISYSMS</th>
                <th className="px-4 py-3">TEXTVERIFIED</th>
                <th className="px-4 py-3">ONLINESIM</th>
                <th className="px-4 py-3">SMSPVA</th>
              </tr>
            </thead>
            <tbody>
              {comparePricingData.map((row, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0
                      ? darkMode
                        ? "bg-gray-700"
                        : "bg-gray-100"
                      : darkMode
                      ? "bg-gray-800"
                      : "bg-white"
                  }`}
                >
                  <td className="px-4 py-3 font-medium">{row.service}</td>
                  <td className="px-4 py-3">{row.daisysms}</td>
                  <td className="px-4 py-3">{row.textverified}</td>
                  <td className="px-4 py-3">{row.onlinesim}</td>
                  <td className="px-4 py-3">{row.smspva}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
