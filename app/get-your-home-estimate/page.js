export const metadata = {
  title: "Get Your Home Estimate",
};

export default function GetYourHomeEstimatePage() {
  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/hero.webp')" }}
    >
      <div className="min-h-screen bg-slate-900/45 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-8">
            What&apos;s Your Home Worth?
          </h1>

          <div className="relative overflow-hidden rounded-2xl border border-white/30 bg-white/12 backdrop-blur-xl shadow-2xl p-7 md:p-10">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/25 via-white/10 to-transparent" />
          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-semibold text-white">
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
              <label htmlFor="phone" className="text-sm font-semibold text-white">
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
              <label htmlFor="email" className="text-sm font-semibold text-white">
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
              className="w-full h-14 rounded-full border border-white/50 bg-white/25 hover:bg-white/35 text-white font-bold transition-colors"
            >
              Get My Home Value
            </button>
          </form>
          </div>
        </div>
      </div>
    </main>
  );
}
