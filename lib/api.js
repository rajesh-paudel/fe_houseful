const MLS_BASE_URL = process.env.MLS_BASE_URL;
const MLS_TOKEN = process.env.MLS_TOKEN;
const MLS_MEDIA_CDN_BASE =
  process.env.MLS_MEDIA_CDN_BASE ||
  "https://treeb.tor1.cdn.digitaloceanspaces.com/treeb/Property";

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

const mediaTypeToExtension = (mediaType) => {
  if (!mediaType) return "";
  const type = mediaType.toLowerCase();
  if (type.includes("jpeg") || type.includes("jpg")) return "jpg";
  if (type.includes("png")) return "png";
  if (type.includes("webp")) return "webp";
  if (type.includes("gif")) return "gif";
  return type.split("/")[1] || "";
};

const buildMediaUrl = (listingKey, mediaKey, mediaType) => {
  if (!listingKey || !mediaKey) return null;
  const ext = mediaTypeToExtension(mediaType);
  if (!ext) return null;
  return `${MLS_MEDIA_CDN_BASE}/${listingKey}/${mediaKey}.${ext}`;
};

export async function fetchProperties({
  cityToPass,
  top = 20,
  skip = 0,
  beds,
  baths,
  homeType,
  priceMax,
  listingType,
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
  if (priceMax) filters.push(`ListPrice le ${priceMax}`);
  if (listingType === "sale") filters.push(`TransactionType eq 'For Sale'`);
  if (listingType === "lease") filters.push(`TransactionType eq 'For Lease'`);

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

export async function fetchProperty(listingKey) {
  const url = `${MLS_BASE_URL}/Property('${encodeURIComponent(listingKey)}')`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${MLS_TOKEN}`,
      Accept: "application/json",
    },
    next: { revalidate: 60 },
  });

  const data = await res.json();

  return data || null;
}

export async function fetchMedia(listingKey, top = 10) {
  if (!listingKey) return [];
  const params = [`$select=MediaKey,MediaType`, `$top=${top}`];
  const filter =
    "ResourceRecordKey eq '" +
    listingKey +
    "' and ImageSizeDescription ne 'Largest' and ImageSizeDescription ne 'Large' and ImageSizeDescription ne 'LargestNoWatermark'";
  params.push(`$filter=${encodeURIComponent(filter)}`);
  const url = `${MLS_BASE_URL}/Media?${params.join("&")}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${MLS_TOKEN}`,
      Accept: "application/json",
    },
    next: { revalidate: 60 },
  });

  const data = await res.json();

  const media = data.value || [];
  return media.map((item) => ({
    ...item,
    MediaURL: buildMediaUrl(listingKey, item.MediaKey, item.MediaType),
  }));
}
