import React, { useState, useMemo } from 'react';
import { Search, Info, ShoppingBag, CheckCircle, AlertCircle, Sparkles, UtensilsCrossed } from 'lucide-react';
import { MenuItem, MenuCategory } from '../types/restaurant';

interface MenuSectionProps {
  items: MenuItem[];
  onOrderClick: (item: MenuItem) => void;
  onOpenAdmin: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ items, onOrderClick, onOpenAdmin }) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: MenuCategory; label: string; count: number }[] = useMemo(() => {
    return [
      { id: 'all', label: 'All Items', count: items.length },
      { id: 'breakfast', label: 'Breakfast & Tiffins', count: items.filter((i) => i.category === 'breakfast').length },
      { id: 'specials', label: 'South Indian Specials', count: items.filter((i) => i.category === 'specials').length },
      { id: 'meals', label: 'Meals (Thali)', count: items.filter((i) => i.category === 'meals').length },
      { id: 'rice', label: 'Rice Items', count: items.filter((i) => i.category === 'rice').length },
      { id: 'beverages', label: 'Beverages', count: items.filter((i) => i.category === 'beverages').length },
    ];
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        searchQuery === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.teluguName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [items, activeCategory, searchQuery]);

  return (
    <section id="menu" className="py-20 sm:py-28 bg-[#091F15]/85 backdrop-blur-xs text-[#FAF8F5] border-b border-[#1E4D36]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#E8C547]">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span>100% Pure Vegetarian South Indian Menu</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#FAF8F5] tracking-tight">
            Our Traditional Food Menu
          </h2>
          <p className="font-telugu text-[#E8C547] text-base sm:text-lg">
            రుచికరమైన టిఫిన్లు, భోజనం మరియు స్పెషల్ వంటకాలు
          </p>
          <p className="text-emerald-100/80 text-sm sm:text-base leading-relaxed">
            Freshly prepared daily with stone-ground batters, authentic spices, and zero preservatives.
          </p>

          {/* Verification Disclaimer Notice */}
          <div className="inline-flex items-center gap-2 text-xs text-emerald-100 bg-[#143527]/90 border border-[#23583F] rounded-lg px-3.5 py-2 mt-2 shadow-sm">
            <Info className="w-4 h-4 text-[#E8C547] shrink-0" />
            <span>
              <strong className="text-white">Puri Bhaji</strong> and <strong className="text-white">Chola Poori</strong> are supplied known specialties. Other items are sample entries editable by the restaurant owner via{' '}
              <button onClick={onOpenAdmin} className="text-[#E8C547] font-semibold underline hover:text-amber-300">
                Admin Dashboard
              </button>
              .
            </span>
          </div>
        </div>

        {/* Search Bar & Category Filters */}
        <div className="space-y-4 mb-10">
          {/* Search box */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes (e.g., Puri, Dosa, Meals, కాఫీ)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-stone-300 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#183B2B] shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Buttons (Functional Tabs) */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 bg-stone-200/60 rounded-xl max-w-4xl mx-auto">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#183B2B] text-white shadow-sm font-semibold'
                      : 'text-stone-700 hover:text-[#183B2B] hover:bg-white/60'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`ml-1.5 text-[11px] tabular-nums ${isActive ? 'text-[#E8C547]' : 'text-stone-500'}`}>
                    ({cat.count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white/70 rounded-2xl border border-stone-200 max-w-md mx-auto p-6">
            <UtensilsCrossed className="w-10 h-10 text-stone-400 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-stone-800">No dishes match your search</h3>
            <p className="text-xs text-stone-500 mt-1">Try another search term or switch category filter.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 text-xs font-semibold text-[#183B2B] underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((dish) => (
              <div
                key={dish.id}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group"
              >
                {/* Image Container with Fallback */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-stone-100">
                  <img
                    src={dish.imageUrl}
                    alt={dish.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Veg Indicator (Standard green circle inside green square) */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs p-1 rounded-sm shadow-xs flex items-center justify-center">
                    <span className="w-4 h-4 border border-emerald-700 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-emerald-700" />
                    </span>
                  </div>

                  {/* Verified vs Sample Indicator */}
                  <div className="absolute top-3 right-3">
                    {dish.isVerified ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-[#183B2B]/90 text-[#E8C547] px-2.5 py-1 rounded-md shadow-xs backdrop-blur-xs">
                        <CheckCircle className="w-3 h-3 text-[#E8C547]" />
                        <span>Verified Specialty</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-amber-950/80 text-amber-200 px-2 py-0.5 rounded-md backdrop-blur-xs">
                        <span>Sample Entry</span>
                      </span>
                    )}
                  </div>

                  {/* Badge if present */}
                  {dish.badge && (
                    <div className="absolute bottom-3 left-3 bg-[#E8C547] text-[#183B2B] text-[11px] font-bold px-2 py-0.5 rounded shadow-xs">
                      {dish.badge}
                    </div>
                  )}

                  {/* Availability flag */}
                  {!dish.isAvailable && (
                    <div className="absolute inset-0 bg-stone-900/70 backdrop-blur-2xs flex items-center justify-center">
                      <span className="text-xs font-bold uppercase tracking-wider text-white bg-red-600 px-3 py-1 rounded">
                        Currently Sold Out
                      </span>
                    </div>
                  )}
                </div>

                {/* Content Area */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-serif text-lg font-bold text-[#183B2B] group-hover:text-emerald-800 transition-colors">
                          {dish.name}
                        </h3>
                        <p className="font-telugu text-xs text-amber-900 font-medium">{dish.teluguName}</p>
                      </div>

                      {/* Price */}
                      <div className="text-right shrink-0">
                        <span className="text-lg font-bold font-serif text-[#183B2B] tabular-nums">
                          ₹{dish.price}
                        </span>
                        {!dish.isVerified && (
                          <span className="block text-[10px] text-stone-500">Approx.</span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                      {dish.description}
                    </p>
                  </div>

                  {/* Bottom Action & Portion info */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                    <span className="text-[11px] text-stone-500 font-medium truncate">
                      {dish.servesCount || 'South Indian Vegetarian'}
                    </span>

                    <button
                      onClick={() => onOrderClick(dish)}
                      disabled={!dish.isAvailable}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                        dish.isAvailable
                          ? 'bg-[#183B2B] hover:bg-[#24533C] text-white shadow-xs active:scale-[0.98]'
                          : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#E8C547]" />
                      <span>Order Now</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
