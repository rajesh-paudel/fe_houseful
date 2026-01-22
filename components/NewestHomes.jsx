"use client";
import React, { useRef } from "react";
import { ArrowRight } from "lucide-react";
import PropertyCard from "./PropertyCard";

const PROPERTIES = [
  {
    id: 1,
    price: "$549,900",
    details: "3 bds | 3 ba | 1,240 sqft",
    address: "123 Calgary Estates Dr, Calgary",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500",
    isNew: true,
  },
  {
    id: 2,
    price: "$685,000",
    details: "4 bds | 3 ba | 1,850 sqft",
    address: "456 Mountain View, Calgary",
    image:
      "https://plus.unsplash.com/premium_photo-1661876449499-26de7959878f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHByb3BlcnR5fGVufDB8fDB8fHww",
    isNew: true,
  },
  {
    id: 3,
    price: "$420,000",
    details: "2 bds | 2 ba | 980 sqft",
    address: "789 Downtown Way, Calgary",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500",
    isNew: false,
  },
  {
    id: 4,
    price: "$899,000",
    details: "5 bds | 4 ba | 2,400 sqft",
    address: "101 Luxury Lane, Calgary",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500",
    isNew: true,
    hasOpenHouse: true,
  },
  {
    id: 5,
    price: "$515,000",
    details: "3 bds | 2 ba | 1,150 sqft",
    address: "202 Prairie Road, Calgary",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500",
    isNew: true,
  },
];

const NewestHomes = () => {
  const scrollRef = useRef(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 bg-white w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-slate-800">
            Newest homes for sale in
          </h2>
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-[#b52d5d] mt-2">
            Calgary
          </h2>
        </div>

        {/* Slider Container */}
        <div className="relative group">
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-8"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {PROPERTIES.map((prop) => (
              <div
                key={prop.id}
                className="min-w-[85%] md:min-w-[calc(25%-15px)] snap-start"
              >
                <PropertyCard {...prop} />
              </div>
            ))}
          </div>

          {/* Floating Arrow Button */}
          <button
            onClick={scrollRight}
            className="absolute -right-5 top-[40%] -translate-y-1/2 z-10 bg-white border border-gray-300  p-3 rounded-full shadow-xl hover:bg-gray-200 transition-all hidden md:flex items-center justify-center cursor-pointer "
          >
            <ArrowRight className="w-5 h-5 text-slate-800" strokeWidth={3} />
          </button>
        </div>

        {/* Bottom Action Button */}
        <div className="mt-4 flex justify-center">
          <button className="px-8 py-3 rounded-full  bg-green-300 hover:bg-green-200 text-slate-700 font-bold cursor-pointer   transition-colors duration-300">
            Explore all homes
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewestHomes;
