import { Award, Users, TrendingUp, Shield } from "lucide-react";

const AboutSection = () => {
  const features = [
    { icon: Award, title: "Award Winning", desc: "Top 1% in Ontario" },
    { icon: Users, title: "Client Focused", desc: "Personalized service" },
    { icon: TrendingUp, title: "Market Expert", desc: "Deep local knowledge" },
    { icon: Shield, title: "Trusted Advisor", desc: "Honest guidance" },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          {/* Left - Text */}
          <div className="lg:col-span-3">
            <p className="text-yellow-500 font-medium tracking-widest uppercase text-[10px] mb-3">
              About
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl text-gray-900 mb-4 leading-tight">
              Commitment to Excellence
            </h2>
            <div className="w-12 h-0.5 bg-yellow-500 mb-5" />

            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              With a passion for real estate and dedication to exceptional
              service, I've built my career on trust, integrity, and results. My
              approach combines market expertise with genuine care for each
              client's goals.
            </p>
            <p className="text-gray-700 text-sm leading-relaxed mb-6">
              Whether buying your first home, selling luxury property, or
              investing—I provide strategic guidance and hands-on support
              throughout.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((f, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                    <f.icon className="w-4 h-4 text-yellow-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-xs">
                      {f.title}
                    </p>
                    <p className="text-gray-600 text-[11px]">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Card */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6 text-white">
              <div className="text-center mb-6">
                {/* Initials Circle */}
                <div className="w-20 h-20 mx-auto mb-4 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="font-serif text-2xl font-semibold text-gray-800">
                    JB
                  </span>
                </div>
                <h3 className="font-serif text-lg text-white">Jason Byun</h3>
                <p className="text-yellow-500 text-xs">Licensed Broker</p>
              </div>

              {/* Info Cards */}
              <div className="space-y-3">
                <div className="bg-white/10 rounded p-3">
                  <p className="text-white/50 text-[10px] mb-0.5">
                    Designation
                  </p>
                  <p className="text-white text-xs">Luxury Home Specialist</p>
                </div>
                <div className="bg-white/10 rounded p-3">
                  <p className="text-white/50 text-[10px] mb-0.5">Brokerage</p>
                  <p className="text-white text-xs">RE/MAX Premier Inc.</p>
                </div>
                <div className="bg-white/10 rounded p-3">
                  <p className="text-white/50 text-[10px] mb-0.5">Expertise</p>
                  <p className="text-white text-xs">
                    Luxury, Investment, New Build
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
