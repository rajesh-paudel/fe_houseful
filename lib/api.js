const MLS_BASE_URL = process.env.MLS_BASE_URL;
const MLS_TOKEN = process.env.MLS_TOKEN;

const formatCityName = (str) => {
  if (!str) return "";
  return str
    .trim()
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const SORT_MAP = {
  newest: "OriginalEntryTimestamp desc",
  oldest: "OriginalEntryTimestamp asc",
  price_asc: "ListPrice asc",
  price_desc: "ListPrice desc",
};

export async function fetchProperties({
  cityToPass,
  top = 20,
  skip = 0,
  beds,
  baths,
  homeType,
  sort = "Newest",
}) {
  const params = [`$top=${top}`, `$skip=${skip}`, `$count=true`];

  // Sort
  const orderby = SORT_MAP[sort] || "OriginalEntryTimestamp desc";
  params.push(`$orderby=${encodeURIComponent(orderby)}`);

  // Filters
  const filters = [];

  if (cityToPass) {
    const formattedCity = formatCityName(cityToPass);
    filters.push(`contains(City, '${formattedCity}')`);
  }

  if (beds) filters.push(`BedroomsTotal ge ${beds}`);
  if (baths) filters.push(`BathroomsTotalInteger ge ${baths}`);
  if (homeType) filters.push(`PropertySubType eq '${homeType}'`);

  if (filters.length > 0) {
    params.push(`$filter=${encodeURIComponent(filters.join(" and "))}`);
  }

  const url = `${MLS_BASE_URL}/Property?${params.join("&")}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${MLS_TOKEN}`,
      Accept: "application/json",
    },
    next: { revalidate: 60 },
  });

  const data = await res.json();

  const totalCount = data["@odata.count"] || 0;

  return {
    items: data.value || [],
    totalCount,
    totalPages: Math.ceil(totalCount / top),
    currentPage: Math.floor(skip / top) + 1,
    top,
    skip,
  };
}
