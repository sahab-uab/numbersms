import { useTheme } from "../Context/ThemeContext";
import { servicesData } from "../data/servicesData";
import { motion } from "framer-motion";
import { AnimatedCard } from "../utils/AnimatedSection";
import { ArrowRight } from "lucide-react";

const Services = () => {
  const { darkMode } = useTheme();

  return (
    <div
      className={
        darkMode ? "bg-gray-900 text-white" : "bg-blue-50 text-gray-900"
      }
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={`relative py-32 ${
          darkMode
            ? "bg-gradient-to-r from-gray-800 to-gray-900"
            : "bg-gradient-to-r from-indigo-600 to-blue-600 text-white"
        }`}
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
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h1
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
            className={`text-6xl font-bold mb-6 bg-clip-text text-transparent ${
              darkMode
                ? "bg-gradient-to-r from-gray-300 to-gray-500"
                : "bg-gradient-to-r from-white to-purple-200"
            }`}
          >
            Discover Our Services
          </motion.h1>
          <motion.p
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-xl ${
              darkMode ? "text-gray-400" : "text-purple-100"
            }`}
          >
            Empower your business with tailored solutions designed to elevate
            your digital experience.
          </motion.p>
        </div>
      </motion.div>

      {/* Services Section */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">What We Offer</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <AnimatedCard
              key={index}
              className={`p-8 rounded-xl transition ${
                darkMode
                  ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                  : "bg-white hover:bg-blue-50 shadow-lg text-gray-900"
              }`}
            >
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                {service.icon}
                <h3 className="text-xl font-bold my-4">{service.title}</h3>
                <p className="mb-4">{service.description}</p>
                <button
                  className={`${
                    darkMode
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white px-6 py-2 rounded-lg font-medium inline-flex items-center space-x-2 transition transform hover:scale-105`}
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            </AnimatedCard>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div
        className={`py-16 ${
          darkMode
            ? "bg-gradient-to-b from-gray-800 to-gray-900"
            : "bg-gradient-to-b from-blue-500 to-blue-700 text-white"
        }`}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Why Choose Our Services?</h2>
          <p
            className={`text-lg mb-12 max-w-3xl mx-auto ${
              darkMode ? "text-gray-300" : "text-white"
            }`}
          >
            With a focus on innovation, reliability, and affordability, we’re
            here to help you succeed in the digital era.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Expert Support",
                description:
                  "Our dedicated support team is here 24/7 to ensure your success.",
              },
              {
                title: "Flexible Solutions",
                description:
                  "From startups to enterprises, our services are designed to scale with your needs.",
              },
              {
                title: "Affordable Pricing",
                description:
                  "Get premium services without breaking the bank. Tailored for every budget.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`p-8 rounded-lg shadow-lg transform transition hover:scale-105 ${
                  darkMode
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    : "bg-white text-gray-900"
                }`}
              >
                <h3 className="font-bold text-xl mb-4">{item.title}</h3>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Let’s Work Together</h2>
        <p
          className={`text-lg mb-8 max-w-2xl mx-auto ${
            darkMode ? "text-gray-300" : "text-gray-900"
          }`}
        >
          Ready to elevate your business? Explore our services and start your
          journey to success today.
        </p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`px-8 py-3 rounded-lg font-medium inline-flex items-center space-x-2 ${
            darkMode
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          } transition transform`}
        >
          <span>Get Started</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};

export default Services;
