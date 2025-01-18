import { useTheme } from "../Context/ThemeContext";
import { motion } from "framer-motion";

const PricingPage = () => {
  const { darkMode } = useTheme();

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={`relative overflow-hidden py-32 ${
          darkMode
            ? "bg-gradient-to-r from-gray-800 to-gray-900"
            : "bg-gradient-to-r from-indigo-600 to-blue-600"
        } text-white`}
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-0 left-0 w-full h-full opacity-10"
          style={{
            background:
              "radial-gradient(circle at center, white 0%, transparent 70%)",
          }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200"
          >
            Affordable Plans for Everyone
          </motion.h1>
          <motion.p
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-xl ${
              darkMode ? "text-gray-400" : "text-purple-100"
            }`}
          >
            Choose a pricing plan that fits your needs. No hidden fees, no
            surprises.
          </motion.p>
        </div>
      </motion.div>

      {/* Pricing Section */}
      <div className="container mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-center mb-12">Our Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {[
            {
              plan: "Starter",
              price: "$10/month",
              features: ["Basic Support", "Up to 10 Users", "Limited Features"],
            },
            {
              plan: "Pro",
              price: "$30/month",
              features: ["Priority Support", "Up to 50 Users", "All Features"],
              highlight: true,
            },
            {
              plan: "Enterprise",
              price: "$100/month",
              features: [
                "Dedicated Support",
                "Unlimited Users",
                "Custom Features",
              ],
            },
          ].map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`p-8 rounded-xl shadow-lg transform hover:scale-105 transition ${
                darkMode
                  ? "bg-gray-800 text-white border-gray-600"
                  : "bg-white text-gray-900"
              } ${tier.highlight ? "border-4 border-indigo-500" : ""}`}
            >
              {tier.highlight && (
                <span className="absolute top-0 right-0 bg-indigo-500 text-white px-3 py-1 rounded-bl-lg text-sm">
                  Best Value
                </span>
              )}
              <h3 className="text-2xl font-bold mb-4">{tier.plan}</h3>
              <p className="text-4xl font-bold mb-6">{tier.price}</p>
              <ul className="mb-6 space-y-2">
                {tier.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-4 rounded-lg font-medium text-white ${
                  darkMode
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-blue-600 hover:bg-indigo-700"
                } transition`}
              >
                Select Plan
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Feature Comparison Section */}
      <div className="container mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-center mb-12">
          Compare Features
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="overflow-x-auto"
        >
          <table
            className={`w-full border-collapse shadow-lg text-left ${
              darkMode
                ? "bg-gray-800 text-white border-gray-600"
                : "bg-white text-gray-900"
            }`}
          >
            <thead>
              <tr
                className={`${
                  darkMode
                    ? "bg-gray-700 text-gray-300"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                <th className="px-6 py-4">Feature</th>
                <th className="px-6 py-4">Starter</th>
                <th className="px-6 py-4">Pro</th>
                <th className="px-6 py-4">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  feature: "Support",
                  starter: "Basic",
                  pro: "Priority",
                  enterprise: "Dedicated",
                },
                {
                  feature: "Users",
                  starter: "Up to 10",
                  pro: "Up to 50",
                  enterprise: "Unlimited",
                },
                {
                  feature: "Custom Features",
                  starter: "No",
                  pro: "No",
                  enterprise: "Yes",
                },
              ].map((row, index) => (
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
                  <td className="px-6 py-4">{row.feature}</td>
                  <td className="px-6 py-4">{row.starter}</td>
                  <td className="px-6 py-4">{row.pro}</td>
                  <td className="px-6 py-4">{row.enterprise}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>

      {/* Call-to-Action Section */}
      <div className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Choose a Plan?</h2>
        <p
          className={`text-lg mb-8 max-w-2xl mx-auto ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Take the next step in your digital journey today.
        </p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`px-8 py-3 rounded-lg font-medium ${
            darkMode
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-blue-600 hover:bg-indigo-700 text-white"
          } transition`}
        >
          Get Started Now
        </motion.button>
      </div>
    </div>
  );
};

export default PricingPage;
