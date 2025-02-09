import React from "react";
import { BookOpen, MessageSquare, PhoneCall } from "lucide-react"; // Import icons using lucide-react (or use your preferred icon library)

const InfoSection = () => {
  const items = [
    {
      icon: <BookOpen className="w-8 h-8 " />,
      title: "Knowledge hub",
      description:
        "A comprehensive repository of knowledge designed to address your queries.",
    },
    {
      icon: <MessageSquare className="w-8 h-8 " />,
      title: "Chat to sales",
      description:
        "Get detailed information about our products, pricing, and any current promotions.",
    },
    {
      icon: <PhoneCall className="w-8 h-8 " />,
      title: "Call for assistance",
      description:
        "Our support team is available to answer your questions, and provide technical help.",
    },
  ];

  return (
    <div className="wrapper px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-start space-x-4  p-4 transition group"
        >
          {/* Icon */}
          <div className="flex items-center justify-center bg-purple-50 rounded-lg p-4 group-hover:bg-purple-400 group-hover:text-white ">
            {item.icon}
          </div>
          {/* Text */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600">
              {item.title}
            </h3>
            <p className="text-gray-600 mt-1">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfoSection;
