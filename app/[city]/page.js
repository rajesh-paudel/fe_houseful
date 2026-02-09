import CityComponent from "@/components/CityComponent";
import { fetchProperties } from "@/lib/api";

export default async function CityPage({ params, searchParams }) {
  const { city } = await params;

  const sParams = await searchParams;

  const currentPage = Number(sParams.page) || 1;
  const limit = 20;
  const skip = (currentPage - 1) * limit;

  const beds = sParams.beds ? Number(sParams.beds) : undefined;
  const baths = sParams.baths ? Number(sParams.baths) : undefined;
  const homeType = sParams.homeType || undefined;
  const priceMax = sParams.priceMax ? Number(sParams.priceMax) : undefined;
  const listingType = sParams.listingType || "sale";
  const sort = sParams.sort || "newest";
  const cityToPass = decodeURIComponent(city);
  const data = await fetchProperties({
    cityToPass,
    top: limit,
    skip,
    beds,
    baths,
    homeType,
    priceMax,
    listingType,
    sort,
  });

  return (
    <CityComponent
      city={city}
      properties={data.items}
      pagination={{
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalCount: data.totalCount,
      }}
    />
  );
}
