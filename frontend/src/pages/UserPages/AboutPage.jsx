import { motion } from "framer-motion";

import { fadeInUp } from "../../animation/Animation";
import TeamSection from "../../Components/AboutPageComponents/TeamSection";
import CreativeTeamSection from "../../Components/AboutPageComponents/CreativeTeamSection";
import HeroSection from "../../Components/AboutPageComponents/HeroSection";
import OurMission from "../../Components/AboutPageComponents/OurMission";
import OurValue from "../../Components/AboutPageComponents/OurValue";
import GlobalImpactSection from "../../Components/AboutPageComponents/GlobalImpactSection";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      {/* Hero Section */}
      <HeroSection />
      {/* Team Section */}
      <TeamSection />

      {/* Our Values */}
      <OurValue />
      {/* Our Mission */}
      <OurMission />

      {/* Global Impact */}
      <GlobalImpactSection />
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
