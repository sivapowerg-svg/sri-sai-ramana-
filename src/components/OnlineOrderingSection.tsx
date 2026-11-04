import React from 'react';
import { ExternalLink, ShoppingBag, Clock, ShieldCheck, Settings, AlertCircle, Sparkles } from 'lucide-react';
import { RestaurantSettings } from '../types/restaurant';

interface OnlineOrderingSectionProps {
  settings: RestaurantSettings;
  onOpenAdmin: () => void;
}

export const OnlineOrderingSection: React.FC<OnlineOrderingSectionProps> = ({ settings, onOpenAdmin }) => {
  const hasSwiggyUrl = Boolean(settings.swiggyUrl && settings.swiggyUrl.trim().length > 0);
  const hasZomatoUrl = Boolean(settings.zomatoUrl && settings.zomatoUrl.trim().length > 0);

  return (
    <section id="online-order" className="py-20 sm:py-28 bg-[#0D261B]/80 backdrop-blur-xs text-[#FAF8F5] relative border-b border-[#1E4D36]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#143527] border border-[#23583F] text-[#E8C547] text-xs font-semibold uppercase tracking-wider">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Fast Home & Travel Delivery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#FAF8F5] tracking-tight">
            Order Your Favourite Food Online!
          </h2>
          <p className="text-base sm:text-lg text-emerald-100/90 font-light">
            Your favourite South Indian flavours are just a click away.
          </p>
          <p className="font-telugu text-[#E8C547] text-sm sm:text-base">
            మీకు ఇష్టమైన దక్షిణ భారతీయ వంటకాలను స్విగ్గీ మరియు జొమాటో ద్వారా సులభంగా ఆర్డర్ చేయండి.
          </p>
        </div>

        {/* Dual Platform Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {/* SWIGGY CARD */}
          <div className="relative rounded-2xl bg-white border border-[#FC8019]/25 p-7 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
            {/* Ambient orange glow */}
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-[#FC8019]/10 rounded-full blur-2xl group-hover:scale-125 transition-transform" />

            <div>
              {/* Brand Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#FC8019] text-white flex items-center justify-center shadow-md font-bold text-xl">
                    <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.93V18h-2v-1.07A4.004 4.004 0 018 13h2a2 2 0 102-2H9a4 4 0 014-4V6h2v1.07A4.004 4.004 0 0118 11h-2a2 2 0 10-2 2h3a4 4 0 01-4 3.93z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-stone-900 tracking-tight flex items-center gap-1.5">
                      Swiggy
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-orange-100 text-[#FC8019]">
                        Delivery Partner
                      </span>
                    </h3>
                    <p className="text-xs text-stone-500">Fast doorstep delivery in Gudur</p>
                  </div>
                </div>
              </div>

              <p className="text-stone-700 text-sm leading-relaxed mb-6">
                Order delicious food through Swiggy. Freshly prepared tiffins, Puri Bhaji, and lunch delivered straight to your home or office.
              </p>

              {/* Perks list */}
              <ul className="space-y-2 text-xs text-stone-600 mb-6 border-y border-stone-100 py-3">
                <li className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#FC8019]" />
                  <span>Real-time GPS delivery tracking on Swiggy</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Hygienic tamper-proof packaging</span>
                </li>
              </ul>
            </div>

            {/* Swiggy Button / State */}
            <div>
              {settings.swiggyEnabled && hasSwiggyUrl ? (
                <a
                  href={settings.swiggyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold text-white bg-[#FC8019] hover:bg-[#e67010] active:scale-[0.98] rounded-xl shadow-md shadow-[#FC8019]/25 transition-all cursor-pointer"
                >
                  <span>Order on Swiggy</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <div className="space-y-2">
                  <button
                    disabled
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-stone-400 bg-stone-100 rounded-xl cursor-not-allowed border border-stone-200"
                  >
                    <span>Order on Swiggy</span>
                    <span className="text-xs bg-stone-200 text-stone-600 px-2 py-0.5 rounded">
                      Coming Soon
                    </span>
                  </button>
                  <p className="text-center text-[11px] text-stone-500">
                    Online ordering link coming soon.{' '}
                    <button
                      onClick={onOpenAdmin}
                      className="text-[#FC8019] font-medium underline inline-flex items-center gap-0.5"
                    >
                      Configure listing URL <Settings className="w-2.5 h-2.5 inline" />
                    </button>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ZOMATO CARD */}
          <div className="relative rounded-2xl bg-white border border-[#CB202D]/25 p-7 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
            {/* Ambient red glow */}
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-[#CB202D]/10 rounded-full blur-2xl group-hover:scale-125 transition-transform" />

            <div>
              {/* Brand Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#CB202D] text-white flex items-center justify-center shadow-md font-bold text-xl">
                    <span className="font-black italic tracking-tighter text-2xl">z</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-stone-900 tracking-tight flex items-center gap-1.5">
                      Zomato
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-red-100 text-[#CB202D]">
                        Delivery Partner
                      </span>
                    </h3>
                    <p className="text-xs text-stone-500">Explore menu & instant delivery</p>
                  </div>
                </div>
              </div>

              <p className="text-stone-700 text-sm leading-relaxed mb-6">
                Explore our menu and order through Zomato. Browse verified dishes, read diner ratings, and enjoy doorstep delivery.
              </p>

              {/* Perks list */}
              <ul className="space-y-2 text-xs text-stone-600 mb-6 border-y border-stone-100 py-3">
                <li className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#CB202D]" />
                  <span>Live order confirmation and rider dispatch</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% vegetarian handling guaranteed</span>
                </li>
              </ul>
            </div>

            {/* Zomato Button / State */}
            <div>
              {settings.zomatoEnabled && hasZomatoUrl ? (
                <a
                  href={settings.zomatoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold text-white bg-[#CB202D] hover:bg-[#b81b27] active:scale-[0.98] rounded-xl shadow-md shadow-[#CB202D]/25 transition-all cursor-pointer"
                >
                  <span>Order on Zomato</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <div className="space-y-2">
                  <button
                    disabled
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-stone-400 bg-stone-100 rounded-xl cursor-not-allowed border border-stone-200"
                  >
                    <span>Order on Zomato</span>
                    <span className="text-xs bg-stone-200 text-stone-600 px-2 py-0.5 rounded">
                      Coming Soon
                    </span>
                  </button>
                  <p className="text-center text-[11px] text-stone-500">
                    Online ordering link coming soon.{' '}
                    <button
                      onClick={onOpenAdmin}
                      className="text-[#CB202D] font-medium underline inline-flex items-center gap-0.5"
                    >
                      Configure listing URL <Settings className="w-2.5 h-2.5 inline" />
                    </button>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Informative Security & Trust Strip */}
        <div className="max-w-4xl mx-auto rounded-xl bg-stone-100 border border-stone-200/80 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-600">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>
              All digital payments, live delivery tracking, and order confirmations are fulfilled securely by Swiggy and Zomato.
            </span>
          </div>
          <button
            onClick={onOpenAdmin}
            className="text-[#183B2B] font-semibold hover:underline inline-flex items-center gap-1 shrink-0"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Owner Listing Settings</span>
          </button>
        </div>
      </div>
    </section>
  );
};
