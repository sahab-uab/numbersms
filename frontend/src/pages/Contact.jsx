import { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useTheme } from "../Context/ThemeContext";
import { AnimatedCard } from "../utils/AnimatedSection";

function Contact() {
  const { darkMode } = useTheme();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      className={`min-h-screen ${
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
        <div className="container mx-auto px-4 text-center relative z-10">
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
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-xl ${
              darkMode ? "text-gray-400" : "text-purple-100"
            }`}
          >
            We'd love to hear from you. Let's start a conversation.
          </motion.p>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Form */}
          <AnimatedCard
            className={`p-10 rounded-2xl shadow-xl ${
              darkMode ? "bg-gray-800 text-white" : "bg-white"
            }`}
          >
            <h2 className="text-3xl font-bold mb-8">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <label
                  htmlFor="name"
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  } mb-2`}
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 focus:ring-indigo-500 text-gray-300"
                      : "bg-gray-50 border-gray-300 focus:ring-2 focus:ring-indigo-500"
                  } transition-all duration-300`}
                  placeholder="Your name"
                  required
                />
              </motion.div>
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  } mb-2`}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 focus:ring-indigo-500 text-gray-300"
                      : "bg-gray-50 border-gray-300 focus:ring-2 focus:ring-indigo-500"
                  } transition-all duration-300`}
                  placeholder="your@email.com"
                  required
                />
              </motion.div>
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <label
                  htmlFor="phone"
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  } mb-2`}
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 focus:ring-indigo-500 text-gray-300"
                      : "bg-gray-50 border-gray-300 focus:ring-2 focus:ring-indigo-500"
                  } transition-all duration-300`}
                  placeholder="Your phone number"
                />
              </motion.div>
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <label
                  htmlFor="message"
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  } mb-2`}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 focus:ring-indigo-500 text-gray-300"
                      : "bg-gray-50 border-gray-300 focus:ring-2 focus:ring-indigo-500"
                  } transition-all duration-300`}
                  placeholder="Your message"
                  required
                ></textarea>
              </motion.div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl ${
                  darkMode
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-blue-600 hover:bg-indigo-700 text-white"
                } transition-colors duration-300`}
              >
                Send Message
              </motion.button>
            </form>
          </AnimatedCard>

          {/* Contact Details */}
          <AnimatedCard
            className={`p-10 rounded-2xl shadow-xl ${
              darkMode ? "bg-gray-800 text-white" : "bg-white"
            }`}
          >
            <h2 className="text-3xl font-bold mb-12">Contact Information</h2>
            <div className="space-y-8">
              {[
                // Contact items
                {
                  icon: FaMapMarkerAlt,
                  title: "Address",
                  details: `123 Business Street, Suite 100
                            New York, NY 10001`,
                },
                {
                  icon: FaPhone,
                  title: "Phone",
                  details: "+1 (555) 123-4567",
                },
                {
                  icon: FaEnvelope,
                  title: "Email",
                  details: "contact@example.com",
                },
              ].map(({ icon: Icon, title, details }, index) => (
                <motion.div
                  key={index}
                  className="flex items-start"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div
                    className={`p-4 rounded-full mr-6 ${
                      darkMode ? "bg-gray-700" : "bg-indigo-50"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        darkMode ? "text-blue-400" : "text-blue-600"
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{title}</h3>
                    <p
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {details}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedCard>
        </div>
      </div>
    </div>
  );
}

export default Contact;
