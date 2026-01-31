import { Button } from "@/components/ui/button";
import { Bed, Bath, Square, MapPin, ArrowRight } from "lucide-react";

const ListingsSection = () => {
  const listings = [
    {
      id: 1,
      price: "$2,450,000",
      address: "123 Rosedale Valley Rd",
      city: "Toronto",
      beds: 5,
      baths: 4,
      sqft: "4,200",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
      featured: true,
    },
    {
      id: 2,
      price: "$1,850,000",
      address: "456 Lakeshore Blvd W",
      city: "Mississauga",
      beds: 4,
      baths: 3,
      sqft: "3,100",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
      featured: false,
    },
    {
      id: 3,
      price: "$975,000",
      address: "789 King St E",
      city: "Hamilton",
      beds: 3,
      baths: 2,
      sqft: "2,400",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
      featured: false,
    },
  ];

  return (
    <section id="listings" className="py-16 sm:py-20 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-gold font-medium tracking-widest uppercase text-[10px] mb-3">
              Listings
            </p>
            <h2 className="font-display text-2xl sm:text-3xl text-foreground">
              Featured Properties
            </h2>
          </div>
          <Button variant="outline-navy" size="sm">
            View All <ArrowRight className="w-3 h-3" />
          </Button>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {listings.map((l) => (
            <div
              key={l.id}
              className="group bg-card rounded-lg overflow-hidden border border-border hover:border-gold/30 transition-colors"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={l.image}
                  alt={l.address}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {l.featured && (
                  <span className="absolute top-3 left-3 px-2 py-0.5 bg-gold text-navy-dark text-[10px] font-medium rounded">
                    Featured
                  </span>
                )}
                <div className="absolute bottom-3 left-3">
                  <p className="font-display text-lg text-white font-medium drop-shadow-md">
                    {l.price}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-display text-sm text-foreground mb-1">
                  {l.address}
                </h3>
                <div className="flex items-center gap-1 text-muted-foreground text-[11px] mb-3">
                  <MapPin className="w-3 h-3" />
                  <span>{l.city}, ON</span>
                </div>

                <div className="flex items-center gap-4 pt-3 border-t border-border text-muted-foreground text-[11px]">
                  <span className="flex items-center gap-1">
                    <Bed className="w-3 h-3" /> {l.beds}
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="w-3 h-3" /> {l.baths}
                  </span>
                  <span className="flex items-center gap-1">
                    <Square className="w-3 h-3" /> {l.sqft}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ListingsSection;
