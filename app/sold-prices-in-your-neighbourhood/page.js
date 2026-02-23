export const metadata = {
  title: "Sold Prices In Your Neighbourhood",
};

export default function SoldPricesInYourNeighbourhoodPage() {
  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/hero.webp')" }}
    >
      <div className="min-h-screen bg-slate-900/45 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl">
          <h1 className="text-2xl md:text-5xl font-bold text-center text-white mb-8">
            Send Me The Sold Prices In My Neighbourhood
          </h1>

          <div className="relative overflow-hidden rounded-2xl border border-white/30 bg-white/12 backdrop-blur-xl shadow-2xl p-7 md:p-10">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/25 via-white/10 to-transparent" />
            <form className="space-y-6">
              <div className="flex items-center justify-center gap-3 text-left">
                <div className="h-26 w-26 shrink-0 overflow-hidden rounded-full">
                  <img
                    src="/profile2.png"
                    alt="Jason Byun"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-lg font-bold text-white">Jason Byun</p>
                  <p className="text-md text-white/80">Real Estate Broker</p>
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-white"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="w-full h-14 px-4 rounded-xl border border-white/40 bg-white/20 text-white placeholder:text-white/75 outline-none focus:ring-2 focus:ring-white/60"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-semibold text-white"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  className="w-full h-14 px-4 rounded-xl border border-white/40 bg-white/20 text-white placeholder:text-white/75 outline-none focus:ring-2 focus:ring-white/60"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-white"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full h-14 px-4 rounded-xl border border-white/40 bg-white/20 text-white placeholder:text-white/75 outline-none focus:ring-2 focus:ring-white/60"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="homeAddress"
                  className="text-sm font-semibold text-white"
                >
                  Home Address
                </label>
                <input
                  id="homeAddress"
                  type="text"
                  name="homeAddress"
                  placeholder="Home Address"
                  className="w-full h-14 px-4 rounded-xl border border-white/40 bg-white/20 text-white placeholder:text-white/75 outline-none focus:ring-2 focus:ring-white/60"
                />
              </div>
              <button
                type="submit"
                className="w-full h-14 rounded-full bg-blue-700 cursor-pointer hover:bg-blue-600 text-white font-bold transition-colors"
              >
                Get Sold Prices
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
