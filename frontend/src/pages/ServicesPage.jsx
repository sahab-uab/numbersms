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
    <div className="bg-gradient-to-b from-gray-50 to-white">
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
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              Our Services
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Transforming ideas into digital reality with cutting-edge
              solutions
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
      </section>

      {/* UI/UX Design */}
      <section className="py-24 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-6">
          <motion.div {...fadeIn} className="text-center mb-16">
            <Palette className="w-16 h-16 text-purple-600 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">UI/UX Design</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Creating beautiful, intuitive interfaces that users love
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
                title: "User Research",
                description:
                  "Understanding your users through research and analysis",
                image:
                  "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?auto=format&fit=crop&w=500",
              },
              {
                title: "Interface Design",
                description:
                  "Creating beautiful and functional user interfaces",
                image:
                  "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=500",
              },
              {
                title: "Prototyping",
                description:
                  "Building interactive prototypes for testing and validation",
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
      <section className="py-24 bg-gradient-to-br from-blue-900 to-purple-900 text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Megaphone className="w-16 h-16 text-blue-300 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">Digital Marketing</h2>
            <p className="text-blue-100 max-w-3xl mx-auto">
              Reach your target audience and grow your business online
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
              { title: "SEO", value: "200%", subtitle: "Traffic Increase" },
              { title: "PPC", value: "150%", subtitle: "Conversion Rate" },
              { title: "Social", value: "1M+", subtitle: "Reach" },
              { title: "Content", value: "5K+", subtitle: "Articles" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 },
                }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-center"
              >
                <h3 className="text-xl font-semibold mb-2">{stat.title}</h3>
                <p className="text-4xl font-bold text-blue-300 mb-2">
                  {stat.value}
                </p>
                <p className="text-blue-100">{stat.subtitle}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mobile Development */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            {...slideInLeft}
            className="flex flex-col md:flex-row items-center gap-12"
          >
            <div className="flex-1">
              <Smartphone className="w-16 h-16 text-indigo-600 mb-6" />
              <h2 className="text-4xl font-bold mb-6">Mobile Development</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Native and cross-platform mobile applications that deliver
                exceptional user experiences
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
                className="grid grid-cols-2 gap-4"
              >
                {[
                  "iOS Development",
                  "Android Development",
                  "React Native",
                  "Flutter",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    className="flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                    <span className="text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <motion.div {...slideInRight} className="flex-1">
              <img
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800"
                alt="Mobile Development"
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Cloud Services */}
      <section className="py-24 bg-gradient-to-br from-cyan-50 to-blue-50">
        <div className="container mx-auto px-6">
          <motion.div {...scaleIn} className="text-center mb-16">
            <Cloud className="w-16 h-16 text-cyan-600 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">Cloud Services</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Scalable cloud solutions for modern businesses
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
                title: "Cloud Migration",
                description: "Seamless transition to cloud infrastructure",
                icon: Cloud,
              },
              {
                title: "DevOps",
                description: "Automated deployment and scaling solutions",
                icon: Rocket,
              },
              {
                title: "Security",
                description: "Enterprise-grade cloud security measures",
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
                <service.icon className="w-12 h-12 text-cyan-600 mb-6" />
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Data Analytics */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-6">
          <motion.div {...fadeIn} className="text-center mb-16">
            <BarChart className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">Data Analytics</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Transform your data into actionable insights
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
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {[
              {
                title: "Predictive Analytics",
                description: "Forecast trends and make data-driven decisions",
                image:
                  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800",
              },
              {
                title: "Business Intelligence",
                description: "Comprehensive reporting and visualization tools",
                image:
                  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="relative group overflow-hidden rounded-xl"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-8 flex flex-col justify-end">
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
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
              <Lightbulb className="w-16 h-16 text-yellow-500 mb-6" />
              <h2 className="text-4xl font-bold mb-6">IT Consulting</h2>
              <p className="text-gray-600 mb-8">
                Strategic technology consulting to help your business grow and
                innovate
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
                  "Technology Strategy",
                  "Digital Transformation",
                  "Process Optimization",
                  "Security Assessment",
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
                    <span className="text-gray-700">{item}</span>
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

      {/* E-commerce Solutions */}
      <section className="py-24 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-6">
          <motion.div {...scaleIn} className="text-center mb-16">
            <Globe className="w-16 h-16 text-green-600 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">E-commerce Solutions</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Build and scale your online business with our comprehensive
              e-commerce solutions
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
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            {[
              "Online Store Setup",
              "Payment Integration",
              "Inventory Management",
              "Analytics & Reporting",
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -10 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <h3 className="text-xl font-bold text-green-600 mb-4">
                  {item}
                </h3>
                <p className="text-gray-600">
                  Professional {item.toLowerCase()} services tailored to your
                  business needs
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Innovation Lab */}
      <section className="py-24 bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
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
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6 text-center"
        >
          <h2 className="text-4xl font-bold mb-8">
            Ready to Transform Your Business?
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Let's discuss how our services can help you achieve your goals
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-blue-700 transition-colors"
          >
            Get Started
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default ServicesPage;
