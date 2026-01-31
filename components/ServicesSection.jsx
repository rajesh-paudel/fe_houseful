import {
  Home,
  Building2,
  TrendingUp,
  KeyRound,
  FileSearch,
  Handshake,
} from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Home,
      title: "Residential Sales",
      desc: "Buying or selling homes, from condos to estates.",
    },
    {
      icon: Building2,
      title: "Commercial",
      desc: "Strategic commercial property investments.",
    },
    {
      icon: TrendingUp,
      title: "Investment",
      desc: "High-yield opportunities for your portfolio.",
    },
    {
      icon: KeyRound,
      title: "First-Time Buyers",
      desc: "Guided support for your first purchase.",
    },
    {
      icon: FileSearch,
      title: "Market Analysis",
      desc: "Valuations and market insights.",
    },
    {
      icon: Handshake,
      title: "Relocation",
      desc: "Seamless moves to Ontario.",
    },
  ];

  return (
    <section id="services" className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-md mb-10">
          <p className="text-yellow-500 font-medium tracking-widest uppercase text-[10px] mb-3">
            Services
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl text-gray-900 mb-3">
            Comprehensive Solutions
          </h2>
          <div className="w-12 h-0.5 bg-yellow-500 mb-4" />
          <p className="text-gray-600 text-sm">
            Full suite of real estate services tailored to your goals.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <div
              key={i}
              className="group bg-white p-5 rounded-lg border border-gray-200 hover:border-yellow-300 transition-colors"
            >
              <div className="w-10 h-10 bg-yellow-100 rounded flex items-center justify-center mb-4 group-hover:bg-yellow-500 transition-colors">
                <s.icon className="w-5 h-5 text-yellow-500 group-hover:text-gray-900 transition-colors" />
              </div>
              <h3 className="font-serif text-sm text-gray-900 mb-1.5">
                {s.title}
              </h3>
              <p className="text-gray-600 text-xs leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
