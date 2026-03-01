import { notFound } from "next/navigation";
import Link from "next/link";
import { Bed, Bath, Square, Car, ChevronRight } from "lucide-react";
import GoSeeThisHome from "@/components/GoSeeThisHome";
import ScheduleViewing from "@/components/ScheduleViewing";
import FeaturedPropertiesSection from "@/components/FeaturedPropertiesSection";
import { fetchMedia, fetchProperties, fetchProperty } from "@/lib/api";
import { slugToCity } from "@/lib/slug";
import PropertyMediaGallery from "@/components/PropertyMediaGallery";
import ScrollToTop from "@/components/ScrollToTop";
import ShareButton from "@/components/ShareButton";
import HomeDetailsTabs from "@/components/HomeDetailsTabs";

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

const getTimeAgo = (dateString) => {
  if (!dateString) return "New";
  const now = new Date();
  const listed = new Date(dateString);
  const diff = now - listed;
  if (!Number.isFinite(diff) || diff < 0) return "New";

  const minutes = Math.floor(diff / 1000 / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;

  const months = Math.floor(days / 30.44);
  if (months < 12) return `${months}mo ago`;

  return `${Math.floor(days / 365.25)}y ago`;
};

const formatBedroomDisplay = (aboveGrade, belowGrade, total) => {
  const aboveNum = Number(aboveGrade);
  const belowNum = Number(belowGrade);
  const totalNum = Number(total);

  if (Number.isFinite(aboveNum) && Number.isFinite(belowNum)) {
    if (aboveNum === 0 && belowNum === 0) return "0";
    if (belowNum === 0) return String(aboveNum);
    if (aboveNum === 0) return String(belowNum);
    return `${aboveNum}+${belowNum}`;
  }

  if (
    Number.isFinite(aboveNum) &&
    Number.isFinite(totalNum) &&
    totalNum >= aboveNum
  ) {
    const belowFromTotal = totalNum - aboveNum;
    if (aboveNum === 0 && belowFromTotal === 0) return "0";
    if (belowFromTotal === 0) return String(aboveNum);
    if (aboveNum === 0) return String(belowFromTotal);
    return `${aboveNum}+${belowFromTotal}`;
  }

  if (
    Number.isFinite(belowNum) &&
    Number.isFinite(totalNum) &&
    totalNum >= belowNum
  ) {
    const aboveFromTotal = totalNum - belowNum;
    if (aboveFromTotal === 0 && belowNum === 0) return "0";
    if (belowNum === 0) return String(aboveFromTotal);
    if (aboveFromTotal === 0) return String(belowNum);
    return `${aboveFromTotal}+${belowNum}`;
  }

  if (Number.isFinite(totalNum)) return String(totalNum);
  if (Number.isFinite(aboveNum)) return String(aboveNum);
  if (Number.isFinite(belowNum)) return String(belowNum);
  return "-";
};

export async function generateMetadata({ params }) {
  const { city, pid } = await params;
  const data = await fetchProperty(pid);
  if (!data) {
    return {
      title: "Property Not Found | Jason Byun ",
      description: "The property you are looking for is no longer available.",
    };
  }
  const cityName = slugToCity(city);
  const address = formatAddress(data);
  const price = data.ListPrice
    ? `$${Number(data.ListPrice).toLocaleString()}`
    : "Property";
  return {
    title: `${price} · ${address} | Jason Byun `,
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

  const listingType = data.TransactionType === "For Lease" ? "lease" : "sale";
  const nearbyData = await fetchProperties({
    cityToPass: data.City || slugToCity(city),
    top: 14,
    skip: 0,
    listingType,
    sort: "newest",
  });
  const nearbyCandidates = (nearbyData.items || [])
    .filter((item) => item.ListingKey !== pid)
    .slice(0, 7);
  const nearbyProperties = await Promise.all(
    nearbyCandidates.map(async (item) => {
      const itemMedia = await fetchMedia(item.ListingKey, 1);
      return { ...item, Media: itemMedia };
    }),
  );
  const flooringValue =
    Array.isArray(data.Flooring) && data.Flooring.length > 0
      ? data.Flooring.join(", ")
      : fallbackText(data.Flooring);
  const bedroomDisplay = formatBedroomDisplay(
    data.BedroomsAboveGrade,
    data.BedroomsBelowGrade,
    data.BedroomsTotal,
  );

  const highlights = [
    {
      label: "Status",
      value: fallbackText(data.StandardStatus || data.MlsStatus),
    },
    { label: "Type", value: fallbackText(data.PropertyType) },
    { label: "Property Type", value: fallbackText(data.PropertySubType) },
    { label: "Style", value: formatList(data.ArchitecturalStyle) },
    { label: "Bedrooms", value: bedroomDisplay },
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
    { label: "Interior Features", value: formatList(data.InteriorFeatures) },
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
  const timeAgoLabel = getTimeAgo(data.OriginalEntryTimestamp);
  const interior = [
    {
      label: "Total Bathrooms",
      value: fallbackText(data.BathroomsTotalInteger),
    },
    {
      label: "Bedrooms Above Grade",
      value: fallbackText(data.BedroomsAboveGrade),
    },
    { label: "Kitchens", value: fallbackText(data.KitchensTotal) },
    { label: "Flooring", value: flooringValue },
  ];
  const location = [
    { label: "Neighbourhood", value: fallbackText(property.neighborhood) },
    { label: "Municipality", value: fallbackText(data.CountyOrParish) },
    { label: "Postal Code", value: fallbackText(data.PostalCode) },
    { label: "Cross Street", value: fallbackText(data.CrossStreet) },
  ];

  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      <div className="w-full mx-auto px-4 md:px-8 py-4">
        <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-gray-600">
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href="/"
              className="font-medium hover:text-gray-900 cursor-pointer"
            >
              Home
            </Link>
            <ChevronRight size={12} />
            <Link
              className="hover:text-gray-900 cursor-pointer "
              href={`/${city}`}
            >
              {slugToCity(city)}
            </Link>
            <ChevronRight size={12} />
            <span className="text-gray-900 font-medium truncate max-w-[200px] md:max-w-none ">
              {property.address}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full px-4 md:px-8">
        <PropertyMediaGallery images={property.images} />
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="mb-8   ">
            <div className="mb-2">
              <span className="inline-block rounded-sm bg-gray-500 px-2 py-1 text-xs font-semibold text-white">
                {timeAgoLabel}
              </span>
            </div>
            <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
                ${formatMoney(property.price)}
                <span className="ml-2 text-sm md:text-base font-semibold text-teal-700">
                  {data.TransactionType || "For Sale"}
                </span>
              </h1>
              <ShareButton />
            </div>
            <p className="text-lg md:text-xl font-medium text-slate-900">
              {property.address}
            </p>
            <p className="text-sm md:text-base font-medium text-slate-900 mb-1">
              {property.neighborhood} · {fallbackText(data.CountyOrParish)} ·{" "}
              {fallbackText(data.StateOrProvince)}
            </p>

            <div className="  ">
              <p className="font-medium text-sm md:text-base text-slate-900 mb-1">
                <span>MLS&reg; Number:</span>{" "}
                {fallbackText(data.ListingKey, pid)}
              </p>
              <p className="font-medium text-sm md:text-base text-slate-900">
                <span>Listing Brokerage:</span>{" "}
                {fallbackText(data.ListOfficeName)}
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
              <div className="flex min-h-[50px] items-center gap-1.5 rounded-lg bg-white px-2 py-2 sm:min-h-[56px] sm:gap-2.5 sm:px-4 sm:py-3">
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-100 sm:h-9 sm:w-9">
                  <Bed className="text-rose-600" size={16} />
                </span>
                <span className="whitespace-nowrap text-[10px] font-semibold leading-tight text-slate-900 sm:text-sm">
                  {bedroomDisplay} Bedrooms
                </span>
              </div>
              <div className="flex min-h-[50px] items-center gap-1.5 rounded-lg bg-white px-2 py-2 sm:min-h-[56px] sm:gap-2.5 sm:px-4 sm:py-3">
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-100 sm:h-9 sm:w-9">
                  <Bath className="text-sky-600" size={16} />
                </span>
                <span className="whitespace-nowrap text-[10px] font-semibold leading-tight text-slate-900 sm:text-sm">
                  {fallbackText(property.baths)} Bathrooms
                </span>
              </div>
              <div className="flex min-h-[50px] items-center gap-1.5 rounded-lg bg-white px-2 py-2 sm:min-h-[56px] sm:gap-2.5 sm:px-4 sm:py-3">
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 sm:h-9 sm:w-9">
                  <Square className="text-emerald-600" size={16} />
                </span>
                <span className="whitespace-nowrap text-[10px] font-semibold leading-tight text-slate-900 sm:text-sm">
                  {fallbackText(property.sqft)}
                  &nbsp;
                  {data.LivingAreaUnits || "sq. ft."}
                </span>
              </div>
              <div className="flex min-h-[50px] items-center gap-1.5 rounded-lg bg-white px-2 py-2 sm:min-h-[56px] sm:gap-2.5 sm:px-4 sm:py-3">
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 sm:h-9 sm:w-9">
                  <Car className="text-amber-600" size={16} />
                </span>
                <span className="whitespace-nowrap text-[10px] font-semibold leading-tight text-slate-900 sm:text-sm">
                  {fallbackText(property.parking)} Parking
                </span>
              </div>
            </div>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Property Details
            </h2>
            <div className="text-base md:text-lg text-gray-700 leading-7 md:leading-8 space-y-4">
              {descriptionSections.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
              {virtualTourUrl ? (
                <a
                  href={virtualTourUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-teal-600 px-4 py-2 text-base font-semibold text-teal-700 hover:bg-teal-50"
                >
                  Virtual Tour
                </a>
              ) : null}
            </div>
          </section>

          <section className="bg-white mb-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Home details
            </h2>
            <HomeDetailsTabs
              highlights={highlights}
              interior={interior}
              utilities={utilities}
              structure={structure}
              leaseInfo={leaseInfo}
              location={location}
            />
          </section>

          <ScheduleViewing property={property} />

          {nearbyProperties.length > 0 ? (
            <div className="mt-10">
              <h2 className=" text-xl font-bold md:text-3xl">
                Similar Properties Nearby
              </h2>
              <FeaturedPropertiesSection
                cityName={data.City || slugToCity(city)}
                citySlug={city}
                properties={nearbyProperties}
                totalCount={nearbyProperties.length}
                hideHeader
              />
            </div>
          ) : null}
        </div>

        <div className="py-5">
          <div className="sticky  top-32">
            <GoSeeThisHome />
          </div>
        </div>
      </main>
    </div>
  );
}
