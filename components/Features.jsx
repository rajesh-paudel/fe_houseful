import React from "react";
import { Search, Calculator, UserCheck } from "lucide-react";

const FeatureCard = ({ title, description, buttonText, icon: Icon }) => (
  <div className="flex flex-col p-4 md:p-8 bg-white border border-blue-200 rounded-xl h-full">
    {/* Illustration Placeholder */}
    <div className="mb-6 w-16 h-16 flex items-center justify-center bg-blue-50 rounded-lg text-blue-600">
      <Icon size={32} />
    </div>

    <h3 className="text-2xl font-bold text-slate-900 mb-4">{title}</h3>

    <p className="text-slate-600 leading-relaxed mb-8 flex-grow">
      {description}
    </p>

    <button className="w-fit px-6 py-2 rounded-full border border-slate-900 text-slate-900 font-semibold cursor-pointer hover:bg-gray-100 transition-all">
      {buttonText}
    </button>
  </div>
);

const Features = () => {
  const featureData = [
    {
      title: "Personalized search",
      description:
        "Find your home, your way with our customizable search tool, personalized property recommendations and market insights.",
      buttonText: "Explore homes",
      icon: Search,
    },
    {
      title: "Financial tools",
      description:
        "From calculating your budget to choosing a mortgage, we've got the financial tools and resources to help you make informed decisions.",
      buttonText: "Get pre-approved",
      icon: Calculator,
    },
    {
      title: "Expert guidance",
      description:
        "We'll match you with industry experts, like experienced local agents and RBC® mortgage specialists, so you get the support you need, when you need it.",
      buttonText: "Get connected",
      icon: UserCheck,
    },
  ];

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureData.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
