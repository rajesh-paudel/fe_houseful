import React from "react";
import { Heart } from "lucide-react";

const PropertyCard = ({ image, price, details, address, isNew }) => {
  return (
    <div className="flex flex-col rounded-md overflow-hidden bg-white  cursor-pointer  ">
      {/* Image Section */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={image}
          alt={address}
          className="w-full h-full object-cover "
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <span className="bg-slate-900/90 text-white text-[10px]  font-bold px-2 py-1 rounded-md tracking-wider">
              New 1 hour
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button className="absolute top-3 right-3 p-2 rounded-full bg-black/10 backdrop-blur-sm text-white hover:bg-white hover:text-red-500 transition-all cursor-pointer">
          <Heart size={20} strokeWidth={2} />
        </button>
      </div>

      {/* Content Section */}
      <div className="py-2 flex flex-col gap-1">
        <h3 className="text-2xl font-bold text-slate-900">{price}</h3>

        <div className="flex items-center gap-1 text-[15px] font-semibold text-slate-700">
          <span>{details}</span>
        </div>

        <p className="text-sm text-slate-500 truncate ">{address}</p>

        <div className="  border-t border-gray-50 flex items-center justify-between">
          <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
            Listed by Royal LePage
          </span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
