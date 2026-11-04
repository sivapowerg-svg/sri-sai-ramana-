import React from 'react';
import { Star, MapPin, IndianRupee, ArrowRight, UtensilsCrossed, ExternalLink, Clock } from 'lucide-react';
import { RestaurantSettings } from '../types/restaurant';

interface HeroSectionProps {
  settings: RestaurantSettings;
  onOrderOnlineClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ settings, onOrderOnlineClick }) => {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] pt-24 lg:pt-32 pb-16 flex items-center bg-gradient-to-b from-[#0F291E]/60 via-[#0F291E]/85 to-[#0F291E]/95 overflow-hidden text-white"
    >
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#E8C547]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#1E523A]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Typography & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Trust Markers Bar */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-medium text-emerald-200">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#1B4D36] border border-[#2B6D4F] text-[#FAF8F5]">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                100% Pure Vegetarian
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#1B4D36]/80 text-[#FAF8F5]">
                <Star className="w-3.5 h-3.5 text-[#E8C547] fill-[#E8C547]" />
                <strong className="font-semibold">{settings.googleRating}</strong>
                <span className="text-emerald-300">({settings.googleReviewsCount} Reviews)</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#1B4D36]/80 text-[#FAF8F5]">
                <IndianRupee className="w-3 h-3 text-[#E8C547]" />
                <span>{settings.priceRange}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#1B4D36]/80 text-emerald-200">
                <MapPin className="w-3.5 h-3.5 text-[#E8C547]" />
                <span>Gudur, Andhra Pradesh</span>
              </span>
            </div>

            {/* Telugu Sub-heading */}
            <p className="font-telugu text-base sm:text-xl text-[#E8C547] font-semibold tracking-wide">
              {settings.teluguTagline}
            </p>

            {/* Main English Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#FAF8F5] leading-[1.15] text-balance">
              Authentic South Indian Taste,{' '}
              <span className="italic text-[#E8C547]">Made with Love.</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl font-light leading-relaxed">
              {settings.description}
            </p>

            {/* Operational notice */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-200/90 pt-1">
              <Clock className="w-4 h-4 text-[#E8C547]" />
              <span>
                Open Today: <strong className="text-white font-medium">{settings.openingHours}</strong> · West Gudur Rural
              </span>
            </div>

            {/* 3 Call-To-Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#menu"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#183B2B] bg-[#E8C547] hover:bg-[#F2D368] active:scale-[0.98] rounded-xl shadow-lg shadow-[#E8C547]/20 transition-all whitespace-nowrap"
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>Explore Our Menu</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOrderOnlineClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#1E523A] hover:bg-[#286649] active:scale-[0.98] border border-[#35825E] rounded-xl shadow-sm transition-all whitespace-nowrap cursor-pointer"
              >
                <span>Order Online</span>
                <span className="text-xs bg-emerald-700/80 text-emerald-100 px-2 py-0.5 rounded">
                  Swiggy · Zomato
                </span>
              </button>

              <a
                href={settings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-emerald-100 hover:text-white bg-transparent hover:bg-white/5 border border-emerald-700/60 rounded-xl transition-all whitespace-nowrap"
              >
                <MapPin className="w-4 h-4 text-[#E8C547]" />
                <span>Get Directions</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Outer decorative ring */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#E8C547]/30 shadow-2xl shadow-black/40 group">
                <img
                  src="/src/assets/images/hero_south_indian_feast_1793807865658.jpg"
                  alt="Authentic South Indian Breakfast Feast at Sri Sai Ramana Hotel"
                  referrerPolicy="no-referrer"
                  className="w-full h-[360px] sm:h-[420px] lg:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Contrast gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                {/* Floating caption overlay at bottom of image */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-left">
                  <div className="inline-block text-xs font-semibold uppercase tracking-wider text-[#E8C547] mb-1">
                    Authentic South Indian
                  </div>
                  <h3 className="text-lg font-serif font-bold text-white leading-snug">
                    Crispy Dosas, Steaming Idlis & Fresh Sambar
                  </h3>
                  <p className="text-xs text-stone-300 mt-1">
                    Prepared daily using traditional stone-ground recipes & pure ghee
                  </p>
                </div>
              </div>

              {/* Floating Specialty Badge (Top Right) */}
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-[#FAF8F5] text-[#183B2B] p-3 rounded-xl shadow-xl border border-stone-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#183B2B] flex items-center justify-center text-[#E8C547] font-serif font-bold text-lg">
                  ₹50
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold leading-tight text-[#183B2B]">Hot Puri Bhaji</p>
                  <p className="text-[11px] text-stone-500 font-medium">Customer Specialty</p>
                </div>
              </div>

              {/* Floating Railway Badge (Bottom Left) */}
              <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 bg-[#FAF8F5] text-[#183B2B] p-3 rounded-xl shadow-xl border border-stone-200 hidden sm:flex items-center gap-3 max-w-[240px]">
                <div className="w-10 h-10 rounded-lg bg-[#E8C547] text-[#183B2B] flex items-center justify-center font-bold text-sm">
                  GDR
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold leading-tight text-[#183B2B]">Train Journey Parcels</p>
                  <p className="text-[11px] text-stone-500 font-medium">Gudur Junction Stop</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
