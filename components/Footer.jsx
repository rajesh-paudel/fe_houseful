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
    <footer className="bg-white pt-20 pb-10 px-6 border-t border-slate-100">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-12 mb-16">
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

        {/* Legal Disclaimer Section - Matches RE/MAX bottom text */}
        <div className="pt-10 border-t border-slate-100 text-[10px] text-slate-400 leading-relaxed text-center">
          <p className="max-w-4xl text-sm mx-auto mb-6">
            The trademarks REALTOR®, REALTORS®, and the REALTOR® logo are
            controlled by The Canadian Real Estate Association (CREA) and
            identify real estate professionals who are members of CREA. The
            trademarks MLS®, Multiple Listing Service® and the associated logos
            are owned by CREA and identify the quality of services provided by
            real estate professionals who are members of CREA. Used under
            license.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default AgentFooter;
