import CitiesSection from "@/components/CitiesSection";
import ContactSection from "@/components/ContactSection";
import Hero from "@/components/Hero";
import InstagramFeed from "@/components/InstagramFeed";
import NewestHomes from "@/components/NewestHomes";
import TestimonialsSection from "@/components/TestimonialsSection";
import { fetchProperties } from "@/lib/api";
export default async function Home() {
  const data = await fetchProperties({
    cityToPass: "Toronto",
    top: 10,
    skip: 0,
  });
  const properties = data.items;
  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <NewestHomes properties={properties} />
        <CitiesSection />
        <InstagramFeed />

        <TestimonialsSection />
        <ContactSection />
      </main>
    </div>
  );
}
