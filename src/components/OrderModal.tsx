import React from 'react';
import { X, ExternalLink, Phone, ShoppingBag, Info } from 'lucide-react';
import { MenuItem, RestaurantSettings } from '../types/restaurant';

interface OrderModalProps {
  item: MenuItem | null;
  settings: RestaurantSettings;
  isOpen: boolean;
  onClose: () => void;
  onOpenAdmin: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  item,
  settings,
  isOpen,
  onClose,
  onOpenAdmin,
}) => {
  if (!isOpen) return null;

  const hasSwiggy = Boolean(settings.swiggyEnabled && settings.swiggyUrl?.trim());
  const hasZomato = Boolean(settings.zomatoEnabled && settings.zomatoUrl?.trim());
  const cleanPhone = settings.phone.replace(/\s+/g, '');

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#0C2218] text-[#FAF8F5] rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-[#23583F] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#123023] text-white p-5 flex items-center justify-between border-b border-[#1E4D36]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E8C547] text-[#183B2B] flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base leading-tight text-[#FAF8F5]">
                {item ? `Order ${item.name}` : 'Order Food Online'}
              </h3>
              <p className="text-[11px] text-[#E8C547]">Sri Sai Ramana Hotel · Gudur</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-emerald-200 hover:text-white p-1 rounded-md"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Item Preview if any */}
        {item && (
          <div className="p-4 bg-[#102B1F] border-b border-[#1E4D36] flex items-center gap-3">
            <img
              src={item.imageUrl}
              alt={item.name}
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-xl object-cover border border-[#23583F] shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-[#FAF8F5] truncate">{item.name}</h4>
              <p className="font-telugu text-xs text-[#E8C547]">{item.teluguName}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-bold text-[#E8C547] tabular-nums">₹{item.price}</span>
                <span className="text-[10px] text-emerald-200/70">
                  {item.isVerified ? 'Verified Price' : 'Approximate'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Ordering Channels Selection */}
        <div className="p-5 space-y-3.5">
          <p className="text-xs text-emerald-200/90 font-medium">
            Select your preferred platform to place the order:
          </p>

          {/* Swiggy Option */}
          {hasSwiggy ? (
            <a
              href={settings.swiggyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-xl border border-[#FC8019]/40 bg-[#123023] hover:bg-[#1A4231] hover:border-[#FC8019] transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#FC8019] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  SW
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#FAF8F5]">Order via Swiggy</h4>
                  <p className="text-[11px] text-emerald-200/70">Fast doorstep delivery in Gudur</p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#FC8019] group-hover:translate-x-0.5 transition-transform" />
            </a>
          ) : (
            <div className="p-3.5 rounded-xl border border-[#23583F] bg-[#102B1F] opacity-75 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#183B2B] text-emerald-300/70 flex items-center justify-center font-bold text-xs">
                  SW
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-emerald-200">Swiggy Listing</h4>
                  <p className="text-[11px] text-emerald-300/50">Link coming soon (Awaiting owner URL)</p>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-[#E8C547] bg-[#183B2B] px-2 py-0.5 rounded border border-[#2B6D4F]">
                Coming Soon
              </span>
            </div>
          )}

          {/* Zomato Option */}
          {hasZomato ? (
            <a
              href={settings.zomatoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-xl border border-[#CB202D]/40 bg-[#123023] hover:bg-[#1A4231] hover:border-[#CB202D] transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#CB202D] text-white flex items-center justify-center font-black italic text-sm shadow-xs">
                  Z
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#FAF8F5]">Order via Zomato</h4>
                  <p className="text-[11px] text-emerald-200/70">Explore full restaurant menu</p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#CB202D] group-hover:translate-x-0.5 transition-transform" />
            </a>
          ) : (
            <div className="p-3.5 rounded-xl border border-[#23583F] bg-[#102B1F] opacity-75 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#183B2B] text-emerald-300/70 flex items-center justify-center font-bold text-xs">
                  Z
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-emerald-200">Zomato Listing</h4>
                  <p className="text-[11px] text-emerald-300/50">Link coming soon (Awaiting owner URL)</p>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-[#E8C547] bg-[#183B2B] px-2 py-0.5 rounded border border-[#2B6D4F]">
                Coming Soon
              </span>
            </div>
          )}

          {/* Direct Phone / Train Parcel Option */}
          <a
            href={`tel:${cleanPhone}`}
            className="flex items-center justify-between p-3.5 rounded-xl border border-[#2B6D4F] bg-[#14382A] hover:bg-[#1A4837] transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#E8C547] text-[#183B2B] flex items-center justify-center font-bold">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#FAF8F5]">Call Sri Sai Ramana Directly</h4>
                <p className="text-[11px] text-emerald-200/80">
                  Takeaway & train parcel orders: <span className="tabular-nums text-[#E8C547] font-semibold">{settings.phone}</span>
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#E8C547] group-hover:underline">Call</span>
          </a>

          {!hasSwiggy && !hasZomato && (
            <div className="p-3 bg-[#102B1F] rounded-xl border border-[#23583F] text-[11px] text-emerald-200 flex items-start gap-2">
              <Info className="w-4 h-4 shrink-0 text-[#E8C547] mt-0.5" />
              <span>
                Restaurant owner: To activate instant Swiggy & Zomato buttons for your customers, paste your restaurant URLs in the{' '}
                <button
                  onClick={() => {
                    onClose();
                    onOpenAdmin();
                  }}
                  className="font-bold text-[#E8C547] underline hover:text-amber-300"
                >
                  Admin Dashboard
                </button>
                .
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#081811] text-center border-t border-[#183B2B]">
          <p className="text-[11px] text-emerald-300/60">
            Open daily from {settings.openingHours} · West Gudur Rural
          </p>
        </div>
      </div>
    </div>
  );
};
