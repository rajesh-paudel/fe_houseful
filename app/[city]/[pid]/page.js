import { PROPERTIES } from "@/utils/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Bed,
  Bath,
  Square,
  Car,
  MapPin,
  ChevronRight,
  Share,
  Heart,
  Info,
  Home as HomeIcon,
  Wind,
  Flame,
  Ruler,
  Grid,
  CheckCircle2,
  ChevronLeft,
} from "lucide-react";
import GoSeeThisHome from "@/components/GoSeeThisHome";
import ScheduleViewing from "@/components/ScheduleViewing";

export default async function PropertyDetailPage({ params }) {
  const { city, pid } = await params;

  // Find property or use dummy fallback for the layout demo
  const property = PROPERTIES.find((p) => p.id === pid) || {
    price: 1299900,
    address: "631 55 Ave Southwest, Calgary, AB T2V 0G2",
    neighborhood: "Windsor Park",
    beds: "5",
    baths: "4",
    sqft: "2,533",
    parking: "2 parking spots",
    description: `Welcome to this stunning three-storey single-family residence located in the highly sought-after community of Windsor Park, one of Calgary's most prestigious and centrally located neighbourhoods. Thoughtfully designed for modern professional families and multigenerational living, this exceptional home blends sophistication, comfort, and functionality. 

The main living levels feature four spacious bedrooms above grade, including two luxurious primary suites, each complete with beautifully appointed ensuite bathrooms—ideal for growing families or live-in guests. In total, the home offers five bedrooms, four full bathrooms, and one half bath, providing exceptional space and flexibility.`,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      "https://images.unsplash.com/photo-1600607687940-4e2a09695d51",
      "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e",
      "https://images.unsplash.com/photo-1600585154526-990dcea464dd",
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Utility Nav */}
      <div className="max-w-8xl mx-auto px-8 py-3 flex justify-between items-center text-sm border-b  border-gray-300 ">
        <div className="flex items-center gap-2 text-gray-500">
          <div className="pr-4 border-r border-gray-300">
            <ChevronLeft className="w-8 h-8 rounded-full hover:bg-gray-200 cursor-pointer p-1"></ChevronLeft>
          </div>
          <Link href="/" className="ml-3">
            Houseful
          </Link>
          <ChevronRight size={14} />
          <Link href={`/${city}`}>{city}</Link> <ChevronRight size={14} />
          <span className="text-gray-900 font-medium truncate max-w-[150px] md:max-w-none">
            {property.address}
          </span>
        </div>
        <div className="flex gap-6 ">
          <button className="flex items-center gap-1 font-semibold text-gray-700 hover:text-black">
            <Share size={16} /> Share
          </button>
          <button className="flex items-center gap-1 font-semibold text-gray-700 hover:text-black">
            <Heart size={16} /> Save
          </button>
        </div>
      </div>

      {/* Photo Gallery - Matching Houseful Layout */}
      <div className="max-w-8xl mx-auto px-0 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-2 h-auto md:h-[500px] ">
        <div className="md:col-span-2 relative h-[300px] md:h-full">
          <img
            src={property.images[0]}
            alt="Property main"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="hidden md:grid col-span-1 grid-rows-2 gap-2">
          <img
            src={property.images[1]}
            alt="Interior"
            className="w-full h-full object-cover"
          />
          <img
            src={property.images[2]}
            alt="Interior"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="hidden md:grid col-span-1 grid-rows-2 gap-2 relative">
          <img
            src={property.images[3]}
            alt="Interior"
            className="w-full h-full object-cover"
          />
          <div className="relative">
            <img
              src={property.images[4]}
              alt="Interior"
              className="w-full h-full object-cover"
            />
            <button className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-full text-xs font-bold border border-gray-300 flex items-center gap-2">
              <Grid size={14} /> View all 50 images
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-8xl mx-auto px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {/* Header Info */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              ${property.price.toLocaleString()}
            </h1>
            <p className="text-lg text-gray-600 mb-4">{property.address}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div className="bg-gray-50 px-5 py-4 rounded-md flex justify-start gap-3 items-center">
                <Bed className="text-gray-400 mb-1" size={24} />
                <span className="text-sm font-bold">
                  {property.beds} Bedrooms
                </span>
              </div>
              <div className="bg-gray-50 px-5  rounded-md flex justify-start gap-3 items-center">
                <Bath className="text-gray-400 mb-1" size={24} />
                <span className="text-sm font-bold">
                  {property.baths} Bathrooms
                </span>
              </div>
              <div className="bg-gray-50 px-5  rounded-md flex justify-start gap-3 items-center">
                <Square className="text-gray-400 mb-1" size={24} />
                <span className="text-sm font-bold">
                  {property.sqft} sq. ft.
                </span>
              </div>
              <div className="bg-gray-50 px-5  rounded-md flex justify-start gap-3 items-center">
                <Car className="text-gray-400 mb-1" size={20} />
                <span className="text-sm font-bold">4 Parking spots</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex sticky top-16 z-40 bg-white gap-8 border-b text-sm font-bold text-gray-400 mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide pt-3">
            <span className="text-teal-700 border-b-2 border-teal-700 pb-3 cursor-pointer">
              Overview
            </span>
            <span className="pb-3 cursor-pointer hover:text-gray-600">
              Monthly payment
            </span>
            <span className="pb-3 cursor-pointer hover:text-gray-600">
              Neighbourhood
            </span>
            <span className="pb-3 cursor-pointer hover:text-gray-600">
              Schools
            </span>
          </div>

          {/* Description Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <div className="text-gray-700 leading-relaxed space-y-4">
              {property.description.split("\n\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </section>

          {/* Home Details Section - Matching image_bec4ea.png */}
          <section className="bg-white mb-20">
            <h2 className="text-2xl font-bold mb-6">Home details</h2>

            {/* Overview Box */}
            <div className="border rounded-lg p-6 mb-8">
              <h3 className="flex items-center gap-2 font-bold mb-4">
                <CheckCircle2 size={18} className="text-teal-700" /> Overview
              </h3>
              <div className="grid grid-cols-2 gap-y-4 text-xs">
                <div className="flex flex-col">
                  <span className="text-gray-400 uppercase font-bold">
                    MLS®#
                  </span>{" "}
                  <span className="font-bold">A2081003</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-400 uppercase font-bold">
                    Lot Size (acres)
                  </span>{" "}
                  <span className="font-bold">0.08895864</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-400 uppercase font-bold">
                    Property Sub Type
                  </span>{" "}
                  <span className="font-bold">Single Family Residence</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-400 uppercase font-bold">
                    Year Built
                  </span>{" "}
                  <span className="font-bold">2021</span>
                </div>
              </div>
            </div>

            {/* Icon Sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
              {/* Interior */}
              <div>
                <h3 className="flex items-center gap-2 font-bold mb-4 border-b pb-2">
                  <HomeIcon size={18} className="text-gray-500" /> Interior
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span>Total Bathrooms</span>{" "}
                    <span className="font-bold">5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Full Baths</span> <span className="font-bold">4</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Half Baths</span> <span className="font-bold">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Flooring</span>{" "}
                    <span className="font-bold">Carpeted, Hardwood, Tile</span>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="flex items-center gap-2 font-bold mb-4 border-b pb-2">
                  <Wind size={18} className="text-gray-500" /> Amenities &
                  utilities
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span>Cooling</span>{" "}
                    <span className="font-bold">Central air conditioning</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Heat source</span>{" "}
                    <span className="font-bold">Natural gas</span>
                  </div>
                </div>
              </div>

              {/* Rooms - This is the long list from the screenshot */}
              <div className="md:col-span-1">
                <h3 className="flex items-center gap-2 font-bold mb-4 border-b pb-2">
                  <Grid size={18} className="text-gray-500" /> Rooms information
                </h3>
                <div className="space-y-2 text-xs text-gray-500">
                  <div className="flex justify-between pb-1 border-b border-gray-50 italic">
                    Bedroom (# of Pieces: 1):{" "}
                    <span className="text-black font-bold">2.74M X 3.82M</span>
                  </div>
                  <div className="flex justify-between pb-1 border-b border-gray-50 italic">
                    Bedroom:{" "}
                    <span className="text-black font-bold">3.03M X 3.17M</span>
                  </div>
                  <div className="flex justify-between pb-1 border-b border-gray-50 italic">
                    Office:{" "}
                    <span className="text-black font-bold">3.33M X 3.24M</span>
                  </div>
                  <div className="flex justify-between pb-1 border-b border-gray-50 italic">
                    Bedroom:{" "}
                    <span className="text-black font-bold">3.40M X 11.00M</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* schedule viewing  */}
          <ScheduleViewing property={property} />
        </div>

        {/* Sticky Sidebar */}
        {/* <div className="lg:col-span-1">
          <div className="sticky top-10 border border-gray-200 rounded-2xl p-6 shadow-sm bg-gray-50/50">
            <h3 className="text-xl font-bold mb-1">Go see this home</h3>
            <p className="text-xs text-gray-500 mb-6">
              with a Calgary <span className="font-bold">Buyer's agent</span>
            </p>

            <form className="space-y-3">
              <input
                className="w-full p-3 border rounded-md bg-white text-sm"
                placeholder="Full name"
              />
              <input
                className="w-full p-3 border rounded-md bg-white text-sm"
                placeholder="Email"
              />
              <input
                className="w-full p-3 border rounded-md bg-white text-sm"
                placeholder="Phone"
              />
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span className="text-[10px] text-gray-500">
                  I would like to receive marketing messages from Houseful...{" "}
                  <button className="underline font-bold">Show more</button>
                </span>
              </div>
              <button className="w-full bg-[#004d4d] text-white py-3 rounded-md font-bold text-sm shadow-md hover:bg-[#003d3d] transition-all">
                Contact agent
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-[10px] text-gray-400">
                Not a good time?{" "}
                <button className="text-black font-bold underline">
                  Schedule a call
                </button>
              </p>
            </div>
          </div>
        </div> */}
        <div className="py-5">
          <div className="sticky x-40 top-22">
            <GoSeeThisHome cityName={property.city} />
          </div>
        </div>
      </main>
    </div>
  );
}
