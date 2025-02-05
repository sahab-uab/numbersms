import { motion } from "framer-motion";
import {
  Code2,
  Palette,
  Globe,
  Rocket,
  BarChart,
  Shield,
  Smartphone,
  Cloud,
  Megaphone,
  Lightbulb,
  ChevronDown,
} from "lucide-react";

const ServicesPage = () => {
  const fadeIn = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.8 },
  };

  const slideInLeft = {
    initial: { x: -100, opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.8 },
  };

  const slideInRight = {
    initial: { x: 100, opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.8 },
  };

  const scaleIn = {
    initial: { scale: 0.8, opacity: 0 },
    whileInView: { scale: 1, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  return (
    <div className="bg-gradient-to-br from-orange-100 to-yellow-100">
      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
        <div className="container mx-auto px-6 py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-black text-transparent bg-clip-text">
              Our Services
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Verify users instantly with secure and scalable SMS
              authentication.
            </p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="cursor-pointer"
            >
              <ChevronDown className="w-8 h-8 mx-auto text-blue-600" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Web Development */}
      {/* <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-center gap-12"
          >
            <div className="flex-1">
              <motion.div
                initial={{ rotate: 0 }}
                whileInView={{ rotate: 360 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <Code2 className="w-16 h-16 text-blue-600 mb-6" />
              </motion.div>
              <h2 className="text-4xl font-bold mb-6">Web Development</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Custom web applications built with modern technologies and best
                practices. From simple websites to complex enterprise solutions.
              </p>
              <motion.ul
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.2 },
                  },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-4"
              >
                {[
                  "React Applications",
                  "E-commerce Solutions",
                  "API Development",
                  "Progressive Web Apps",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    className="flex items-center text-gray-700"
                  >
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800"
                alt="Web Development"
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </section> */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-center gap-12"
          >
            <div className="flex-1">
              <motion.div
                initial={{ rotate: 0 }}
                whileInView={{ rotate: 360 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <Code2 className="w-16 h-16 text-black mb-6" />
              </motion.div>
              <h2 className="text-4xl font-bold mb-6">
                Secure & Scalable Web Solutions
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Custom-built platforms with seamless authentication &
                automation.
              </p>
              <motion.ul
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.2 },
                  },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-4"
              >
                {[
                  "Custom Verification Portals",
                  "API-Driven Authentication",
                  "E-commerce & Payment Gateways",
                  "Mobile-Friendly Web Apps",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    className="flex items-center text-gray-700"
                  >
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800"
                alt="Web Development"
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* UI/UX Design */}
      <section className="py-24 bg-gradient-to-r from-orange-100 to-yellow-100">
        <div className="container mx-auto px-6">
          <motion.div {...fadeIn} className="text-center mb-16">
            {/* <Palette className="w-16 h-16 text-black mx-auto mb-6" /> */}
            <h2 className="text-4xl font-bold mb-6">
              Smooth & Secure User Experience
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our service ensures a frictionless verification process.
            </p>
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "🌟 Trusted by Thousands",
                description: "Millions of successful verifications",
                image:
                  "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?auto=format&fit=crop&w=500",
              },
              {
                title: "🧩 One-Click Verification",
                description: "No complex steps, just simple & fast",
                image:
                  "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=500",
              },
              {
                title: "📊 User Insights",
                description: "Track your verification status in real-time",
                image:
                  "https://images.unsplash.com/photo-1554200876-56c2f25224fa?auto=format&fit=crop&w=500",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Digital Marketing */}
      <section className="py-24 bg-white text-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Megaphone className="w-16 h-16 text-black mx-auto mb-6" />
            <h2 className="text-4xl text-black font-bold mb-6">Our Impact</h2>
            <p className="text-black max-w-3xl mx-auto">
              Helping users get verified & access global platforms instantly!
            </p>
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.3 },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { value: "📨 500K+", subtitle: "SMS Sent Successfully" },
              { value: "⏳ Instant", subtitle: "Verification Process" },
              { value: "💰 Affordable", subtitle: "Lowest Cost in the Market" },
              { value: "🔒 100%", subtitle: "Data Privacy" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 },
                }}
                whileHover={{ scale: 1.05 }}
                className="bg-yellow-50 backdrop-blur-lg rounded-lg p-6 text-center"
              >
                <h3 className="text-xl font-semibold mb-2">{stat.title}</h3>
                <p className="text-4xl font-bold text-black mb-2">
                  {stat.value}
                </p>
                <p className="text-black">{stat.subtitle}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Cloud Services */}
      <section className="py-24 bg-gradient-to-r from-orange-100 to-yellow-100">
        <div className="container mx-auto px-6">
          <motion.div {...scaleIn} className="text-center mb-16">
            <Cloud className="w-16 h-16 text-black mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">
              {" "}
              SMS Verification Services
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Seamless and Secure Account Verification
            </p>
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Virtual Numbers",
                description:
                  "Get a virtual number to receive SMS verification codes hassle-free.",
                icon: Cloud,
              },
              {
                title: "Global Accessibility",
                description:
                  "Bypass country restrictions and verify accounts from anywhere.",
                icon: Rocket,
              },
              {
                title: "Secure & Instant",
                description:
                  "Receive SMS codes instantly with top-notch security.",
                icon: Shield,
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <service.icon className="w-12 h-12 text-black mb-6" />
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Consulting */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            {...fadeIn}
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
          >
            <div>
              <Lightbulb className="w-16 h-16 text-black mb-6" />
              <h2 className="text-4xl font-bold mb-6">How It Works</h2>
              <p className="text-black mb-8">
                Easy 3-Step SMS Verification Process
              </p>
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.2 },
                  },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-4"
              >
                {[
                  "1️⃣ Choose a Virtual Number",
                  "2️⃣ Enter the Code on Your Platform",
                  "3️⃣ Get Verified Instantly!",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    className="flex items-center space-x-3"
                  >
                    <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <span className="text-black">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800"
                alt="IT Consulting"
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Innovation Lab */}
      {/* <section className="py-24 bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
        <div className="container mx-auto px-6">
          <motion.div {...fadeIn} className="text-center mb-16">
            <Rocket className="w-16 h-16 text-purple-300 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">Innovation Lab</h2>
            <p className="text-purple-100 max-w-3xl mx-auto">
              Exploring emerging technologies to keep you ahead of the curve
            </p>
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.3 },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "AI & Machine Learning",
                description:
                  "Cutting-edge AI solutions for business automation",
                image:
                  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800",
              },
              {
                title: "Blockchain",
                description: "Decentralized solutions for modern businesses",
                image:
                  "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800",
              },
              {
                title: "IoT Solutions",
                description: "Connected device ecosystems for smart operations",
                image:
                  "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=800",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="group relative overflow-hidden rounded-xl aspect-square"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 to-transparent p-8 flex flex-col justify-end transform transition-transform duration-300 group-hover:translate-y-0">
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-purple-100">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section> */}

      {/* Contact CTA */}
      <section className="py-24 bg-gradient-to-r from-orange-100 to-yellow-100">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6 text-center"
        >
          <h2 className="text-4xl font-bold mb-8">
            🔹 Need Hassle-Free SMS Verification?
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Let’s simplify your online verification process today!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-orange-500 text-white py-3 px-6 rounded-full text-lg hover:bg-orange-600 transition duration-300"
          >
            👉 Get Started
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default ServicesPage;
