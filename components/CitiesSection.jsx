const CitiesSection = () => {
  const cities = [
    { name: "Toronto", count: 245 },
    { name: "Mississauga", count: 128 },
    { name: "Brampton", count: 87 },
    { name: "Hamilton", count: 64 },
    { name: "Oakville", count: 92 },
    { name: "Burlington", count: 56 },
    { name: "Vaughan", count: 78 },
    { name: "Markham", count: 103 },
    { name: "Richmond Hill", count: 71 },
    { name: "Ottawa", count: 45 },
  ];

  return (
    <section id="cities" className="py-16 sm:py-20 bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-md mb-10">
          <p className="text-yellow-500 font-medium tracking-widest uppercase text-[10px] mb-3">
            Areas
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl text-white mb-3">
            Ontario's Premier Markets
          </h2>
          <div className="w-12 h-0.5 bg-yellow-500 mb-4" />
          <p className="text-white/60 text-sm">
            Expert service across Ontario's most desirable locations.
          </p>
        </div>

        {/* Cities - horizontal scroll on mobile, grid on desktop */}
        <div className="flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-5 sm:overflow-visible scrollbar-hide">
          {cities.map((c, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-32 sm:w-auto group bg-gray-800 hover:bg-yellow-500 rounded-lg p-4 transition-all cursor-pointer"
            >
              <p className="font-serif text-sm text-white group-hover:text-gray-900 transition-colors">
                {c.name}
              </p>
              <p className="text-white/40 text-[11px] group-hover:text-gray-900/60 transition-colors">
                {c.count} listings
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CitiesSection;
