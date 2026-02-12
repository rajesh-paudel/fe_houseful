import Link from "next/link";
import React from "react";

const InstagramFeed = () => {
  const posts = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
      title: "Luxury Living in the Heart of the City",
      description:
        "Discover the perfect blend of modern architecture and comfort. #RealEstate #LuxuryHomes",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
      title: "Market Update: Q1 Trends",
      description:
        "Thinking about selling? Now is the time to understand your property's value. #MarketReport",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
      title: "Commercial Investment Opportunities",
      description:
        "Expert guidance for your next big commercial venture. Let's talk strategy. #Investing",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Open House: This Sunday",
      description:
        "Join us from 2-4 PM to tour this stunning waterfront estate. #OpenHouse",
    },
  ];

  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-tr from-yellow-400 to-purple-600 rounded-2xl flex items-center justify-center text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Follow me on Instagram
          </h2>
          <p className="text-gray-500 mt-2">@jasonbyun</p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
            >
              {/* Post Header */}
              <div className="p-3 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src="/homeReality.svg"
                    alt="home reality"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-xs font-semibold text-gray-800">
                  jasonbyun
                </span>
              </div>

              {/* Main Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-sm mb-1 text-gray-900 line-clamp-1">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                  {post.description}
                </p>
              </div>

              {/* Post Footer/Interactions */}
              <div className="px-4 py-3 border-t border-gray-50 flex justify-between items-center">
                <div className="flex gap-3">
                  <button className="text-gray-400 hover:text-red-500 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                  </button>
                  <button className="text-gray-400 hover:text-blue-500 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </button>
                </div>
                <button className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                  View Post
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-12 text-center">
          <Link
            href="https://www.instagram.com/jasonbyunrealestate/"
            className="inline-block bg-white border border-gray-300 px-8 py-3 rounded-full font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
          >
            View More on Instagram
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
