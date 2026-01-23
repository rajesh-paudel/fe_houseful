"use client";
import React from "react";
import { Bed, Bath, Square, Home, Heart, Map } from "lucide-react";
import nProgress from "nprogress";
import { useRouter } from "next/navigation";
export default function PropertyCard({ property }) {
  const router = useRouter();
  // Format price to currency string (e.g., $1,194,900)
  const formattedPrice = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <div
      onClick={() => {
        nProgress.start();
        router.push(`/${property.city}/${property.id}`);
      }}
      className="max-w-72 w-full bg-white rounded-xl overflow-hidden  cursor-pointer "
    >
      {/* Image Container */}
      <div className="relative h-48 w-full">
        {property.thumbnail ? (
          <img
            src={property.thumbnail}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-2">
            <Home size={48} strokeWidth={1} />
            <span className="text-xs font-medium">Image not available</span>
          </div>
        )}
        {/* Status Badge */}
        <div className="absolute top-3 left-3 bg-[#38003c] text-white text-xs font-bold px-3 py-1.5 rounded-md">
          New 49 mins
        </div>
        {/* Wishlist Icon */}
        <button className="absolute top-3 right-3 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full transition-colors">
          <Heart size={20} className="text-white" />
        </button>
      </div>

      {/* Content Area */}
      <div className="p-2 space-y-2">
        {/* Price and Map Icon */}
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-900">{formattedPrice}</h3>
          <button className="p-2 border border-gray-200 rounded-full hover:bg-gray-50">
            <Map size={18} className="text-gray-700" />
          </button>
        </div>

        {/* High-Level Stats */}
        <div className="flex items-center gap-3 text-gray-700 py-1">
          <div className="flex items-center gap-1">
            <Bed size={12} strokeWidth={2.5} />
            <span className="text-xs font-bold">{property.beds}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath size={12} strokeWidth={2.5} />
            <span className="text-xs font-bold">{property.baths}</span>
          </div>
          <div className="flex items-center gap-1">
            <Square size={12} strokeWidth={2.5} />
            <span className="text-xs font-bold truncate">
              {property.sqft.toLocaleString()} Sqft
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Home size={12} strokeWidth={2.5} />
            <span className="text-xs font-bold truncate">
              {property.propertyType}
            </span>
          </div>
        </div>

        {/* Address & MLS Info */}
        <div className="space-y-0.5">
          <p className="text-gray-800 font-medium truncate">
            {property.address}, {property.city}, {property.postalCode}
          </p>
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">
            MLS®{property.id.replace("prop-", "A")}
          </p>
          <p className="text-xs text-gray-500">
            Listed by Real Estate Professionals Inc.
          </p>
        </div>
      </div>
    </div>
  );
}
