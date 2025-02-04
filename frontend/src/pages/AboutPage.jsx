import { motion } from "framer-motion";
import { Users, Rocket, Heart, Target, Globe2, Sparkles } from "lucide-react";
import { fadeInUp, scaleIn, staggerContainer } from "../animation/Animation";
import TeamSection from "../Components/AboutPageComponents/TeamSection";
import CreativeTeamSection from "../Components/AboutPageComponents/CreativeTeamSection";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      {/* Hero Section */}
      <section
        className="min-h-screen flex items-center justify-center relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/317356/pexels-photo-317356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        }}
      >
        {/* Dark Overlay */}
        <motion.div
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 bg-black opacity-70"
        />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6 py-24 text-center relative z-10"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-16 h-16 mx-auto mb-8 text-black" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold mb-6 text-black text-transparent bg-clip-text bg-gradient-to-r"
          >
            We Are Innovation
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-white max-w-2xl mx-auto"
          >
            Pushing boundaries and creating the future through technology and
            creativity
          </motion.p>
        </motion.div>
      </section>

      {/* Team Section */}
      <TeamSection />

      {/* Our Mission */}
      <section className="py-24 bg-gradient-to-r from-blue-50 to-blue-100">
        <motion.div {...fadeInUp} className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div {...fadeInUp} className="flex-1">
              <Target className="w-16 h-16 text-blue-500 mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-900">
                Our Mission
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We're on a mission to transform the digital landscape through
                innovative solutions that empower businesses and individuals
                alike. Our commitment to excellence drives everything we do.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1"
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800"
                alt="Team collaboration"
                className="rounded-lg shadow-xl w-full"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Our Values */}
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
                icon: Users,
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
                <item.icon
                  className={`w-12 h-12 text-${item.color}-500 mb-4`}
                />
                <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-700">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Global Impact */}
      <section className="py-24 bg-gradient-to-b from-indigo-800 to-indigo-900 text-white">
        <motion.div {...fadeInUp} className="container mx-auto px-6">
          <motion.div {...scaleIn} className="text-center mb-16">
            <Globe2 className="w-16 h-16 mx-auto mb-6 text-blue-300" />
            <h2 className="text-4xl font-bold mb-6">Global Impact</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Our solutions reach across borders, making a difference in
              communities worldwide.
            </p>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { number: "120+", label: "Countries Reached" },
              { number: "1M+", label: "Users Served" },
              { number: "500+", label: "Projects Completed" },
              { number: "98%", label: "Client Satisfaction" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="p-6 rounded-lg bg-white/10 backdrop-blur-lg"
              >
                <motion.h3
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-3xl font-bold text-blue-300 mb-2"
                >
                  {stat.number}
                </motion.h3>
                <p className="text-blue-100">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gray-50 overflow-y-hidden">
        <motion.div {...fadeInUp} className="px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            Meet Our Team
          </h2>
          <CreativeTeamSection />
        </motion.div>
      </section>
    </div>
  );
};

export default AboutPage;
