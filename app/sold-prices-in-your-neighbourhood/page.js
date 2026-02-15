export const metadata = {
  title: "Sold Prices In Your Neighbourhood",
};

export default function SoldPricesInYourNeighbourhoodPage() {
  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/hero.webp')" }}
    >
      <div className="min-h-screen bg-black/35 flex items-center justify-center px-4 py-4">
        <div className="w-full max-w-2xl">
          <h1 className="text-2xl md:text-5xl font-bold text-center text-white mb-8">
            Send Me The Sold Prices In My Neighbourhood
          </h1>

          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-7 md:p-10">
            <form className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-slate-800"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="w-full h-14 px-4 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-[#004d4d]"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-semibold text-slate-800"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  className="w-full h-14 px-4 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-[#004d4d]"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-slate-800"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full h-14 px-4 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-[#004d4d]"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="homeAddress"
                  className="text-sm font-semibold text-slate-800"
                >
                  Home Address
                </label>
                <input
                  id="homeAddress"
                  type="text"
                  name="homeAddress"
                  placeholder="Home Address"
                  className="w-full h-14 px-4 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-[#004d4d]"
                />
              </div>
              <button
                type="submit"
                className="w-full h-14 rounded-full bg-[#004d4d] hover:bg-[#003d3d] text-white font-bold transition-colors"
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
