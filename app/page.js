import CommunitySection from "@/components/CommunitySection";
import ContactSection from "@/components/ContactSection";
import Hero from "@/components/Hero";
import InstagramFeed from "@/components/InstagramFeed";
import FeaturedPropertiesSection from "@/components/FeaturedPropertiesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import { fetchMedia, fetchProperties } from "@/lib/api";

export const metadata = {
  title: "Jason Byun | GTA Real Estate Listings",
  description:
    "Explore homes for sale and lease across the Greater Toronto Area with local expertise.",
};

export default async function Home() {
  const data = await fetchProperties({
    cityToPass: "Toronto",
    top: 10,
    skip: 0,
  });
  const properties = await Promise.all(
    (data.items || []).map(async (property) => {
      const media = await fetchMedia(property.ListingKey, 1);
      return {
        ...property,
        Media: media,
        thumbnail: media?.[0]?.MediaURL || null,
      };
    }),
  );

  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <FeaturedPropertiesSection properties={properties} />
        <CommunitySection />
        <InstagramFeed />
        <TestimonialsSection />
        <ContactSection />
      </main>
    </div>
  );
}
