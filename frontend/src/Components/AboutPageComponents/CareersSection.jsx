import { FaArrowRight } from "react-icons/fa";

const jobPositions = [
  {
    title: "Software Engineer",
    description: "Develop cutting-edge software solutions.",
  },
  {
    title: "UX/UI Designer",
    description: "Create visually appealing user interfaces.",
  },
  {
    title: "Marketing Specialist",
    description: "Drive sales, and create marketing strategies.",
  },
  {
    title: "Project Manager",
    description: "Oversee project lifecycles, and coordinate tasks.",
  },
];

const CareersSection = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-10">
      {/* Left Side Content */}
      <div className="md:w-1/2 text-center md:text-left">
        <span className="text-blue-600 font-semibold px-3 py-1 rounded-full text-sm bg-blue-100">
          Join our team
        </span>
        <h2 className="career-headline text-4xl font-bold mt-4">
          Looking for a great place to <br />
          <span>grow and thrive?</span>
        </h2>
        <p className="text-gray-500 mt-4">
          Apply now and become part of our innovative team dedicated to driving
          meaningful change in the tech industry.
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition">
          View open positions
        </button>
      </div>

      {/* Right Side - Job List */}
      <div className="md:w-1/2 space-y-4">
        {jobPositions.map((job, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
          >
            <div>
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p className="text-gray-500 text-sm">{job.description}</p>
            </div>
            <FaArrowRight className="text-blue-600" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareersSection;
