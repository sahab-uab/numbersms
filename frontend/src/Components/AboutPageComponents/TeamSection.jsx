import { useState } from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
const teamMembers = [
  {
    name: "Luke Jacobs",
    role: "WordPress Developer",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Claire Olson",
    role: "Sales Manager",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Sara Grant",
    role: "Marketing Manager",
    img: "https://randomuser.me/api/portraits/women/48.jpg",
  },
  {
    name: "Reece Bronson",
    role: "Financial Manager",
    img: "https://randomuser.me/api/portraits/men/45.jpg",
  },
];

const TeamSection = () => {
  const [selected, setSelected] = useState(null);
  return (
    <div>
      <h3 className="text-blue-600 font-semibold uppercase mb-2">
        Team members
      </h3>
      <h2 className="text-3xl font-bold">
        We are a <span className="text-blue-600">results-driven</span> team
      </h2>
      <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
        With a passion for innovation and a dedication to excellence, we bring
        diverse expertise to every project we undertake.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-10">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className={`rounded-xl p-6 shadow-md text-center transition-all duration-300 cursor-pointer ${
              selected === index
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-blue-600 hover:text-white"
            }`}
            onClick={() => setSelected(index)}
          >
            <img
              src={member.img}
              alt={member.name}
              className="rounded-lg mx-auto w-32 h-32 object-cover"
            />
            <h3 className="text-lg font-semibold mt-4">{member.name}</h3>
            <p className="text-gray-500 group-hover:text-white">
              {member.role}
            </p>
            <div className="flex justify-center gap-3 mt-4">
              <a href="#" className="bg-black text-white p-2 rounded-full">
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a href="#" className="bg-black text-white p-2 rounded-full">
                <FaTwitter className="w-4 h-4" />
              </a>
              <a href="#" className="bg-black text-white p-2 rounded-full">
                <FaLinkedinIn className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
