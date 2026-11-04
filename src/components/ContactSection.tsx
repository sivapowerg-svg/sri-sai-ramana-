import React from 'react';
import { MapPin, Phone, Clock, Navigation, ExternalLink, Calendar, Train, Utensils } from 'lucide-react';
import { RestaurantSettings } from '../types/restaurant';

interface ContactSectionProps {
  settings: RestaurantSettings;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ settings }) => {
  const cleanPhone = settings.phone.replace(/\s+/g, '');

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#0D261B]/80 backdrop-blur-xs text-[#FAF8F5] border-b border-[#1E4D36]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#E8C547] block">
            Location & Hours
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#FAF8F5] tracking-tight">
            Visit Sri Sai Ramana Hotel
          </h2>
          <p className="font-telugu text-[#E8C547] text-base sm:text-lg">
            స్వర్ణ భారతి నగర్, పశ్చిమ గూడూరు రూరల్, ఆంధ్రప్రదేశ్ 524101
          </p>
          <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
            Conveniently situated in West Gudur Rural with easy access from Gudur Junction railway station.
          </p>
        </div>

        {/* Content Grid: Contact Details Left (5 cols) & Map Frame Right (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Details Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-7 sm:p-8 border border-stone-200/90 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-serif font-bold text-[#183B2B]">
                  {settings.name}
                </h3>
                <p className="font-telugu text-amber-900 text-sm font-medium mt-0.5">
                  {settings.teluguName}
                </p>
                <p className="text-xs text-stone-500 mt-1">Authentic South Indian Vegetarian Dining</p>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-stone-100 text-[#183B2B] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#183B2B]" />
                </div>
                <div className="text-sm">
                  <strong className="text-stone-900 font-semibold block">Address</strong>
                  <p className="text-stone-600 mt-0.5 leading-relaxed">
                    {settings.address}
                  </p>
                  <p className="text-[11px] text-stone-400 mt-1">Pin Code: 524101 · Gudur Rural</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-stone-100 text-[#183B2B] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#183B2B]" />
                </div>
                <div className="text-sm">
                  <strong className="text-stone-900 font-semibold block">Telephone / Enquiries</strong>
                  <a
                    href={`tel:${cleanPhone}`}
                    className="text-[#183B2B] font-bold text-base hover:underline block mt-0.5 tabular-nums"
                  >
                    {settings.phone}
                  </a>
                  <p className="text-[11px] text-stone-400 mt-0.5">Call for tiffin availability & parcel packing</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-stone-100 text-[#183B2B] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#183B2B]" />
                </div>
                <div className="text-sm">
                  <strong className="text-stone-900 font-semibold block">Business Hours</strong>
                  <p className="text-stone-700 font-medium mt-0.5">
                    {settings.openingHours}
                  </p>
                  <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                    Closes at {settings.closingTime} (Open all 7 days)
                  </p>
                </div>
              </div>

              {/* Railway Proximity */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-stone-100 text-[#183B2B] flex items-center justify-center shrink-0">
                  <Train className="w-5 h-5 text-[#183B2B]" />
                </div>
                <div className="text-sm">
                  <strong className="text-stone-900 font-semibold block">Gudur Junction Connectivity</strong>
                  <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                    Ideal stopover for train travelers. Passengers can call ahead for station parcel handoff.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={settings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-1/2 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-[#183B2B] hover:bg-[#24533C] active:scale-[0.98] rounded-xl shadow-xs transition-all whitespace-nowrap cursor-pointer"
              >
                <Navigation className="w-4 h-4 text-[#E8C547]" />
                <span>Get Directions</span>
              </a>

              <a
                href={`tel:${cleanPhone}`}
                className="w-full sm:w-1/2 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-stone-800 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 active:scale-[0.98] rounded-xl transition-all whitespace-nowrap cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#183B2B]" />
                <span>Click to Call</span>
              </a>
            </div>
          </div>

          {/* Map Frame Card (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm flex flex-col">
            {/* Top Bar for Map */}
            <div className="p-4 bg-stone-100/70 border-b border-stone-200 flex items-center justify-between text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#183B2B]" />
                <span className="font-semibold text-stone-800">Gudur, Andhra Pradesh 524101</span>
              </div>
              <a
                href={settings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#183B2B] font-semibold hover:underline inline-flex items-center gap-1"
              >
                <span>View Full Map</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Google Map iframe */}
            <div className="flex-1 w-full min-h-[360px] sm:min-h-[420px] relative bg-stone-200">
              <iframe
                title="Google Map location of Sri Sai Ramana Hotel Gudur"
                src="https://maps.google.com/maps?q=Sri+Sai+Ramana+Hotel+Swarna+Bharathi+Nagar+West+Gudur+Rural+Andhra+Pradesh+524101&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[380px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
