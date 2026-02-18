export default function Loading() {
  return (
    <main className="min-h-[70vh] bg-white px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="mb-10 h-[280px] w-full rounded-3xl bg-slate-100 sm:h-[360px]" />

        <div className="space-y-10">
          {[1, 2].map((section) => (
            <section key={section} className="space-y-4">
              <div className="h-8 w-64 rounded-md bg-slate-100" />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((card) => (
                  <div key={card} className="overflow-hidden rounded-2xl border border-slate-100">
                    <div className="h-44 w-full bg-slate-100" />
                    <div className="space-y-3 p-4">
                      <div className="h-4 w-3/4 rounded bg-slate-100" />
                      <div className="h-4 w-1/2 rounded bg-slate-100" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-3 text-slate-500">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-500" />
          <span className="text-sm font-medium">Loading listings...</span>
        </div>
      </div>
    </main>
  );
}
