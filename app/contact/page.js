import ContactSection from "@/components/ContactSection";

export const metadata = {
  title: "Contact Jason Byun",
  description:
    "Get in touch with Jason Byun for buying, selling, and real estate guidance across the GTA.",
};

export default function ContactPage() {
  return (
    <main className="bg-white">
      <ContactSection header="How can we help you today?" />
    </main>
  );
}
