import { Facebook, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="py-12 bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center">
              <span className="font-semibold text-gray-900 text-sm">JB</span>
            </div>
            <div>
              <p className="text-white text-sm font-medium">Jason Byun</p>
              <p className="text-white/40 text-[10px]">Real Estate</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-6 text-white/60 text-xs">
            <Link href="/" className="hover:text-yellow-500 transition-colors">
              Home
            </Link>
            <a
              href="#about"
              className="hover:text-yellow-500 transition-colors"
            >
              About
            </a>
            <a
              href="#services"
              className="hover:text-yellow-500 transition-colors"
            >
              Services
            </a>
            <a
              href="#contact"
              className="hover:text-yellow-500 transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Social */}
          <div className="flex gap-3">
            {[Facebook, Instagram, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center text-white/60 hover:bg-yellow-500 hover:text-gray-900 transition-all"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-white/40 text-[11px]">
          <p>© {year} Jason Byun Real Estate</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
