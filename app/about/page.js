import React from "react";
import {
  Mail,
  Phone,
  Globe,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";

export const metadata = {
  title: "About Jason Byun",
  description:
    "Meet Jason Byun, a Toronto-area real estate broker specializing in strategic guidance across GTA communities.",
};

const AboutPage = () => {
  const contactInfo = {
    email: "info@jasonbyun.com",
    cell: "647-471-9000",
    location: "Richmond Hill, Ontario L4B 3K9",
  };

  const aboutParagraphs = [
    "Bringing a legacy of trust and strategic financial insight to the Greater Toronto Area real estate market.",
    "With a background rooted in professional standards and a history of successful property investment, Jason Byun has built his reputation on lasting relationships. Every step of the journey, from financing to renovation to closing, is handled with precision and transparent communication.",
    "Jason's experience with international financial institutions gives clients an edge. He does not just see a house, he sees an asset. This analytical perspective and client-first approach helps buyers and sellers make confident decisions at every stage.",
  ];

  return (
    <main className="bg-white text-gray-900">
      <section className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-3xl bg-gray-100 ">
            <img
              src="/profile.png"
              alt="Jason Byun"
              className="h-full w-full object-cover"
            />
          </div>

          <h1 className="mt-8 font-serif text-4xl font-bold sm:text-5xl">
            Jason Byun
          </h1>
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 sm:text-base">
            Real Estate Broker
          </p>

          <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
            <h2 className="font-serif text-xl font-bold">Contact Details</h2>

            <div className="mt-5 space-y-3 text-sm sm:text-base">
              <div className="flex items-center justify-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-blue-600" />
                <span className="break-all">{contactInfo.email}</span>
              </div>

              <div className="flex items-center justify-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-blue-600" />
                <span>Cell: {contactInfo.cell}</span>
              </div>

              <div className="flex items-start justify-center gap-3">
                <Globe className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                <span>{contactInfo.location}</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-5 border-t border-gray-200 pt-5">
              <Facebook className="h-5 w-5 cursor-pointer text-gray-500 transition-colors hover:text-blue-600" />
              <Instagram className="h-5 w-5 cursor-pointer text-gray-500 transition-colors hover:text-pink-600" />
              <Linkedin className="h-5 w-5 cursor-pointer text-gray-500 transition-colors hover:text-blue-700" />
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-2xl space-y-5 text-center text-base leading-relaxed text-gray-700 sm:text-lg">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
