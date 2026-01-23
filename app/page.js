import AgentContact from "@/components/AgentContact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import MainFooter from "@/components/MainFooter";
import Navbar from "@/components/Navbar";

import NewestHomes from "@/components/NewestHomes";
import PreFooter from "@/components/PreFooter";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <NewestHomes />
      <Features />
      <AgentContact />
      <PreFooter />
      <MainFooter />
    </main>
  );
}
