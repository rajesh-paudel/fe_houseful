import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Bed,
  Bath,
  Square,
  Car,
  MapPin,
  ChevronRight,
  ChevronLeft,
  Info,
  Home as HomeIcon,
  Wind,
  Grid,
  CheckCircle2,
} from "lucide-react";
import GoSeeThisHome from "@/components/GoSeeThisHome";
import ScheduleViewing from "@/components/ScheduleViewing";
import { fetchMedia, fetchProperty } from "@/lib/api";
import { slugToCity } from "@/lib/slug";
import PropertyMediaGallery from "@/components/PropertyMediaGallery";
import ScrollToTop from "@/components/ScrollToTop";

const formatMoney = (value) => {
  if (value === null || value === undefined || value === "") return "-";
  const num = Number(value);
  if (Number.isNaN(num)) return "-";
  return num.toLocaleString();
};

const formatAddress = (p) => {
  if (!p) return "Address unavailable";
  if (p.UnparsedAddress) return p.UnparsedAddress;
  const parts = [
    [p.StreetNumber, p.StreetName, p.StreetSuffix].filter(Boolean).join(" "),
    p.UnitNumber ? `#${p.UnitNumber}` : null,
    p.City,
    p.StateOrProvince,
    p.PostalCode,
  ].filter(Boolean);
  return parts.join(", ");
};

const formatList = (arr) =>
  Array.isArray(arr) && arr.length > 0 ? arr.join(", ") : "-";

const fallbackText = (value, fallback = "-") =>
  value === null || value === undefined || value === "" ? fallback : value;

export async function generateMetadata({ params }) {
  const { city, pid } = await params;
  const data = await fetchProperty(pid);
  if (!data) {
    return {
      title: "Property Not Found | Houseful",
      description: "The property you are looking for is no longer available.",
    };
  }
  const cityName = slugToCity(city);
  const address = formatAddress(data);
  const price = data.ListPrice
    ? `$${Number(data.ListPrice).toLocaleString()}`
    : "Property";
  return {
    title: `${price} · ${address} | Houseful`,
    description: `View details, photos, and amenities for this ${data.PropertySubType || "home"} in ${cityName}.`,
  };
}

