import CityComponent from "@/components/CityComponent";
import { fetchProperties, fetchMedia } from "@/lib/api";
import { slugToCity } from "@/lib/slug";

export async function generateMetadata({ params }) {
  const { city } = await params;
  const cityName = slugToCity(city);
  return {
    title: `${cityName} Real Estate | Houseful`,
    description: `Browse homes for sale and lease in ${cityName} with local market insights.`,
  };
}

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
  const cityToPass = slugToCity(city);
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
  const itemsWithMedia = await Promise.all(
    (data.items || []).map(async (property) => {
      const media = await fetchMedia(property.ListingKey, 1);

      return { ...property, Media: media };
    }),
  );

  return (
    <CityComponent
      city={city}
      properties={itemsWithMedia}
      pagination={{
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalCount: data.totalCount,
      }}
    />
  );
}
