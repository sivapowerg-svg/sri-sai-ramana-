import React from 'react';
import { Utensils, MapPin, Phone, Clock, ArrowUp, Lock, ExternalLink } from 'lucide-react';
import { RestaurantSettings } from '../types/restaurant';

interface FooterProps {
  settings: RestaurantSettings;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B1E16] text-[#FAF8F5] pt-16 pb-12 border-t border-[#183B2B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#1A4231]">
          {/* Brand & Tagline Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E8C547] text-[#183B2B] flex items-center justify-center font-bold">
                <Utensils className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-white tracking-tight">
                  {settings.name}
                </h3>
                <p className="font-telugu text-xs text-[#E8C547] font-medium leading-none">
                  {settings.teluguName}
                </p>
              </div>
            </div>

            <p className="text-sm text-emerald-100/80 max-w-sm leading-relaxed font-light">
              Authentic South Indian vegetarian restaurant in Gudur. Serving freshly prepared tiffins, Puri Bhaji, meals, and wholesome parcel food for rail travelers.
            </p>

            <p className="font-serif italic text-sm text-[#E8C547]">
              "Serving Happiness with Every Bite."
            </p>

            <div className="pt-2 text-xs text-emerald-300/70">
              <span>Pure Vegetarian</span> · <span>Gudur, Andhra Pradesh</span>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E8C547]">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100/80">
              <li>
                <a href="#home" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">About Our Hotel</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">Food Menu & Specials</a>
              </li>
              <li>
                <a href="#online-order" className="hover:text-white transition-colors">Order on Swiggy / Zomato</a>
              </li>
              <li>
                <a href="#train-food" className="hover:text-white transition-colors">Train Journey Food Service</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">Food Gallery</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">Customer Reviews</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Contact & Directions</a>
              </li>
            </ul>
          </div>

          {/* Contact & Hours Column (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E8C547]">
              Visit & Call
            </h4>
            <div className="space-y-2.5 text-xs text-emerald-100/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E8C547] shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E8C547] shrink-0" />
                <a
                  href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                  className="hover:text-white font-medium tabular-nums"
                >
                  {settings.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#E8C547] shrink-0" />
                <span>Daily: {settings.openingHours}</span>
              </div>
            </div>

            {/* Ordering Shortcuts */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              {settings.swiggyEnabled && settings.swiggyUrl ? (
                <a
                  href={settings.swiggyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FC8019] text-white text-xs font-semibold hover:bg-[#e67010] transition-colors"
                >
                  <span>Swiggy</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : null}

              {settings.zomatoEnabled && settings.zomatoUrl ? (
                <a
                  href={settings.zomatoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#CB202D] text-white text-xs font-semibold hover:bg-[#b81b27] transition-colors"
                >
                  <span>Zomato</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : null}

              <a
                href={settings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#183B2B] border border-[#2B6D4F] text-emerald-100 hover:text-white text-xs font-semibold transition-colors"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3 h-3 text-[#E8C547]" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300/60">
          <p>© {new Date().getFullYear()} Sri Sai Ramana Hotel. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1 hover:text-emerald-100 transition-colors cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span>Owner Portal</span>
            </button>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 hover:text-emerald-100 transition-colors p-1"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
