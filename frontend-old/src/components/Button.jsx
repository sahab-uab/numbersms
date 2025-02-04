import { ArrowRight } from "lucide-react";

const Button = ({ darkMode, title, className }) => {
  return (
    <button
      className={`${
        darkMode
          ? "bg-blue-500 hover:bg-blue-600"
          : "bg-blue-600 hover:bg-blue-700"
      } ${className}`}
    >
      <span>{title}</span>
      <ArrowRight className="w-5 h-5" />
    </button>
  );
};

export default Button;
