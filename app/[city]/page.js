import { PROPERTIES } from "@/utils/data";

import CityComponent from "@/components/CityComponent";
export default async function LocationPage({ params }) {
  const { city } = await params;

  return <CityComponent city={city} PROPERTIES={PROPERTIES} />;
}
