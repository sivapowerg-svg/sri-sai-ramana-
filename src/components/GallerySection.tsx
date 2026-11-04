import React, { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, Image as ImageIcon, Plus } from 'lucide-react';
import { GalleryItem } from '../types/restaurant';

interface GallerySectionProps {
  items: GalleryItem[];
  onOpenAdmin: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ items, onOpenAdmin }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'breakfast' | 'meals' | 'service'>('all');

  const filteredItems = items.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const prevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % filteredItems.length);
    }
  };

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-[#0D261B]/80 backdrop-blur-xs text-[#FAF8F5] border-b border-[#1E4D36]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#E8C547] block">
              Visual Moments
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#FAF8F5] tracking-tight">
              Food & Ambiance Gallery
            </h2>
            <p className="font-telugu text-[#E8C547] text-sm sm:text-base">
              మా హోటల్ ఆహార వైభవం మరియు ప్రత్యేక వంటకాలు
            </p>
          </div>

          {/* Filter Pills & Admin Manage button */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 p-1 bg-[#143527]/90 border border-[#23583F] rounded-xl">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  activeFilter === 'all' ? 'bg-[#E8C547] text-[#183B2B] font-bold shadow-xs' : 'text-emerald-100 hover:text-white'
                }`}
              >
                All Photos
              </button>
              <button
                onClick={() => setActiveFilter('breakfast')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  activeFilter === 'breakfast' ? 'bg-[#E8C547] text-[#183B2B] font-bold shadow-xs' : 'text-emerald-100 hover:text-white'
                }`}
              >
                Tiffins
              </button>
              <button
                onClick={() => setActiveFilter('meals')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  activeFilter === 'meals' ? 'bg-[#E8C547] text-[#183B2B] font-bold shadow-xs' : 'text-emerald-100 hover:text-white'
                }`}
              >
                Meals
              </button>
              <button
                onClick={() => setActiveFilter('service')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  activeFilter === 'service' ? 'bg-[#E8C547] text-[#183B2B] font-bold shadow-xs' : 'text-emerald-100 hover:text-white'
                }`}
              >
                Train Parcels
              </button>
            </div>

            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#183B2B] bg-[#E8C547] hover:bg-[#F2D368] rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Manage Gallery</span>
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative rounded-2xl overflow-hidden bg-stone-900 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer h-72 sm:h-80"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Hover expand icon */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-xs flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Caption metadata */}
              <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#E8C547] block mb-1">
                  {item.category}
                </span>
                <h3 className="font-serif text-lg font-bold text-white leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-300 line-clamp-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full-Screen Lightbox Modal */}
      {selectedImageIndex !== null && filteredItems[selectedImageIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 text-stone-300 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-20 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-black/50 hover:bg-black/80 border border-white/10 transition-colors z-20 cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-black/50 hover:bg-black/80 border border-white/10 transition-colors z-20 cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Container */}
          <div
            className="max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl max-h-[75vh] flex items-center justify-center bg-black">
              <img
                src={filteredItems[selectedImageIndex].imageUrl}
                alt={filteredItems[selectedImageIndex].title}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] max-w-full object-contain"
              />
            </div>

            <div className="text-center mt-4 max-w-xl text-white">
              <h3 className="font-serif text-xl font-bold text-[#E8C547]">
                {filteredItems[selectedImageIndex].title}
              </h3>
              <p className="text-sm text-stone-300 mt-1">
                {filteredItems[selectedImageIndex].caption}
              </p>
              <span className="text-xs text-stone-400 mt-2 block font-mono">
                {selectedImageIndex + 1} of {filteredItems.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
