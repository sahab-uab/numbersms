import { motion } from "framer-motion";
import { Globe2 } from "lucide-react";
import { fadeInUp, scaleIn, staggerContainer } from "../../animation/Animation";

const GlobalImpactSection = () => {
  return (
    <section className="py-24 ">
      <motion.div {...fadeInUp} className="container mx-auto px-6">
        {/* Title Section */}
        <motion.div {...scaleIn} className="text-center mb-16">
          <Globe2 className="w-16 h-16 mx-auto mb-6 text-yellow-300" />
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold mb-6 "
          >
            Our Global Impact
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl  max-w-2xl mx-auto"
          >
            Our reach extends far beyond borders, creating tangible change in
            communities worldwide.
          </motion.p>
        </motion.div>

        {/* Statistics Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12"
        >
          {[
            { number: "120+", label: "Countries Reached", icon: "🌍" },
            { number: "1M+", label: "Users Served", icon: "👥" },
            { number: "500+", label: "Projects Completed", icon: "📈" },
            { number: "98%", label: "Client Satisfaction", icon: "✅" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="p-8 bg-gradient-to-r from-yellow-500 to-orange-400 rounded-3xl shadow-xl hover:shadow-2xl transition duration-500 ease-in-out transform hover:scale-105"
            >
              <motion.div
                className="text-4xl text-white mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {stat.icon}
              </motion.div>
              <motion.h3
                className="text-4xl font-semibold text-white mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {stat.number}
              </motion.h3>
              <motion.p
                className="text-white text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {stat.label}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default GlobalImpactSection;
