import AgentContact from "@/components/AgentContact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";

import NewestHomes from "@/components/NewestHomes";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <NewestHomes />
      <Features />
      <AgentContact />
    </main>
  );
}
