import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../../animation/Animation";
import { Heart, Rocket, User } from "lucide-react";

const OurValue = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
        >
          {[
            {
              icon: Heart,
              title: "Passion",
              color: "red",
              text: "We pour our hearts into every project, ensuring excellence in everything we do.",
            },
            {
              icon: User,
              title: "Collaboration",
              color: "purple",
              text: "Together we achieve more, working as one team towards common goals.",
            },
            {
              icon: Rocket,
              title: "Innovation",
              color: "green",
              text: "We constantly push boundaries and explore new possibilities.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              className={`p-8 rounded-xl bg-gradient-to-br from-${item.color}-50 to-${item.color}-100`}
            >
              <item.icon className={`w-12 h-12 text-${item.color}-500 mb-4`} />
              <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
              <p className="text-gray-700">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OurValue;
