import React from "react";

const CommunitySection = () => {
  const communities = [
    {
      name: "Toronto",
      count: 245,
      slug: "toronto",
      img: "https://plus.unsplash.com/premium_photo-1694475481348-7cbe417be129?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG9yb250b3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Mississauga",
      count: 128,
      slug: "mississauga",
      img: "https://images.unsplash.com/photo-1467806757054-808649965a76?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWlzc2lzc2F1Z2F8ZW58MHx8MHx8fDA%3D",
    },
    {
      name: "Brampton",
      count: 87,
      slug: "brampton",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Hamilton",
      count: 64,
      slug: "hamilton",
      img: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Oakville",
      count: 92,
      slug: "oakville",
      img: "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Burlington",
      count: 56,
      slug: "burlington",
      img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Vaughan",
      count: 78,
      slug: "vaughan",
      img: "https://images.unsplash.com/photo-1755316388093-faff473ffdfb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHZhdWdoYW58ZW58MHx8MHx8fDA%3D",
    },
    {
      name: "Markham",
      count: 103,
      slug: "markham",
      img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section className="bg-[#f8f9fa] py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Centered Minimal Header */}
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-serif text-slate-900 leading-snug">
            Search by Community
          </h3>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto text-base">
            Discover available listings and local market trends in Ontario's
            most sought-after neighborhoods.
          </p>
        </div>

        {/* Minimalist Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {communities.map((city, i) => (
            <a key={i} className="block group">
              {/* Card Container */}
              <div className="relative aspect-[4/5] overflow-hidden bg-white shadow-sm border border-slate-200">
                {/* Normal Image Tag */}
                <img
                  src={city.img}
                  alt={`${city.name} real estate`}
                  className="w-full h-full object-cover"
                />

                {/* Simple Text Overlay (Static, no hover effects) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <p className="text-lg font-medium leading-tight">
                      {city.name}
                    </p>
                    <p className="text-[11px] uppercase tracking-wider opacity-80 mt-1">
                      {city.count} Properties
                    </p>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
