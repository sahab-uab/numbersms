import React from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "../../animation/Animation";
import { Globe2, Target, User } from "lucide-react";

const OurMission = () => {
  return (
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
            Our Mission
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            We are committed to pushing the boundaries of innovation and
            empowering individuals with the knowledge and tools to excel in
            their careers and transform the world.
          </p>
        </motion.div>

        {/* Mission Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center text-center p-8 bg-white shadow-xl rounded-2xl transition transform"
          >
            <Target className="w-16 h-16 text-orange-500 mb-6" />
            <h3 className="text-2xl font-semibold text-orange-600 mb-4">
              Focus
            </h3>
            <p className="text-gray-600">
              Our primary focus is on building long-term, value-driven
              relationships with our clients while delivering exceptional
              results.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center text-center p-8 bg-white shadow-xl rounded-2xl transition transform"
          >
            <User className="w-16 h-16 text-blue-500 mb-6" />
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">
              Collaboration
            </h3>
            <p className="text-gray-600">
              We believe that teamwork is the key to success, collaborating with
              clients to bring creative and innovative ideas to life.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center text-center p-8 bg-white shadow-xl rounded-2xl transition transform"
          >
            <Globe2 className="w-16 h-16 text-green-500 mb-6" />
            <h3 className="text-2xl font-semibold text-green-600 mb-4">
              Global Impact
            </h3>
            <p className="text-gray-600">
              Our mission goes beyond borders, helping individuals and
              businesses around the world achieve success and make a lasting
              impact.
            </p>
          </motion.div>
        </motion.div>

        {/* Call to Action Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-orange-500 text-white py-3 px-6 rounded-full text-lg hover:bg-orange-600 transition duration-300"
          >
            Join Us
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default OurMission;
