import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  ExternalLink,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { cityToSlug } from "@/lib/slug";

export const metadata = {
  title: "About Jason Byun ",
  description:
    "Meet Jason Byun, a Toronto-area real estate broker specializing in strategic guidance across GTA communities.",
};

const AboutPage = () => {
  const contactInfo = {
    email: "jason@jasonbyun.com",
    cell: "647-471-9000",
    location: "Richmond Hill, Ontario L4B 3K9",
    regions: [
      "Toronto",
      "Richmond Hill",
      "Markham",
      "New Market",
      "Aurora",
      "Etobicoke",
    ],
  };

  return (
    <main className="bg-white text-gray-900">
      {/* SECTION 1: HERO & BIO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5 space-y-8">
            {/* Image */}
            <div className="relative aspect-[3/4] sm:aspect-[4/5] max-h-[520px] overflow-hidden rounded-2xl bg-gray-100">
              <img
                src="/profile.png"
                alt="Jason Byun"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Contact Card */}
            <div className="p-6 sm:p-8 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
              <h3 className="font-serif text-lg sm:text-xl font-bold">
                Contact Details
              </h3>

              <div className="space-y-3 text-sm sm:text-base">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="break-all">{contactInfo.email}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Cell: {contactInfo.cell}</span>
                </div>

                <div className="flex items-start gap-3">
                  <Globe className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>{contactInfo.location}</span>
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-gray-200">
                <Facebook className="w-5 h-5 hover:text-blue-600 cursor-pointer" />
                <Instagram className="w-5 h-5 hover:text-pink-600 cursor-pointer" />
                <Linkedin className="w-5 h-5 hover:text-blue-700 cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h1 className="font-serif text-5xl md:text-6xl font-bold leading-tight">
                Jason Byun
              </h1>
              <p className="text-blue-600 font-semibold tracking-widest uppercase mt-2">
                Real Estate Broker
              </p>
            </div>

            <div className="prose prose-lg text-gray-600 max-w-none space-y-6">
              <p className="text-xl leading-relaxed text-gray-800 font-medium">
                Bringing a legacy of trust and strategic financial insight to
                the Greater Toronto Area real estate market.
              </p>

              <p>
                With a background deeply rooted in professional working
                standards and a history of successful property investment, Jason
                Byun has built his reputation on the foundation of life-long
                relationships. Every step of the journey—whether it’s navigating
                complex financing, overseeing renovations, or moving into a
                forever home—is handled with precision and clear, transparent
                communication.
              </p>

              <p>
                Jason’s corporate experience working with international
                financial institutions provides his clients with a unique
                advantage. He doesn’t just see a house; he sees an asset. This
                analytical perspective, combined with his dedication as a
                Halton, Peel, and Hamilton region specialist, ensures his
                clients always exceed their expectations.
              </p>

              <blockquote className="border-l-4 border-blue-600 pl-6 py-2 italic text-gray-700 bg-blue-50/50 rounded-r-lg">
                "Real estate is more than a transaction; it's about building a
                future. I am committed to being your partner in every
                milestone."
              </blockquote>
            </div>

            {/* Communities Section */}
            <div className="pt-8">
              <h3 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
                <MapPin className="text-blue-600" /> Specialized Regions
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {contactInfo.regions.map((city) => (
                  <Link
                    href={`/${cityToSlug(city)}`}
                    key={city}
                    className="bg-white border border-gray-200 px-4 py-3 rounded-xl flex items-center justify-between group hover:border-blue-600 transition-colors"
                  >
                    <span className="text-sm font-medium">{city}</span>
                    <ExternalLink className="w-3 h-3 text-gray-300 group-hover:text-blue-600" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-gray-900 text-white py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-serif font-bold">
            Ready to find your dream home?
          </h2>
          <p className="text-gray-400">
            Join Jason on this journey and experience a higher standard of real
            estate service.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full font-bold transition-transform active:scale-95 shadow-xl">
            Get In Touch Today
          </button>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
