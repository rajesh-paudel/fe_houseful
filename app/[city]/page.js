import { PROPERTIES } from "@/utils/data";
import PropertyCard from "@/components/PropertyCard";
import FilterBar from "@/components/FilterBar";

export default async function LocationPage({ params }) {
  const { city } = await params;

  // Clean the city name for display (e.g., "calgary-ab" -> "Calgary")
  const cityName =
    city?.split("-")[0].charAt(0).toUpperCase() + city?.split("-")[0].slice(1);
  console.log(city);
  // Filter properties based on the city
  const cityProperties = PROPERTIES.filter(
    (p) => p.city.toLowerCase() === city?.split("-")[0].toLowerCase(),
  );

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Sticky Filter Bar */}
      <FilterBar />

      <main className="max-w-8xl mx-auto px-8 py-8">
        {/* 2. Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 capitalize">
            {cityName}, homes for sale
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Showing 1 - {cityProperties.length} of 1,500 homes
          </p>
        </div>

        {/* 3. Property Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10">
          {cityProperties?.map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} />
          ))}
        </div>
      </main>
    </div>
  );
}
