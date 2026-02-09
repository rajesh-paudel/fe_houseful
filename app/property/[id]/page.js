import { fetchProperty } from "@/lib/api";

export default async function PropertyPage({ params }) {
  const { id } = params;
  const property = await fetchProperty(id);

  return (
    <pre className="p-6 text-xs whitespace-pre-wrap">
      {JSON.stringify(property, null, 2)}
    </pre>
  );
}