export default async function PropertyDetailPage({ params }) {
  const { city, pid } = await params;
  const data = await fetchProperty(pid);
  const media = await fetchMedia(pid, 25);

  if (!data) return notFound();

  const property = {
    price: data.ListPrice,
    address: formatAddress(data),
    neighborhood: fallbackText(data.CityRegion, data.City),
    city: data.City,
    beds: data.BedroomsTotal,
    baths: data.BathroomsTotalInteger ?? data.WashroomsType1Pcs,
    sqft: data.LivingAreaRange || data.BuildingAreaTotal,
    parking: data.ParkingTotal ?? data.ParkingSpaces,
    description: data.PublicRemarks,
    images: media.map((item) => item.MediaURL).filter(Boolean),
  };

  const highlights = [
    {
      label: "Status",
      value: fallbackText(data.StandardStatus || data.MlsStatus),
    },
    { label: "Type", value: fallbackText(data.PropertyType) },
    { label: "Sub Type", value: fallbackText(data.PropertySubType) },
    { label: "Style", value: formatList(data.ArchitecturalStyle) },
    { label: "Bedrooms", value: fallbackText(data.BedroomsTotal) },
    { label: "Bathrooms", value: fallbackText(data.BathroomsTotalInteger) },
    { label: "Kitchens", value: fallbackText(data.KitchensTotal) },
    { label: "Living Area", value: fallbackText(data.LivingAreaRange) },
    {
      label: "Lot Size",
      value:
        data.LotWidth && data.LotDepth
          ? `${data.LotWidth} x ${data.LotDepth} ${data.LotSizeUnits || ""}`.trim()
          : "-",
    },
    { label: "Lot Shape", value: fallbackText(data.LotShape) },
    { label: "Exposure", value: fallbackText(data.DirectionFaces) },
    { label: "Occupancy", value: fallbackText(data.OccupantType) },
  ];

  const utilities = [
    { label: "Cooling", value: formatList(data.Cooling) },
    { label: "Heat Type", value: fallbackText(data.HeatType) },
    { label: "Heat Source", value: fallbackText(data.HeatSource) },
    { label: "Sewer", value: formatList(data.Sewer) },
    { label: "Water", value: formatList(data.Water) },
    { label: "Laundry", value: formatList(data.LaundryFeatures) },
  ];

  const structure = [
    { label: "Basement", value: formatList(data.Basement) },
    { label: "Foundation", value: formatList(data.FoundationDetails) },
    { label: "Roof", value: formatList(data.Roof) },
    { label: "Construction", value: formatList(data.ConstructionMaterials) },
    { label: "Interior", value: formatList(data.InteriorFeatures) },
  ];

  const leaseInfo = [
    { label: "Transaction", value: fallbackText(data.TransactionType) },
    { label: "Furnished", value: fallbackText(data.Furnished) },
    {
      label: "Possession",
      value: fallbackText(data.PossessionType || data.PossessionDetails),
    },
    { label: "Rent Includes", value: formatList(data.RentIncludes) },
    { label: "Parking", value: formatList(data.ParkingFeatures) },
  ];

  const descriptionSections = [
    data.PublicRemarks,
    data.Directions ? `Directions: ${data.Directions}` : null,
    data.CrossStreet ? `Cross Street: ${data.CrossStreet}` : null,
  ].filter(Boolean);
  const virtualTourUrl = data.VirtualTourURLUnbranded;

  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-gray-500">
          <Link
            href={`/${city}`}
            className="flex items-center gap-2 px-2 py-1 rounded-full bg-gray-50 border border-gray-200 hover:bg-gray-100"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </Link>
          <div className="flex items-center gap-2 flex-wrap">
            <Link href="/" className="font-medium hover:text-gray-700">
              Houseful
            </Link>
            <ChevronRight size={12} />
            <Link className="hover:text-gray-700" href={`/${city}`}>
              {slugToCity(city)}
            </Link>
            <ChevronRight size={12} />
            <span className="text-gray-900 font-medium truncate max-w-[200px] md:max-w-none">
              {property.address}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <PropertyMediaGallery images={property.images} />
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              ${formatMoney(property.price)}
              <span className="text-sm font-medium text-gray-500 ml-2">
                {data.TransactionType || "For Sale"}
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-2">{property.address}</p>
            <p className="text-sm text-gray-500">
              {property.neighborhood} · {fallbackText(data.CountyOrParish)} ·{" "}
              {fallbackText(data.StateOrProvince)}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
              <div className="bg-gray-50 px-5 py-4 rounded-md flex justify-start gap-3 items-center">
                <Bed className="text-gray-400 mb-1" size={24} />
                <span className="text-sm font-bold">
                  {fallbackText(property.beds)} Bedrooms
                </span>
              </div>
              <div className="bg-gray-50 px-5 rounded-md flex justify-start gap-3 items-center">
                <Bath className="text-gray-400 mb-1" size={24} />
                <span className="text-sm font-bold">
                  {fallbackText(property.baths)} Bathrooms
                </span>
              </div>
              <div className="bg-gray-50 px-5 rounded-md flex justify-start gap-3 items-center">
                <Square className="text-gray-400 mb-1" size={24} />
                <span className="text-sm font-bold">
                  {fallbackText(property.sqft)}{" "}
                  {data.LivingAreaUnits || "sq. ft."}
                </span>
              </div>
              <div className="bg-gray-50 px-5 rounded-md flex justify-start gap-3 items-center">
                <Car className="text-gray-400 mb-1" size={20} />
                <span className="text-sm font-bold">
                  {fallbackText(property.parking)} Parking
                </span>
              </div>
            </div>
          </div>

          <div className="flex sticky top-16 z-40 bg-white gap-8 border-b text-sm font-bold text-gray-400 mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide pt-3">
            <span className="text-teal-700 border-b-2 border-teal-700 pb-3 cursor-pointer">
              Overview
            </span>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <div className="text-gray-700 leading-relaxed space-y-4">
              {descriptionSections.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
              {virtualTourUrl ? (
                <a
                  href={virtualTourUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-teal-600 px-4 py-2 text-sm font-semibold text-teal-700 hover:bg-teal-50"
                >
                  Virtual Tour
                </a>
              ) : null}
            </div>
          </section>

          <section className="bg-white mb-20">
            <h2 className="text-2xl font-bold mb-6">Home details</h2>

            <div className="border rounded-lg p-6 mb-8">
              <h3 className="flex items-center gap-2 font-bold mb-4">
                <CheckCircle2 size={18} className="text-teal-700" /> Overview
              </h3>
              <div className="grid grid-cols-2 gap-y-4 text-xs">
                {highlights.map((item) => (
                  <div key={item.label} className="flex flex-col">
                    <span className="text-gray-400 uppercase font-bold">
                      {item.label}
                    </span>{" "}
                    <span className="font-bold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
              <div>
                <h3 className="flex items-center gap-2 font-bold mb-4 border-b pb-2">
                  <HomeIcon size={18} className="text-gray-500" /> Interior
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span>Total Bathrooms</span>{" "}
                    <span className="font-bold">
                      {fallbackText(data.BathroomsTotalInteger)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bedrooms Above Grade</span>{" "}
                    <span className="font-bold">
                      {fallbackText(data.BedroomsAboveGrade)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Kitchens</span>{" "}
                    <span className="font-bold">
                      {fallbackText(data.KitchensTotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Flooring</span>{" "}
                    <span className="font-bold">
                      {formatList(data.InteriorFeatures)}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="flex items-center gap-2 font-bold mb-4 border-b pb-2">
                  <Wind size={18} className="text-gray-500" /> Amenities &
                  utilities
                </h3>
                <div className="space-y-3 text-xs">
                  {utilities.map((item) => (
                    <div key={item.label} className="flex justify-between">
                      <span>{item.label}</span>{" "}
                      <span className="font-bold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-1">
                <h3 className="flex items-center gap-2 font-bold mb-4 border-b pb-2">
                  <Grid size={18} className="text-gray-500" /> Structure
                </h3>
                <div className="space-y-2 text-xs text-gray-500">
                  {structure.map((item) => (
                    <div
                      key={item.label}
                      className="flex justify-between pb-1 border-b border-gray-50 italic"
                    >
                      {item.label}:{" "}
                      <span className="text-black font-bold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <div>
                <h3 className="flex items-center gap-2 font-bold mb-4 border-b pb-2">
                  <Info size={18} className="text-gray-500" /> Lease details
                </h3>
                <div className="space-y-3 text-xs">
                  {leaseInfo.map((item) => (
                    <div key={item.label} className="flex justify-between">
                      <span>{item.label}</span>{" "}
                      <span className="font-bold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="flex items-center gap-2 font-bold mb-4 border-b pb-2">
                  <MapPin size={18} className="text-gray-500" /> Location
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span>Neighbourhood</span>{" "}
                    <span className="font-bold">
                      {fallbackText(property.neighborhood)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Municipality</span>{" "}
                    <span className="font-bold">
                      {fallbackText(data.CountyOrParish)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Postal Code</span>{" "}
                    <span className="font-bold">
                      {fallbackText(data.PostalCode)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cross Street</span>{" "}
                    <span className="font-bold">
                      {fallbackText(data.CrossStreet)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <ScheduleViewing property={property} />
        </div>

        <div className="py-5">
          <div className="sticky x-40 top-22">
            <GoSeeThisHome cityName={property.city} />
          </div>
        </div>
      </main>
    </div>
  );
}
