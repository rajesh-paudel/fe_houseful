const StatsSection = () => {
  return (
    <section className="py-12 bg-gray-50 border-y border-gray-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Unique: Single line stats with vertical dividers */}
        <div className="flex flex-wrap justify-between items-center gap-6">
          <div className="flex-1 min-w-[120px] text-center sm:text-left">
            <p className="font-serif text-2xl sm:text-3xl text-yellow-500">
              $500M+
            </p>
            <p className="text-gray-600 text-[11px]">Sales Volume</p>
          </div>
          <div className="hidden sm:block w-px h-12 bg-gray-200" />
          <div className="flex-1 min-w-[120px] text-center">
            <p className="font-serif text-2xl sm:text-3xl text-yellow-500">
              850+
            </p>
            <p className="text-gray-600 text-[11px]">Properties Sold</p>
          </div>
          <div className="hidden sm:block w-px h-12 bg-gray-200" />
          <div className="flex-1 min-w-[120px] text-center">
            <p className="font-serif text-2xl sm:text-3xl text-yellow-500">
              15+
            </p>
            <p className="text-gray-600 text-[11px]">Years Experience</p>
          </div>
          <div className="hidden sm:block w-px h-12 bg-gray-200" />
          <div className="flex-1 min-w-[120px] text-center sm:text-right">
            <p className="font-serif text-2xl sm:text-3xl text-yellow-500">
              #1
            </p>
            <p className="text-gray-600 text-[11px]">GTA Agent</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
