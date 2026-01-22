import {
  Facebook,
  HeadphoneOff,
  Headphones,
  Instagram,
  Mail,
  Phone,
  Twitter,
} from "lucide-react";
import Link from "next/link";

const MainFooter = () => {
  return (
    <footer className="bg-[#f8fbff] py-24 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Nav Columns */}
          <div>
            <h4 className="font-semibold text-xl mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="#" className=" text-lg">
                  Homes for sale near me
                </Link>
              </li>
              <li>
                <Link href="#" className="text-lg">
                  Homes recently sold near me
                </Link>
              </li>
              <li>
                <Link href="#" className="text-lg">
                  Homes for sale in Calgary
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-xl mb-4">Join us</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="#" className="text-lg">
                  Real estate agents
                </Link>
              </li>
              <li>
                <Link href="#" className="text-lg">
                  Our brokerage office
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-xl mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="#" className="text-lg">
                  About us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-lg">
                  Resource centre
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="flex flex-col gap-4">
            <div className="border-y border-gray-300 py-4 flex items-center gap-3 text-lg font-medium">
              <Mail /> Contact support
            </div>
            <div className="border-b border-gray-300 py-4 flex items-center gap-3 text-lg font-medium">
              <Phone /> 1-833-709-1946
            </div>
            <div className="border-b border-gray-300 py-4 flex items-center gap-3 text-lg font-medium">
              <Headphones />
              Help Center
            </div>
            <div className="flex gap-6 mt-8">
              <div className="bg-[#004d4a] text-white p-2 rounded-full cursor-pointer hover:opacity-80">
                <Facebook size={24} />
              </div>
              <div className="bg-[#004d4a] text-white p-2 rounded-full cursor-pointer hover:opacity-80">
                <Instagram size={24} />
              </div>
              <div className="bg-[#004d4a] text-white p-2 rounded-full cursor-pointer hover:opacity-80">
                <Twitter size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Legal Text */}
        <div className="border-t border-gray-300 pt-8 text-[10px] text-gray-500 leading-relaxed grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="mb-4">
              OJOHome Canada Ltd. (“Houseful”) is a wholly-owned subsidiary of
              Royal Bank of Canada.
            </p>
            <p>
              IDX information is provided exclusively for consumers’ personal,
              non-commercial use and that it may not be used for any purpose
              other than to identify prospective properties consumers may be
              interested in purchasing. The information displayed herein is not
              intended to solicit a trade in real estate. Information deemed
              reliable but not guaranteed to be accurate. Listing information
              updated daily.
            </p>
            <p>
              Houseful refers potential buyers to real estate agents that are
              licensed in the province where the respective property is located.
              Houseful is licensed as a real estate brokerage in Ontario,
              Alberta, Manitoba and British Columbia.
            </p>
          </div>
          <div>
            <p className="mb-4">
              Please use the following address to send referral payments:
              Lockbox: OJOHome Canada Ltd. PO BOX 9479, STN A, Toronto, ON M5W
              4E1 Lockbox Number: T09479C
            </p>
            <p>
              The trademarks REALTOR®, REALTORS®, and the REALTOR® logo are
              controlled by The Canadian Real Estate Association (CREA) and
              identify real estate professionals who are members of CREA. The
              trademarks, Multiple Listing Service® and the associated logos are
              owned by CREA and identify the quality of services provided by
              real estate professionals who are members of CREA. Used under
              license.
            </p>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="mt-8 flex gap-4 text-[10px] font-semibold text-gray-500">
          <Link href="#">Terms of use</Link>
          <Link href="#">Legal</Link>
          <Link href="#">Privacy & Security</Link>
          <Link href="#">Accessibility</Link>
          <Link href="#">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
