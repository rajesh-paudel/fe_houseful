"use client";
import React from "react";

import { Share, Heart, MapPin, Bed, Bath, Square, Car } from "lucide-react";
import { ChevronLeft } from "lucide-react";
const PropertyPage = () => {
  return (
    <main className="bg-white min-h-screen">
      {/* Dark Navbar for details page */}
      <nav className="border-b border-gray-200 py-2 px-8 flex items-center justify-between sticky top-0 bg-white z-40">
        <div className="flex items-center gap-4">
          <ChevronLeft className="w-8 h-8 rounded-full p-1 hover:bg-gray-200 cursor-pointer "></ChevronLeft>

          <div className="hidden md:flex gap-2 text-base text-gray-900">
            <span>Houseful</span> &gt; <span>AB</span> &gt; <span>Calgary</span>{" "}
            &gt; <span>Ogden</span>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2  px-3 py-1.5 rounded-full text-sm font-bold hover:bg-gray-100 cursor-pointer ">
            <Share size={16} /> Share
          </button>
          <button className="flex items-center gap-2  px-3 py-1.5 rounded-full text-sm font-bold hover:bg-gray-100 cursor-pointer">
            <Heart size={16} /> Save
          </button>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto p-6">
        {/* 2. Image Grid Layout */}
        <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[500px] rounded-2xl overflow-hidden mb-8">
          <div className="col-span-2 row-span-2 relative">
            <img
              src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800"
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-4 left-4 bg-black/60 text-white text-[10px] px-2 py-1 rounded">
              New 27 mins
            </span>
          </div>
          <div className="col-span-1 row-span-1">
            <img
              src="https://images.unsplash.com/photo-1580587771525-78b9bed3b928?w=400"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="col-span-1 row-span-1">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="col-span-1 row-span-1">
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="col-span-1 row-span-1 relative">
            <img
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400"
              className="w-full h-full object-cover"
            />
            <button className="absolute bottom-4 right-4 bg-white/90 px-4 py-2 rounded-lg text-sm font-bold shadow-md">
              View 48 images
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column: Details */}
          <div className="lg:w-2/3">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl font-bold text-slate-900">$449,900</h1>
                <p className="text-gray-600 font-medium">
                  7340 20a St SE, Calgary, AB T2C 0Y3
                </p>
              </div>
              <div className="bg-gray-100 p-2 rounded-full cursor-pointer">
                <MapPin className="text-pink-700" />
              </div>
            </div>

            {/* Icon Bar */}
            <div className="flex gap-8 border-y border-gray-100 py-6 mb-8 overflow-x-auto">
              <div className="flex items-center gap-2">
                <Bed size={20} /> <b>3+1</b> bedrooms
              </div>
              <div className="flex items-center gap-2">
                <Bath size={20} /> <b>2</b> bathrooms
              </div>
              <div className="flex items-center gap-2">
                <Square size={20} /> <b>911</b> sq.ft.
              </div>
              <div className="flex items-center gap-2">
                <Car size={20} /> <b>2</b> parking spots
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed text-sm">
              Open House This Saturday... Welcome to a beautifully refreshed
              home in Ogden. This renovated 2+1 bedroom residence combines
              modern convenience with comfortable, move-in ready finishes...
            </p>
          </div>

          <div className="lg:w-1/3">
            <div className="sticky top-24 border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-center mb-6">
                Go see this home <br />
                <span className="text-sm font-normal text-gray-500">
                  with a Calgary Buyer's agent
                </span>
              </h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full p-3 border rounded-lg outline-none focus:border-teal-600"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 border rounded-lg outline-none focus:border-teal-600"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="w-full p-3 border rounded-lg outline-none focus:border-teal-600"
                />
                <button className="w-full bg-[#004d4a] text-white py-4 rounded-full font-bold hover:opacity-90 transition-all">
                  Contact agent
                </button>
              </form>
              <p className="text-[10px] text-gray-400 mt-4 text-center italic">
                By clicking, you agree to the Terms of Use.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PropertyPage;
