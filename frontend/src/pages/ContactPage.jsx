import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  ChevronDown,
  Plus,
  Minus,
  Building,
} from "lucide-react";
const ContactPage = () => {
  const [openFaq, setOpenFaq] = useState();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const stagger = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const locations = [
    {
      city: "New York",
      address: "123 Broadway, NY 10013",
      phone: "+1 (555) 123-4567",
      email: "ny@company.com",
      hours: "9:00 AM - 6:00 PM EST",
    },
    {
      city: "London",
      address: "456 Oxford St, London W1C 1AP",
      phone: "+44 20 7123 4567",
      email: "london@company.com",
      hours: "9:00 AM - 6:00 PM GMT",
    },
    {
      city: "Tokyo",
      address: "789 Shibuya, Tokyo 150-0002",
      phone: "+81 3-1234-5678",
      email: "tokyo@company.com",
      hours: "9:00 AM - 6:00 PM JST",
    },
  ];

  const faqs = [
    {
      question: "What services do you offer?",
      answer:
        "We offer a comprehensive range of digital services including web development, mobile app development, UI/UX design, cloud solutions, and digital marketing.",
    },
    {
      question: "How can I request a quote?",
      answer:
        "You can request a quote by filling out our contact form above, or by directly emailing us. We'll respond within 24 hours with a detailed proposal.",
    },
    {
      question: "What is your typical project timeline?",
      answer:
        "Project timelines vary depending on scope and complexity. Typically, small projects take 4-6 weeks, while larger projects can take 3-6 months. We'll provide a detailed timeline during our initial consultation.",
    },
    {
      question: "Do you offer support after project completion?",
      answer:
        "Yes, we offer comprehensive post-project support and maintenance packages to ensure your solution continues to perform optimally.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6 text-center relative z-10"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Have a project in mind? We'd love to hear about it. Let's transform
            your idea into reality.
          </p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="cursor-pointer"
          >
            <ChevronDown className="w-8 h-8 mx-auto text-blue-600" />
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeIn} className="text-center mb-16">
              <MessageSquare className="w-16 h-16 text-blue-600 mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-4">Send Us a Message</h2>
              <p className="text-gray-600">
                Fill out the form below and we'll get back to you within 24
                hours
              </p>
            </motion.div>

            <motion.form
              variants={stagger}
              className="space-y-8 bg-gray-50 p-8 rounded-2xl shadow-lg"
            >
              <motion.div
                variants={fadeIn}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </motion.div>

              <motion.div variants={fadeIn}>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Project Inquiry"
                />
              </motion.div>

              <motion.div variants={fadeIn}>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Tell us about your project..."
                />
              </motion.div>

              <motion.button
                variants={fadeIn}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-blue-600 text-white py-4 px-8 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Send Message
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Building className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Our Offices</h2>
            <p className="text-blue-100">
              Visit us at one of our global locations
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
            {locations.map((location, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -10 }}
                className="bg-white/10 backdrop-blur-lg p-8 rounded-xl"
              >
                <h3 className="text-2xl font-bold mb-6">{location.city}</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-blue-300 mt-1" />
                    <p>{location.address}</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-blue-300 mt-1" />
                    <p>{location.phone}</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-blue-300 mt-1" />
                    <p>{location.email}</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-blue-300 mt-1" />
                    <p>{location.hours}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600">
                Find quick answers to common questions about our services
              </p>
            </div>

            <motion.div
              variants={stagger}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <span className="font-semibold text-left">
                      {faq.question}
                    </span>
                    {openFaq === index ? (
                      <Minus className="w-5 h-5 text-gray-600" />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: openFaq === index ? "auto" : 0,
                      opacity: openFaq === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 py-4 text-gray-600">{faq.answer}</p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
