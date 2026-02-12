import React from "react";
import {
  Phone,
  Mail,
  Globe,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";

const AgentFooter = () => {
  return (
    <footer className="bg-white pt-20 pb-10 px-6 border-t border-slate-300">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-12 mb-8">
          {/* Left Side: Professional Portrait */}
          <div className="w-full md:w-1/3 flex justify-center md:justify-start">
            <div className="relative w-64 aspect-[3/4] overflow-hidden grayscale-[0.2]">
              <img
                src="/profile.png"
                alt="Jason Byun - Broker"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Side: Identity & Contact */}
          <div className="w-full md:w-2/3 flex flex-col items-center md:items-start text-center md:text-left">
            {/* Social Icons - Simple & Clean */}
            <div className="flex gap-6 mb-8 text-slate-400">
              <Facebook
                size={18}
                className="cursor-pointer hover:text-amber-700 transition-colors"
              />
              <Instagram
                size={18}
                className="cursor-pointer hover:text-amber-700 transition-colors"
              />
              <Linkedin
                size={18}
                className="cursor-pointer hover:text-amber-700 transition-colors"
              />
              <Youtube
                size={18}
                className="cursor-pointer hover:text-amber-700 transition-colors"
              />
            </div>

            {/* Brokerage Identity */}
            <div className="mb-8">
              <h2 className="text-2xl font-serif tracking-tight text-slate-900 uppercase mb-2">
                Jason Byun
              </h2>
              <p className="text-amber-700 font-bold text-xs tracking-[0.2em] uppercase mb-6">
                Broker
              </p>
              <div className="h-px w-12 bg-slate-200 mx-auto md:mx-0 mb-6" />

              <p className="text-slate-900 font-bold text-sm tracking-wide uppercase">
                Right At Home Realty
              </p>
              <p className="text-slate-500 text-xs mt-1">Brokerage</p>
            </div>

            {/* Contact Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12 text-sm text-slate-600">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <Phone size={14} className="text-slate-400" />
                <span>647-471-9000</span>
              </div>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <Mail size={14} className="text-slate-400" />
                <a
                  href="mailto:jasonbyun@realty.com"
                  className="hover:text-amber-700 transition-colors"
                >
                  jason@jasonbyun.com
                </a>
              </div>
              <div className="flex  gap-3 justify-center md:justify-start">
                <Globe size={14} className="text-slate-400" />
                <div className="flex flex-col ">
                  <span>1550 16th Avenue Bldg B Unit 3 & 4</span>
                  <span>Richmond Hill, Ontario L4B 3K9</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Section */}
        <div className="w-full pt-16 border-t border-slate-200 text-slate-600 text-center">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="text-[12px] leading-[1.35]">
              <img
                src="/trebb.png"
                alt="Toronto Regional Real Estate Board"
                className="h-8 w-auto mx-auto mb-3"
              />
              <p>
                Toronto Real Estate Board (TRREB); All information deemed
                reliable but not guaranteed. All properties are subject to prior
                sale, change or withdrawal. Neither listing broker(s) or
                information provider(s) shall be responsible for any
                typographical errors, misinformation, misprints and shall be
                held totally harmless. Listing(s) information is provided for
                consumer&apos;s personal, non-commercial use and may not be used
                for any purpose other than to identify prospective properties
                consumers may be interested in purchasing. The data relating to
                real estate for sale on this website comes in part from the
                Internet Data Exchange program of the Multiple Listing Service.
                Real estate listings held by brokerage firms other than Team
                Ravi - Elixir Real Estate Inc. Brokerage, may be marked with the
                Internet Data Exchange logo and detailed information about those
                properties will include the name of the listing broker(s) when
                required by the MLS. Copyright &copy;2026 All rights reserved.
              </p>
            </div>
            <div className="text-[12px] leading-[1.35]">
              <img
                src="/crea.png"
                alt="MLS and REALTOR logos"
                className="h-7 w-auto mx-auto mb-3"
              />
              <p>
                The listing data displayed is deemed reliable but is not
                guaranteed accurate by CREA&reg;. The trademarks REALTOR&reg;,
                REALTORS&reg;, and the REALTOR&reg; logo are controlled by The
                Canadian Real Estate Association (CREA&reg;) and identify real
                estate professionals who are members of CREA&reg;. Used under
                license. The trademarks MLS&reg;, Multiple Listing Service&reg;
                and the associated logos are owned by The Canadian Real Estate
                Association (CREA&reg;) and identify the quality of services
                provided by real estate professionals who are members of
                CREA&reg;. Used under license.
              </p>
            </div>
          </div>

          <div className="max-w-6xl mx-auto mt-6 pt-6 border-t border-slate-200">
            <p className="max-w-4xl mx-auto leading-[1.35] text-[12px]">
              The REALTOR&reg; trademark is controlled by The Canadian Real
              Estate Association (CREA) and identifies real estate professionals
              who are members of CREA. The trademarks MLS&reg;, Multiple Listing
              Service&reg; and the associated logos identify professional
              services rendered by REALTOR&reg; members of CREA to effect the
              purchase, sale and lease of real estate as part of a cooperative
              selling system.
            </p>
            <img
              src="/crea.svg"
              alt="CREA"
              className="h-7 w-auto mx-auto mt-5 mb-3"
            />
            <p className="text-sm text-slate-700">
              &copy; 2026 Power Of Sale. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AgentFooter;
