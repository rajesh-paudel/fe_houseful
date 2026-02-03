"use client";
import React, { useState, useMemo } from "react";
import PropertyCard from "./PropertyCard";
import FilterBar from "./FilterBar";

const CityComponent = ({ city, PROPERTIES }) => {
  const [sortBy, setSortBy] = useState("Newest"); // Sorting
  const [filters, setFilters] = useState({
    beds: null,
    baths: null,
    homeType: null,
  });

  // Clean city name for display
  const cityName =
    city?.split("-")[0].charAt(0).toUpperCase() + city?.split("-")[0].slice(1);

  // Filter properties by city first
  const cityProperties = useMemo(
    () =>
      PROPERTIES.filter(
        (p) => p.city.toLowerCase() === city?.split("-")[0].toLowerCase(),
      ),
    [city, PROPERTIES],
  );

  // Apply filters + sorting
  const displayedProperties = useMemo(() => {
    let data = [...cityProperties];

    // Apply filters
    if (filters.beds) data = data.filter((p) => p.beds >= filters.beds);
    if (filters.baths) data = data.filter((p) => p.baths >= filters.baths);
    if (filters.homeType)
      data = data.filter((p) => p.propertyType === filters.homeType);

    // Apply sorting
    switch (sortBy) {
      case "Newest":
        data.sort((a, b) => new Date(b.listedDate) - new Date(a.listedDate));
        break;
      case "Oldest":
        data.sort((a, b) => new Date(a.listedDate) - new Date(b.listedDate));
        break;
      case "Highest Price":
        data.sort((a, b) => b.price - a.price);
        break;
      case "Lowest Price":
        data.sort((a, b) => a.price - b.price);
        break;
      case "Highest price / sq. ft.":
        data.sort((a, b) => b.price / b.sqft - a.price / a.sqft);
        break;
      case "Lowest price / sq. ft.":
        data.sort((a, b) => a.price / a.sqft - b.price / b.sqft);
        break;
    }

    return data;
  }, [cityProperties, filters, sortBy]);

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Filter Bar */}
      <FilterBar
        properties={cityProperties}
        filters={filters}
        setFilters={setFilters}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <main className="max-w-7xl mx-auto px-4 md:px-8 pb-18 pt-22">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 capitalize">
            {cityName}, homes for sale
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Showing 1 - {displayedProperties.length} of {cityProperties.length}{" "}
            homes
          </p>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {displayedProperties.map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default CityComponent;
