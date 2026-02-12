"use client";

import React from "react";
import { Bed, Bath, Square, Home, Heart, Map } from "lucide-react";
import nProgress from "nprogress";
import { useRouter } from "next/navigation";
import { cityToSlug } from "@/lib/slug";

export default function PropertyCard({ property }) {
  const router = useRouter();

  // Price Formatting
  const formattedPrice = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(property.ListPrice || 0);

  //map and handle the fields

  const beds = property.BedroomsTotal || 0;
  const baths = property.BathroomsTotalInteger || 0;
  const sqft = property.BuildingAreaTotal || property.LivingAreaRange || null;
  const propertyType = property.PropertySubType || "Property";
  const fullAddress =
    property.UnparsedAddress ||
    `${property.StreetNumber} ${property.StreetName}`;
  const city = property.City || "";
  const mls = property.ListingKey;
  const thumbnail = property.thumbnail || property.Media?.[0]?.MediaURL || null;
  const [imageLoadError, setImageLoadError] = React.useState(false);
  const listedDate = property.OriginalEntryTimestamp;
  const agency = property.ListOfficeName || "Real Estate Professionals Inc.";

  React.useEffect(() => {
    setImageLoadError(false);
  }, [thumbnail]);

  //function to show how long ago property was listed
  const getTimeAgo = (dateString) => {
    if (!dateString) return "New";
    const now = new Date();
    const listed = new Date(dateString);
    const diff = now - listed;

    // Calculate time units
    const minutes = Math.floor(diff / 1000 / 60);
    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;

    const months = Math.floor(days / 30.44);
    if (months < 12) return `${months}mo ago`;

    const years = Math.floor(days / 365.25);
    return `${years}y ago`;
  };

  return (
    <div
      onClick={() => {
        nProgress.start();
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        }
        router.push(`/${cityToSlug(city)}/${mls}`, { scroll: true });
      }}
      className="w-full bg-white rounded-xl overflow-hidden cursor-pointer  border border-gray-100"
    >
      {/* Image Section */}
      <div className="relative h-48 w-full bg-gray-100">
        {thumbnail && !imageLoadError ? (
          <img
            src={thumbnail}
            alt={fullAddress}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setImageLoadError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-2">
            <Home size={40} strokeWidth={1} />
            <span className="text-[10px] uppercase font-bold tracking-wider">
              {thumbnail ? "Image not found" : "No Photo"}
            </span>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-3 left-3 bg-[#38003c] text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
          {getTimeAgo(listedDate)}
        </div>

        <button className="absolute top-3 right-3 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full transition-colors">
          <Heart size={18} className="text-white" />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-3 space-y-2">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{formattedPrice}</h3>
          <p className="text-sm text-gray-600 truncate font-medium">
            {fullAddress}
          </p>
        </div>

        {/* Property Specs */}
        <div className="flex flex-col gap-2  text-gray-700 border-y border-gray-50 py-2">
          <div className="flex  gap-1">
            <div className="flex items-center gap-2">
              <Bed size={14} className="text-gray-400" />
              <span className="text-xs font-bold">{beds}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath size={14} className="text-gray-400" />
              <span className="text-xs font-bold">{baths}</span>
            </div>
            <div className="flex items-center gap-1 max-w-[80px]">
              <Square size={14} className="text-gray-400" />
              <span className="text-xs font-bold truncate">{sqft}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Home size={14} className="text-gray-400" />
            <span className="text-xs font-bold truncate">{propertyType}</span>
          </div>
        </div>

        {/* Footer info */}
        <div className="flex flex-col gap-0.5">
          <div className="flex justify-between items-center">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
              MLS® {mls}
            </p>
          </div>
          <p className="text-[10px] text-gray-400 truncate italic">{agency}</p>
        </div>
      </div>
    </div>
  );
}
