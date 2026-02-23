"use client";

import {
  Menu,
  X,
  Mail,
  Phone,
  Instagram,
  ChevronDown,
  Search,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { cityToSlug, slugToCity } from "@/lib/slug";
import { usePathname, useRouter } from "next/navigation";
import nProgress from "nprogress";
const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const nonCityRoots = new Set([
    "about",
    "api",
    "avoid-money-pit",
    "blog",
    "cmhc-insurance-calculator",
    "contact",
    "credit-scores-affects-you",
    "get-your-home-estimate",
    "land-transfer-tax-calculator",
    "mortgage-calculator",
    "property",
    "save-on-interest",
    "sold-prices-in-your-neighbourhood",
    "5-costly-mistakes",
  ]);
  const firstPathSegment = pathname.split("/").filter(Boolean)[0] || "";
  const isCityRoute =
    Boolean(firstPathSegment) && !nonCityRoots.has(firstPathSegment);
  const showHeaderSearch = pathname !== "/";
  const [query, setQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileCommunitiesOpen, setIsMobileCommunitiesOpen] = useState(false);
  const [isMobileSellersOpen, setIsMobileSellersOpen] = useState(false);
  const [isMobileBuyersOpen, setIsMobileBuyersOpen] = useState(false);

  const communities = [
    "Toronto",
    "Richmond Hill",
    "Markham",
    "Bradford",
    "Vaughan",
    "Aurora",
    "Oakville",
    "Barrie",
    "Whitby",
  ];

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "ABOUT", href: "/about" },
    { name: "CONTACT", href: "/contact" },
  ];

  const sellerLinks = [
    { name: "Get Your Home Estimate", href: "/get-your-home-estimate" },
    {
      name: "Sold Prices In Your Neighbourhood",
      href: "/sold-prices-in-your-neighbourhood",
    },
  ];

  const buyerLinks = [
    { name: "Mortgage Calculator", href: "/mortgage-calculator" },
    {
      name: "Land Transfer Tax Calculator",
      href: "/land-transfer-tax-calculator",
    },
    { name: "CMHC Insurance Calculator", href: "/cmhc-insurance-calculator" },
    { name: "Credit Scores Affects You", href: "/credit-scores-affects-you" },
    { name: "Save On Interest", href: "/save-on-interest" },
    { name: "Avoid Money Pit", href: "/avoid-money-pit" },
    { name: "5 Costly Mistakes", href: "/5-costly-mistakes" },
  ];

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsMobileCommunitiesOpen(false);
    setIsMobileSellersOpen(false);
    setIsMobileBuyersOpen(false);
  };

  const suggestions =
    query.trim() === ""
      ? []
      : communities.filter((city) =>
          city.toLowerCase().includes(query.toLowerCase()),
        );

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedDesktop =
        desktopSearchRef.current &&
        desktopSearchRef.current.contains(event.target);
      const clickedMobile =
        mobileSearchRef.current &&
        mobileSearchRef.current.contains(event.target);
      if (!clickedDesktop && !clickedMobile) setIsExpanded(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const segments = pathname.split("/").filter(Boolean);
    const firstSegment = segments[0] || "";
    const secondSegment = segments[1] || "";
    const isCityPath = firstSegment && !nonCityRoots.has(firstSegment);
    const nextQuery =
      isCityPath && secondSegment
        ? secondSegment
        : isCityPath
          ? slugToCity(firstSegment)
          : "";

    setQuery(nextQuery);
    setIsExpanded(false);
    setIsSearching(false);
  }, [pathname]);

  const handleSelect = (city) => {
    setQuery(city);
    setIsExpanded(false);
    nProgress.start();
    router.push(`/${cityToSlug(city)}`);
  };

  const looksLikeListingInput = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return false;
    if (/\d/.test(trimmed)) return true;
    return /^[A-Za-z0-9-]{6,}$/.test(trimmed);
  };

  const handleSearch = async () => {
    const raw = query.trim();
    if (!raw || isSearching) return;

    const exactCity = communities.find(
      (city) => city.toLowerCase() === raw.toLowerCase(),
    );
    if (exactCity) {
      handleSelect(exactCity);
      return;
    }

    const firstPartialCity = communities.find((city) =>
      city.toLowerCase().includes(raw.toLowerCase()),
    );
    const shouldLookupListingFirst = looksLikeListingInput(raw);

    if (!shouldLookupListingFirst && firstPartialCity) {
      handleSelect(firstPartialCity);
      return;
    }

    try {
      setIsSearching(true);
      const res = await fetch(
        `/api/property-lookup?q=${encodeURIComponent(raw)}`,
      );
      const data = await res.json();

      if (res.ok && data?.found && data?.city && data?.listingKey) {
        setIsExpanded(false);
        nProgress.start();
        router.push(`/${cityToSlug(data.city)}/${data.listingKey}`);
        return;
      }
    } catch {
      // Ignore lookup errors and fallback to city behavior.
    } finally {
      setIsSearching(false);
    }

    if (firstPartialCity) {
      handleSelect(firstPartialCity);
      return;
    }

    if (!looksLikeListingInput(raw)) {
      setIsExpanded(false);
      nProgress.start();
      router.push(`/${cityToSlug(raw)}`);
    }
  };

  return (
    <>
      <header
        className={cn(
          "overflow-x-clip overflow-y-visible relative w-full z-50 bg-white text-black",
          isCityRoute ? "" : "border-b border-gray-200",
        )}
      >
        <div className="w-full mx-auto px-2 lg:px-6 py-2.5 sm:py-3 lg:py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0 flex items-center justify-start gap-6">
              <Link href="/" className="flex shrink-0">
                <img
                  src="/homeReality.svg"
                  className="h-8 w-auto sm:h-9 md:h-11 lg:h-12 object-contain"
                  alt="Jasin Buyn Realtor"
                />
              </Link>

              {showHeaderSearch && (
                <div
                  ref={desktopSearchRef}
                  className="relative hidden md:block flex-1 min-w-0 max-w-md ml-1 mr-3"
                >
                  <div
                    className={cn(
                      "relative flex items-center bg-gray-100 border border-transparent transition-all duration-200 hover:border-gray-200 hover:shadow-lg focus-within:border-gray-200 focus-within:bg-white focus-within:shadow-lg",
                      isExpanded && suggestions.length > 0
                        ? "rounded-t-2xl"
                        : "rounded-full",
                    )}
                  >
                    <input
                      type="text"
                      placeholder="Search by MLS number or city"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onFocus={() => setIsExpanded(true)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleSearch();
                        }
                      }}
                      className="w-full h-11 bg-transparent pl-6 pr-14 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none"
                    />
                    <button
                      onClick={handleSearch}
                      disabled={isSearching}
                      aria-label="Search"
                      className="absolute right-3 p-1 text-gray-700 hover:text-gray-900 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSearching ? (
                        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-gray-700" />
                      ) : (
                        <Search className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {isExpanded && suggestions.length > 0 && (
                    <div className="absolute left-0 right-0 bg-white rounded-b-2xl shadow-xl border border-t-0 border-gray-200 overflow-hidden z-[120]">
                      {suggestions.map((city) => (
                        <button
                          key={city}
                          onClick={() => handleSelect(city)}
                          className="w-full px-4 py-2.5 text-left text-gray-900 hover:bg-gray-50 transition flex items-center gap-2 border-b border-gray-100 last:border-0"
                        >
                          <MapPin className="w-4 h-4 text-[#38003c]" />
                          <span className="text-sm font-medium">{city}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="hidden lg:flex flex-col items-end gap-2 ml-4">
              {/* Top Row */}
              <div className="flex items-center gap-3 xl:gap-4 text-sm font-bold tracking-wider text-gray-900">
                <Link
                  href="tel:647-409-4848"
                  className="flex items-center gap-2 hover:text-blue-600 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  647-471-9000
                </Link>
                <span className="text-gray-300">|</span>
                <Link
                  href="mailto:info@jasonbyun.com"
                  className="flex items-center gap-2 hover:text-blue-600"
                >
                  <Mail className="w-5 h-5" /> info@jasonbyun.com
                </Link>
                <span className="text-gray-300">|</span>
                <div className="flex items-center gap-3">
                  <Link href="https://www.instagram.com/jasonbyunrealestate/">
                    <Instagram className="w-5 h-5 cursor-pointer hover:text-blue-600" />
                  </Link>
                </div>
              </div>

              <div className="w-full h-[1px] bg-gray-300" />

              {/* Bottom Row Navigation */}
              <nav className="flex items-center gap-4 xl:gap-6 pl-3">
                <Link
                  href="/"
                  className="text-sm font-bold tracking-widest text-gray-800 hover:text-blue-600"
                >
                  HOME
                </Link>

                {/* COMMUNITIES DROPDOWN */}
                <div className="relative group py-2">
                  <button className="flex items-center gap-1 text-sm font-bold tracking-widest text-gray-800 group-hover:text-blue-600 transition-colors">
                    COMMUNITIES{" "}
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  </button>

                  {/* Dropdown Menu  */}
                  <div className="absolute top-full left-0 w-40 bg-white shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100]">
                    <div className="flex flex-col py-2">
                      {communities.map((city) => (
                        <Link
                          key={city}
                          href={`/${cityToSlug(city)}`}
                          className="px-6 py-3 text-[15px] font-medium text-gray-800 hover:bg-gray-50 hover:text-blue-600 transition-colors border-b last:border-0 border-gray-50"
                        >
                          {city}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* SELLERS DROPDOWN */}
                <div className="relative group py-2">
                  <button className="flex items-center gap-1 text-sm font-bold tracking-widest text-gray-800 group-hover:text-blue-600 transition-colors">
                    SELLERS{" "}
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  </button>
                  <div className="absolute top-full left-0 w-80 bg-white shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100]">
                    <div className="flex flex-col py-2">
                      {sellerLinks.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          className="px-6 py-3 text-[15px] font-medium text-gray-800 hover:bg-gray-50 hover:text-blue-600 transition-colors border-b last:border-0 border-gray-50 whitespace-nowrap"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* BUYERS DROPDOWN */}
                <div className="relative group py-2">
                  <button className="flex items-center gap-1 text-sm font-bold tracking-widest text-gray-800 group-hover:text-blue-600 transition-colors">
                    BUYERS{" "}
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  </button>
                  <div className="absolute top-full left-0 w-80 bg-white shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100]">
                    <div className="flex flex-col py-2">
                      {buyerLinks.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          className="px-6 py-3 text-[15px] font-medium text-gray-800 hover:bg-gray-50 hover:text-blue-600 transition-colors border-b last:border-0 border-gray-50"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {navLinks.slice(1).map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-sm font-bold tracking-widest text-gray-800 hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            <button
              className="lg:hidden p-1.5 sm:p-2 text-black"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
          </div>

          {showHeaderSearch && (
            <div ref={mobileSearchRef} className="relative mt-2.5 md:hidden">
              <div
                className={cn(
                  "relative flex items-center bg-gray-100 border border-transparent transition-all duration-200 hover:border-gray-200 hover:bg-white hover:shadow-lg focus-within:border-gray-200 focus-within:bg-white focus-within:shadow-lg",
                  isExpanded && suggestions.length > 0
                    ? "rounded-t-2xl"
                    : "rounded-full",
                )}
              >
                <input
                  type="text"
                  placeholder="Search by MLS or city"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setIsExpanded(true)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSearch();
                    }
                  }}
                  className="w-full h-10 bg-transparent pl-5 pr-12 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none"
                />
                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  aria-label="Search"
                  className="absolute right-3 p-1 text-gray-700 hover:text-gray-900 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSearching ? (
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-gray-700" />
                  ) : (
                    <Search className="w-5 h-5" />
                  )}
                </button>
              </div>

              {isExpanded && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 bg-white rounded-b-2xl shadow-xl border border-t-0 border-gray-200 overflow-hidden z-[120]">
                  {suggestions.map((city) => (
                    <button
                      key={city}
                      onClick={() => handleSelect(city)}
                      className="w-full px-4 py-2.5 text-left text-gray-900 hover:bg-gray-50 transition flex items-center gap-2 border-b border-gray-100 last:border-0"
                    >
                      <MapPin className="w-4 h-4 text-[#38003c]" />
                      <span className="text-sm font-medium">{city}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* MOBILE SIDEBAR */}
      <aside
        className={cn(
          "fixed top-0 right-0 z-[60] h-full w-72 md:w-80 bg-white text-black shadow-2xl transform transition-transform duration-300",
          isMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-6 h-20 border-b">
          <span className="font-bold tracking-widest text-lg">MENU</span>
          <button onClick={closeMenu} className="p-2">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col px-6 py-8 gap-4 overflow-y-auto scrollbar-hide h-[calc(100%-80px)]">
          <Link
            href="/"
            onClick={closeMenu}
            className="text-sm font-bold tracking-widest"
          >
            HOME
          </Link>

          {/* Mobile Communities Accordion */}
          <div>
            <button
              onClick={() =>
                setIsMobileCommunitiesOpen(!isMobileCommunitiesOpen)
              }
              className="flex items-center justify-between w-full text-sm font-bold tracking-widest py-2"
            >
              COMMUNITIES{" "}
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform",
                  isMobileCommunitiesOpen && "rotate-180",
                )}
              />
            </button>
            {isMobileCommunitiesOpen && (
              <div className="flex flex-col pl-4 mt-2 gap-3 border-l-2 text-gray-700 border-gray-100">
                {communities?.map((city, index) => (
                  <Link
                    key={index}
                    href={`/${city}`}
                    onClick={closeMenu}
                    className="text-sm text-gray-700 py-1"
                  >
                    {city}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Sellers Accordion */}
          <div>
            <button
              onClick={() => setIsMobileSellersOpen(!isMobileSellersOpen)}
              className="flex items-center justify-between w-full text-sm font-bold tracking-widest py-2"
            >
              SELLERS{" "}
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform",
                  isMobileSellersOpen && "rotate-180",
                )}
              />
            </button>
            {isMobileSellersOpen && (
              <div className="flex flex-col pl-4 mt-2 gap-3 border-l-2 text-gray-700 border-gray-100">
                {sellerLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={closeMenu}
                    className="text-sm text-gray-700 py-1"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Buyers Accordion */}
          <div>
            <button
              onClick={() => setIsMobileBuyersOpen(!isMobileBuyersOpen)}
              className="flex items-center justify-between w-full text-sm font-bold tracking-widest py-2"
            >
              BUYERS{" "}
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform",
                  isMobileBuyersOpen && "rotate-180",
                )}
              />
            </button>
            {isMobileBuyersOpen && (
              <div className="flex flex-col pl-4 mt-2 gap-3 border-l-2 text-gray-700 border-gray-100">
                {buyerLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={closeMenu}
                    className="text-sm text-gray-700 py-1"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.slice(1).map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={closeMenu}
              className="text-sm font-bold tracking-widest border-b border-gray-50 pb-2"
            >
              {link.name}
            </Link>
          ))}

          <div className="mt-auto pt-6 flex flex-col gap-4">
            <Link
              href="tel:647-409-4848"
              className="text-md font-bold text-blue-600"
            >
              647-409-4848
            </Link>
            <Link
              href="mailto:jasin.buyn@gmail.com"
              className="text-xs text-gray-500"
            >
              info@jasonbyun.com
            </Link>
          </div>
        </nav>
      </aside>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[55] backdrop-blur-sm"
          onClick={closeMenu}
        />
      )}
    </>
  );
};

export default Header;
