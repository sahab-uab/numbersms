import { FaBolt, FaLaptop, FaCode } from "react-icons/fa";

export const featuresData = [
  {
    title: "Works with every service",
    description:
      "You get a real local wireless number. You can choose area code and carrier. Access from browser or over API.",
    icon: <FaBolt className="h-12 w-12 text-yellow-500" />,
  },
  {
    title: "Non-VoIP USA numbers 🇺🇸",
    description:
      "Many services check whether you have a VoIP number. We have non-VoIP USA numbers that will work with any service.",
    icon: <FaLaptop className="h-12 w-12 text-green-500" />,
  },
  {
    title: "Lowest prices guaranteed",
    description:
      "We monitor the competition and we'll give you the best price. Even if you have a custom deal with a different service.",
    icon: <FaCode className="h-12 w-12 text-purple-500" />,
  },
];
