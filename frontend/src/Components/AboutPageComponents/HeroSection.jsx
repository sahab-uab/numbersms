import { motion } from "framer-motion";
import { Sparkle } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://sierra.keydesign.xyz/web-app/wp-content/uploads/sites/4/2023/10/webapp-bg-drk.jpg')",
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
          <Sparkle className="w-16 h-16 mx-auto mb-8 text-white" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold mb-6 text-black text-transparent bg-clip-text bg-gradient-to-r"
        >
          Empowering startups <br /> to grow their business
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg md:text-xl text-[#b1b1ae] max-w-2xl mx-auto"
        >
          We are dedicated to crafting innovative tech solutions that
          revolutionize the way businesses operate.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
