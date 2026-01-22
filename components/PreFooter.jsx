"use client";
import React from "react";
import { ChevronRight, Phone } from "lucide-react";
import Link from "next/link";
const FooterLinks = ({ title, links }) => (
  <div className="flex flex-col gap-3">
    <h4 className="font-semibold text-xl text-slate-900">{title}</h4>
    {links.map((link, i) => (
      <Link key={i} href="#" className="text-base text-pink-700 ">
        {link}
      </Link>
    ))}
    <Link href="#" className="flex items-center text-lg font-semibold  mt-2 ">
      View all{" "}
      <div className="ml-2 bg-[#c1e837] rounded-sm p-1">
        <ChevronRight size={16} />
      </div>
    </Link>
  </div>
);

const PreFooter = () => {
  return (
    <section className="w-full bg-gray-100 pt-16">
      {/* Neighborhood Links */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <p className="text-center text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">
          Houseful Real Estate Listings
        </p>
        <h3 className="text-center text-3xl font-serif-elegant font-semibold mb-12">
          See the latest listings by neighbourhood
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <FooterLinks
            title="Newly added"
            links={[
              "Ottawa homes for sale",
              "London homes for sale",
              "Kitchener homes for sale",
            ]}
          />
          <FooterLinks
            title="Popular cities"
            links={[
              "Toronto homes for sale",
              "Calgary homes for sale",
              "Mississauga homes for sale",
            ]}
          />
          <FooterLinks
            title="Search near you"
            links={[
              "Houses for sale near me",
              "Newest listings for sale near me",
              "Condos for sale near me",
            ]}
          />
          <FooterLinks
            title="Find open houses"
            links={[
              "Vancouver open houses",
              "Calgary open houses",
              "Surrey open houses",
            ]}
          />
        </div>
      </div>

      {/* Teal CTA Banner */}
      <div className="bg-[#004d4a] py-12 flex flex-col items-center justify-center text-white px-6">
        <h3 className="text-3xl md:text-5xl  mb-8 text-cente font-serif">
          Meet with a real estate agent today
        </h3>
        <button className="flex items-center gap-3 bg-[#c1e837] text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-[#aecf32] transition-all cursor-pointer ">
          <Phone size={20} fill="currentColor" />
          Call 1-833-709-1946
        </button>
      </div>
    </section>
  );
};

export default PreFooter;
