import React from "react";
import { Home, ShieldCheck, HeartHandshake } from "lucide-react";

const AboutSection = () => {
  const values = [
    {
      title: "Local Knowledge, Real Insight",
      description:
        "I don’t just list homes — I help you understand neighborhoods, pricing, timing, and what truly makes a property a good decision.",
      icon: <Home className="w-5 h-5 text-amber-600" />,
    },
    {
      title: "Trust Over Transactions",
      description:
        "No pressure, no shortcuts. Every recommendation I make is based on what’s right for you — not what closes fastest.",
      icon: <ShieldCheck className="w-5 h-5 text-amber-600" />,
    },
    {
      title: "With You From First Visit to Final Key",
      description:
        "Buying or selling can feel overwhelming. I stay by your side through every step, question, and negotiation.",
      icon: <HeartHandshake className="w-5 h-5 text-amber-600" />,
    },
  ];

  return (
    <section id="about" className="bg-white py-16 px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Text Content */}
        <div className="flex-[1.3] order-2 md:order-1">
          <header className="mb-8">
            <span className="text-amber-600 font-semibold tracking-widest text-[11px] uppercase block mb-2">
              About — Jason Byun
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-slate-900 leading-tight">
              Real Estate, <br />
              <span className="italic text-slate-700">Handled With Care</span>
            </h2>
          </header>

          <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-8 max-w-xl">
            For me, real estate isn’t just about buying or selling property —
            it’s about people, life changes, and making confident decisions.
            Whether it’s your first home, an upgrade, or an investment, my goal
            is simple: help you move forward with clarity and peace of mind.
          </p>

          <div className="grid gap-6">
            {values.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-11 h-11 rounded-md bg-amber-50 border border-amber-100 flex items-center justify-center">
                    {item.icon}
                  </div>
                </div>

                <div>
                  <h3 className="text-slate-800 font-semibold text-base">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="flex-1 order-1 md:order-2 w-full flex justify-center md:justify-end">
          <div className="relative w-full max-w-[340px]">
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-amber-200 -z-10" />
            <div className="overflow-hidden shadow-xl border-4 border-white">
              <img
                src="/profile.png"
                alt="Jason Byun"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
