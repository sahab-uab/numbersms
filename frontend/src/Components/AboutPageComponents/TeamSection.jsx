import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react"; // Assuming you're using this icon

const TeamSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="wrapper px-6">
        <div className="flex flex-col md:flex-row items-center gap-12 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-3xl p-6 md:p-12">
          <div className="flex-1">
            <img
              src="https://images.pexels.com/photos/317356/pexels-photo-317356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" // Replace with your image
              alt="Team Image"
              className="w-full h-auto rounded-2xl shadow-xl"
            />
          </div>

          {/* Right Side: Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex-1"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-orange-600 mb-4">
              We’re a Team. We’re a Family.
            </h2>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Semaj Africa is an online education platform that delivers video
              courses, programs, and resources for Individuals, Advertising &
              Media Specialists, Online Marketing Professionals, Freelancers,
              and anyone looking to pursue a career in digital marketing,
              Accounting, Web Development, Programming, Multimedia, and CAD
              Design.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-orange-500 text-white py-3 px-6 rounded-full text-lg hover:bg-orange-600 transition duration-300"
            >
              Say Hello
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
