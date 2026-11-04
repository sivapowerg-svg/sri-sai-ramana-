import React from 'react';
import { Phone, Train, Clock, ShieldAlert, CheckCircle2, MessageCircle } from 'lucide-react';
import { RestaurantSettings } from '../types/restaurant';

interface TrainFoodDeliverySectionProps {
  settings: RestaurantSettings;
}

export const TrainFoodDeliverySection: React.FC<TrainFoodDeliverySectionProps> = ({ settings }) => {
  const cleanPhone = settings.phone.replace(/\s+/g, '');

  return (
    <section id="train-food" className="py-20 sm:py-28 bg-[#102B1F] text-white relative overflow-hidden">
      {/* Decorative ambient elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#E8C547]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual of Gudur Junction Meal Pack (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#E8C547]/30 shadow-2xl shadow-black/50 group">
              <img
                src="/src/assets/images/train_journey_food_pack_1793807869377.jpg"
                alt="Fresh South Indian train parcel packs prepared for Gudur Junction travelers"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E8C547] mb-1">
                  <Train className="w-4 h-4" />
                  <span>Gudur Junction (GDR) Station Service</span>
                </div>
                <h4 className="text-lg font-serif font-bold text-white leading-snug">
                  Fresh Hot Tiffins & Parcel Meals
                </h4>
                <p className="text-xs text-stone-300 mt-1">
                  Sealed, spill-proof packaging ideal for sleeper & AC train journeys.
                </p>
              </div>
            </div>

            {/* Station indicator badge */}
            <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 bg-[#E8C547] text-[#183B2B] px-3.5 py-2 rounded-xl shadow-lg border border-amber-300 font-bold text-xs flex items-center gap-2">
              <Train className="w-4 h-4" />
              <span>Gudur Junction Hub</span>
            </div>
          </div>

          {/* Right Column: Promotional Details & Direct Call CTA (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#E8C547]">
                <Train className="w-4 h-4" />
                <span>Railway Passenger Service</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#FAF8F5] tracking-tight">
                Delicious Food for Your Train Journey!
              </h2>
              <p className="font-telugu text-[#E8C547] text-base sm:text-lg font-medium">
                రైలు ప్రయాణికులకు రుచికరమైన మరియు వేడివేడి శాఖాహార భోజన సౌకర్యం
              </p>
            </div>

            <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed font-light">
              Enjoy South Indian food while travelling. Contact Sri Sai Ramana Hotel to enquire about food availability and delivery arrangements for your train journey.
            </p>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#183B2B] border border-[#24533C]">
                <CheckCircle2 className="w-4 h-4 text-[#E8C547] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-white block font-semibold">Freshly Packed on Call</strong>
                  <span className="text-emerald-200/80">Batters steamed fresh right before your train arrives.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#183B2B] border border-[#24533C]">
                <CheckCircle2 className="w-4 h-4 text-[#E8C547] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-white block font-semibold">Travel-Friendly Packaging</strong>
                  <span className="text-emerald-200/80">Spill-proof chutney tubs, foil wraps, and disposable cutlery.</span>
                </div>
              </div>
            </div>

            {/* Call Action & Hotline Box */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#183B2B] border border-[#2B6D4F] flex flex-col sm:flex-row items-center justify-between gap-5 shadow-lg">
              <div className="text-center sm:text-left">
                <span className="text-xs text-emerald-300 font-medium block">Train Food Enquiry Hotline</span>
                <span className="text-2xl sm:text-3xl font-serif font-bold text-[#E8C547] tracking-tight tabular-nums block mt-0.5">
                  {settings.phone}
                </span>
                <span className="text-[11px] text-emerald-200/70 mt-1 block">
                  West Gudur Rural · Near Gudur Railway Station
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
                <a
                  href={`tel:${cleanPhone}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-[#183B2B] bg-[#E8C547] hover:bg-[#F2D368] active:scale-[0.98] rounded-xl shadow-md transition-all whitespace-nowrap cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call to Enquire</span>
                </a>

                {settings.whatsappEnabled && (
                  <a
                    href={`https://wa.me/${settings.whatsappPhone}?text=${encodeURIComponent(
                      'Hello Sri Sai Ramana Hotel! I am travelling by train passing via Gudur and would like to enquire about food availability and parcel arrangements.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-xs font-semibold text-emerald-100 hover:text-white bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 rounded-xl transition-all whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>
            </div>

            {/* Clear Realistic Passenger Advisory */}
            <div className="flex items-start gap-2 text-xs text-emerald-200/75 bg-[#0D2118] border border-[#183B2B] p-3.5 rounded-xl">
              <Clock className="w-4 h-4 text-[#E8C547] shrink-0 mt-0.5" />
              <span>
                <strong>Traveller Advisory:</strong> Please call at least <strong>45–60 minutes</strong> before your train reaches Gudur Junction (GDR) to verify dish readiness and agree on pickup or delivery arrangements. We do not provide automated GPS train tracking.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
