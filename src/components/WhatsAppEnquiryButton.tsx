import React, { useState } from 'react';
import { MessageCircle, X, Train, Utensils, Send } from 'lucide-react';
import { RestaurantSettings } from '../types/restaurant';

interface WhatsAppEnquiryButtonProps {
  settings: RestaurantSettings;
}

export const WhatsAppEnquiryButton: React.FC<WhatsAppEnquiryButtonProps> = ({ settings }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!settings.whatsappEnabled) {
    return null;
  }

  const phone = settings.whatsappPhone || '919030418169';

  const sendQuery = (customMsg?: string) => {
    const text =
      customMsg ||
      'Hello Sri Sai Ramana Hotel! I would like to enquire about your food menu and availability.';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Popover dialog */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-2xl shadow-2xl border border-stone-200 p-4 text-stone-800 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-900">Sri Sai Ramana Enquiries</h4>
                <p className="text-[10px] text-emerald-600 font-medium">WhatsApp Support</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-stone-400 hover:text-stone-700 p-1 rounded-md"
              aria-label="Close WhatsApp options"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-stone-600 mt-2.5 mb-3 leading-relaxed">
            Namaste! How can we help you today with our authentic South Indian vegetarian food?
          </p>

          <div className="space-y-2">
            <button
              onClick={() =>
                sendQuery(
                  'Hello Sri Sai Ramana Hotel! I would like to enquire about your food menu and availability.'
                )
              }
              className="w-full text-left p-2.5 rounded-xl bg-stone-50 hover:bg-emerald-50 border border-stone-200/80 hover:border-emerald-200 transition-colors flex items-center gap-2.5 text-xs text-stone-800"
            >
              <Utensils className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Menu & today's special tiffins</span>
            </button>

            <button
              onClick={() =>
                sendQuery(
                  'Hello Sri Sai Ramana Hotel! I am travelling on a train passing via Gudur Junction (GDR) and would like to arrange fresh parcel food.'
                )
              }
              className="w-full text-left p-2.5 rounded-xl bg-stone-50 hover:bg-emerald-50 border border-stone-200/80 hover:border-emerald-200 transition-colors flex items-center gap-2.5 text-xs text-stone-800"
            >
              <Train className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Train passenger food delivery enquiry</span>
            </button>
          </div>

          <div className="mt-3 pt-2 text-[10px] text-stone-400 text-center">
            Standard WhatsApp messaging rates apply
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer relative group"
        aria-label="Contact Sri Sai Ramana Hotel on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="sr-only">WhatsApp Enquiry</span>

        {/* Tooltip on hover */}
        {!isOpen && (
          <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-[#183B2B] text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Enquire on WhatsApp
          </span>
        )}
      </button>
    </div>
  );
};
