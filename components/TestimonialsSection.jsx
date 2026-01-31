import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Michael Chen",
      location: "Toronto",
      text: "Jason made our first home purchase a breeze. His market knowledge helped us find our dream condo within budget.",
      type: "Buyer",
    },
    {
      name: "Sarah Miller",
      location: "Oakville",
      text: "We've worked with Jason three times. His luxury market expertise is unmatched—always gets the best deals.",
      type: "Repeat Client",
    },
    {
      name: "Jennifer Park",
      location: "Mississauga",
      text: "He got us 15% above asking in one week! Handled everything with care and professionalism.",
      type: "Seller",
    },
    {
      name: "Robert Thompson",
      location: "Hamilton",
      text: "As an investor, I need someone who understands ROI. Jason identified opportunities I would've missed.",
      type: "Investor",
    },
  ];

  return (
    <section id="testimonials" className="py-16 sm:py-20 bg-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-md mx-auto mb-10">
          <p className="text-yellow-500 font-medium tracking-widest uppercase text-[10px] mb-3">
            Testimonials
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl text-gray-900 mb-3">
            Client Success Stories
          </h2>
          <div className="w-12 h-0.5 bg-yellow-500 mx-auto" />
        </div>

        {/* Stats Bar */}
        <div className="flex justify-center gap-8 sm:gap-16 mb-10 py-6 border-y border-gray-300">
          <div className="text-center">
            <p className="font-serif text-2xl text-yellow-500">500+</p>
            <p className="text-gray-600 text-[11px]">Clients</p>
          </div>
          <div className="text-center">
            <p className="font-serif text-2xl text-yellow-500">4.9</p>
            <p className="text-gray-600 text-[11px]">Rating</p>
          </div>
          <div className="text-center">
            <p className="font-serif text-2xl text-yellow-500">98%</p>
            <p className="text-gray-600 text-[11px]">Satisfaction</p>
          </div>
          <div className="text-center">
            <p className="font-serif text-2xl text-yellow-500">200+</p>
            <p className="text-gray-600 text-[11px]">5-Star</p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid sm:grid-cols-2 gap-4">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`bg-white p-5 rounded-lg border border-gray-200 relative ${
                i % 2 === 1 ? "sm:translate-y-4" : ""
              }`}
            >
              <Quote className="absolute top-4 right-4 w-6 h-6 text-yellow-500/10" />

              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    className="w-3 h-3 fill-yellow-500 text-yellow-500"
                  />
                ))}
              </div>

              <p className="text-gray-900 text-xs leading-relaxed mb-4">
                "{t.text}"
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div>
                  <p className="font-medium text-gray-900 text-xs">{t.name}</p>
                  <p className="text-gray-500 text-[10px]">{t.location}, ON</p>
                </div>
                <span className="px-2 py-0.5 bg-gray-200 text-yellow-500 text-[10px] font-medium rounded">
                  {t.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
