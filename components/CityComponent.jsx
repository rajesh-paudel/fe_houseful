"use client";
import React from "react";
import Link from "next/link";
import PropertyCard from "./PropertyCard";
import FilterBar from "./FilterBar";
import { useSearchParams } from "next/navigation";
import { slugToCity } from "@/lib/slug";
const CityComponent = ({ city, properties, pagination }) => {
  const { currentPage, totalPages, totalCount } = pagination;
  const searchParams = useSearchParams();

  const buildPageLink = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page);
    return `/${city}?${params.toString()}`;
  };

  const cityName = slugToCity(city);
  const listingType = searchParams.get("listingType") || "sale";
  const listingLabel = listingType === "lease" ? "homes for lease" : "homes for sale";
  return (
    <div className="min-h-screen bg-white">
      <FilterBar />

      <main className="max-w-7xl mx-auto px-4 md:px-8 pb-18 pt-5">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 capitalize">
            {cityName}, {listingLabel}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Total {totalCount} homes found • Page {currentPage} of {totalPages}
          </p>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6">
          {properties.length > 0 ? (
            properties.map((property, index) => (
              <PropertyCard
                key={property.ListingKey || property.id}
                property={property}
                index={index}
              />
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-gray-400">
              No properties found in this area.
            </div>
          )}
        </div>

        {/* Numbered Pagination UI */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-1 sm:gap-2 mt-12 mb-20 w-full px-2">
            {/* Prev Button */}
            <Link
              href={buildPageLink(currentPage - 1)}
              className={`px-2 py-2 sm:px-4 text-xs sm:text-sm border rounded transition-colors ${
                currentPage === 1
                  ? "pointer-events-none opacity-30"
                  : "hover:bg-gray-50"
              }`}
            >
              Prev
            </Link>

            {/* Page Numbers */}
            <div className="flex items-center gap-1 sm:gap-2">
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;

                // Show 1 neighbor on each side.

                const isNeighbor = Math.abs(currentPage - pageNum) <= 1;

                if (pageNum === 1 || pageNum === totalPages || isNeighbor) {
                  return (
                    <Link
                      key={pageNum}
                      href={buildPageLink(pageNum)}
                      className={`w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm flex items-center justify-center rounded border transition-colors ${
                        currentPage === pageNum
                          ? "bg-slate-800 text-white border-slate-800"
                          : "hover:bg-gray-50 text-slate-600"
                      }`}
                    >
                      {pageNum}
                    </Link>
                  );
                }

                // Ellipses logic - only show if we are exactly 2 pages away
                if (
                  pageNum === currentPage - 2 ||
                  pageNum === currentPage + 2
                ) {
                  return (
                    <span
                      key={pageNum}
                      className="text-gray-400 text-xs sm:text-sm px-1"
                    >
                      ...
                    </span>
                  );
                }

                return null;
              })}
            </div>

            {/* Next Button */}
            <Link
              href={buildPageLink(currentPage + 1)}
              className={`px-2 py-2 sm:px-4 text-xs sm:text-sm border rounded transition-colors ${
                currentPage === totalPages
                  ? "pointer-events-none opacity-30"
                  : "hover:bg-gray-50"
              }`}
            >
              Next
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default CityComponent;
